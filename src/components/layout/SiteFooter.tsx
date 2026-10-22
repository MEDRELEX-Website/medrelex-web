import Link from "next/link";
import { Activity } from "lucide-react";

export default function SiteFooter() {
  // Hardcoded static year (2026) to prevent SSR/client hydration mismatch
  const currentYear = 2026;

  const footerLinks = {
    solutions: [
      { label: "Clinical Intelligence", href: "/#clinical" },
      { label: "Data Interoperability", href: "/#interoperability" },
      { label: "Compliance & Security", href: "/#compliance" },
      { label: "Telehealth Workflows", href: "/#telehealth" },
    ],
    company: [
      { label: "About Medrelex", href: "/#about" },
      { label: "Careers", href: "/#careers" },
      { label: "News & Insights", href: "/#news" },
      { label: "Contact Us", href: "/#contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "HIPAA Compliance", href: "/hipaa" },
      { label: "Security", href: "/security" },
    ],
  };

  return (
    <footer suppressHydrationWarning className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div suppressHydrationWarning className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
                <Activity className="h-4 w-4" />
              </div>
              <span>Medrelex</span>
            </Link>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Next-generation healthcare intelligence and digital workflow platform designed for medical professionals.
            </p>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-zinc-900 dark:text-zinc-100">
              Solutions
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.solutions.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-zinc-900 dark:text-zinc-100">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-zinc-900 dark:text-zinc-100">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar with static year */}
        <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
            &copy; {currentYear} Medrelex, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
