import { prisma } from "@/lib/prisma";
import { comparePassword, generateToken } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/response";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { login, password } = body;

    if (!login || !password) {
      return apiError("Email/username and password are required.", "VALIDATION_ERROR", 400);
    }

    const cleanLogin = login.trim().toLowerCase().replace(/^@/, "");

    // 1. Find user by email or username
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: cleanLogin }, { username: cleanLogin }],
      },
      include: {
        profile: true,
        roles: { include: { role: true } },
        wallet: true,
      },
    });

    if (!user) {
      return apiError("Invalid credentials.", "INVALID_CREDENTIALS", 401);
    }

    if (user.status === "SUSPENDED") {
      return apiError("Your account has been suspended. Please contact support.", "ACCOUNT_SUSPENDED", 403);
    }

    // 2. Compare password
    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return apiError("Invalid credentials.", "INVALID_CREDENTIALS", 401);
    }

    // 3. Generate token
    const token = generateToken({
      userId: user.id.toString(),
      email: user.email,
      username: user.username,
      roles: user.roles.map((r) => r.role.name),
    });

    const response = apiSuccess(
      {
        user: {
          id: user.id.toString(),
          username: user.username,
          email: user.email,
          fullName: user.profile?.fullName,
          avatarUrl: user.profile?.avatarUrl,
          bio: user.profile?.bio,
          isWriter: user.profile?.isWriter,
          roles: user.roles.map((r) => r.role.name),
          wallet: user.wallet
            ? {
                availableBalance: user.wallet.availableBalance.toString(),
                currency: user.wallet.currency,
              }
            : null,
        },
        token,
      },
      "Logged in successfully"
    );

    // Set secure HTTP-only cookie
    response.cookies.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return apiError(error.message || "Failed to log in", "INTERNAL_ERROR", 500);
  }
}
