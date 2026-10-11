import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { apiSuccess, apiUnauthorized, apiNotFound, apiError } from "@/lib/response";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authUser = await getAuthUser(req);
    if (!authUser) {
      return apiUnauthorized("You must be logged in to like content.");
    }

    const { slug } = await params;
    const isNumeric = /^\d+$/.test(slug);

    const content = await prisma.content.findUnique({
      where: isNumeric ? { id: BigInt(slug) } : { slug },
      select: { id: true, likesCount: true },
    });

    if (!content) {
      return apiNotFound("Content not found");
    }

    const contentId = content.id;
    const userId = BigInt(authUser.userId);

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_contentId: {
          userId,
          contentId,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.$transaction([
        prisma.like.delete({ where: { id: existingLike.id } }),
        prisma.content.update({
          where: { id: contentId },
          data: { likesCount: { decrement: 1 } },
        }),
      ]);
      return apiSuccess({ liked: false, likesCount: Math.max(0, content.likesCount - 1) }, "Removed like");
    } else {
      // Like
      await prisma.$transaction([
        prisma.like.create({ data: { userId, contentId } }),
        prisma.content.update({
          where: { id: contentId },
          data: { likesCount: { increment: 1 } },
        }),
      ]);
      return apiSuccess({ liked: true, likesCount: content.likesCount + 1 }, "Content liked");
    }
  } catch (error: any) {
    console.error("Like error:", error);
    return apiError(error.message || "Failed to update like", "INTERNAL_ERROR", 500);
  }
}
