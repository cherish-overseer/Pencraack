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
    const search = searchParams.get("search");
    const role = searchParams.get("role");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { username: { contains: search } },
        { email: { contains: search } },
      ];
    }
    if (role) {
      where.roles = {
        some: {
          role: { name: role },
        },
      };
    }

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          username: true,
          status: true,
          createdAt: true,
          profile: {
            select: { fullName: true, avatarUrl: true, isWriter: true },
          },
          roles: {
            select: { role: { select: { name: true } } },
          },
          wallet: {
            select: { availableBalance: true, currency: true },
          },
          _count: {
            select: { contents: true, customerRequests: true },
          },
        },
      }),
    ]);

    return successResponse({
      users: users.map((u) => ({
        ...u,
        roles: u.roles.map((r) => r.role.name),
      })),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Admin users list error:", error);
    return errorResponse(error.message || "Failed to fetch users", "INTERNAL_ERROR", 500);
  }
}
