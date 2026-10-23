import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | MEDRELEX",
  description: "Your inquiry has been submitted.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <div className="rounded-[14px] border border-[#D7E0EA] bg-white p-8 sm:p-12 shadow-xs text-center space-y-8">
          {/* Status Indicator */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8EEF5] text-[#36978F]">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          {/* Heading and Confirmation Body */}
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-wider text-[#64748B]">
              SUBMISSION CONFIRMED
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0A192F]">
              Thank you for reaching out.
            </h1>
            <p className="text-base sm:text-lg text-[#172B4D]/85 leading-relaxed">
              Your message has been submitted. MEDRELEX is in an early development
              and validation stage; submitting this form does not guarantee a
              particular response time or participation in a research, advisory,
              or pilot program.
            </p>
          </div>

          {/* Warning Banner */}
          <div className="rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] p-4 text-left flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-[#64748B] shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-[#172B4D]/80 leading-relaxed">
              <strong className="font-semibold text-[#0A192F]">
                Safety Reminder:
              </strong>{" "}
              Please do not email or submit medical records or sensitive health
              information in follow-up.
            </p>
          </div>

          {/* Action Links */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A192F] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to MEDRELEX</span>
            </Link>
            <Link
              href="/platform"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-[#D7E0EA] bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0A192F] shadow-xs transition-all hover:bg-[#E8EEF5]"
            >
              <span>Explore the Platform Vision</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
