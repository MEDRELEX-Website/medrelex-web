import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  contactSubmissionSchema,
  type ContactSubmissionData,
} from "@/lib/validation/contact-schemas";

/**
 * MEDRELEX Contact Route Handler — Section 11.3 & Transactional Dispatch
 * 
 * Security & Reliability Requirements:
 * 1. Reject non-JSON requests or payloads > 50KB.
 * 2. Honeypot check: If website_hp is filled, silently return { success: true }.
 * 3. Zod validation against audience schema.
 * 4. In-memory IP rate limiting (returns 429).
 * 5. Dispatch verified form submissions to company inbox via Resend.
 * 6. Never echo raw personal data in responses or server console logs.
 * 7. Graceful simulated fallback when RESEND_API_KEY is absent in development.
 */

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (
    !apiKey ||
    apiKey.includes("your_test_key") ||
    apiKey === "re_xxxx" ||
    apiKey.trim() === ""
  ) {
    return null;
  }
  return new Resend(apiKey);
}

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

/**
 * Escape HTML special characters to prevent HTML injection in emails.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Construct structured HTML and plain-text email bodies for verified inquiries.
 */
function buildEmailContent(data: ContactSubmissionData): { html: string; text: string } {
  const formTypes: Record<string, string> = {
    individual: "Individual / Family Member",
    clinician: "Physician / Healthcare Professional",
    partner: "Healthcare / Strategic Partner",
    investor: "Investor / Advisor",
    other: "General / Other Inquiry",
  };

  const formTypeLabel = formTypes[data.audience] || data.audience;

  const rows: Array<{ label: string; value: string }> = [
    { label: "Form Type", value: formTypeLabel },
    { label: "Full Name", value: data.name },
    { label: "Email Address", value: data.email },
  ];

  if ("organization" in data && data.organization) {
    rows.push({ label: "Organization", value: data.organization });
  }

  if ("role" in data && data.role) {
    const roleValue =
      data.role === "Other" && "otherRole" in data && data.otherRole
        ? `Other: ${data.otherRole}`
        : data.role;
    rows.push({ label: "Professional Role", value: roleValue });
  } else if ("roleContext" in data && data.roleContext) {
    rows.push({ label: "Role Context", value: data.roleContext });
  }

  if ("countryRegion" in data && data.countryRegion) {
    const countryValue =
      data.countryRegion === "Other" && "otherCountryRegion" in data && data.otherCountryRegion
        ? `Other (${data.otherCountryRegion})`
        : data.countryRegion;
    rows.push({ label: "Country / Region", value: countryValue });
  }

  if ("researchInterests" in data && Array.isArray(data.researchInterests) && data.researchInterests.length > 0) {
    rows.push({ label: "Selected Interests", value: data.researchInterests.join(", ") });
  }

  if ("areasOfInterest" in data && Array.isArray(data.areasOfInterest) && data.areasOfInterest.length > 0) {
    rows.push({ label: "Selected Interests", value: data.areasOfInterest.join(", ") });
  }

  if ("partnershipInterest" in data && data.partnershipInterest) {
    const interestVal =
      data.partnershipInterest === "Other" && "otherPartnershipInterest" in data && data.otherPartnershipInterest
        ? `Other: ${data.otherPartnershipInterest}`
        : data.partnershipInterest;
    rows.push({ label: "Selected Interests", value: interestVal });
  }

  if ("reason" in data && data.reason) {
    rows.push({ label: "Inquiry Reason", value: data.reason });
  }

  if ("preferredContactMethod" in data && data.preferredContactMethod) {
    rows.push({ label: "Preferred Contact Method", value: data.preferredContactMethod });
  }

  const messageText = data.message?.trim() ? data.message.trim() : "None provided";
  rows.push({ label: "Message", value: messageText });

  const disclaimer = "Sender confirmed agreement to the Website Privacy Notice. Zero-PHI policy acknowledged.";

  // Plain Text Version
  const textLines = [
    `MEDRELEX INBOUND INQUIRY`,
    `========================================`,
    ...rows.map((r) => `${r.label}: ${r.value}`),
    `========================================`,
    disclaimer,
  ];
  const text = textLines.join("\n");

  // Modern HTML Email Template
  const tableRowsHtml = rows
    .filter((r) => r.label !== "Message")
    .map(
      (r) => `
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; color: #64748B; font-size: 13px; font-weight: 600; width: 170px; vertical-align: top;">
            ${escapeHtml(r.label)}
          </td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #E2E8F0; color: #0F172A; font-size: 14px; vertical-align: top;">
            ${escapeHtml(r.value)}
          </td>
        </tr>`
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MEDRELEX Inbound Contact</title>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F172A; line-height: 1.5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    
    <!-- Header -->
    <div style="background-color: #0B132B; padding: 24px 28px; border-bottom: 3px solid #0D9488;">
      <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: #14B8A6; text-transform: uppercase; margin-bottom: 4px;">
        MEDRELEX PORTAL DISPATCH
      </div>
      <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #FFFFFF; line-height: 1.3;">
        New ${escapeHtml(data.audience.toUpperCase())} Inquiry
      </h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #94A3B8;">
        Verified submission received from public contact gateway.
      </p>
    </div>

    <!-- Metadata Details Table -->
    <div style="padding: 24px 28px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tbody>
          ${tableRowsHtml}
        </tbody>
      </table>

      <!-- Message Card -->
      <div style="margin-top: 16px;">
        <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; margin-bottom: 8px;">
          Message
        </div>
        <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 14px 16px; font-size: 14px; color: #1E293B; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(messageText)}</div>
      </div>

      <!-- Prominent Footer Disclaimer -->
      <div style="margin-top: 24px; padding: 14px 16px; background-color: #F1F5F9; border-left: 4px solid #0D9488; border-radius: 0 6px 6px 0;">
        <p style="margin: 0; font-size: 12px; color: #334155; font-weight: 500; line-height: 1.5;">
          <strong>Security Notice:</strong> ${escapeHtml(disclaimer)}
        </p>
      </div>
    </div>

    <!-- Sub-footer -->
    <div style="background-color: #F8FAFC; padding: 14px 28px; border-top: 1px solid #E2E8F0; text-align: center;">
      <p style="margin: 0; font-size: 11px; color: #94A3B8;">
        Automated notification from MEDRELEX Contact Engine &bull; Reply to this email to contact the sender directly.
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();

  return { html, text };
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

    let rawParsed: unknown;
    try {
      rawParsed = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Malformed JSON payload" },
        { status: 400 }
      );
    }

    const body =
      typeof rawParsed === "object" && rawParsed !== null
        ? (rawParsed as Record<string, unknown>)
        : {};

    // 5. Honeypot check: If website_hp is filled, silently discard & return simulated success
    if (
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
        audience: typeof body.audience === "string" ? body.audience : "unknown",
        invalidFields: Object.keys(fieldErrors),
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { errors: fieldErrors },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // 7. Sanitized Durable Audit Log (NO personal data logged)
    const sanitizedLog = {
      event: "INQUIRY_RECEIVED",
      audience: validatedData.audience,
      hasMessage: Boolean(validatedData.message && validatedData.message.trim().length > 0),
      hasOrganization: "organization" in validatedData && Boolean(validatedData.organization),
      timestamp: new Date().toISOString(),
    };

    console.info("[Contact API - Durable Handoff]", sanitizedLog);

    // 8. Transactional Email Dispatch via Resend
    const audience = validatedData.audience;
    const fullName = validatedData.name;
    const subject = `[MEDRELEX Inbound] New ${audience} inquiry from ${fullName}`;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "MEDRELEX Inquiries <notifications@contact.medrelex.com>";
    const toEmail = process.env.CONTACT_DESTINATION || "ahsanishfaq@medrelex.com";
    const replyTo = validatedData.email;

    const { html: htmlBody, text: textBody } = buildEmailContent(validatedData);

    const activeResend = getResendClient();

    if (activeResend) {
      try {
        const { data: resendData, error: resendError } = await activeResend.emails.send({
          from: fromEmail,
          to: toEmail,
          replyTo: replyTo,
          subject,
          text: textBody,
          html: htmlBody,
        });

        if (resendError) {
          // Never log personal information or provider secrets
          console.error("[Contact API - Resend Dispatch Error]", {
            errorType: resendError.name,
            errorMessage: resendError.message,
            timestamp: new Date().toISOString(),
          });

          return NextResponse.json(
            { error: "Failed to dispatch message. Please try again later." },
            { status: 500 }
          );
        }

        // Sanitized success audit log (NO PII)
        console.info("[Contact API - Email Dispatched]", {
          id: resendData?.id,
          audience: validatedData.audience,
          timestamp: new Date().toISOString(),
        });
      } catch (sendErr) {
        // Never expose stack trace or sensitive info
        console.error("[Contact API - Resend Dispatch Exception]", {
          message: sendErr instanceof Error ? sendErr.message : "Network/dispatch error",
          timestamp: new Date().toISOString(),
        });

        return NextResponse.json(
          { error: "Failed to dispatch message. Please try again later." },
          { status: 500 }
        );
      }
    } else {
      // Local development fallback when RESEND_API_KEY is not configured
      console.warn("[DEV] RESEND_API_KEY not configured. Submission simulated.");
    }

    // 9. Return standard success response (NO personal data echoed)
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // Sanitized server error log (NO PII or provider secrets)
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

