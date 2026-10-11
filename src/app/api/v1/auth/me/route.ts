import { getFullAuthUser } from "@/lib/auth";
import { apiSuccess, apiUnauthorized, apiError } from "@/lib/response";

export async function GET(req: Request) {
  try {
    const user = await getFullAuthUser(req);
    if (!user) {
      return apiUnauthorized("You must be logged in to view your account details.");
    }

    return apiSuccess({
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      status: user.status,
      profile: user.profile,
      roles: user.roles.map((r) => r.role.name),
      wallet: user.wallet
        ? {
            availableBalance: user.wallet.availableBalance.toString(),
            pendingBalance: user.wallet.pendingBalance.toString(),
            totalEarned: user.wallet.totalEarned.toString(),
            currency: user.wallet.currency,
          }
        : null,
      createdAt: user.createdAt,
    });
  } catch (error: any) {
    console.error("Get me error:", error);
    return apiError(error.message || "Failed to retrieve user profile", "INTERNAL_ERROR", 500);
  }
}
