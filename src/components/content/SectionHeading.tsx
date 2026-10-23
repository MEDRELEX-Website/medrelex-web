import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  as: Component = "h2",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  const headingClasses = {
    h1: "text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0A192F] leading-[1.12]",
    h2: "text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#0A192F] leading-[1.15]",
    h3: "text-xl sm:text-2xl font-semibold tracking-tight text-[#0A192F] leading-[1.25]",
  }[Component];

  return (
    <div
      className={`space-y-3 ${
        isCenter ? "text-center mx-auto items-center flex flex-col" : "text-left"
      } ${className}`}
    >
      {eyebrow && (
        <p className="text-xs font-semibold tracking-wider text-[#64748B] uppercase font-mono">
          {eyebrow}
        </p>
      )}
      <Component className={headingClasses}>{title}</Component>
      {description && (
        <p
          className={`text-base sm:text-lg text-[#172B4D]/80 leading-relaxed max-w-3xl ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
