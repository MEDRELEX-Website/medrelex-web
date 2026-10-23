import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/content/SectionHeading";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About MEDRELEX | Our Mission",
  description:
    "Learn why MEDRELEX is exploring a more connected, longitudinal view of personal health information.",
  alternates: {
    canonical: "https://medrelex.com/about",
  },
  openGraph: {
    title: "About MEDRELEX | Our Mission",
    description:
      "Learn why MEDRELEX is exploring a more connected, longitudinal view of personal health information.",
    url: "https://medrelex.com/about",
    siteName: "MEDRELEX",
    locale: "en_US",
    type: "website",
  },
};

export default function AboutPage() {
  const workingPrinciples = [
    {
      title: "Listen before scaling",
      description:
        "Understanding real clinical workflows and individual needs precedes any feature expansion or commercial scale.",
    },
    {
      title: "Distinguish information from interpretation",
      description:
        "Preserving clear boundaries between recorded clinical measurements, self-reported notes, and automated synthesis.",
    },
    {
      title: "Make the source and limits of a claim visible",
      description:
        "Provenance, recorded timestamps, and uncertainty must accompany data displays rather than treating all inputs identically.",
    },
    {
      title: "Treat privacy and authorization as product requirements",
      description:
        "Permissioned access, data minimization, and discretion are foundational architectural pillars, not compliance add-ons.",
    },
    {
      title: "Build evidence before making clinical or performance claims",
      description:
        "Demonstrable utility and peer-reviewed rigor must precede any claims regarding diagnostic efficacy or clinical outcomes.",
    },
  ];

  const founders = [
    {
      name: "Ahsan Ishfaq",
      role: "Founder & CEO",
      bio: "Ahsan leads MEDRELEX with a focus on product strategy and the core thesis: how health information can be understood more clearly across time. The company is in an early development and validation stage.",
    },
    {
      name: "M. Waqar Saleem",
      role: "Founder & COO",
      bio: "Waqar oversees operations, research translation, and execution at MEDRELEX, focusing on bridging clinical workflow feedback with patient-centered longitudinal timeline design.",
    },
    {
      name: "M. Ammar Saleem",
      role: "Founder & CTO",
      bio: "Ammar leads technical architecture and engineering systems at MEDRELEX, focusing on building private, secure, and extensible infrastructure for longitudinal health intelligence.",
    },
  ];

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        {/* Hero Section */}
        <header className="border-b border-[#D7E0EA] pb-12 sm:pb-16">
          <SectionHeading
            eyebrow="ABOUT MEDRELEX"
            title="Building around the complete health story."
            description="MEDRELEX began with a simple question: even when health information exists, how can people and their healthcare teams better understand what it means over time? We are exploring a more connected, longitudinal approach to health intelligence—starting with customer and clinician validation, and building only where the need is clear."
            as="h1"
          />
        </header>

        {/* Section: Start with the problem. Validate the need. */}
        <section className="py-12 sm:py-16 border-b border-[#D7E0EA]">
          <SectionHeading
            title="Start with the problem. Validate the need."
            as="h2"
          />
          <div className="mt-6 prose prose-slate max-w-none text-base sm:text-lg text-[#172B4D]/85 leading-relaxed space-y-4">
            <p>
              A useful health intelligence product must do more than collect
              information. It must help people understand the timing, source, and
              context of information without overstating what the data can tell
              them. MEDRELEX’s early work is focused on understanding which use
              cases deserve to be built first.
            </p>
          </div>
        </section>

        {/* Leadership / Founders */}
        <section className="py-12 sm:py-16 border-b border-[#D7E0EA]">
          <SectionHeading
            eyebrow="LEADERSHIP & GOVERNANCE"
            title="Leadership & Founders"
            description="MEDRELEX is led by founders combining product strategy, clinical translation, and secure systems architecture."
            as="h2"
          />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="rounded-[14px] border border-med-border bg-[#FFFFFF] p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                    {founder.role}
                  </p>
                  <h3 className="mt-2 text-lg sm:text-xl font-semibold tracking-tight text-[#0A192F]">
                    {founder.name}
                  </h3>
                  <p className="mt-3 text-sm text-[#172B4D]/85 leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Working Principles */}
        <section className="py-12 sm:py-16 border-b border-[#D7E0EA]">
          <SectionHeading
            title="Our working principles"
            description="Restraint and evidence guide every design decision we make."
            as="h2"
          />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-6">
            {workingPrinciples.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[14px] border border-[#D7E0EA] bg-white p-6 shadow-xs flex items-start gap-4 transition-colors hover:border-[#36978F]/40"
              >
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8EEF5] text-[#36978F]">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#64748B]">
                      0{index + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-[#0A192F]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#172B4D]/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="pt-12 sm:pt-16">
          <div className="rounded-[14px] border border-[#D7E0EA] bg-white p-8 sm:p-10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#0A192F]">
                Contribute to the research
              </h2>
              <p className="text-sm sm:text-base text-[#172B4D]/80 max-w-xl">
                We are actively seeking feedback from individuals, physicians, and
                organizations to guide our validation roadmap.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A192F] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D] active:scale-[0.98] shrink-0"
            >
              <span>Help Shape MEDRELEX</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
