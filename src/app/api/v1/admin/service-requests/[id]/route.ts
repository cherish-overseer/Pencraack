import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from "@/lib/response";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin(req);
    if (!admin) {
      return unauthorizedResponse("Admin authorization required");
    }

    const { id } = await params;
    const request = await prisma.serviceRequest.findUnique({
      where: { id: BigInt(id) },
      include: {
        service: true,
        customerUser: {
          select: { id: true, username: true, email: true, profile: true },
        },
        assignedStaff: {
          select: { id: true, username: true, email: true, profile: true },
        },
        fields: {
          include: { field: true },
        },
        files: true,
        quotes: {
          orderBy: { createdAt: "desc" },
        },
        notes: {
          include: {
            admin: { select: { username: true, profile: { select: { fullName: true } } } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!request) {
      return notFoundResponse("Service request not found");
    }

    return successResponse(request);
  } catch (error: any) {
    console.error("Admin get service request detail error:", error);
    return errorResponse(error.message || "Failed to fetch service request", "INTERNAL_ERROR", 500);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin(req);
    if (!admin) {
      return unauthorizedResponse("Admin authorization required");
    }

    const { id } = await params;
    const requestId = BigInt(id);

    const existing = await prisma.serviceRequest.findUnique({
      where: { id: requestId },
    });

    if (!existing) {
      return notFoundResponse("Service request not found");
    }

    const body = await req.json();
    const { status, assignedStaffId, quote, note } = body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (assignedStaffId !== undefined) {
      updateData.assignedStaffId = assignedStaffId ? BigInt(assignedStaffId) : null;
    }

    // Execute updates in transaction if quotes or notes are included
    const result = await prisma.$transaction(async (tx) => {
      let updatedRequest = existing;
      if (Object.keys(updateData).length > 0) {
        updatedRequest = await tx.serviceRequest.update({
          where: { id: requestId },
          data: updateData,
        });
      }

      // Add a quote if provided
      if (quote) {
        await tx.serviceQuote.create({
          data: {
            requestId,
            amount: quote.amount,
            currency: quote.currency || "NGN",
            estimatedDeliveryDays: quote.deliveryDays,
            description: quote.scopeDescription || quote.description,
            expiresAt: quote.expiresAt ? new Date(quote.expiresAt) : null,
            status: quote.status || "SENT",
            createdByAdminId: BigInt(admin.userId),
          },
        });

        // Auto transition status to QUOTED if still NEW / REVIEWING
        if (["NEW", "REVIEWING"].includes(updatedRequest.status)) {
          updatedRequest = await tx.serviceRequest.update({
            where: { id: requestId },
            data: { status: "QUOTED" },
          });
        }
      }

      // Add an internal or client note if provided
      if (note && note.text) {
        await tx.serviceNote.create({
          data: {
            requestId,
            adminId: BigInt(admin.userId),
            note: note.text,
          },
        });
      }

      return updatedRequest;
    });

    return successResponse(result, "Service request updated successfully");
  } catch (error: any) {
    console.error("Admin update service request error:", error);
    return errorResponse(error.message || "Failed to update service request", "INTERNAL_ERROR", 500);
  }
}
