"use client";

import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  counter?: {
    current: number;
    max: number;
  };
}

export function FormField({
  id,
  label,
  required = false,
  helperText,
  error,
  children,
  className = "",
  counter,
}: FormFieldProps) {
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={id}
          className="block text-xs font-semibold uppercase tracking-wider text-[#0A192F] font-mono"
        >
          {label} {required && <span className="text-[#36978F]" aria-hidden>*</span>}
          {required && <span className="sr-only">(required)</span>}
        </label>
        {counter && (
          <span
            className={`text-[11px] font-mono ${
              counter.current > counter.max
                ? "text-red-600 font-semibold"
                : "text-[#64748B]"
            }`}
            aria-live="polite"
          >
            {counter.max - counter.current} remaining
          </span>
        )}
      </div>

      {helperText && (
        <p id={helperId} className="text-xs text-[#64748B] leading-relaxed">
          {helperText}
        </p>
      )}

      {/* Inject aria-describedby and aria-invalid into child if it is a valid React element */}
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<any>, {
            id,
            "aria-invalid": !!error,
            "aria-describedby": describedBy,
          })
        : children}

      {error && (
        <p id={errorId} className="text-xs font-medium text-red-600 leading-tight">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ hasError, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded-[8px] border bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#172B4D] transition-colors placeholder:text-[#64748B]/60 focus:border-[#36978F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#36978F]/20 disabled:opacity-50 ${
          hasError
            ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-200"
            : "border-[#D7E0EA]"
        } ${className}`}
        {...props}
      />
    );
  }
);
TextInput.displayName = "TextInput";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ hasError, className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full rounded-[8px] border bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#172B4D] transition-colors placeholder:text-[#64748B]/60 focus:border-[#36978F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#36978F]/20 disabled:opacity-50 ${
          hasError
            ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-200"
            : "border-[#D7E0EA]"
        } ${className}`}
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextArea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError, className = "", children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-full rounded-[8px] border bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#172B4D] transition-colors focus:border-[#36978F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#36978F]/20 disabled:opacity-50 ${
          hasError
            ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-200"
            : "border-[#D7E0EA]"
        } ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  id: string;
  hasError?: boolean;
}

export function Checkbox({ label, id, hasError, className = "", ...props }: CheckboxProps) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <input
        type="checkbox"
        id={id}
        className={`mt-1 h-4 w-4 shrink-0 rounded-[4px] border-[#D7E0EA] text-[#36978F] focus:ring-2 focus:ring-[#36978F]/30 ${
          hasError ? "border-red-400" : ""
        }`}
        {...props}
      />
      <label htmlFor={id} className="text-xs text-[#172B4D]/85 leading-relaxed select-none">
        {label}
      </label>
    </div>
  );
}

export function HoneypotField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        opacity: 0,
        position: "absolute",
        top: 0,
        left: 0,
        height: 0,
        width: 0,
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <label htmlFor="website_hp">Do not fill this field</label>
      <input
        type="text"
        id="website_hp"
        name="website_hp"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
