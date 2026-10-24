import { z } from "zod";

/**
 * MEDRELEX Contact Schemas — Section 7 & Section 11.3
 * Multi-audience qualification and contact schemas.
 * 
 * Rules:
 * - Trim whitespace on all string inputs
 * - Reject ASCII control characters
 * - Enforce strict max lengths
 * - Mandatory consent checkbox
 * - Hidden honeypot field
 */

export const AUDIENCE_TYPES = [
  "individual",
  "clinician",
  "partner",
  "investor",
  "other",
] as const;

export type AudienceType = (typeof AUDIENCE_TYPES)[number];

export const COUNTRY_REGIONS = [
  "US",
  "CA",
  "UK",
  "Other",
  "Prefer not to say",
] as const;

export type CountryRegionType = (typeof COUNTRY_REGIONS)[number];

// Helper: reject control characters (ASCII < 32 except tab \t, newline \n, carriage return \r)
export const containsControlCharacters = (val: string): boolean => {
  return /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(val);
};

// Base sanitizers and primitives
const cleanString = (max: number, min = 0) =>
  z
    .string()
    .trim()
    .max(max, `Must not exceed ${max} characters`)
    .refine((val) => !containsControlCharacters(val), {
      message: "Input contains invalid or control characters",
    });

const requiredString = (min: number, max: number, fieldName: string) =>
  cleanString(max, min).refine((val) => val.length >= min, {
    message: `${fieldName} is required (minimum ${min} characters)`,
  });

const emailSchema = cleanString(254, 5)
  .email("Please provide a valid email address")
  .refine((val) => val.length >= 5, {
    message: "Email is required",
  });

const consentSchema = z.literal(true, {
  message: "You must agree to the Website Privacy Notice terms to proceed",
});

const honeypotSchema = z.string().max(0, "Bot detected").optional().or(z.literal(""));

// ── Form A: Individual / Family Member ─────────────────────────────────────
export const individualSchema = z
  .object({
    audience: z.literal("individual"),
    name: requiredString(2, 100, "Full name"),
    email: emailSchema,
    countryRegion: z.enum(COUNTRY_REGIONS, {
      message: "Please select your country or region",
    }),
    otherCountryRegion: cleanString(80).optional(),
    roleContext: cleanString(100).optional(),
    preferredContactMethod: z.literal("Email only").default("Email only"),
    researchInterests: z.array(z.string()).default([]),
    message: cleanString(800).optional(),
    consent: consentSchema,
    website_hp: honeypotSchema,
  })
  .refine(
    (data) => {
      if (data.countryRegion === "Other") {
        return (
          typeof data.otherCountryRegion === "string" &&
          data.otherCountryRegion.trim().length >= 2
        );
      }
      return true;
    },
    {
      message: "Please specify your country or region (at least 2 characters)",
      path: ["otherCountryRegion"],
    }
  );

export type IndividualFormData = z.infer<typeof individualSchema>;

// ── Form B: Physician / Healthcare Professional ───────────────────────────
export const CLINICIAN_ROLES = [
  "Primary Care Physician",
  "Specialist Physician",
  "Hospitalist / Inpatient Physician",
  "Nurse Practitioner / Advanced Practice RN",
  "Physician Assistant",
  "Clinical Researcher / Academic",
  "Chief Medical Officer / Clinical Leadership",
  "Other",
] as const;

export const clinicianSchema = z
  .object({
    audience: z.literal("clinician"),
    name: requiredString(2, 100, "Full name"),
    role: z.string().min(1, "Please select your professional role"),
    otherRole: cleanString(80).optional(),
    organization: cleanString(120).optional(),
    email: emailSchema,
    countryRegion: z.enum(COUNTRY_REGIONS, {
      message: "Please select your country or region",
    }),
    otherCountryRegion: cleanString(80).optional(),
    areasOfInterest: z
      .array(z.string())
      .min(1, "Please select at least one area of clinical interest"),
    message: cleanString(1000).optional(),
    consent: consentSchema,
    website_hp: honeypotSchema,
  })
  .refine(
    (data) => {
      if (data.role === "Other") {
        return (
          typeof data.otherRole === "string" &&
          data.otherRole.trim().length >= 2
        );
      }
      return true;
    },
    {
      message: "Please specify your professional role",
      path: ["otherRole"],
    }
  )
  .refine(
    (data) => {
      if (data.countryRegion === "Other") {
        return (
          typeof data.otherCountryRegion === "string" &&
          data.otherCountryRegion.trim().length >= 2
        );
      }
      return true;
    },
    {
      message: "Please specify your country or region (at least 2 characters)",
      path: ["otherCountryRegion"],
    }
  );

export type ClinicianFormData = z.infer<typeof clinicianSchema>;

// ── Form C: Healthcare / Strategic Partner ─────────────────────────────────
export const PARTNER_INTERESTS = [
  "Health System / Clinical Site Pilot",
  "EHR / Health Tech Interoperability",
  "Academic & Clinical Research Collaboration",
  "Diagnostic / Wearable Device Integration",
  "Other",
] as const;

export const partnerSchema = z
  .object({
    audience: z.literal("partner"),
    name: requiredString(2, 100, "Full name"),
    organization: requiredString(2, 140, "Organization"),
    role: requiredString(2, 100, "Role / Title"),
    email: emailSchema,
    countryRegion: z.enum(COUNTRY_REGIONS, {
      message: "Please select your country or region",
    }),
    otherCountryRegion: cleanString(80).optional(),
    partnershipInterest: z
      .string()
      .min(1, "Please select your partnership interest"),
    otherPartnershipInterest: cleanString(100).optional(),
    message: cleanString(1000).optional(),
    consent: consentSchema,
    website_hp: honeypotSchema,
  })
  .refine(
    (data) => {
      if (data.partnershipInterest === "Other") {
        return (
          typeof data.otherPartnershipInterest === "string" &&
          data.otherPartnershipInterest.trim().length >= 2
        );
      }
      return true;
    },
    {
      message: "Please specify your partnership area of interest",
      path: ["otherPartnershipInterest"],
    }
  )
  .refine(
    (data) => {
      if (data.countryRegion === "Other") {
        return (
          typeof data.otherCountryRegion === "string" &&
          data.otherCountryRegion.trim().length >= 2
        );
      }
      return true;
    },
    {
      message: "Please specify your country or region (at least 2 characters)",
      path: ["otherCountryRegion"],
    }
  );

export type PartnerFormData = z.infer<typeof partnerSchema>;

// ── Form D: Investor / Advisor ─────────────────────────────────────────────
export const INVESTOR_ROLES = [
  "Venture Capital Partner / Associate",
  "Angel / Private Investor",
  "Healthcare / Strategic Corporate Fund",
  "Clinical Advisor",
  "Technical / AI Infrastructure Advisor",
  "Other",
] as const;

export const investorSchema = z
  .object({
    audience: z.literal("investor"),
    name: requiredString(2, 100, "Full name"),
    organization: cleanString(140).optional(),
    role: cleanString(100).optional(),
    email: emailSchema,
    countryRegion: z.enum(COUNTRY_REGIONS, {
      message: "Please select your country or region",
    }),
    otherCountryRegion: cleanString(80).optional(),
    areasOfInterest: z
      .array(z.string())
      .min(1, "Please select at least one area of interest"),
    message: cleanString(1000).optional(),
    consent: consentSchema,
    website_hp: honeypotSchema,
  })
  .refine(
    (data) => {
      if (data.countryRegion === "Other") {
        return (
          typeof data.otherCountryRegion === "string" &&
          data.otherCountryRegion.trim().length >= 2
        );
      }
      return true;
    },
    {
      message: "Please specify your country or region (at least 2 characters)",
      path: ["otherCountryRegion"],
    }
  );

export type InvestorFormData = z.infer<typeof investorSchema>;

// ── Form E: Other Inquiry ──────────────────────────────────────────────────
export const OTHER_REASONS = [
  "General Inquiry",
  "Media & Press",
  "Privacy & Data Governance",
  "Website Feedback",
  "Other",
] as const;

export type OtherReasonType = (typeof OTHER_REASONS)[number];

export const otherSchema = z.object({
  audience: z.literal("other"),
  name: requiredString(2, 100, "Full name"),
  email: emailSchema,
  reason: z.enum(OTHER_REASONS, {
    message: "Please select a reason for your inquiry",
  }),
  message: cleanString(800, 20).refine((val) => val.length >= 20, {
    message: "Message must be at least 20 characters",
  }),
  consent: consentSchema,
  website_hp: honeypotSchema,
});

export type OtherFormData = z.infer<typeof otherSchema>;

// Master union schema
export const contactSubmissionSchema = z.discriminatedUnion("audience", [
  individualSchema,
  clinicianSchema,
  partnerSchema,
  investorSchema,
  otherSchema,
]);

export type ContactSubmissionData = z.infer<typeof contactSubmissionSchema>;
