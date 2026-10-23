"use client";

/**
 * DiscussionSummary — Section 6.4
 * Neutral summary card with the 3 exact discussion questions.
 */

import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";
import { DEMO_SCENARIO } from "@/content/demo-data";

interface DiscussionSummaryProps {
  visible: boolean;
  className?: string;
}

export default function DiscussionSummary({ visible, className = "" }: DiscussionSummaryProps) {
  return (
    <div
      role="region"
      aria-label="Fictional discussion summary"
      aria-hidden={!visible}
      className={[
        "rounded-[14px] border border-[#D7E0EA] bg-white shadow-sm overflow-hidden",
        "transition-all duration-450",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        className,
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#D7E0EA] px-5 py-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] text-[#36978F]">
          <HelpCircle className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
            Fictional scenario
          </p>
          <h3 className="text-sm font-semibold text-[#0A192F]">
            Possible questions to discuss with a clinician
          </h3>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Explanatory note — Section 6.4 exact copy */}
        <p className="text-xs text-[#64748B] leading-relaxed italic">
          {DEMO_SCENARIO.discussionNote}
        </p>

        {/* The 3 questions — Section 6.4 exact copy */}
        <ol className="space-y-2.5 list-none">
          {DEMO_SCENARIO.discussionQuestions.map((q, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[#172B4D] leading-relaxed">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#D7E0EA] bg-[#E8EEF5] font-mono text-[10px] font-semibold text-[#36978F]"
                aria-hidden
              >
                {i + 1}
              </span>
              <span>{q}</span>
            </li>
          ))}
        </ol>

        {/* CTA */}
        <div className="pt-2 border-t border-[#D7E0EA]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11px] text-[#64748B] leading-relaxed max-w-sm">
            These are fictional illustration questions only — not clinical advice.
            Discuss personal health questions with a qualified healthcare professional.
          </p>
          <Link
            href="/contact?audience=individual"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0A192F] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D] active:scale-[0.98] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#36978F]"
          >
            Share Your Perspective
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
