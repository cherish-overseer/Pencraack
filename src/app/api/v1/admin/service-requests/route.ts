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

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const serviceSlug = searchParams.get("service");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) {
      where.status = status;
    }
    if (serviceSlug) {
      where.service = { slug: serviceSlug };
    }

    const [total, requests] = await Promise.all([
      prisma.serviceRequest.count({ where }),
      prisma.serviceRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          service: true,
          customerUser: {
            select: { id: true, username: true, email: true, profile: { select: { fullName: true } } },
          },
          assignedStaff: {
            select: { id: true, username: true, email: true, profile: { select: { fullName: true } } },
          },
          quotes: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
          _count: {
            select: { fields: true, files: true, notes: true },
          },
        },
      }),
    ]);

    return successResponse({
      requests,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Admin service-requests error:", error);
    return errorResponse(error.message || "Failed to fetch service requests", "INTERNAL_ERROR", 500);
  }
}
