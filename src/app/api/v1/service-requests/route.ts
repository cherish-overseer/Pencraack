import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/response";

function generateServiceReference(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
  return `PC-SRV-${dateStr}-${randomSuffix}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      serviceId,
      serviceSlug,
      customerName,
      customerEmail,
      customerPhone,
      budgetEstimate,
      deadlineDate,
      fields, // array of { fieldId?, fieldName, fieldValue }
    } = body;

    if (!customerName || !customerEmail) {
      return apiError("Customer name and email address are required.", "VALIDATION_ERROR", 400);
    }

    // 1. Resolve service ID
    let resolvedServiceId = serviceId;
    if (!resolvedServiceId && serviceSlug) {
      const svc = await prisma.service.findUnique({ where: { slug: serviceSlug } });
      if (svc) resolvedServiceId = svc.id;
    }

    if (!resolvedServiceId) {
      // Find or create default service
      const firstService = await prisma.service.findFirst();
      if (firstService) {
        resolvedServiceId = firstService.id;
      } else {
        const created = await prisma.service.create({
          data: {
            name: "Custom Writing Project",
            slug: "custom-writing-project",
            category: "CREATIVE",
            shortDesc: "Custom editorial and writing inquiry",
            startingPrice: 20000,
          },
        });
        resolvedServiceId = created.id;
      }
    }

    // 2. Check if logged-in user
    const authUser = await getAuthUser(req);
    const customerUserId = authUser ? BigInt(authUser.userId) : null;

    // 3. Generate unique reference code
    const referenceCode = generateServiceReference();

    // 4. Create ServiceRequest and custom fields in a transaction
    const newRequest = await prisma.serviceRequest.create({
      data: {
        referenceCode,
        serviceId: resolvedServiceId,
        customerUserId,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim().toLowerCase(),
        customerPhone: customerPhone ? customerPhone.trim() : null,
        budgetEstimate: budgetEstimate || null,
        deadlineDate: deadlineDate ? new Date(deadlineDate) : null,
        status: "NEW",
        paymentStatus: "UNPAID",
        fields: fields && Array.isArray(fields) && fields.length > 0
          ? {
              create: fields.map((f: any) => ({
                fieldId: f.fieldId || undefined,
                fieldName: f.fieldName || "Detail",
                fieldValue: typeof f.fieldValue === "string" ? f.fieldValue : JSON.stringify(f.fieldValue),
              })),
            }
          : undefined,
      },
      include: {
        service: true,
        fields: true,
      },
    });

    return apiSuccess(
      {
        referenceCode: newRequest.referenceCode,
        serviceName: newRequest.service.name,
        customerName: newRequest.customerName,
        customerEmail: newRequest.customerEmail,
        status: newRequest.status,
        createdAt: newRequest.createdAt,
      },
      "Service request submitted successfully! A director will reach out within 24 hours.",
      201
    );
  } catch (error: any) {
    console.error("Service request submission error:", error);
    return apiError(error.message || "Failed to submit service request", "INTERNAL_ERROR", 500);
  }
}
