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
  partnerSchema,
  PARTNER_INTERESTS,
  COUNTRY_REGIONS,
} from "@/lib/validation/contact-schemas";

interface FormProps {
  onSuccess: () => void;
  onDirtyChange: (isDirty: boolean) => void;
}

export default function PartnerForm({
  onSuccess,
  onDirtyChange,
}: FormProps) {
  const [formData, setFormData] = useState({
    audience: "partner" as const,
    name: "",
    organization: "",
    role: "",
    email: "",
    countryRegion: "US",
    otherCountryRegion: "",
    partnershipInterest: PARTNER_INTERESTS[0] as string,
    otherPartnershipInterest: "",
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
        formData.otherPartnershipInterest.trim()
    );
    onDirtyChange(isDirty);
  }, [formData, onDirtyChange]);

  const fieldIdMap: Record<string, string> = {
    name: "field-partner-name",
    organization: "field-partner-organization",
    role: "field-partner-role",
    email: "field-partner-email",
    countryRegion: "field-partner-countryRegion",
    otherCountryRegion: "field-partner-otherCountryRegion",
    partnershipInterest: "field-partner-partnershipInterest",
    otherPartnershipInterest: "field-partner-otherPartnershipInterest",
    message: "field-partner-message",
    consent: "field-partner-consent",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

    const result = partnerSchema.safeParse(formData);
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
      title="Healthcare or Strategic Partner Inquiry"
      subtitle="Explore institutional alignment, clinical site research, and infrastructure interoperability"
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
            placeholder="e.g. Jordan Hayes"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </FormField>

        <FormField
          id={fieldIdMap.email}
          label="Work Email Address"
          required
          helperText="Please use your institutional or corporate email address."
          error={errors.email}
        >
          <TextInput
            type="email"
            required
            autoComplete="email"
            placeholder="jordan.hayes@healthpartner.com"
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
          label="Organization / Health System"
          required
          helperText="Hospital network, research institution, health tech firm, etc."
          error={errors.organization}
        >
          <TextInput
            type="text"
            required
            placeholder="e.g. Metro Health Network"
            value={formData.organization}
            onChange={(e) =>
              setFormData({ ...formData, organization: e.target.value })
            }
          />
        </FormField>

        <FormField
          id={fieldIdMap.role}
          label="Role / Title"
          required
          error={errors.role}
        >
          <TextInput
            type="text"
            required
            placeholder="e.g. VP of Partnerships"
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

        <FormField
          id={fieldIdMap.partnershipInterest}
          label="Partnership Interest"
          required
          error={errors.partnershipInterest}
        >
          <Select
            value={formData.partnershipInterest}
            onChange={(e) =>
              setFormData({
                ...formData,
                partnershipInterest: e.target.value,
              })
            }
          >
            {PARTNER_INTERESTS.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      {formData.countryRegion === "Other" && (
        <FormField
          id={fieldIdMap.otherCountryRegion}
          label="Specify Country / Region"
          required
          error={errors.otherCountryRegion}
        >
          <TextInput
            type="text"
            placeholder="e.g. Singapore, Netherlands"
            value={formData.otherCountryRegion}
            onChange={(e) =>
              setFormData({ ...formData, otherCountryRegion: e.target.value })
            }
          />
        </FormField>
      )}

      {formData.partnershipInterest === "Other" && (
        <FormField
          id={fieldIdMap.otherPartnershipInterest}
          label="Specify Partnership Interest"
          required
          error={errors.otherPartnershipInterest}
        >
          <TextInput
            type="text"
            placeholder="Describe your strategic collaboration interest"
            value={formData.otherPartnershipInterest}
            onChange={(e) =>
              setFormData({
                ...formData,
                otherPartnershipInterest: e.target.value,
              })
            }
          />
        </FormField>
      )}

      {/* Message textarea with character counter */}
      <FormField
        id={fieldIdMap.message}
        label="Message / Partnership Vision"
        helperText="Briefly outline your organization's objectives or timeline for partnership discussions."
        error={errors.message}
        counter={{ current: formData.message.length, max: 1000 }}
      >
        <TextArea
          rows={4}
          maxLength={1000}
          placeholder="Share your goals regarding longitudinal context, data governance, or pilot collaboration..."
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
              <span>Submit Partnership Inquiry</span>
            </>
          )}
        </button>
      </div>
    </ContactFormShell>
  );
}
