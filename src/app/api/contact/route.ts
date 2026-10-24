import { NextRequest, NextResponse } from "next/server";
import { contactSubmissionSchema } from "@/lib/validation/contact-schemas";

/**
 * MEDRELEX Contact Route Handler — Section 11.3
 * 
 * Security & Reliability Requirements:
 * 1. Reject non-JSON requests or payloads > 50KB.
 * 2. Honeypot check: If website_hp is filled, silently return { success: true }.
 * 3. Zod validation against audience schema.
 * 4. In-memory IP rate limiting (returns 429).
 * 5. Mock durable handoff: Log sanitized event (NO personal data in logs).
 * 6. Never echo raw personal data in responses or error logs.
 */

const MAX_PAYLOAD_BYTES = 50 * 1024; // 50KB limit
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per IP per minute

// Simple in-memory rate limiting cache
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up older records periodically to prevent memory leak
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.resetTime < now) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || record.resetTime < now) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Content-Type verification
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 415 }
      );
    }

    // 2. Content-Length header pre-check
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { error: "Payload exceeds 50KB limit" },
        { status: 413 }
      );
    }

    // 3. Extract client IP and evaluate rate limits
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : realIp || "127.0.0.1";

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    // 4. Read body with byte size check
    const rawBody = await req.text();
    if (new TextEncoder().encode(rawBody).length > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { error: "Payload exceeds 50KB limit" },
        { status: 413 }
      );
    }

    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Malformed JSON payload" },
        { status: 400 }
      );
    }

    // 5. Honeypot check: If website_hp is filled, silently discard & return simulated success
    if (
      body.website_hp &&
      typeof body.website_hp === "string" &&
      body.website_hp.trim().length > 0
    ) {
      // Spam detected — log sanitized warning (NO PII) and return 200 to confuse bot
      console.warn(
        `[Contact API - Security] Honeypot triggered from IP hash: ${clientIp.slice(0, 4)}... (Silently absorbed)`
      );
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 6. Validate payload against Zod schema
    const validationResult = contactSubmissionSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validationResult.error.issues) {
        const fieldKey = issue.path[0]?.toString() || "form";
        if (!fieldErrors[fieldKey]) {
          fieldErrors[fieldKey] = issue.message;
        }
      }

      // Never log raw PII. Only log error field keys and audience type.
      console.warn("[Contact API - Validation Error]", {
        audience: body?.audience || "unknown",
        invalidFields: Object.keys(fieldErrors),
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { errors: fieldErrors },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // 7. Mock Durable Handoff (CRM / Dispatch / Queue)
    // CRITICAL: NEVER log raw submitted personal data (names, emails, messages)
    const sanitizedLog = {
      event: "INQUIRY_RECEIVED",
      audience: validatedData.audience,
      hasMessage: Boolean(validatedData.message && validatedData.message.trim().length > 0),
      hasOrganization: "organization" in validatedData && Boolean(validatedData.organization),
      timestamp: new Date().toISOString(),
    };

    console.info("[Contact API - Durable Handoff]", sanitizedLog);

    // Simulated asynchronous durable write (e.g. database, SQS, webhook dispatch)
    await new Promise((resolve) => setTimeout(resolve, 80));

    // 8. Return standard success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // Sanitized server error log
    console.error("[Contact API - Internal Error]", {
      message: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
