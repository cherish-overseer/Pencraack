import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { successResponse, errorResponse, unauthorizedResponse } from "@/lib/response";

export async function GET(req: NextRequest) {
  try {
    const admin = await requireAdmin(req);
    if (!admin) {
      return unauthorizedResponse("Admin authorization required");
    }

    const [
      totalUsers,
      totalWriters,
      totalContent,
      pendingContent,
      totalRequests,
      pendingRequests,
      recentRequests,
      recentTransactions,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.userProfile.count({ where: { isWriter: true } }),
      prisma.content.count({ where: { status: "PUBLISHED" } }),
      prisma.content.count({ where: { status: "UNDER_REVIEW" } }),
      prisma.serviceRequest.count(),
      prisma.serviceRequest.count({ where: { status: { in: ["NEW", "REVIEWING"] } } }),
      prisma.serviceRequest.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { service: true, customerUser: { select: { username: true, email: true } } },
      }),
      prisma.transaction.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return successResponse({
      stats: {
        totalUsers,
        totalWriters,
        totalContent,
        pendingContent,
        totalRequests,
        pendingRequests,
      },
      recentRequests,
      recentTransactions,
    });
  } catch (error: any) {
    console.error("Admin dashboard error:", error);
    return errorResponse(error.message || "Failed to fetch admin stats", "INTERNAL_ERROR", 500);
  }
}
