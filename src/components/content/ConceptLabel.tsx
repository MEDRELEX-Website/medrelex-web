import React from "react";

interface ConceptLabelProps {
  className?: string;
  showDisclaimer?: boolean;
}

export default function ConceptLabel({
  className = "",
  showDisclaimer = false,
}: ConceptLabelProps) {
  return (
    <div className={`inline-flex flex-col gap-1.5 ${className}`}>
      <div className="inline-flex items-center gap-2 rounded border border-[#D7E0EA] bg-white px-2.5 py-1 shadow-xs">
        <span
          className="h-1.5 w-1.5 rounded-full bg-[#36978F]"
          aria-hidden="true"
        />
        <span className="font-mono text-[11px] font-semibold tracking-wider text-[#0A192F] uppercase">
          CONCEPT DEMONSTRATION • FICTIONAL DATA ONLY
        </span>
      </div>
      {showDisclaimer && (
        <p className="text-xs text-[#64748B] leading-relaxed max-w-xl">
          This illustrative screen is not a live MEDRELEX product, medical record,
          clinical assessment, or medical advice. The example is fictional and does
          not represent a real person or validated clinical workflow.
        </p>
      )}
    </div>
  );
}
