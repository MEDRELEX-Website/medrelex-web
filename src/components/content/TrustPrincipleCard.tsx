import React from "react";

interface TrustPrincipleCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  qualifier: string;
  className?: string;
}

export default function TrustPrincipleCard({
  icon,
  title,
  description,
  qualifier,
  className = "",
}: TrustPrincipleCardProps) {
  return (
    <div
      className={`rounded-[14px] border border-[#D7E0EA] bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between transition-colors hover:border-[#36978F]/50 ${className}`}
    >
      <div className="space-y-4">
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] text-[#36978F]">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#0A192F]">
            {title}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-[#172B4D]/80 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#D7E0EA]/60">
        <div className="inline-flex items-center gap-1.5 rounded bg-[#E8EEF5] px-2.5 py-1 text-[11px] font-mono text-[#0A192F] border border-[#D7E0EA]">
          <span className="font-semibold text-[#64748B]">Truth Qualifier:</span>
          <span>{qualifier}</span>
        </div>
      </div>
    </div>
  );
}
