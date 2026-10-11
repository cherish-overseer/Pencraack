import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { apiSuccess, apiUnauthorized, apiError } from "@/lib/response";

export async function GET(req: Request) {
  try {
    const authUser = await getAuthUser(req);
    if (!authUser) {
      return apiUnauthorized("You must be logged in to access your wallet.");
    }

    const userId = BigInt(authUser.userId);

    let wallet = await prisma.wallet.findUnique({
      where: { userId },
      include: {
        ledgerEntries: {
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    });

    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: { userId, currency: "NGN" },
        include: { ledgerEntries: true },
      });
    }

    const withdrawals = await prisma.withdrawal.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return apiSuccess({
      wallet: {
        availableBalance: wallet.availableBalance.toString(),
        pendingBalance: wallet.pendingBalance.toString(),
        totalEarned: wallet.totalEarned.toString(),
        totalWithdrawn: wallet.totalWithdrawn.toString(),
        currency: wallet.currency,
      },
      ledger: wallet.ledgerEntries.map((l) => ({
        id: l.id.toString(),
        entryType: l.entryType,
        amount: l.amount.toString(),
        balanceBefore: l.balanceBefore.toString(),
        balanceAfter: l.balanceAfter.toString(),
        description: l.description,
        createdAt: l.createdAt,
      })),
      withdrawals: withdrawals.map((w) => ({
        id: w.id.toString(),
        amount: w.amount.toString(),
        bankName: w.bankName,
        accountNumber: w.accountNumber,
        status: w.status,
        createdAt: w.createdAt,
      })),
    });
  } catch (error: any) {
    console.error("Get wallet error:", error);
    return apiError(error.message || "Failed to load wallet", "INTERNAL_ERROR", 500);
  }
}
