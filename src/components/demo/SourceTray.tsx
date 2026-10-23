"use client";

/**
 * SourceTray — source category filter panel.
 * Desktop: left column. Mobile: horizontal scrollable top row.
 */

import React from "react";
import { Activity, FileText, Pill, Moon, MessageSquare, HelpCircle, X } from "lucide-react";
import { SOURCE_CATEGORIES } from "@/content/demo-data";
import type { EventCategory } from "@/content/demo-data";

interface SourceTrayProps {
  activeFilters: EventCategory[];
  onToggleFilter: (cat: EventCategory) => void;
  onClearFilters: () => void;
}

const ICONS: Record<EventCategory, React.ReactNode> = {
  "home-measurement":  <Activity      className="h-3.5 w-3.5 shrink-0" aria-hidden />,
  "lab-report":        <FileText      className="h-3.5 w-3.5 shrink-0" aria-hidden />,
  "medication-history":<Pill          className="h-3.5 w-3.5 shrink-0" aria-hidden />,
  "wearable-sleep":    <Moon          className="h-3.5 w-3.5 shrink-0" aria-hidden />,
  "personal-note":     <MessageSquare className="h-3.5 w-3.5 shrink-0" aria-hidden />,
  "conversation-prep": <HelpCircle    className="h-3.5 w-3.5 shrink-0" aria-hidden />,
};

// Shape glyphs so state is never communicated by color alone
const SHAPES: Record<EventCategory, string> = {
  "home-measurement":  "●",  // filled circle
  "lab-report":        "■",  // filled square
  "medication-history":"▲",  // filled triangle
  "wearable-sleep":    "≈",  // approx (range indicator)
  "personal-note":     "♥",  // heart
  "conversation-prep": "?",  // question mark
};

export default function SourceTray({ activeFilters, onToggleFilter, onClearFilters }: SourceTrayProps) {
  const hasFilters = activeFilters.length > 0;

  return (
    <nav aria-label="Filter events by source category">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#64748B]">
          Sources
        </p>
        {hasFilters && (
          <button
            onClick={onClearFilters}
            aria-label="Clear all source filters"
            className="flex items-center gap-0.5 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-[#64748B] transition-colors hover:bg-[#E8EEF5] hover:text-[#0A192F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#36978F]"
          >
            <X className="h-2.5 w-2.5" /> Clear
          </button>
        )}
      </div>

      {/* Desktop: vertical list. Mobile: horizontal scroll row */}
      <ul
        className={[
          "flex gap-1.5",
          // Mobile: horizontal scroll
          "flex-row overflow-x-auto pb-1",
          // Desktop: vertical column
          "md:flex-col md:overflow-x-visible md:pb-0",
        ].join(" ")}
      >
        {SOURCE_CATEGORIES.map((src) => {
          const isActive = activeFilters.includes(src.key);
          return (
            <li key={src.key} className="shrink-0">
              <button
                onClick={() => onToggleFilter(src.key)}
                aria-pressed={isActive}
                aria-label={`${isActive ? "Remove" : "Add"} filter: ${src.label}`}
                title={src.description}
                className={[
                  "flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left",
                  "text-xs transition-all w-full",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#36978F]",
                  isActive
                    ? "border-[#36978F] bg-[#36978F]/8 text-[#0A192F] font-semibold"
                    : "border-[#D7E0EA] bg-white text-[#64748B] hover:border-[#36978F]/50 hover:bg-[#E8EEF5]",
                ].join(" ")}
              >
                <span className="text-[#36978F]">{ICONS[src.key]}</span>
                <span className="font-mono text-[10px] mr-1 text-[#36978F]" aria-hidden>
                  {SHAPES[src.key]}
                </span>
                <span className="whitespace-nowrap">{src.label}</span>
                {isActive && (
                  <span className="sr-only"> (active filter)</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
