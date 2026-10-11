import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { apiSuccess, apiUnauthorized, apiError } from "@/lib/response";

export async function POST(req: Request) {
  try {
    const authUser = await getAuthUser(req);
    if (!authUser) {
      return apiUnauthorized("You must be logged in to send a gift.");
    }

    const body = await req.json();
    const { recipientWriterId, amount, message } = body;

    const numAmount = parseFloat(amount);
    if (!recipientWriterId || isNaN(numAmount) || numAmount < 100) {
      return apiError("A valid writer and minimum gift amount of ₦100 is required.", "VALIDATION_ERROR", 400);
    }

    // 1. Verify recipient writer exists
    const writer = await prisma.user.findUnique({
      where: { id: BigInt(recipientWriterId) },
      include: { profile: true, wallet: true },
    });

    if (!writer) {
      return apiError("Recipient writer not found.", "NOT_FOUND", 404);
    }

    // 2. Calculate fee (e.g. 10% platform fee from env or default)
    const feePercent = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE || "10");
    const platformFee = Math.round((numAmount * feePercent) / 100);
    const writerNetAmount = numAmount - platformFee;

    // 3. Generate transaction reference
    const reference = `GFT-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

    // 4. Create pending transaction
    const transaction = await prisma.transaction.create({
      data: {
        reference,
        type: "WRITER_GIFT",
        amount: numAmount,
        feeAmount: platformFee,
        netAmount: writerNetAmount,
        currency: "NGN",
        provider: "PAYSTACK",
        status: "PENDING",
        metadataJson: {
          senderUserId: authUser.userId,
          recipientWriterId,
          message: message || null,
        },
      },
    });

    // 5. If Paystack secret key is configured, initialize session; else return mock checkout URL
    const paystackKey = process.env.PAYSTACK_SECRET_KEY;
    let authorizationUrl = `https://checkout.paystack.com/${reference}`;

    if (paystackKey && !paystackKey.includes("xxxx")) {
      try {
        const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${paystackKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: authUser.email,
            amount: numAmount * 100, // Paystack operates in kobo
            reference,
            callback_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/stories`,
            metadata: {
              custom_fields: [
                { display_name: "Recipient", variable_name: "recipient", value: writer.profile?.fullName || writer.username },
                { display_name: "Gift Message", variable_name: "message", value: message || "" },
              ],
            },
          }),
        });
        const paystackData = await paystackRes.json();
        if (paystackData.status && paystackData.data?.authorization_url) {
          authorizationUrl = paystackData.data.authorization_url;
        }
      } catch (err) {
        console.warn("Paystack call failed, using direct ref:", err);
      }
    }

    return apiSuccess({
      reference: transaction.reference,
      amount: numAmount,
      platformFee,
      writerNetAmount,
      authorizationUrl,
      recipient: {
        name: writer.profile?.fullName || writer.username,
      },
    });
  } catch (error: any) {
    console.error("Initialize gift error:", error);
    return apiError(error.message || "Failed to initialize gift session", "INTERNAL_ERROR", 500);
  }
}
