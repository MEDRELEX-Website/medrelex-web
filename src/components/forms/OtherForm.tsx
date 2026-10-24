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
  otherSchema,
  OTHER_REASONS,
  type OtherReasonType,
} from "@/lib/validation/contact-schemas";

interface FormProps {
  onSuccess: () => void;
  onDirtyChange: (isDirty: boolean) => void;
  initialReason?: OtherReasonType;
}

export default function OtherForm({
  onSuccess,
  onDirtyChange,
  initialReason,
}: FormProps) {
  const [formData, setFormData] = useState({
    audience: "other" as const,
    name: "",
    email: "",
    reason: (initialReason || OTHER_REASONS[0]) as OtherReasonType,
    message: "",
    consent: false,
    website_hp: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    if (initialReason && OTHER_REASONS.includes(initialReason)) {
      setFormData((prev) => ({ ...prev, reason: initialReason }));
    }
  }, [initialReason]);

  useEffect(() => {
    const isDirty = Boolean(
      formData.name.trim() ||
        formData.email.trim() ||
        formData.message.trim()
    );
    onDirtyChange(isDirty);
  }, [formData, onDirtyChange]);

  const fieldIdMap: Record<string, string> = {
    name: "field-other-name",
    email: "field-other-email",
    reason: "field-other-reason",
    message: "field-other-message",
    consent: "field-other-consent",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

    const result = otherSchema.safeParse(formData);
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
      title="General or Other Inquiry"
      subtitle="General questions, media requests, website feedback, or privacy/governance inquiries"
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
            placeholder="e.g. Robin Taylor"
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
          helperText="We will respond to this email address."
          error={errors.email}
        >
          <TextInput
            type="email"
            required
            autoComplete="email"
            placeholder="robin@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </FormField>
      </div>

      <div>
        <FormField
          id={fieldIdMap.reason}
          label="Reason for Inquiry"
          required
          error={errors.reason}
        >
          <Select
            value={formData.reason}
            onChange={(e) =>
              setFormData({
                ...formData,
                reason: e.target.value as OtherReasonType,
              })
            }
          >
            {OTHER_REASONS.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      {/* Message textarea with character counter (required, 20-800) */}
      <FormField
        id={fieldIdMap.message}
        label="Message"
        required
        helperText="Please provide details about your inquiry (minimum 20 characters)."
        error={errors.message}
        counter={{ current: formData.message.length, max: 800 }}
      >
        <TextArea
          rows={5}
          maxLength={800}
          required
          placeholder="How can we assist you? Please note: do not include medical records or personal health history..."
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
