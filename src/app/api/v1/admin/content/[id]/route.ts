import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from "@/lib/response";

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
    const contentId = BigInt(id);

    const existing = await prisma.content.findUnique({
      where: { id: contentId },
    });

    if (!existing) {
      return notFoundResponse("Content not found");
    }

    const body = await req.json();
    const { status, isFeatured, rejectionReason } = body;

    const updateData: any = {};
    if (status) {
      updateData.status = status;
      if (status === "PUBLISHED" && !existing.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
    if (isFeatured !== undefined) updateData.isFeatured = isFeatured;
    if (rejectionReason !== undefined) updateData.rejectionReason = rejectionReason;

    const updated = await prisma.content.update({
      where: { id: contentId },
      data: updateData,
    });

    return successResponse(updated, "Content status updated successfully");
  } catch (error: any) {
    console.error("Admin content update error:", error);
    return errorResponse(error.message || "Failed to update content", "INTERNAL_ERROR", 500);
  }
}
