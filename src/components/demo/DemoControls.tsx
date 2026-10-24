"use client";

/**
 * DemoControls — playback bar with Play/Pause, Prev/Next, Replay, Skip.
 */

import React from "react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw, FastForward } from "lucide-react";

export type PlaybackState = "idle" | "playing" | "paused" | "manual" | "completed";

interface DemoControlsProps {
  state: PlaybackState;
  step: number;
  totalSteps: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReplay: () => void;
  onSkip: () => void;
}

function IconBtn({
  onClick,
  label,
  disabled = false,
  children,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={[
        "flex h-10 w-10 items-center justify-center rounded-lg border border-[#D7E0EA] bg-white",
        "text-[#0A192F] transition-colors",
        "hover:bg-[#E8EEF5] active:scale-[0.96]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#36978F]",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function DemoControls({
  state,
  step,
  totalSteps,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReplay,
  onSkip,
}: DemoControlsProps) {
  const isPlaying = state === "playing";
  const isIdle = state === "idle";
  const isCompleted = state === "completed";

  return (
    <div className="flex items-center justify-between gap-3 rounded-[10px] border border-[#D7E0EA] bg-[#F8FAFC] px-4 py-2.5">
      {/* Step counter */}
      <p
        className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#64748B] shrink-0"
        aria-live="polite"
        aria-atomic="true"
      >
        {isIdle ? "Ready" : isCompleted ? "Complete" : `Step ${step} of ${totalSteps}`}
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2" role="toolbar" aria-label="Demo playback controls">
        <IconBtn onClick={onPrev} label="Previous step" disabled={step <= 1 && !isCompleted}>
          <SkipBack className="h-4 w-4" />
        </IconBtn>

        {isPlaying ? (
          <button
            type="button"
            onClick={onPause}
            aria-label="Pause animation"
            className={[
              "flex h-10 w-24 items-center justify-center gap-1.5 rounded-lg bg-[#0A192F] px-3",
              "text-xs font-semibold text-white transition-colors hover:bg-[#172B4D]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#36978F]",
            ].join(" ")}
          >
            <Pause className="h-3.5 w-3.5" /> Pause
          </button>
        ) : (
          <button
            type="button"
            onClick={isCompleted ? onReplay : onPlay}
            aria-label={isCompleted ? "Replay animation" : "Play animation"}
            className={[
              "flex h-10 w-24 items-center justify-center gap-1.5 rounded-lg bg-[#0A192F] px-3",
              "text-xs font-semibold text-white transition-colors hover:bg-[#172B4D]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#36978F]",
            ].join(" ")}
          >
            {isCompleted
              ? <><RotateCcw className="h-3.5 w-3.5" /> Replay</>
              : <><Play className="h-3.5 w-3.5" /> Play</>
            }
          </button>
        )}

        <IconBtn onClick={onNext} label="Next step" disabled={isCompleted}>
          <SkipForward className="h-4 w-4" />
        </IconBtn>
      </div>

      {/* Skip */}
      {!isCompleted && (
        <button
          type="button"
          onClick={onSkip}
          aria-label="Skip to final state"
          className={[
            "flex items-center gap-1 rounded-md px-2.5 py-1.5",
            "font-mono text-[11px] font-semibold uppercase tracking-wider text-[#64748B]",
            "transition-colors hover:text-[#0A192F] hover:bg-[#E8EEF5]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#36978F]",
          ].join(" ")}
        >
          <FastForward className="h-3 w-3" /> Skip
        </button>
      )}
    </div>
  );
}
