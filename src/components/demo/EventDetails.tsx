"use client";

/**
 * EventDetails — Section 6.6
 * Displays Date, Source, Status, and Context Caveat for a selected event.
 */

import React from "react";
import { X, Calendar, Tag, ShieldAlert, Activity, FileText, Pill, Moon, MessageSquare, HelpCircle } from "lucide-react";
import type { DemoEvent, EventCategory } from "@/content/demo-data";

interface EventDetailsProps {
  event: DemoEvent | null;
  onClose: () => void;
  className?: string;
}

export function categoryIcon(cat: EventCategory, cls = "h-4 w-4 shrink-0") {
  switch (cat) {
    case "home-measurement": return <Activity className={cls} aria-hidden />;
    case "lab-report":       return <FileText  className={cls} aria-hidden />;
    case "medication-history": return <Pill    className={cls} aria-hidden />;
    case "wearable-sleep":   return <Moon      className={cls} aria-hidden />;
    case "personal-note":    return <MessageSquare className={cls} aria-hidden />;
    case "conversation-prep": return <HelpCircle className={cls} aria-hidden />;
  }
}

export default function EventDetails({ event, onClose, className = "" }: EventDetailsProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!event) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div
      ref={panelRef}
      role="region"
      aria-label={`Detail panel for ${event.title}`}
      className={[
        "rounded-[14px] border border-[#D7E0EA] bg-white shadow-sm",
        "transition-all duration-300",
        className,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4 border-b border-[#D7E0EA] px-5 py-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] text-[#36978F]">
            {categoryIcon(event.category)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-mono text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              {event.id} — {event.categoryLabel}
            </p>
            <h3 className="truncate text-sm font-semibold text-[#0A192F]">{event.title}</h3>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close detail panel"
          className="shrink-0 rounded-md p-1.5 text-[#64748B] transition-colors hover:bg-[#E8EEF5] hover:text-[#0A192F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#36978F]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="px-5 py-4 space-y-4">
        <p className="text-sm text-[#172B4D] leading-relaxed">{event.detail}</p>

        <dl className="space-y-2 text-xs">
          <div className="flex items-start gap-2">
            <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#64748B]" aria-hidden />
            <div>
              <dt className="sr-only">Date</dt>
              <dd className="font-mono text-[#172B4D]">
                {event.dateLabel}
                {event.isRange && <span className="ml-1.5 text-[#64748B]">(date range)</span>}
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Tag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#64748B]" aria-hidden />
            <div>
              <dt className="sr-only">Source</dt>
              <dd className="text-[#172B4D]">{event.categoryLabel}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#64748B]" aria-hidden />
            <div>
              <dt className="sr-only">Status</dt>
              <dd className="text-[#64748B] italic">{event.status}</dd>
            </div>
          </div>
        </dl>

        {event.contextCaveat && (
          <div className="rounded-md border border-[#D7E0EA] bg-[#E8EEF5]/50 px-3.5 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#64748B] mb-1">Context caveat</p>
            <p className="text-xs text-[#172B4D] leading-relaxed">{event.contextCaveat}</p>
          </div>
        )}
      </div>
    </div>
  );
}
