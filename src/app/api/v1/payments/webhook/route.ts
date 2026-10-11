import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Event extraction (compatible with Paystack format)
    const event = body.event;
    const data = body.data || body;
    const reference = data.reference;

    if (!reference) {
      return NextResponse.json({ success: false, message: "Missing reference" }, { status: 400 });
    }

    // 1. Find transaction
    const transaction = await prisma.transaction.findUnique({
      where: { reference },
    });

    if (!transaction) {
      return NextResponse.json({ success: false, message: "Transaction not found" }, { status: 404 });
    }

    // 2. Idempotency Check: if already processed, return 200 immediately
    if (transaction.status === "SUCCESS") {
      return NextResponse.json({ success: true, message: "Transaction already processed" });
    }

    // 3. Process WRITER_GIFT
    if (transaction.type === "WRITER_GIFT") {
      const metadata = transaction.metadataJson as any;
      const senderUserId = BigInt(metadata.senderUserId);
      const recipientWriterId = BigInt(metadata.recipientWriterId);
      const netAmount = Number(transaction.netAmount);

      await prisma.$transaction(async (tx) => {
        // A. Mark transaction SUCCESS
        await tx.transaction.update({
          where: { id: transaction.id },
          data: {
            status: "SUCCESS",
            providerReference: data.id ? data.id.toString() : null,
          },
        });

        // B. Ensure writer wallet exists
        let wallet = await tx.wallet.findUnique({
          where: { userId: recipientWriterId },
        });

        if (!wallet) {
          wallet = await tx.wallet.create({
            data: {
              userId: recipientWriterId,
              currency: "NGN",
            },
          });
        }

        const balanceBefore = Number(wallet.availableBalance);
        const balanceAfter = balanceBefore + netAmount;

        // C. Update wallet balance
        await tx.wallet.update({
          where: { id: wallet.id },
          data: {
            availableBalance: { increment: netAmount },
            totalEarned: { increment: netAmount },
          },
        });

        // D. Create immutable double-entry ledger entry
        await tx.walletLedger.create({
          data: {
            walletId: wallet.id,
            transactionId: transaction.id,
            entryType: "CREDIT",
            amount: netAmount,
            balanceBefore,
            balanceAfter,
            description: `Gift received from reader (Ref: ${reference})`,
          },
        });

        // E. Create Gift record
        await tx.gift.create({
          data: {
            senderUserId,
            recipientUserId: recipientWriterId,
            transactionId: transaction.id,
            grossAmount: transaction.amount,
            platformFee: transaction.feeAmount,
            writerNetAmount: transaction.netAmount,
            message: metadata.message || null,
          },
        });

        // F. Create In-App Notification for writer
        await tx.notification.create({
          data: {
            userId: recipientWriterId,
            type: "GIFT_RECEIVED",
            title: "You received a gift! 🎁",
            message: `A reader supported your writing with ₦${netAmount.toLocaleString()}.`,
            actionUrl: "/wallet",
          },
        });
      });
    }

    return NextResponse.json({ success: true, message: "Webhook successfully processed" });
  } catch (error: any) {
    console.error("Payment webhook processing error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process webhook" },
      { status: 500 }
    );
  }
}
