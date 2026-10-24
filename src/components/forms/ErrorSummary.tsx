"use client";

import React, { useEffect, useRef } from "react";
import { AlertCircle } from "lucide-react";

export interface FieldErrorItem {
  fieldId: string;
  message: string;
  label?: string;
}

interface ErrorSummaryProps {
  errors: Record<string, string>;
  fieldIdMap?: Record<string, string>;
  title?: string;
  className?: string;
}

export default function ErrorSummary({
  errors,
  fieldIdMap = {},
  title = "Please check the following",
  className = "",
}: ErrorSummaryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const errorKeys = Object.keys(errors);

  // Focus the error summary when errors appear
  useEffect(() => {
    if (errorKeys.length > 0 && containerRef.current) {
      containerRef.current.focus();
    }
  }, [errorKeys.length]);

  if (errorKeys.length === 0) return null;

  const handleLinkClick = (e: React.MouseEvent, fieldKey: string) => {
    e.preventDefault();
    const targetId = fieldIdMap[fieldKey] || `field-${fieldKey}`;
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      targetElement.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      role="alert"
      aria-labelledby="error-summary-heading"
      tabIndex={-1}
      className={`rounded-[12px] border border-red-300 bg-red-50/80 p-5 shadow-xs focus:outline-none focus:ring-2 focus:ring-red-400 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertCircle className="h-4 w-4" aria-hidden />
        </div>
        <div className="space-y-2 flex-1">
          <h3
            id="error-summary-heading"
            className="text-sm font-semibold text-red-900"
          >
            {title}
          </h3>
          <ul className="space-y-1.5 text-xs text-red-800 list-disc list-inside">
            {errorKeys.map((key) => {
              const targetId = fieldIdMap[key] || `field-${key}`;
              return (
                <li key={key}>
                  <a
                    href={`#${targetId}`}
                    onClick={(e) => handleLinkClick(e, key)}
                    className="font-medium underline hover:text-red-950 focus:outline-none focus:ring-1 focus:ring-red-600 rounded-sm"
                  >
                    {errors[key]}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
