export const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Pencrack API Documentation",
    version: "1.0.0",
    description:
      "Official REST API documentation for the Pencrack literature publishing platform, writing services marketplace, and financial ledger.",
    contact: {
      name: "Pencrack Engineering",
      email: "hello@pencrack.com",
    },
  },
  servers: [
    {
      url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      description: "Current Server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter your JWT Bearer token to test protected routes.",
      },
    },
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          error: {
            type: "object",
            properties: {
              code: { type: "string", example: "VALIDATION_ERROR" },
              message: { type: "string", example: "Invalid email format" },
            },
          },
        },
      },
      RegisterRequest: {
        type: "object",
        required: ["fullName", "username", "email", "password"],
        properties: {
          fullName: { type: "string", example: "Adaeze Nwosu" },
          username: { type: "string", example: "adaeze.writes" },
          email: { type: "string", example: "adaeze@example.com" },
          password: { type: "string", example: "SecurePass123!" },
          country: { type: "string", example: "Nigeria" },
          phone: { type: "string", example: "+2348123456789" },
          isWriter: { type: "boolean", example: true },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["login", "password"],
        properties: {
          login: { type: "string", example: "adaeze@example.com", description: "Email or username" },
          password: { type: "string", example: "SecurePass123!" },
        },
      },
      CreateContentRequest: {
        type: "object",
        required: ["type", "title", "bodyContent"],
        properties: {
          type: { type: "string", enum: ["BLOG", "STORY", "POEM", "COMIC"], example: "STORY" },
          title: { type: "string", example: "The Harmattan Letters" },
          excerpt: { type: "string", example: "A love written entirely on paper..." },
          bodyContent: { type: "string", example: "The first letter arrived with the dry wind..." },
          categorySlug: { type: "string", example: "romance" },
          coverImageUrl: { type: "string", example: "https://images.unsplash.com/photo-1455390582262-044cdead277a" },
          readTime: { type: "string", example: "8 min" },
          status: { type: "string", enum: ["DRAFT", "PUBLISHED"], example: "PUBLISHED" },
        },
      },
      ServiceRequestSubmission: {
        type: "object",
        required: ["serviceId", "customerName", "customerEmail"],
        properties: {
          serviceId: { type: "integer", example: 1 },
          customerName: { type: "string", example: "John Doe" },
          customerEmail: { type: "string", example: "john@acme.com" },
          customerPhone: { type: "string", example: "+2348011223344" },
          budgetEstimate: { type: "string", example: "₦50,000" },
          deadlineDate: { type: "string", format: "date", example: "2026-11-15" },
          fields: {
            type: "array",
            items: {
              type: "object",
              properties: {
                fieldName: { type: "string", example: "Word Count" },
                fieldValue: { type: "string", example: "5,000 words" },
              },
            },
          },
        },
      },
      GiftInitRequest: {
        type: "object",
        required: ["recipientWriterId", "amount"],
        properties: {
          recipientWriterId: { type: "string", example: "1" },
          amount: { type: "number", example: 1000, description: "Amount in NGN" },
          message: { type: "string", example: "Thank you for the inspiring story!" },
        },
      },
      WithdrawalRequest: {
        type: "object",
        required: ["amount", "bankName", "accountNumber", "accountName"],
        properties: {
          amount: { type: "number", example: 25000 },
          bankName: { type: "string", example: "Access Bank" },
          accountNumber: { type: "string", example: "0123456789" },
          accountName: { type: "string", example: "Adaeze Nwosu" },
        },
      },
    },
  },
  paths: {
    "/api/v1/auth/register": {
      post: {
        tags: ["Authentication"],
        summary: "Register a new user account (Reader or Writer)",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/RegisterRequest" } } },
        },
        responses: {
          201: { description: "Account created successfully" },
          400: { description: "Validation error or email/username already taken" },
        },
      },
    },
    "/api/v1/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Log in with email or username and password",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/LoginRequest" } } },
        },
        responses: {
          200: { description: "Login successful, returns JWT access token and user profile" },
          401: { description: "Invalid credentials" },
        },
      },
    },
    "/api/v1/auth/me": {
      get: {
        tags: ["Authentication"],
        summary: "Get current authenticated user profile, roles, and wallet",
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: "User details" },
          401: { description: "Unauthenticated" },
        },
      },
    },
    "/api/v1/auth/logout": {
      post: {
        tags: ["Authentication"],
        summary: "Log out and invalidate session cookie",
        responses: {
          200: { description: "Logged out successfully" },
        },
      },
    },
    "/api/v1/content": {
      get: {
        tags: ["Content & Publishing"],
        summary: "List published blogs, stories, poems, or comics",
        parameters: [
          { name: "type", in: "query", schema: { type: "string", enum: ["BLOG", "STORY", "POEM", "COMIC"] } },
          { name: "category", in: "query", schema: { type: "string" } },
          { name: "search", in: "query", schema: { type: "string" } },
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 12 } },
        ],
        responses: {
          200: { description: "List of content previews" },
        },
      },
      post: {
        tags: ["Content & Publishing"],
        summary: "Create a new blog, story, poem, or comic (Requires Writer account)",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/CreateContentRequest" } } },
        },
        responses: {
          201: { description: "Content draft or publication created" },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/api/v1/content/{slug}": {
      get: {
        tags: ["Content & Publishing"],
        summary: "Read full published content item (Protected: PRD Rule: Must be logged in to read)",
        security: [{ BearerAuth: [] }],
        parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Full content including body/verse text" },
          401: { description: "You must be logged in to read this content" },
          404: { description: "Content not found" },
        },
      },
    },
    "/api/v1/content/{id}/like": {
      post: {
        tags: ["Social Interactions"],
        summary: "Toggle like for a content item",
        security: [{ BearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Liked or unliked successfully" },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/api/v1/content/{id}/comments": {
      get: {
        tags: ["Social Interactions"],
        summary: "List comments and replies for a content item",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "List of comments" } },
      },
      post: {
        tags: ["Social Interactions"],
        summary: "Post a comment or reply",
        security: [{ BearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["commentText"],
                properties: {
                  commentText: { type: "string", example: "Stunning piece of writing!" },
                  parentCommentId: { type: "string", nullable: true },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Comment posted" },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/api/v1/services": {
      get: {
        tags: ["Writing Services"],
        summary: "List all 16 professional writing services (Public - No login required)",
        responses: {
          200: { description: "List of Creative & Commercial and Academic & Research services" },
        },
      },
    },
    "/api/v1/services/{slug}": {
      get: {
        tags: ["Writing Services"],
        summary: "Get specific service details and dynamic form fields schema",
        parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Service details with custom form fields" },
          404: { description: "Service not found" },
        },
      },
    },
    "/api/v1/service-requests": {
      post: {
        tags: ["Writing Services"],
        summary: "Submit a service request / project brief (Public - Guests can submit)",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/ServiceRequestSubmission" } } },
        },
        responses: {
          201: { description: "Request saved with unique reference code (PC-SRV-...)" },
          400: { description: "Invalid submission" },
        },
      },
    },
    "/api/v1/service-requests/{ref}": {
      get: {
        tags: ["Writing Services"],
        summary: "Track service request status by reference code",
        parameters: [{ name: "ref", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Service request status, quote, and submission summary" },
          404: { description: "Reference not found" },
        },
      },
    },
    "/api/v1/gifts/initialize": {
      post: {
        tags: ["Payments & Gifting"],
        summary: "Initialize a Paystack/Flutterwave gifting session for a writer",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/GiftInitRequest" } } },
        },
        responses: {
          200: { description: "Returns payment reference and authorization checkout URL" },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/api/v1/payments/webhook": {
      post: {
        tags: ["Payments & Gifting"],
        summary: "Paystack/Flutterwave webhook listener (Server-side verification, idempotent ledger entry)",
        responses: {
          200: { description: "Webhook verified and processed" },
          400: { description: "Invalid signature or payload" },
        },
      },
    },
    "/api/v1/wallet/me": {
      get: {
        tags: ["Writer Wallet & Ledger"],
        summary: "Get writer wallet balance and earnings stats",
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: "Wallet balance (available, pending, total earned, total withdrawn)" },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/api/v1/wallet/me/ledger": {
      get: {
        tags: ["Writer Wallet & Ledger"],
        summary: "Get writer immutable double-entry ledger history",
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: "List of immutable credit and debit entries" },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/api/v1/wallet/withdraw": {
      post: {
        tags: ["Writer Wallet & Ledger"],
        summary: "Request withdrawal to a Nigerian bank account",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/WithdrawalRequest" } } },
        },
        responses: {
          201: { description: "Withdrawal request submitted for admin approval" },
          400: { description: "Insufficient available balance" },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/api/v1/admin/dashboard": {
      get: {
        tags: ["Admin Operations"],
        summary: "Get overview statistics (Users, content, requests, revenue, platform fees, withdrawals)",
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: "Overview stats" },
          403: { description: "Requires Admin Role" },
        },
      },
    },
    "/api/v1/admin/service-requests": {
      get: {
        tags: ["Admin Operations"],
        summary: "List all service requests with custom fields and customer details",
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: "Full list of requests" },
          403: { description: "Forbidden" },
        },
      },
    },
    "/api/v1/admin/service-requests/{id}": {
      get: {
        tags: ["Admin Operations"],
        summary: "Get full details of a specific service request including custom dynamic fields, files, quotes, notes",
        security: [{ BearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Detailed service request object" },
          404: { description: "Not found" },
        },
      },
      patch: {
        tags: ["Admin Operations"],
        summary: "Update request status, assign staff/writer, generate quote, or attach admin note",
        security: [{ BearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Updated service request" },
          400: { description: "Invalid parameters" },
        },
      },
    },
    "/api/v1/admin/content": {
      get: {
        tags: ["Admin Operations"],
        summary: "List all content items across platform for moderation",
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: "status", in: "query", schema: { type: "string" } },
          { name: "type", in: "query", schema: { type: "string" } },
        ],
        responses: {
          200: { description: "List of content items" },
          403: { description: "Forbidden" },
        },
      },
    },
    "/api/v1/admin/content/{id}": {
      patch: {
        tags: ["Admin Operations"],
        summary: "Moderate content (PUBLISHED, REJECTED, FLAGGED), or toggle featured",
        security: [{ BearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Updated content status" },
          404: { description: "Content not found" },
        },
      },
    },
    "/api/v1/admin/users": {
      get: {
        tags: ["Admin Operations"],
        summary: "List users with role filtering, status, and wallet metrics",
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: "search", in: "query", schema: { type: "string" } },
          { name: "role", in: "query", schema: { type: "string" } },
        ],
        responses: {
          200: { description: "User listing" },
          403: { description: "Forbidden" },
        },
      },
    },
  },
};

