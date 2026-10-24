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
  individualSchema,
  COUNTRY_REGIONS,
  type IndividualFormData,
} from "@/lib/validation/contact-schemas";

const RESEARCH_INTEREST_OPTIONS = [
  "Timeline view of multi-source health records",
  "Connecting wearable data with symptoms and notes",
  "Preparing questions for doctor consultations",
  "Family and caregiver record navigation",
  "Participating in future research interviews",
];

interface FormProps {
  onSuccess: () => void;
  onDirtyChange: (isDirty: boolean) => void;
}

export default function IndividualForm({
  onSuccess,
  onDirtyChange,
}: FormProps) {
  const [formData, setFormData] = useState({
    audience: "individual" as const,
    name: "",
    email: "",
    countryRegion: "US",
    otherCountryRegion: "",
    roleContext: "",
    preferredContactMethod: "Email only" as const,
    researchInterests: [] as string[],
    message: "",
    consent: false,
    website_hp: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Mark form as dirty if user has typed anything
  useEffect(() => {
    const isDirty = Boolean(
      formData.name.trim() ||
        formData.email.trim() ||
        formData.message.trim() ||
        formData.otherCountryRegion.trim() ||
        formData.roleContext.trim() ||
        formData.researchInterests.length > 0
    );
    onDirtyChange(isDirty);
  }, [formData, onDirtyChange]);

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.researchInterests.includes(interest);
      return {
        ...prev,
        researchInterests: exists
          ? prev.researchInterests.filter((i) => i !== interest)
          : [...prev.researchInterests, interest],
      };
    });
  };

  const fieldIdMap: Record<string, string> = {
    name: "field-individual-name",
    email: "field-individual-email",
    countryRegion: "field-individual-countryRegion",
    otherCountryRegion: "field-individual-otherCountryRegion",
    roleContext: "field-individual-roleContext",
    message: "field-individual-message",
    consent: "field-individual-consent",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

    // Client-side Zod validation
    const result = individualSchema.safeParse(formData);
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
      title="Individual or Family Member Inquiry"
      subtitle="Share your perspective on managing health records across time"
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
            placeholder="e.g. Jane Smith"
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
          helperText="We will only use this to respond to your inquiry."
          error={errors.email}
        >
          <TextInput
            type="email"
            required
            autoComplete="email"
            placeholder="jane@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
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
              placeholder="e.g. Australia, Germany"
              value={formData.otherCountryRegion}
              onChange={(e) =>
                setFormData({ ...formData, otherCountryRegion: e.target.value })
              }
            />
          </FormField>
        )}

        <FormField
          id={fieldIdMap.roleContext}
          label="Role / Context"
          helperText="Optional context regarding who you are managing information for."
          error={errors.roleContext}
        >
          <TextInput
            type="text"
            placeholder="e.g. Managing my own health records, caregiver"
            value={formData.roleContext}
            onChange={(e) =>
              setFormData({ ...formData, roleContext: e.target.value })
            }
          />
        </FormField>
      </div>

      <div>
        <FormField
          id="field-individual-preferredMethod"
          label="Preferred Contact Method"
          helperText="MEDRELEX currently communicates exclusively by email."
        >
          <TextInput
            type="text"
            readOnly
            disabled
            value="Email only"
            className="cursor-not-allowed opacity-75"
          />
        </FormField>
      </div>

      {/* Research interest checkboxes */}
      <div className="space-y-3 pt-1">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A192F] font-mono">
          Areas of Research Interest
        </label>
        <p className="text-xs text-[#64748B]">
          Select any topics you would like to share feedback or learn more about:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {RESEARCH_INTEREST_OPTIONS.map((interest, idx) => (
            <Checkbox
              key={interest}
              id={`interest-${idx}`}
              checked={formData.researchInterests.includes(interest)}
              onChange={() => handleInterestToggle(interest)}
              label={interest}
            />
          ))}
        </div>
      </div>

      {/* Message textarea with character counter */}
      <FormField
        id={fieldIdMap.message}
        label="Your Message or Questions"
        helperText="Share what challenges you face managing health records over time."
        error={errors.message}
        counter={{ current: formData.message.length, max: 800 }}
      >
        <TextArea
          rows={4}
          maxLength={800}
          placeholder="What difficulties do you encounter when organizing past clinic notes, lab results, or home measurements?"
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
              <span>Submit Inquiry</span>
            </>
          )}
        </button>
      </div>
    </ContactFormShell>
  );
}
