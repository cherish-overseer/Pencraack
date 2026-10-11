import { prisma } from "@/lib/prisma";
import { apiSuccess, apiNotFound, apiError } from "@/lib/response";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ ref: string }> }
) {
  try {
    const { ref } = await params;

    const request = await prisma.serviceRequest.findUnique({
      where: { referenceCode: ref },
      include: {
        service: true,
        fields: true,
        files: true,
        quotes: {
          where: { status: "SENT" },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (!request) {
      return apiNotFound(`No service request found with reference ${ref}`);
    }

    return apiSuccess({
      referenceCode: request.referenceCode,
      serviceName: request.service.name,
      customerName: request.customerName,
      customerEmail: request.customerEmail,
      status: request.status,
      paymentStatus: request.paymentStatus,
      budgetEstimate: request.budgetEstimate,
      deadlineDate: request.deadlineDate,
      submittedFields: request.fields.map((f) => ({
        name: f.fieldName,
        value: f.fieldValue,
      })),
      files: request.files,
      latestQuote: request.quotes[0]
        ? {
            amount: request.quotes[0].amount.toString(),
            currency: request.quotes[0].currency,
            description: request.quotes[0].description,
            expiresAt: request.quotes[0].expiresAt,
            status: request.quotes[0].status,
          }
        : null,
      createdAt: request.createdAt,
    });
  } catch (error: any) {
    console.error("Track service request error:", error);
    return apiError(error.message || "Failed to load request", "INTERNAL_ERROR", 500);
  }
}
