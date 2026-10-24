"use client";

import React from "react";
import { ShieldAlert } from "lucide-react";
import ErrorSummary from "./ErrorSummary";

interface ContactFormShellProps {
  title: string;
  subtitle?: string;
  submitting: boolean;
  errors: Record<string, string>;
  fieldIdMap?: Record<string, string>;
  generalError?: string | null;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ContactFormShell({
  title,
  subtitle = "Validation & Research Inquiry Form",
  submitting,
  errors,
  fieldIdMap,
  generalError,
  children,
  onSubmit,
}: ContactFormShellProps) {
  return (
    <div className="rounded-[14px] border border-[#D7E0EA] bg-white shadow-xs overflow-hidden">
      {/* Top Mandatory Safety Banner */}
      <div className="border-b border-[#D7E0EA] bg-[#E8EEF5]/70 p-4 sm:p-5 flex items-start gap-3.5">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white border border-[#D7E0EA] text-[#36978F]">
          <ShieldAlert className="h-4 w-4" aria-hidden />
        </div>
        <div>
          <h3 className="text-xs font-semibold tracking-wider uppercase text-[#0A192F] font-mono">
            Medical Privacy & Intake Warning
          </h3>
          <p className="mt-0.5 text-xs sm:text-sm text-[#172B4D]/85 leading-relaxed">
            Please do not submit medical records, diagnoses, medication lists,
            insurance details, or other sensitive health information through this
            website.
          </p>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={onSubmit} noValidate className="p-6 sm:p-10 space-y-7">
        {/* Header */}
        <div className="border-b border-[#D7E0EA] pb-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-[#0A192F]">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-[#64748B] font-mono uppercase mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Server or General Error Banner */}
        {generalError && (
          <div
            role="alert"
            className="rounded-[8px] border border-red-300 bg-red-50 p-4 text-xs sm:text-sm text-red-800 font-medium"
          >
            {generalError}
          </div>
        )}

        {/* Error Summary listing all invalid fields */}
        {Object.keys(errors).length > 0 && (
          <ErrorSummary errors={errors} fieldIdMap={fieldIdMap} />
        )}

        {/* Form Body */}
        <div className="space-y-6">{children}</div>
      </form>
    </div>
  );
}
