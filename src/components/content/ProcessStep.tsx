import React from "react";

interface ProcessStepProps {
  stepNumber: string;
  title: string;
  description: string;
  statusQualifier?: string;
  className?: string;
}

export default function ProcessStep({
  stepNumber,
  title,
  description,
  statusQualifier,
  className = "",
}: ProcessStepProps) {
  return (
    <div
      className={`rounded-[14px] border border-[#D7E0EA] bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between transition-colors hover:border-[#36978F]/40 ${className}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2.5">
          <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[#36978F] shrink-0">
            {stepNumber}
          </span>
          {statusQualifier && (
            <span className="rounded bg-[#E8EEF5] px-2 py-0.5 text-[11px] font-mono font-medium text-[#0A192F] border border-[#D7E0EA] shrink-0 text-right">
              {statusQualifier}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#0A192F]">
            {title}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-[#172B4D]/80 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
