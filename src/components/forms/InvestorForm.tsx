"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Send, Loader2 } from "lucide-react";
import ContactFormShell from "./ContactFormShell";
import {
  FormField,
  TextInput,
  TextArea,
  Select,
  Checkbox,
  HoneypotField,
} from "./FormControls";
import {
  investorSchema,
  INVESTOR_ROLES,
  COUNTRY_REGIONS,
} from "@/lib/validation/contact-schemas";

const INVESTOR_AREAS_OF_INTEREST = [
  "Platform thesis and technical roadmap",
  "Clinical validation and research milestones",
  "Financing rounds and capital strategy",
  "Advisory council or governance",
  "Other",
];

interface FormProps {
  onSuccess: () => void;
  onDirtyChange: (isDirty: boolean) => void;
}

export default function InvestorForm({
  onSuccess,
  onDirtyChange,
}: FormProps) {
  const [formData, setFormData] = useState({
    audience: "investor" as const,
    name: "",
    organization: "",
    role: "",
    email: "",
    countryRegion: "US",
    otherCountryRegion: "",
    areasOfInterest: [] as string[],
    message: "",
    consent: false,
    website_hp: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    const isDirty = Boolean(
      formData.name.trim() ||
        formData.organization.trim() ||
        formData.role.trim() ||
        formData.email.trim() ||
        formData.message.trim() ||
        formData.areasOfInterest.length > 0
    );
    onDirtyChange(isDirty);
  }, [formData, onDirtyChange]);

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.areasOfInterest.includes(interest);
      return {
        ...prev,
        areasOfInterest: exists
          ? prev.areasOfInterest.filter((i) => i !== interest)
          : [...prev.areasOfInterest, interest],
      };
    });
  };

  const fieldIdMap: Record<string, string> = {
    name: "field-investor-name",
    organization: "field-investor-organization",
    role: "field-investor-role",
    email: "field-investor-email",
    countryRegion: "field-investor-countryRegion",
    otherCountryRegion: "field-investor-otherCountryRegion",
    areasOfInterest: "field-investor-areasOfInterest",
    message: "field-investor-message",
    consent: "field-investor-consent",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

    const result = investorSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const pathKey = issue.path[0] as string;
        if (!formattedErrors[pathKey]) {
          formattedErrors[pathKey] = issue.message;
        }
      });
      setErrors(formattedErrors);
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 429) {
          setGeneralError(
            data.error || "Too many requests. Please wait a moment before trying again."
          );
        } else if (data.errors) {
          setErrors(data.errors);
        } else {
          setGeneralError(
            data.error || "An error occurred while submitting. Please try again."
          );
        }
        setSubmitting(false);
        return;
      }

      onSuccess();
    } catch {
      setGeneralError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  return (
    <ContactFormShell
      title="Investor or Advisor Inquiry"
      subtitle="Discuss the platform thesis, research milestones, validation roadmap, and governance"
      submitting={submitting}
      errors={errors}
      fieldIdMap={fieldIdMap}
      generalError={generalError}
      onSubmit={handleSubmit}
    >
      <HoneypotField
        value={formData.website_hp}
        onChange={(e) =>
          setFormData({ ...formData, website_hp: e.target.value })
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          id={fieldIdMap.name}
          label="Full Name"
          required
          error={errors.name}
        >
          <TextInput
            type="text"
            required
            autoComplete="name"
            placeholder="e.g. Elena Rostova"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </FormField>

        <FormField
          id={fieldIdMap.email}
          label="Email Address"
          required
          helperText="We will use this address for investor and advisor communications."
          error={errors.email}
        >
          <TextInput
            type="email"
            required
            autoComplete="email"
            placeholder="elena@venturefund.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          id={fieldIdMap.organization}
          label="Firm / Entity (Optional)"
          helperText="Fund, angel syndicate, family office, or advisory affiliation."
          error={errors.organization}
        >
          <TextInput
            type="text"
            placeholder="e.g. Apex Health Ventures"
            value={formData.organization}
            onChange={(e) =>
              setFormData({ ...formData, organization: e.target.value })
            }
          />
        </FormField>

        <FormField
          id={fieldIdMap.role}
          label="Role / Title"
          helperText="e.g. Managing Partner, Angel, Clinical Advisor."
          error={errors.role}
        >
          <TextInput
            type="text"
            placeholder="e.g. General Partner, Advisor"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          id={fieldIdMap.countryRegion}
          label="Country / Region"
          required
          error={errors.countryRegion}
        >
          <Select
            value={formData.countryRegion}
            onChange={(e) =>
              setFormData({ ...formData, countryRegion: e.target.value })
            }
          >
            {COUNTRY_REGIONS.map((region) => (
              <option key={region} value={region}>
                {region === "US"
                  ? "United States"
                  : region === "CA"
                  ? "Canada"
                  : region === "UK"
                  ? "United Kingdom"
                  : region}
              </option>
            ))}
          </Select>
        </FormField>

        {formData.countryRegion === "Other" && (
          <FormField
            id={fieldIdMap.otherCountryRegion}
            label="Specify Country / Region"
            required
            error={errors.otherCountryRegion}
          >
            <TextInput
              type="text"
              placeholder="e.g. Switzerland, Japan"
              value={formData.otherCountryRegion}
              onChange={(e) =>
                setFormData({ ...formData, otherCountryRegion: e.target.value })
              }
            />
          </FormField>
        )}
      </div>

      {/* Areas of interest - at least 1 required */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <label
            id="investor-interests-label"
            className="block text-xs font-semibold uppercase tracking-wider text-[#0A192F] font-mono"
          >
            Areas of Interest <span className="text-[#36978F]">*</span>
          </label>
          <span className="text-xs text-[#64748B]">Select at least 1</span>
        </div>
        <div
          role="group"
          aria-labelledby="investor-interests-label"
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1"
        >
          {INVESTOR_AREAS_OF_INTEREST.map((interest, idx) => (
            <Checkbox
              key={interest}
              id={`investor-interest-${idx}`}
              checked={formData.areasOfInterest.includes(interest)}
              onChange={() => handleInterestToggle(interest)}
              label={interest}
              hasError={!!errors.areasOfInterest}
            />
          ))}
        </div>
        {errors.areasOfInterest && (
          <p
            id={fieldIdMap.areasOfInterest}
            className="text-xs font-medium text-red-600 mt-1"
          >
            {errors.areasOfInterest}
          </p>
        )}
      </div>

      {/* Message textarea with character counter */}
      <FormField
        id={fieldIdMap.message}
        label="Message or Discussion Points"
        helperText="Outline your investment thesis alignment or advisory background."
        error={errors.message}
        counter={{ current: formData.message.length, max: 1000 }}
      >
        <TextArea
          rows={4}
          maxLength={1000}
          placeholder="Share your perspective on the longitudinal health intelligence market and what you would like to discuss..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
      </FormField>

      {/* Mandatory Consent Checkbox */}
      <div className="pt-2">
        <Checkbox
          id={fieldIdMap.consent}
          required
          checked={formData.consent}
          hasError={!!errors.consent}
          onChange={(e) =>
            setFormData({ ...formData, consent: e.target.checked })
          }
          label={
            <span>
              I agree that MEDRELEX may use the information I submit to review
              and respond to this inquiry, as described in the{" "}
              <Link
                href="/privacy-notice"
                className="text-[#36978F] underline hover:text-[#0A192F] focus:outline-none focus:ring-1 focus:ring-[#36978F]"
                target="_blank"
                rel="noreferrer"
              >
                Website Privacy Notice
              </Link>
              .
            </span>
          }
        />
        {errors.consent && (
          <p className="text-xs font-medium text-red-600 mt-1 pl-7">
            {errors.consent}
          </p>
        )}
      </div>

      {/* Submission CTA */}
      <div className="pt-4 border-t border-[#D7E0EA] flex items-center justify-between">
        <p className="text-[11px] text-[#64748B]">
          * Mandatory fields
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#0A192F] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D] active:scale-[0.98] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#36978F]"
        >
          {submitting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              <span>Submit Investor Inquiry</span>
            </>
          )}
        </button>
      </div>
    </ContactFormShell>
  );
}
