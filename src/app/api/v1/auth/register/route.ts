import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateToken } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/response";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, username, email, password, country, phone, isWriter } = body;

    if (!fullName || !username || !email || !password) {
      return apiError("Full name, username, email, and password are required.", "VALIDATION_ERROR", 400);
    }

    const cleanUsername = username.trim().toLowerCase().replace(/^@/, "");
    const cleanEmail = email.trim().toLowerCase();

    // 1. Check for existing user
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email: cleanEmail }, { username: cleanUsername }],
      },
    });

    if (existing) {
      if (existing.email === cleanEmail) {
        return apiError("An account with this email already exists.", "EMAIL_TAKEN", 409);
      }
      return apiError("This username is already taken.", "USERNAME_TAKEN", 409);
    }

    // 2. Hash password
    const passwordHash = await hashPassword(password);

    // 3. Ensure default roles exist in DB
    const roleName = isWriter ? "WRITER" : "READER";
    let role = await prisma.role.findUnique({ where: { name: roleName } });
    if (!role) {
      role = await prisma.role.create({
        data: { name: roleName, description: `${roleName} default role` },
      });
    }

    // 4. Create user with profile, role, and wallet
    const newUser = await prisma.user.create({
      data: {
        username: cleanUsername,
        email: cleanEmail,
        passwordHash,
        status: "ACTIVE",
        profile: {
          create: {
            fullName,
            country: country || "Nigeria",
            phone: phone || null,
            isWriter: Boolean(isWriter),
          },
        },
        roles: {
          create: { roleId: role.id },
        },
        wallet: {
          create: {
            currency: "NGN",
          },
        },
      },
      include: {
        profile: true,
        roles: { include: { role: true } },
        wallet: true,
      },
    });

    // 5. Generate token
    const token = generateToken({
      userId: newUser.id.toString(),
      email: newUser.email,
      username: newUser.username,
      roles: newUser.roles.map((r) => r.role.name),
    });

    const response = apiSuccess(
      {
        user: {
          id: newUser.id.toString(),
          username: newUser.username,
          email: newUser.email,
          fullName: newUser.profile?.fullName,
          isWriter: newUser.profile?.isWriter,
          roles: newUser.roles.map((r) => r.role.name),
        },
        token,
      },
      "Account registered successfully",
      201
    );

    // Set secure HTTP-only cookie
    response.cookies.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error("Registration error:", error);
    return apiError(error.message || "Failed to register user", "INTERNAL_ERROR", 500);
  }
}
