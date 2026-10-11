import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/response";
import { INITIAL_SERVICES } from "@/lib/servicesCatalog";

export async function GET() {
  try {
    // 1. Check if services exist in database
    let dbServices = await prisma.service.findMany({
      where: { isActive: true },
      include: {
        fields: {
          orderBy: { displayOrder: "asc" },
        },
      },
      orderBy: { name: "asc" },
    });

    // 2. Auto-seed initial catalog if empty
    if (dbServices.length === 0) {
      for (const svc of INITIAL_SERVICES) {
        await prisma.service.create({
          data: {
            name: svc.name,
            slug: svc.slug,
            category: svc.category,
            shortDesc: svc.shortDesc,
            fullDesc: svc.fullDesc,
            startingPrice: svc.startingPrice,
            turnaroundTime: svc.turnaroundTime,
            guarantee: svc.guarantee,
            fields: {
              create: svc.fields.map((f, idx) => ({
                fieldKey: f.fieldKey,
                fieldLabel: f.fieldLabel,
                fieldType: f.fieldType,
                isRequired: f.isRequired,
                displayOrder: idx,
                optionsJson: f.options ? (f.options as any) : undefined,
              })),
            },
          },
        });
      }

      dbServices = await prisma.service.findMany({
        where: { isActive: true },
        include: { fields: true },
        orderBy: { name: "asc" },
      });
    }

    return apiSuccess(dbServices);
  } catch (error: any) {
    console.warn("Database unavailable, falling back to static services catalog:", error.message);
    // Fallback to in-memory catalog if MySQL isn't connected yet
    return apiSuccess(INITIAL_SERVICES);
  }
}
