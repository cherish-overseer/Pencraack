import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { apiSuccess, apiUnauthorized, apiNotFound, apiError } from "@/lib/response";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const isNumeric = /^\d+$/.test(slug);

    const content = await prisma.content.findUnique({
      where: isNumeric ? { id: BigInt(slug) } : { slug },
      select: { id: true },
    });

    if (!content) {
      return apiNotFound("Content not found");
    }

    const contentId = content.id;

    const comments = await prisma.comment.findMany({
      where: {
        contentId,
        parentCommentId: null, // top level
        status: "VISIBLE",
      },
      include: {
        user: { include: { profile: true } },
        replies: {
          where: { status: "VISIBLE" },
          include: { user: { include: { profile: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = comments.map((c) => ({
      id: c.id.toString(),
      commentText: c.commentText,
      createdAt: c.createdAt,
      user: {
        username: c.user.username,
        profile: {
          fullName: c.user.profile?.fullName,
          avatarUrl: c.user.profile?.avatarUrl,
        },
      },
      replies: c.replies.map((r) => ({
        id: r.id.toString(),
        commentText: r.commentText,
        createdAt: r.createdAt,
        user: {
          username: r.user.username,
          profile: {
            fullName: r.user.profile?.fullName,
            avatarUrl: r.user.profile?.avatarUrl,
          },
        },
      })),
    }));

    return apiSuccess(formatted);
  } catch (error: any) {
    console.error("Get comments error:", error);
    return apiError(error.message || "Failed to load comments", "INTERNAL_ERROR", 500);
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authUser = await getAuthUser(req);
    if (!authUser) {
      return apiUnauthorized("You must be logged in to leave a comment.");
    }

    const { slug } = await params;
    const isNumeric = /^\d+$/.test(slug);

    const content = await prisma.content.findUnique({
      where: isNumeric ? { id: BigInt(slug) } : { slug },
      select: { id: true },
    });

    if (!content) {
      return apiNotFound("Content not found");
    }

    const contentId = content.id;
    const userId = BigInt(authUser.userId);

    const body = await req.json();
    const { commentText, parentCommentId } = body;

    if (!commentText || !commentText.trim()) {
      return apiError("Comment text is required", "VALIDATION_ERROR", 400);
    }

    const newComment = await prisma.comment.create({
      data: {
        userId,
        contentId,
        parentCommentId: parentCommentId ? BigInt(parentCommentId) : null,
        commentText: commentText.trim(),
        status: "VISIBLE",
      },
      include: {
        user: { include: { profile: true } },
      },
    });

    return apiSuccess(
      {
        id: newComment.id.toString(),
        commentText: newComment.commentText,
        createdAt: newComment.createdAt,
        user: {
          username: newComment.user.username,
          profile: {
            fullName: newComment.user.profile?.fullName,
            avatarUrl: newComment.user.profile?.avatarUrl,
          },
        },
      },
      "Comment posted successfully",
      201
    );
  } catch (error: any) {
    console.error("Post comment error:", error);
    return apiError(error.message || "Failed to post comment", "INTERNAL_ERROR", 500);
  }
}
