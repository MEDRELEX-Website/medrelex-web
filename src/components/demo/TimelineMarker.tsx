"use client";

/**
 * TimelineMarker — a single event node on the horizontal/vertical timeline.
 * Keyboard: Enter/Space to select, Arrow keys handled by Timeline parent.
 * State is conveyed by shape + label, never by color alone.
 */

import React from "react";
import { categoryIcon } from "./EventDetails";
import type { DemoEvent } from "@/content/demo-data";

const SHAPES: Record<string, string> = {
  "home-measurement":  "●",
  "lab-report":        "■",
  "medication-history":"▲",
  "wearable-sleep":    "≈",
  "personal-note":     "♥",
  "conversation-prep": "?",
};

interface TimelineMarkerProps {
  event: DemoEvent;
  isSelected: boolean;
  isFiltered: boolean; // dimmed because another source is active
  isVisible: boolean;  // part of current scene
  onSelect: (id: string) => void;
  markerRef?: React.Ref<HTMLButtonElement>;
  // Positioning: horizontal desktop
  style?: React.CSSProperties;
  orientation: "horizontal" | "vertical";
  sceneStep: number;   // 0–6, used for stagger animation
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export default function TimelineMarker({
  event,
  isSelected,
  isFiltered,
  isVisible,
  onSelect,
  markerRef,
  style,
  orientation,
  sceneStep,
  onKeyDown,
}: TimelineMarkerProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={[
        "group flex transition-all",
        isHorizontal
          ? "absolute flex-col items-center"
          : "relative flex-row items-start gap-3 w-full",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        // stagger via inline transition-delay handled in style prop
      ].join(" ")}
      style={isHorizontal ? {
        ...style,
        left: `${event.timelinePosition}%`,
        top: "3.25rem",
        transform: "translate(-50%, -50%)",
      } : style}
    >
      {/* Date label — above marker on horizontal, to-right on vertical */}
      {isHorizontal && (
        <span
          className={[
            "h-5 flex items-center justify-center font-mono text-[9px] font-semibold tracking-wide whitespace-nowrap",
            "transition-colors",
            isSelected ? "text-[#0A192F]" : "text-[#64748B]",
            isFiltered ? "opacity-40" : "",
          ].join(" ")}
          aria-hidden
        >
          {event.dateLabel}
        </span>
      )}

      {/* Marker button */}
      <button
        ref={markerRef}
        onClick={() => onSelect(event.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(event.id);
          } else if (onKeyDown) {
            onKeyDown(e);
          }
        }}
        aria-pressed={isSelected}
        aria-label={`${event.categoryLabel}: ${event.title} — ${event.dateLabel}. ${event.status}`}
        tabIndex={isVisible ? 0 : -1}
        className={[
          "relative z-10 flex items-center justify-center",
          isHorizontal ? "h-9 w-9 rounded-full bg-white" : "h-9 w-9 rounded-lg shrink-0 bg-white",
          "border-2 transition-all duration-250",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#36978F]",
          isSelected
            ? "border-[#0A192F] bg-[#0A192F] text-white scale-110 shadow-md"
            : isFiltered
              ? "border-[#D7E0EA] bg-white text-[#D7E0EA] opacity-30 cursor-default"
              : "border-[#36978F] bg-white text-[#36978F] hover:bg-[#36978F] hover:text-white hover:scale-105",
        ].join(" ")}
      >
        <span className="sr-only">{SHAPES[event.category]}</span>
        <span aria-hidden>{categoryIcon(event.category, "h-3.5 w-3.5")}</span>
      </button>

      {/* Shape glyph — below marker on horizontal, never color-only */}
      <span
        aria-hidden
        className={[
          "h-5 flex items-center justify-center font-mono text-[9px]",
          isSelected ? "text-[#0A192F] font-bold" : "text-[#64748B]",
          isFiltered ? "opacity-40" : "",
        ].join(" ")}
      >
        {event.id} {SHAPES[event.category]}
      </span>

      {/* Vertical layout: text label beside marker */}
      {!isHorizontal && (
        <div className={["flex flex-col min-w-0 flex-1", isFiltered ? "opacity-40" : ""].join(" ")}>
          <span className="font-mono text-[10px] font-semibold text-[#64748B]">{event.dateLabel}</span>
          <span className={["text-xs font-semibold leading-snug break-words whitespace-normal", isSelected ? "text-[#0A192F]" : "text-[#172B4D]"].join(" ")}>
            {event.title}
          </span>
          <span className="text-[10px] text-[#64748B] italic leading-normal break-words whitespace-normal mt-0.5">{event.status}</span>
        </div>
      )}
    </div>
  );
}
