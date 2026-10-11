import { NextResponse } from "next/server";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

// Helper to serialize BigInts to string or number safely for JSON responses
export function serializeBigInt<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export function apiSuccess<T>(data: T, message?: string, status = 200) {
  const payload: ApiResponse<T> = {
    success: true,
    data: serializeBigInt(data),
  };
  if (message) payload.message = message;
  return NextResponse.json(payload, { status });
}

export function apiError(
  message: string,
  code = "BAD_REQUEST",
  status = 400,
  details?: any
) {
  const payload: ApiResponse = {
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  };
  return NextResponse.json(payload, { status });
}

export function apiUnauthorized(message = "You must be logged in to access this resource.") {
  return apiError(message, "UNAUTHORIZED", 401);
}

export function apiForbidden(message = "You do not have permission to perform this action.") {
  return apiError(message, "FORBIDDEN", 403);
}

export function apiNotFound(message = "Resource not found.") {
  return apiError(message, "NOT_FOUND", 404);
}

// Aliases for developer convenience
export const successResponse = apiSuccess;
export const errorResponse = apiError;
export const unauthorizedResponse = apiUnauthorized;
export const forbiddenResponse = apiForbidden;
export const notFoundResponse = apiNotFound;
