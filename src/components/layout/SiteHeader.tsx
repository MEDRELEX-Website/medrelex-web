'use client';

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const navLinks = [
  { href: "/platform", label: "Platform" },
  { href: "/healthcare-professionals", label: "For Healthcare Professionals" },
  { href: "/privacy-trust", label: "Privacy & Trust" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const mounted = useMounted();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header
      suppressHydrationWarning
      className="sticky top-0 z-50 w-full border-b border-[#D7E0EA] bg-[#F8FAFC]/95 backdrop-blur-sm"
    >
      <div
        suppressHydrationWarning
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12"
      >
        {/* Brand Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#36978F] rounded-sm"
          onClick={closeMenu}
          aria-label="MEDRELEX home"
        >
          <span className="text-xl font-bold tracking-tight text-[#0A192F] transition-colors group-hover:text-[#36978F]">
            MEDRELEX
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-wider text-[#64748B] border border-[#D7E0EA] rounded px-1.5 py-0.5 ml-1">
            Research Preview
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex lg:items-center lg:gap-8"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#36978F] rounded px-1 py-0.5 ${
                  isActive
                    ? "text-[#0A192F] font-semibold underline decoration-[#36978F] decoration-2 underline-offset-8"
                    : "text-[#64748B] hover:text-[#0A192F]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Primary Action */}
        <div className="hidden lg:flex lg:items-center">
          <Link
            href="/contact?audience=individual"
            className="inline-flex items-center justify-center rounded-lg bg-[#0A192F] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#36978F] focus-visible:ring-offset-2"
          >
            Join Early Research
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-[#172B4D] border border-[#D7E0EA] bg-white hover:bg-[#E8EEF5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#36978F]"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mounted && isOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-x-0 top-20 bottom-0 bg-[#F8FAFC] border-b border-[#D7E0EA] px-6 py-8 shadow-xl lg:hidden overflow-y-auto"
        >
          <nav className="flex flex-col space-y-4 max-w-lg mx-auto" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[#E8EEF5] text-[#0A192F] font-semibold"
                      : "text-[#172B4D] hover:bg-[#E8EEF5]/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-[#D7E0EA]">
              <Link
                href="/contact?audience=individual"
                onClick={closeMenu}
                className="flex w-full items-center justify-center rounded-lg bg-[#0A192F] px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D]"
              >
                Join Early Research
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
