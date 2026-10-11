import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { apiSuccess, apiUnauthorized, apiNotFound, apiError } from "@/lib/response";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // 1. Enforce Authentication Requirement (PRD Section 7)
    const authUser = await getAuthUser(req);
    if (!authUser) {
      return apiUnauthorized("You must be logged in to read this content.");
    }

    // 2. Query content item
    const content = await prisma.content.findUnique({
      where: { slug },
      include: {
        author: {
          include: { profile: true },
        },
        category: true,
        comicPages: {
          orderBy: { pageNumber: "asc" },
        },
        _count: {
          select: { likes: true, comments: true, bookmarks: true },
        },
      },
    });

    if (!content) {
      return apiNotFound(`Content with slug '${slug}' not found.`);
    }

    // 3. Increment views count asynchronously
    prisma.content
      .update({
        where: { id: content.id },
        data: { viewsCount: { increment: 1 } },
      })
      .catch(() => {});

    // 4. Check if current user has liked or bookmarked this content
    const [userLiked, userBookmarked] = await Promise.all([
      prisma.like.findUnique({
        where: {
          userId_contentId: {
            userId: BigInt(authUser.userId),
            contentId: content.id,
          },
        },
      }),
      prisma.bookmark.findUnique({
        where: {
          userId_contentId: {
            userId: BigInt(authUser.userId),
            contentId: content.id,
          },
        },
      }),
    ]);

    return apiSuccess({
      id: content.id.toString(),
      type: content.type,
      title: content.title,
      slug: content.slug,
      excerpt: content.excerpt,
      bodyContent: content.bodyContent,
      coverImageUrl: content.coverImageUrl,
      readTime: content.readTime,
      category: content.category?.name || content.type,
      likesCount: content.likesCount + content._count.likes,
      viewsCount: content.viewsCount + 1,
      commentsCount: content._count.comments,
      publishedAt: content.publishedAt,
      hasLiked: Boolean(userLiked),
      hasBookmarked: Boolean(userBookmarked),
      comicPages: content.comicPages.map((p) => ({
        id: p.id.toString(),
        pageNumber: p.pageNumber,
        imageUrl: p.imageUrl,
      })),
      author: {
        id: content.author.id.toString(),
        name: content.author.profile?.fullName || content.author.username,
        username: `@${content.author.username}`,
        avatarUrl: content.author.profile?.avatarUrl,
        bio: content.author.profile?.bio,
      },
    });
  } catch (error: any) {
    console.error("Read content error:", error);
    return apiError(error.message || "Failed to load content", "INTERNAL_ERROR", 500);
  }
}
