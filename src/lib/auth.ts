import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "pencrack_super_secure_jwt_secret_key_2026";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export interface TokenPayload {
  userId: string;
  email: string;
  username: string;
  roles: string[];
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getAuthUser(req: Request): Promise<TokenPayload | null> {
  // 1. Check Authorization header
  const authHeader = req.headers.get("authorization");
  let token: string | null = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  }

  // 2. Check cookies if header not present
  if (!token) {
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(/access_token=([^;]+)/);
      if (match) {
        token = match[1];
      }
    }
  }

  if (!token) return null;
  return verifyToken(token);
}

export async function getFullAuthUser(req: Request) {
  const tokenPayload = await getAuthUser(req);
  if (!tokenPayload) return null;

  const user = await prisma.user.findUnique({
    where: { id: BigInt(tokenPayload.userId) },
    include: {
      profile: true,
      roles: {
        include: { role: true },
      },
      wallet: true,
    },
  });

  return user;
}

export async function requireAdmin(req: Request): Promise<TokenPayload | null> {
  const tokenPayload = await getAuthUser(req);
  if (!tokenPayload) return null;

  const isAdmin = tokenPayload.roles.some((r) => ["admin", "super_admin"].includes(r.toLowerCase()));
  if (!isAdmin) return null;

  return tokenPayload;
}
