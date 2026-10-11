import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { apiSuccess, apiUnauthorized, apiError } from "@/lib/response";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type")?.toUpperCase();
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);
    const skip = (page - 1) * limit;

    const where: any = {
      status: "PUBLISHED",
    };

    if (type && ["BLOG", "STORY", "POEM", "COMIC"].includes(type)) {
      where.type = type;
    }

    if (category && category !== "All") {
      where.category = {
        name: { equals: category },
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.content.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            include: { profile: true },
          },
          category: true,
        },
      }),
      prisma.content.count({ where }),
    ]);

    const formatted = items.map((item) => ({
      id: item.id.toString(),
      type: item.type,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      coverImageUrl: item.coverImageUrl,
      readTime: item.readTime,
      category: item.category?.name || item.type,
      likesCount: item.likesCount,
      viewsCount: item.viewsCount,
      publishedAt: item.publishedAt,
      author: {
        id: item.author.id.toString(),
        name: item.author.profile?.fullName || item.author.username,
        username: `@${item.author.username}`,
        avatarUrl: item.author.profile?.avatarUrl,
      },
    }));

    return apiSuccess({
      items: formatted,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("List content error:", error);
    return apiError(error.message || "Failed to load content", "INTERNAL_ERROR", 500);
  }
}

export async function POST(req: Request) {
  try {
    const authUser = await getAuthUser(req);
    if (!authUser) {
      return apiUnauthorized("You must be logged in to create content.");
    }

    const body = await req.json();
    const { type, title, excerpt, bodyContent, categorySlug, coverImageUrl, readTime, status } = body;

    if (!type || !title || !bodyContent) {
      return apiError("Type, title, and body content are required.", "VALIDATION_ERROR", 400);
    }

    // Generate unique slug
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    const slug = `${baseSlug}-${randomSuffix}`;

    // Resolve category if provided
    let categoryId: number | undefined;
    if (categorySlug) {
      const cat = await prisma.category.findUnique({ where: { slug: categorySlug } });
      if (cat) categoryId = cat.id;
    }

    const content = await prisma.content.create({
      data: {
        authorId: BigInt(authUser.userId),
        type,
        title,
        slug,
        excerpt,
        bodyContent,
        coverImageUrl,
        readTime: readTime || "5 min",
        status: status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
        publishedAt: status === "PUBLISHED" ? new Date() : null,
        categoryId,
      },
    });

    return apiSuccess(
      {
        id: content.id.toString(),
        slug: content.slug,
        title: content.title,
        status: content.status,
      },
      "Content created successfully",
      201
    );
  } catch (error: any) {
    console.error("Create content error:", error);
    return apiError(error.message || "Failed to create content", "INTERNAL_ERROR", 500);
  }
}
