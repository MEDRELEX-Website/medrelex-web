"use client";

/**
 * Timeline — responsive horizontal (desktop) / vertical (mobile) timeline.
 * Keyboard: Arrow keys traverse markers, Enter/Space selects.
 */

import React from "react";
import TimelineMarker from "./TimelineMarker";
import type { DemoEvent, EventCategory } from "@/content/demo-data";

interface TimelineProps {
  events: DemoEvent[];
  visibleCount: number; // how many events to show (per scene)
  selectedId: string | null;
  activeFilters: EventCategory[];
  onSelectEvent: (id: string) => void;
  axisLabel: string;
  scene?: number;
}

export default function Timeline({
  events,
  visibleCount,
  selectedId,
  activeFilters,
  onSelectEvent,
  axisLabel,
  scene = 0,
}: TimelineProps) {
  const markerRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const visibleIndices = events
      .map((_, i) => i)
      .filter((i) => i < visibleCount);
    const pos = visibleIndices.indexOf(idx);

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = visibleIndices[pos + 1];
      if (next !== undefined) markerRefs.current[next]?.focus();
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = visibleIndices[pos - 1];
      if (prev !== undefined) markerRefs.current[prev]?.focus();
    }
  };

  const isFiltered = (cat: EventCategory) =>
    activeFilters.length > 0 && !activeFilters.includes(cat);

  return (
    <div className="w-full">
      {/* ── Desktop: Horizontal Timeline ── */}
      <div className="hidden md:block" role="group" aria-label={`${axisLabel} timeline`}>
        {/* Axis label */}
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#64748B]">
            {axisLabel}
          </span>
          <span className="font-mono text-[10px] text-[#64748B]">
            {visibleCount} of {events.length} events shown
          </span>
        </div>

        {/* Track */}
        <div className="relative h-28 min-w-0">
          {/* Base axis line */}
          <div
            className="absolute left-0 right-0 top-[3.25rem] h-px bg-[#D7E0EA]"
            aria-hidden
          />

          {/* Dynamic connecting progress segments between adjacent circles */}
          {events.slice(0, -1).map((evt, idx) => {
            const nextEvt = events[idx + 1];
            if (!nextEvt || idx + 1 >= visibleCount) return null;

            // Highlight active progression between events:
            // Scene 3: inspecting E4 (E3 -> E4)
            // Scene 4: inspecting E5 (E4 sleep -> E5 personal note)
            // Scene 5: preparing questions (E5 note -> E6 conversation prep)
            // Scene 6: complete overview
            const isHighlighted =
              (scene === 3 && idx === 2) || // E3 -> E4
              (scene === 4 && idx === 3) || // E4 (sleep) -> E5 (personal note)
              (scene === 5 && idx === 4) || // E5 (note) -> E6 (discussion prep)
              scene === 6;

            return (
              <div
                key={`seg-${evt.id}-${nextEvt.id}`}
                aria-hidden
                className={[
                  "absolute top-[3.25rem] -translate-y-1/2 transition-all duration-500 rounded-full",
                  isHighlighted
                    ? "h-1 bg-[#36978F] z-[5] shadow-xs"
                    : "h-px bg-[#D7E0EA] z-0",
                ].join(" ")}
                style={{
                  left: `calc(${evt.timelinePosition}% + 18px)`,
                  width: `calc(${nextEvt.timelinePosition - evt.timelinePosition}% - 36px)`,
                }}
              />
            );
          })}

          {/* Boundary date labels only: 1 Apr and 30 Apr (avoids overlapping circle labels) */}
          {[
            { label: "1 Apr", pos: 0, align: "items-start" },
            { label: "30 Apr", pos: 100, align: "items-end -translate-x-full" },
          ].map((t) => (
            <div
              key={t.label}
              className={`absolute top-[3.25rem] flex flex-col ${t.align}`}
              style={{ left: `${t.pos}%` }}
              aria-hidden
            >
              <div className="h-2 w-px bg-[#D7E0EA]" />
              <span className="mt-1 font-mono text-[9px] text-[#64748B] whitespace-nowrap">{t.label}</span>
            </div>
          ))}

          {/* Markers */}
          {events.map((evt, idx) => (
            <TimelineMarker
              key={evt.id}
              event={evt}
              isSelected={selectedId === evt.id}
              isFiltered={isFiltered(evt.category)}
              isVisible={idx < visibleCount}
              onSelect={onSelectEvent}
              orientation="horizontal"
              sceneStep={idx}
              style={{ transitionDelay: `${idx * 60}ms` }}
              markerRef={(el) => { markerRefs.current[idx] = el; }}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile: Vertical Timeline ── */}
      <div className="md:hidden" role="group" aria-label={`${axisLabel} timeline`}>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#64748B] mb-3">
          {axisLabel} — {visibleCount} of {events.length} events shown
        </p>
        <div className="relative pl-5">
          {/* Vertical connector */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[#D7E0EA]" aria-hidden />
          <ul className="space-y-4">
            {events.map((evt, idx) => (
              <li
                key={evt.id}
                className={[
                  "transition-all duration-300",
                  idx < visibleCount ? "opacity-100" : "opacity-0 pointer-events-none h-0 overflow-hidden",
                ].join(" ")}
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                <TimelineMarker
                  event={evt}
                  isSelected={selectedId === evt.id}
                  isFiltered={isFiltered(evt.category)}
                  isVisible={idx < visibleCount}
                  onSelect={onSelectEvent}
                  orientation="vertical"
                  sceneStep={idx}
                  markerRef={(el) => { markerRefs.current[idx] = el; }}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
