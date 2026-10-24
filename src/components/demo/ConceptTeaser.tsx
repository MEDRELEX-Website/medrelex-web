"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  Calendar,
  Clock,
  FileText,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import ConceptLabel from "@/components/content/ConceptLabel";

interface TeaserEvent {
  id: string;
  date: string;
  source: string;
  sourceType: string;
  category: "Lab Result" | "Medication" | "Wearable" | "Personal Note";
  title: string;
  value: string;
  contextNote: string;
  icon: React.ReactNode;
}

const TEASER_EVENTS: TeaserEvent[] = [
  {
    id: "evt-1",
    date: "April 02, 2026",
    source: "Metro Health EHR",
    sourceType: "Clinical Record",
    category: "Lab Result",
    title: "Clinic Visit & Blood Pressure",
    value: "142/88 mmHg • Stage 1 elevated",
    contextNote:
      "Recorded in-clinic following routine checkup. Primary care physician discussed lifestyle measures and initiated follow-up monitoring.",
    icon: <Activity className="h-4 w-4" />,
  },
  {
    id: "evt-2",
    date: "April 10, 2026",
    source: "Outpatient Pharmacy",
    sourceType: "Prescription Record",
    category: "Medication",
    title: "Medication Adjustment",
    value: "Lisinopril increased from 10mg to 20mg daily",
    contextNote:
      "Prescription modification filled by outpatient pharmacy. Verified dispensing timestamp placed on shared timeline.",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: "evt-3",
    date: "April 18, 2026",
    source: "Consumer Wearable",
    sourceType: "Home Device",
    category: "Wearable",
    title: "Sleep Duration Variation",
    value: "5.2 hrs average • 1.8 hrs below baseline",
    contextNote:
      "Continuous sleep tracking showed three consecutive nights of interrupted rest starting 8 days after medication change.",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: "evt-4",
    date: "April 22, 2026",
    source: "Patient Observation Log",
    sourceType: "Self-Reported",
    category: "Personal Note",
    title: "Morning Lightheadedness Recorded",
    value: "Mild postural dizziness upon standing",
    contextNote:
      "Logged directly by individual. Preserved as self-reported information with date tag, distinct from clinic-verified vitals.",
    icon: <FileText className="h-4 w-4" />,
  },
];

export default function ConceptTeaser() {
  const [selectedId, setSelectedId] = useState<string>("evt-3");
  const selectedEvent =
    TEASER_EVENTS.find((e) => e.id === selectedId) || TEASER_EVENTS[0];

  return (
    <div className="rounded-2xl border border-[#D7E0EA] bg-white shadow-xs overflow-hidden">
      {/* Top Header Bar */}
      <div className="border-b border-[#D7E0EA] bg-[#F8FAFC] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <ConceptLabel />
        <span className="font-mono text-[11px] text-[#64748B] flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#36978F]" />
          Scenario: Hypertension & Medication Review
        </span>
      </div>

      <div className="p-6 sm:p-8 lg:p-10 space-y-8">
        {/* Subhead Context */}
        <div className="max-w-2xl">
          <p className="text-sm sm:text-base text-[#172B4D]/85 leading-relaxed">
            Click any milestone below to observe how disconnected clinical
            entries, medication adjustments, wearable records, and personal
            observations are correlated chronologically.
          </p>
        </div>

        {/* Timeline Sequence Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TEASER_EVENTS.map((event, idx) => {
            const isSelected = event.id === selectedId;
            return (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelectedId(event.id)}
                className={`text-left rounded-xl border p-4 transition-all relative ${
                  isSelected
                    ? "border-[#36978F] bg-[#E8EEF5]/40 shadow-xs ring-1 ring-[#36978F]"
                    : "border-[#D7E0EA] bg-white hover:border-[#36978F]/40 hover:bg-[#F8FAFC]"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] mb-2">
                  <span className="font-semibold text-[#0A192F]">
                    0{idx + 1} • {event.date.split(",")[0]}
                  </span>
                  <span className="rounded bg-white px-1.5 py-0.5 border border-[#D7E0EA] text-[10px]">
                    {event.category}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-[#0A192F] line-clamp-1">
                  {event.title}
                </h4>
                <p className="text-[11px] text-[#64748B] mt-1 line-clamp-1">
                  {event.source}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Event Context Inspector */}
        <div className="rounded-xl border border-[#D7E0EA] bg-[#F8FAFC] p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D7E0EA]/70 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#E8EEF5] text-[#36978F]">
                {selectedEvent.icon}
              </div>
              <div>
                <span className="font-mono text-xs font-semibold text-[#0A192F]">
                  {selectedEvent.title}
                </span>
                <span className="mx-2 text-[#D7E0EA]">•</span>
                <span className="text-xs text-[#64748B]">
                  {selectedEvent.date}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-mono text-[#0A192F] border border-[#D7E0EA]">
                Source: {selectedEvent.source} ({selectedEvent.sourceType})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-5">
              <p className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
                Recorded Observation / Value
              </p>
              <p className="text-sm sm:text-base font-semibold text-[#0A192F] mt-0.5">
                {selectedEvent.value}
              </p>
            </div>
            <div className="md:col-span-7">
              <p className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
                Longitudinal Context
              </p>
              <p className="text-xs sm:text-sm text-[#172B4D]/80 mt-0.5 leading-relaxed">
                {selectedEvent.contextNote}
              </p>
            </div>
          </div>
        </div>

        {/* Synthesis & Doctor Visit Preparation Note */}
        <div className="rounded-xl border border-[#36978F]/30 bg-[#36978F]/5 p-4 sm:p-5 flex items-start gap-3.5">
          <div className="mt-0.5 rounded-lg bg-white p-2 text-[#36978F] border border-[#36978F]/20 shrink-0">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="font-semibold text-[#0A192F]">
              Synthesis Layer: Preparing Questions for Healthcare Consultation
            </p>
            <p className="text-[#172B4D]/80 leading-relaxed">
              By viewing the blood pressure check, medication adjustment,
              wearable sleep deficit, and dizziness reports in a single
              chronological sequence, the individual can formulate focused
              questions for their physician—distinguishing clinical facts from
              subjective notes without automated medical diagnosis.
            </p>
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#D7E0EA]">
          <p className="text-xs text-[#64748B]">
            All scenario data, names, and timeline readings are invented for
            illustrative purposes.
          </p>
          <Link
            href="/platform#concept-demo"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A192F] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-xs transition-all hover:bg-[#172B4D] active:scale-[0.98] shrink-0 w-full sm:w-auto"
          >
            <span>Open Full Interactive Demonstration</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
