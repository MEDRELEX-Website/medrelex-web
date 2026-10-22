'use client';

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { Menu, X, Activity } from "lucide-react";

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/#platform", label: "Platform" },
  { href: "/#about", label: "About Us" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteHeader() {
  // Safe initial state: false on both server and initial client render
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header suppressHydrationWarning className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800/80 dark:bg-black/90">
      <div suppressHydrationWarning className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 transition-colors hover:text-emerald-600 dark:text-zinc-50 dark:hover:text-emerald-400"
          onClick={closeMenu}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
            <Activity className="h-5 w-5" />
          </div>
          <span>Medrelex</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Button */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <Link
            href="/#portal"
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
          >
            Portal Access
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer: safe SSR hydration, rendered cleanly when opened on client */}
      {mounted && isOpen && (
        <div className="border-b border-zinc-200 bg-white px-4 pt-2 pb-6 shadow-lg md:hidden dark:border-zinc-800 dark:bg-zinc-950">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="rounded-md px-3 py-2 text-base font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/#portal"
                onClick={closeMenu}
                className="flex w-full items-center justify-center rounded-full bg-emerald-600 px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700"
              >
                Portal Access
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
