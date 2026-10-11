import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { apiSuccess, apiUnauthorized, apiError } from "@/lib/response";

export async function POST(req: Request) {
  try {
    const authUser = await getAuthUser(req);
    if (!authUser) {
      return apiUnauthorized("You must be logged in to request a withdrawal.");
    }

    const userId = BigInt(authUser.userId);
    const body = await req.json();
    const { amount, bankName, accountNumber, accountName } = body;

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 1000) {
      return apiError("Minimum withdrawal amount is ₦1,000.", "VALIDATION_ERROR", 400);
    }

    if (!bankName || !accountNumber || !accountName) {
      return apiError("Bank name, account number, and account name are required.", "VALIDATION_ERROR", 400);
    }

    // 1. Fetch wallet with available balance
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet || Number(wallet.availableBalance) < numAmount) {
      return apiError("Insufficient available balance for this withdrawal.", "INSUFFICIENT_BALANCE", 400);
    }

    // 2. Perform balance deduction & create withdrawal record in a transaction
    const withdrawal = await prisma.$transaction(async (tx) => {
      const balanceBefore = Number(wallet.availableBalance);
      const balanceAfter = balanceBefore - numAmount;

      // Update wallet balances (deduct available, add to pending)
      await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          availableBalance: { decrement: numAmount },
          pendingBalance: { increment: numAmount },
        },
      });

      // Write ledger entry
      await tx.walletLedger.create({
        data: {
          walletId: wallet.id,
          entryType: "DEBIT",
          amount: numAmount,
          balanceBefore,
          balanceAfter,
          description: `Withdrawal request to ${bankName} (${accountNumber})`,
        },
      });

      // Create withdrawal row
      return tx.withdrawal.create({
        data: {
          userId,
          amount: numAmount,
          bankName,
          accountNumber,
          accountName,
          status: "PENDING",
        },
      });
    });

    return apiSuccess(
      {
        id: withdrawal.id.toString(),
        amount: withdrawal.amount.toString(),
        status: withdrawal.status,
        bankName: withdrawal.bankName,
        createdAt: withdrawal.createdAt,
      },
      "Withdrawal request submitted! It will be processed by finance within 24–48 hours.",
      201
    );
  } catch (error: any) {
    console.error("Withdrawal error:", error);
    return apiError(error.message || "Failed to submit withdrawal", "INTERNAL_ERROR", 500);
  }
}
