import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-20 sm:py-28 flex flex-1 items-center justify-center">
      <div className="mx-auto max-w-xl px-6 sm:px-8 text-center space-y-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8EEF5] text-[#36978F]">
          <FileQuestion className="h-7 w-7" />
        </div>

        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-wider text-[#64748B]">
            404 ERROR
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0A192F]">
            This page could not be found
          </h1>
          <p className="text-base sm:text-lg text-[#172B4D]/80 leading-relaxed">
            The page may have moved or the link may be incorrect.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A192F] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D] active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to MEDRELEX</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
