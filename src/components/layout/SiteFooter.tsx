import Link from "next/link";

export default function SiteFooter() {
  const currentYear = 2026;

  const footerNav = [
    { label: "Platform", href: "/platform" },
    { label: "For Healthcare Professionals", href: "/healthcare-professionals" },
    { label: "Privacy & Trust", href: "/privacy-trust" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Website Privacy Notice", href: "/privacy-notice" },
  ];

  return (
    <footer
      suppressHydrationWarning
      className="border-t border-[#D7E0EA] bg-[#0A192F] text-white"
    >
      <div
        suppressHydrationWarning
        className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand Info & Mission */}
          <div className="space-y-4 lg:col-span-6">
            <Link
              href="/"
              className="inline-block text-xl font-bold tracking-tight text-white hover:text-[#36978F] transition-colors"
            >
              MEDRELEX
            </Link>
            <p className="text-sm leading-relaxed text-[#D7E0EA]/80 max-w-md">
              MEDRELEX is developing a private health intelligence platform designed to help people understand health information over time.
            </p>
            <div className="inline-block rounded border border-[#D7E0EA]/20 bg-white/5 px-3 py-1 text-xs text-[#D7E0EA]/70 font-mono">
              Initial Market: United States • Early Development & Validation Stage
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#36978F] mb-4">
              Navigation & Governance
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#D7E0EA]/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Safety & Legal Disclaimer */}
        <div className="mt-12 pt-8 border-t border-[#D7E0EA]/15 text-xs leading-relaxed text-[#D7E0EA]/60">
          <p>
            MEDRELEX is currently in an early development and validation stage. The concepts, demonstration screens, and scenarios presented on this website are for illustrative purposes and do not represent a commercial product, clinical diagnosis, medical advice, or certified health service.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D7E0EA]/60 gap-4">
          <p>&copy; {currentYear} MEDRELEX. All rights reserved.</p>
          <p className="font-mono text-[11px]">Strict claims governance enabled</p>
        </div>
      </div>
    </footer>
  );
}
