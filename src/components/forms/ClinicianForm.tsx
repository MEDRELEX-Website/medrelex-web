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
  clinicianSchema,
  CLINICIAN_ROLES,
  COUNTRY_REGIONS,
} from "@/lib/validation/contact-schemas";

const CLINICAL_AREAS_OF_INTEREST = [
  "Longitudinal timeline clinical review",
  "Pre-consultation context synthesis",
  "EHR / lab data integration research",
  "Wearable & symptom correlation",
  "Clinical advisory & feedback panel",
];

interface FormProps {
  onSuccess: () => void;
  onDirtyChange: (isDirty: boolean) => void;
}

export default function ClinicianForm({
  onSuccess,
  onDirtyChange,
}: FormProps) {
  const [formData, setFormData] = useState({
    audience: "clinician" as const,
    name: "",
    role: CLINICIAN_ROLES[0] as string,
    otherRole: "",
    organization: "",
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
        formData.email.trim() ||
        formData.organization.trim() ||
        formData.otherRole.trim() ||
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
    name: "field-clinician-name",
    role: "field-clinician-role",
    otherRole: "field-clinician-otherRole",
    organization: "field-clinician-organization",
    email: "field-clinician-email",
    countryRegion: "field-clinician-countryRegion",
    otherCountryRegion: "field-clinician-otherCountryRegion",
    areasOfInterest: "field-clinician-areasOfInterest",
    message: "field-clinician-message",
    consent: "field-clinician-consent",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

    const result = clinicianSchema.safeParse(formData);
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
      title="Physician or Healthcare Professional Inquiry"
      subtitle="Discuss clinical workflows, timeline views, and consultation context needs"
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
            placeholder="Dr. Alex Morgan, MD"
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
          helperText="Please use your institutional or practice email address."
          error={errors.email}
        >
          <TextInput
            type="email"
            required
            autoComplete="email"
            placeholder="alex.morgan@healthsystem.org"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          id={fieldIdMap.role}
          label="Professional Role"
          required
          error={errors.role}
        >
          <Select
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
          >
            {CLINICIAN_ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Select>
        </FormField>

        {formData.role === "Other" ? (
          <FormField
            id={fieldIdMap.otherRole}
            label="Specify Professional Role"
            required
            error={errors.otherRole}
          >
            <TextInput
              type="text"
              placeholder="e.g. Neurologist, Chief of Staff"
              value={formData.otherRole}
              onChange={(e) =>
                setFormData({ ...formData, otherRole: e.target.value })
              }
            />
          </FormField>
        ) : (
          <FormField
            id={fieldIdMap.organization}
            label="Organization / Practice"
            helperText="Hospital, clinic, academic medical center, or practice name."
            error={errors.organization}
          >
            <TextInput
              type="text"
              placeholder="e.g. Memorial Hospital, Community Clinic"
              value={formData.organization}
              onChange={(e) =>
                setFormData({ ...formData, organization: e.target.value })
              }
            />
          </FormField>
        )}
      </div>

      {formData.role === "Other" && (
        <FormField
          id={fieldIdMap.organization}
          label="Organization / Practice"
          helperText="Hospital, clinic, academic medical center, or practice name."
          error={errors.organization}
        >
          <TextInput
            type="text"
            placeholder="e.g. Memorial Hospital, Community Clinic"
            value={formData.organization}
            onChange={(e) =>
              setFormData({ ...formData, organization: e.target.value })
            }
          />
        </FormField>
      )}

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
      </div>

      {/* Areas of interest - at least 1 required */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <label
            id="areas-of-interest-label"
            className="block text-xs font-semibold uppercase tracking-wider text-[#0A192F] font-mono"
          >
            Areas of Interest <span className="text-[#36978F]">*</span>
          </label>
          <span className="text-xs text-[#64748B]">Select at least 1</span>
        </div>
        <p className="text-xs text-[#64748B]">
          What aspects of longitudinal clinical context would you be interested
          in discussing with our research team?
        </p>
        <div
          role="group"
          aria-labelledby="areas-of-interest-label"
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1"
        >
          {CLINICAL_AREAS_OF_INTEREST.map((interest, idx) => (
            <Checkbox
              key={interest}
              id={`clinician-interest-${idx}`}
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
        label="Message / Context"
        helperText="Describe specific clinical workflow pain points or consultation challenges."
        error={errors.message}
        counter={{ current: formData.message.length, max: 1000 }}
      >
        <TextArea
          rows={4}
          maxLength={1000}
          placeholder="Tell us what longitudinal views or context would be most helpful during patient intake and pre-visit review..."
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
              <span>Submit Clinician Inquiry</span>
            </>
          )}
        </button>
      </div>
    </ContactFormShell>
  );
}
