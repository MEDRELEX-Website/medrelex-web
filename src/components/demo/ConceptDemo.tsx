"use client";

/**
 * ConceptDemo — orchestrator for the MEDRELEX Interactive Concept Demonstration.
 * State machine: idle -> playing -> paused -> completed | manual
 * Scenes 0–6 as specified in Section 6.
 */

import React from "react";
import { Play, RotateCcw } from "lucide-react";
import { DEMO_SCENARIO } from "@/content/demo-data";
import type { EventCategory } from "@/content/demo-data";
import DemoControls from "./DemoControls";
import SourceTray from "./SourceTray";
import Timeline from "./Timeline";
import EventDetails from "./EventDetails";
import DiscussionSummary from "./DiscussionSummary";
import type { PlaybackState } from "./DemoControls";

// Scene step config: how many events are visible per scene
const SCENE_VISIBLE: number[] = [0, 3, 5, 5, 5, 6, 6];
const SCENE_LABELS: string[] = [
  "Introduction",
  "Fragmented records arrive",
  "Wearables & notes connect",
  "Inspecting sleep trend",
  "Inspecting personal note",
  "Preparing clinician discussion",
  "Interactive exploration",
];

const SCENE_NARRATIVES: string[] = [
  "",
  "Separate records from home measurements, clinic labs, and medication history appear.",
  "Wearable sleep data and personal notes are placed chronologically alongside clinical records.",
  "Inspecting Event E4: wearable sleep duration varied across several nights in April.",
  "Inspecting Event E5: person reported unusual fatigue in the same period following medication change.",
  "Synthesizing timeline events into neutral questions to discuss with a healthcare professional.",
  "Walkthrough complete. Select any marker on the timeline or filter by source to explore.",
];

// Auto-advance delays per scene (ms)
const SCENE_DELAYS: number[] = [0, 3500, 3500, 4200, 4200, 5000, 0];

const TOTAL_AUTO_SCENES = 5; // scenes 1–5 (scene 0 = idle, scene 6 = end)

export default function ConceptDemo() {
  const [playbackState, setPlaybackState] = React.useState<PlaybackState>("idle");
  const [scene, setScene] = React.useState(0);
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null);
  const [activeFilters, setActiveFilters] = React.useState<EventCategory[]>([]);
  const [liveMessage, setLiveMessage] = React.useState("");

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const events = DEMO_SCENARIO.events;
  const visibleCount = SCENE_VISIBLE[Math.min(scene, SCENE_VISIBLE.length - 1)];

  // Auto-inspect E4 in scene 3, E5 in scene 4, clear in scene 5
  React.useEffect(() => {
    if (playbackState === "playing") {
      if (scene === 1 || scene === 2) {
        setSelectedEventId(null);
      } else if (scene === 3) {
        setSelectedEventId("E4");
      } else if (scene === 4) {
        setSelectedEventId("E5");
      } else if (scene >= 5) {
        setSelectedEventId(null);
      }
    }
  }, [scene, playbackState]);

  // Timer-based scene advancement
  const scheduleNextScene = React.useCallback(
    (fromScene: number) => {
      if (prefersReducedMotion) return;
      const delay = SCENE_DELAYS[fromScene] ?? 0;
      if (delay === 0) return;
      timerRef.current = setTimeout(() => {
        const next = fromScene + 1;
        if (next > 5) {
          setScene(6);
          setPlaybackState("completed");
          announce("Animation complete. Explore manually or replay.");
        } else {
          setScene(next);
          announce(SCENE_LABELS[next]);
          scheduleNextScene(next);
        }
      }, delay);
    },
    [prefersReducedMotion]
  );

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const announce = (msg: string) => setLiveMessage(msg);

  // ── Actions ──────────────────────────────────────────────────────────────

  const handlePlay = React.useCallback(() => {
    clearTimer();
    if (prefersReducedMotion) {
      // Show final state immediately
      setScene(6);
      setPlaybackState("completed");
      setSelectedEventId(null);
      announce("Reduced motion: showing final state. Explore manually.");
      return;
    }
    const startScene = scene === 0 || scene === 6 ? 1 : scene;
    setScene(startScene);
    setPlaybackState("playing");
    announce(SCENE_LABELS[startScene]);
    scheduleNextScene(startScene);
  }, [prefersReducedMotion, scene, scheduleNextScene]);

  const handlePause = React.useCallback(() => {
    clearTimer();
    setPlaybackState("paused");
    announce("Paused. Use step controls or press Play to continue.");
  }, []);

  const handleNext = React.useCallback(() => {
    clearTimer();
    const next = Math.min(scene + 1, 6);
    setScene(next);
    setPlaybackState(next === 6 ? "completed" : "manual");
    if (next === 1 || next === 2) setSelectedEventId(null);
    else if (next === 3) setSelectedEventId("E4");
    else if (next === 4) setSelectedEventId("E5");
    else if (next >= 5) setSelectedEventId(null);
    announce(SCENE_LABELS[Math.min(next, SCENE_LABELS.length - 1)]);
  }, [scene]);

  const handlePrev = React.useCallback(() => {
    clearTimer();
    const prev = Math.max(scene - 1, 1);
    setScene(prev);
    setPlaybackState("manual");
    if (prev === 1 || prev === 2) setSelectedEventId(null);
    else if (prev === 3) setSelectedEventId("E4");
    else if (prev === 4) setSelectedEventId("E5");
    else if (prev >= 5) setSelectedEventId(null);
    announce(SCENE_LABELS[Math.min(prev, SCENE_LABELS.length - 1)]);
  }, [scene]);

  const handleReplay = React.useCallback(() => {
    clearTimer();
    setScene(0);
    setSelectedEventId(null);
    setActiveFilters([]);
    setPlaybackState("idle");
    announce("Restarted. Press Play to begin.");
  }, []);

  const handleSkip = React.useCallback(() => {
    clearTimer();
    setScene(6);
    setPlaybackState("completed");
    setSelectedEventId(null);
    announce("Skipped to final state. Explore manually.");
  }, []);

  const handleSelectEvent = React.useCallback((id: string) => {
    setSelectedEventId((prev) => (prev === id ? null : id));
    setPlaybackState((s) => (s === "playing" ? "manual" : s));
    clearTimer();
  }, []);

  const handleToggleFilter = React.useCallback((cat: EventCategory) => {
    setActiveFilters((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }, []);

  const handleClearFilters = React.useCallback(() => setActiveFilters([]), []);

  const handleCloseDetail = React.useCallback(() => setSelectedEventId(null), []);

  // Cleanup on unmount
  React.useEffect(() => () => clearTimer(), []);

  // ── Derived state ─────────────────────────────────────────────────────────
  const selectedEvent = events.find((e) => e.id === selectedEventId) ?? null;
  const showDiscussion = scene >= 5;
  const stepCounter = Math.max(0, Math.min(scene, TOTAL_AUTO_SCENES));

  // ── Scene 0: Idle splash ──────────────────────────────────────────────────
  if (playbackState === "idle") {
    return (
      <DemoFrame>
        <div className="flex min-h-[22rem] flex-col items-center justify-center gap-8 px-6 py-12 text-center">
          <div className="max-w-md space-y-3">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#64748B]">
              Interactive concept demonstration
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[#0A192F]">
              See how separate information could become a timeline
            </h2>
            <p className="text-sm text-[#172B4D]/80 leading-relaxed">
              This fictional walkthrough illustrates how fragmented health records from
              different sources might be arranged into a longitudinal view. All data is invented.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              id="demo-play-btn"
              onClick={handlePlay}
              aria-label="Play concept demonstration animation"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0A192F] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#172B4D] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#36978F]"
            >
              <Play className="h-4 w-4" /> Play walkthrough
            </button>
            <button
              onClick={handleSkip}
              aria-label="Skip to final state and explore manually"
              className="inline-flex items-center gap-2 rounded-lg border border-[#D7E0EA] bg-white px-6 py-3 text-sm font-semibold text-[#0A192F] shadow-xs transition-all hover:bg-[#E8EEF5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#36978F]"
            >
              Explore manually
            </button>
          </div>
          {/* Reduced-motion notice */}
          {prefersReducedMotion && (
            <p className="text-[11px] text-[#64748B] italic max-w-xs">
              Reduced motion is enabled. The animation will be skipped and the final interactive state shown immediately.
            </p>
          )}
        </div>
      </DemoFrame>
    );
  }

  // ── Scenes 1–6 ───────────────────────────────────────────────────────────
  return (
    <DemoFrame>
      {/* Live region for screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {liveMessage}
      </div>

      {/* Scene context label */}
      <div className="border-b border-[#D7E0EA] px-4 py-2.5 sm:px-5 sm:py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
          <span
            className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#64748B] shrink-0"
            aria-hidden
          >
            Scene {scene === 6 ? "End" : scene} —
          </span>
          <span className="font-mono text-[10px] text-[#64748B] break-words whitespace-normal" aria-hidden>
            {SCENE_LABELS[Math.min(scene, SCENE_LABELS.length - 1)]}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className="font-mono text-[10px] text-[#64748B]">
            {DEMO_SCENARIO.personLabel}
          </span>
          <span className="font-mono text-[10px] text-[#64748B]">•</span>
          <span className="font-mono text-[10px] text-[#64748B]">
            {DEMO_SCENARIO.scenarioTitle}
          </span>
        </div>
      </div>

      {/* Narrative context banner */}
      <div className="border-b border-[#D7E0EA] bg-[#F8FAFC] px-5 py-2.5 flex items-center gap-2.5">
        <span className="flex h-2 w-2 rounded-full bg-[#36978F] shrink-0" aria-hidden />
        <p className="text-xs font-medium text-[#172B4D] leading-relaxed">
          {SCENE_NARRATIVES[Math.min(scene, SCENE_NARRATIVES.length - 1)]}
        </p>
      </div>

      {/* Main layout */}
      <div className="flex min-h-0 flex-1 flex-col gap-5 p-5 md:flex-row">
        {/* Left: Source tray */}
        <div className="md:w-44 shrink-0">
          <SourceTray
            activeFilters={activeFilters}
            onToggleFilter={handleToggleFilter}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Right: Timeline + detail + discussion */}
        <div className="flex flex-1 min-w-0 flex-col gap-4">
          {/* Timeline */}
          <Timeline
            events={events}
            visibleCount={visibleCount}
            selectedId={selectedEventId}
            activeFilters={activeFilters}
            onSelectEvent={handleSelectEvent}
            axisLabel={DEMO_SCENARIO.timelineAxisLabel}
            scene={scene}
          />

          {/* Event detail panel */}
          {selectedEvent && (
            <EventDetails
              event={selectedEvent}
              onClose={handleCloseDetail}
            />
          )}

          {/* Discussion summary — Scene 5+ */}
          <DiscussionSummary visible={showDiscussion} />

          {/* Scene 6 End CTAs */}
          {scene === 6 && playbackState === "completed" && (
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleReplay}
                aria-label="Replay the walkthrough from the start"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#D7E0EA] bg-white px-4 py-2 text-xs font-semibold text-[#0A192F] shadow-xs transition-all hover:bg-[#E8EEF5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#36978F]"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Replay walkthrough
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="border-t border-[#D7E0EA] px-5 py-3">
        <DemoControls
          state={playbackState}
          step={stepCounter}
          totalSteps={TOTAL_AUTO_SCENES}
          onPlay={handlePlay}
          onPause={handlePause}
          onNext={handleNext}
          onPrev={handlePrev}
          onReplay={handleReplay}
          onSkip={handleSkip}
        />
      </div>
    </DemoFrame>
  );
}

// ─── DemoFrame — wrapper with persistent banner + bottom disclaimer ────────

function DemoFrame({ children }: { children: React.ReactNode }) {
  return (
    <section
      aria-label="MEDRELEX Interactive Concept Demonstration"
      className="flex flex-col rounded-[14px] border border-[#D7E0EA] bg-white shadow-sm overflow-hidden"
    >
      {/* Top persistent banner — required per spec */}
      <div className="flex items-center justify-center gap-2 border-b border-[#D7E0EA] bg-[#E8EEF5] px-4 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#36978F] shrink-0" aria-hidden />
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#0A192F]">
          Concept Demonstration • Fictional Data Only
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col min-h-0">{children}</div>

      {/* Bottom in-frame disclaimer — required per spec */}
      <div className="border-t border-[#D7E0EA] bg-[#F8FAFC] px-5 py-3">
        <p className="text-[11px] text-[#64748B] leading-relaxed text-center">
          {DEMO_SCENARIO.frameDisclaimer}
        </p>
      </div>
    </section>
  );
}

// ─── Hook: prefers-reduced-motion ────────────────────────────────────────────

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}
