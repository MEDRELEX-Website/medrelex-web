"use client";

import React, { useState } from "react";
import {
  User,
  Stethoscope,
  Building2,
  TrendingUp,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";
import type { AudienceType } from "@/lib/validation/contact-schemas";

export interface AudienceOption {
  id: AudienceType;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

export const AUDIENCE_OPTIONS: AudienceOption[] = [
  {
    id: "individual",
    label: "Individual or Family Member",
    sublabel: "Share your experience managing health records across time",
    icon: <User className="h-5 w-5" />,
  },
  {
    id: "clinician",
    label: "Physician or Healthcare Professional",
    sublabel: "Discuss clinical workflows, timeline views, and consultation needs",
    icon: <Stethoscope className="h-5 w-5" />,
  },
  {
    id: "partner",
    label: "Healthcare or Strategic Partner",
    sublabel: "Explore institutional alignment and infrastructure interoperability",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    id: "investor",
    label: "Investor or Advisor",
    sublabel: "Discuss the platform thesis, validation roadmap, and research milestones",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    id: "other",
    label: "Other Inquiry",
    sublabel: "General questions, media, website feedback, or privacy/governance",
    icon: <HelpCircle className="h-5 w-5" />,
  },
];

interface AudienceSelectorProps {
  selectedAudience: AudienceType | null;
  onSelectAudience: (audience: AudienceType) => void;
  isDirty?: boolean;
}

export default function AudienceSelector({
  selectedAudience,
  onSelectAudience,
  isDirty = false,
}: AudienceSelectorProps) {
  const [pendingAudience, setPendingAudience] = useState<AudienceType | null>(
    null
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleAudienceClick = (audience: AudienceType) => {
    if (audience === selectedAudience) return;

    if (isDirty) {
      setPendingAudience(audience);
      setShowConfirmModal(true);
    } else {
      onSelectAudience(audience);
    }
  };

  const confirmSwitch = () => {
    if (pendingAudience) {
      onSelectAudience(pendingAudience);
    }
    setShowConfirmModal(false);
    setPendingAudience(null);
  };

  const cancelSwitch = () => {
    setShowConfirmModal(false);
    setPendingAudience(null);
  };

  return (
    <section aria-labelledby="audience-heading" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <h2
          id="audience-heading"
          className="text-lg font-semibold text-[#0A192F]"
        >
          I&rsquo;m contacting MEDRELEX as&hellip;
        </h2>
        <span className="text-xs text-[#64748B] font-mono">
          Select an audience to load the relevant inquiry fields
        </span>
      </div>

      <div
        role="radiogroup"
        aria-labelledby="audience-heading"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
      >
        {AUDIENCE_OPTIONS.map((opt) => {
          const isSelected = selectedAudience === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              id={`audience-opt-${opt.id}`}
              onClick={() => handleAudienceClick(opt.id)}
              className={`p-4 rounded-[12px] border text-left flex items-start gap-3.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#36978F] ${
                isSelected
                  ? "border-[#36978F] bg-white ring-2 ring-[#36978F]/25 shadow-xs"
                  : "border-[#D7E0EA] bg-white/80 hover:bg-white hover:border-[#36978F]/50"
              }`}
            >
              <div
                className={`p-2.5 rounded-lg shrink-0 mt-0.5 transition-colors ${
                  isSelected
                    ? "bg-[#36978F] text-white"
                    : "bg-[#E8EEF5] text-[#36978F]"
                }`}
                aria-hidden
              >
                {opt.icon}
              </div>
              <div>
                <div className="font-semibold text-sm text-[#0A192F]">
                  {opt.label}
                </div>
                <div className="text-xs text-[#172B4D]/75 mt-1 leading-relaxed">
                  {opt.sublabel}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Confirmation Modal when switching audience with dirty form */}
      {showConfirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-modal-title"
          aria-describedby="confirm-modal-description"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A192F]/50 backdrop-blur-xs p-4"
        >
          <div className="w-full max-w-md rounded-[14px] border border-[#D7E0EA] bg-white p-6 sm:p-7 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3.5">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 border border-amber-200 text-amber-600">
                <AlertTriangle className="h-5 w-5" aria-hidden />
              </div>
              <div className="space-y-1.5">
                <h3
                  id="confirm-modal-title"
                  className="text-base font-semibold text-[#0A192F]"
                >
                  Change Audience?
                </h3>
                <p
                  id="confirm-modal-description"
                  className="text-xs sm:text-sm text-[#172B4D]/80 leading-relaxed"
                >
                  Changing the audience will clear the information entered in
                  this form.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={cancelSwitch}
                className="rounded-[8px] border border-[#D7E0EA] bg-white px-4 py-2 text-xs font-semibold text-[#0A192F] hover:bg-[#E8EEF5] focus:outline-none focus:ring-2 focus:ring-[#36978F] transition-colors"
              >
                Keep this form
              </button>
              <button
                type="button"
                onClick={confirmSwitch}
                className="rounded-[8px] bg-[#0A192F] px-4 py-2 text-xs font-semibold text-white hover:bg-[#172B4D] focus:outline-none focus:ring-2 focus:ring-[#36978F] shadow-xs transition-colors"
              >
                Clear and switch
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
