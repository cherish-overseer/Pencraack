import { prisma } from "@/lib/prisma";
import { apiSuccess, apiNotFound, apiError } from "@/lib/response";
import { INITIAL_SERVICES } from "@/lib/servicesCatalog";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    let service = await prisma.service.findUnique({
      where: { slug },
      include: {
        fields: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    if (!service) {
      // Fallback check against static catalog
      const fallback = INITIAL_SERVICES.find((s) => s.slug === slug);
      if (fallback) {
        return apiSuccess(fallback);
      }
      return apiNotFound(`Service with slug '${slug}' not found.`);
    }

    return apiSuccess(service);
  } catch (error: any) {
    console.error("Get service by slug error:", error);
    return apiError(error.message || "Failed to load service", "INTERNAL_ERROR", 500);
  }
}
