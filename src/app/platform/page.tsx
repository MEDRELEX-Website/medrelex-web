import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/content/SectionHeading";
import ProcessStep from "@/components/content/ProcessStep";
import ConceptDemo from "@/components/demo/ConceptDemo";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "The MEDRELEX Vision | Longitudinal Health Intelligence",
  description:
    "Explore MEDRELEX’s concept for longitudinal health context, meaningful changes, and more informed healthcare conversations.",
  alternates: {
    canonical: "https://medrelex.com/platform",
  },
  openGraph: {
    title: "The MEDRELEX Vision | Longitudinal Health Intelligence",
    description:
      "Explore MEDRELEX’s concept for longitudinal health context, meaningful changes, and more informed healthcare conversations.",
    url: "https://medrelex.com/platform",
    siteName: "MEDRELEX",
    locale: "en_US",
    type: "website",
  },
};

export default function PlatformPage() {
  const steps = [
    {
      step: "01",
      title: "Bring relevant information together",
      desc: "The long-term concept is to organize information from authorized sources, subject to permissions, access, and technical feasibility.",
      status: "Product vision",
    },
    {
      step: "02",
      title: "Place events in time",
      desc: "A longitudinal view could make it easier to see when measurements, reported symptoms, medication changes, and other events occurred.",
      status: "Product vision",
    },
    {
      step: "03",
      title: "Show context and uncertainty",
      desc: "Source details, dates, and verification status should help people distinguish recorded facts from reported information and interpretation.",
      status: "Design goal",
    },
    {
      step: "04",
      title: "Prepare for a conversation",
      desc: "A concise view may help a person identify questions to discuss with an authorized healthcare professional. It does not replace clinical judgment.",
      status: "Potential use; not CDS",
    },
  ];

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 space-y-16 sm:space-y-20">
        {/* Hero Section */}
        <header className="border-b border-[#D7E0EA] pb-12 sm:pb-16 max-w-5xl">
          <SectionHeading
            eyebrow="THE MEDRELEX VISION"
            title="A clearer view of health, across time."
            description="A health record can capture an event. A measurement can show a moment. MEDRELEX is exploring how relevant information from different moments and sources could be brought into a longitudinal view—with context about when it happened, where it came from, and what questions it may raise."
            as="h1"
          />
        </header>

        {/* Interactive Concept Demonstration Section */}
        <section id="concept-demo" className="space-y-6">
          <SectionHeading
            title="Illustrative Concept Demonstration"
            description="This interactive walkthrough illustrates how fragmented health records from different sources might be arranged into a longitudinal view. All data is invented."
            as="h2"
          />
          <ConceptDemo />
        </section>

        {/* 4 Steps Architecture */}
        <section className="space-y-8">
          <SectionHeading
            title="From information to context"
            description="The four architectural pillars guiding our platform exploration."
            as="h2"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((st) => (
              <ProcessStep
                key={st.step}
                stepNumber={st.step}
                title={st.title}
                description={st.desc}
                statusQualifier={st.status}
              />
            ))}
          </div>
        </section>

        {/* Section: The next step is validation */}
        <section className="rounded-[14px] border border-[#D7E0EA] bg-white p-8 sm:p-10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#0A192F]">
              The next step is validation.
            </h2>
            <p className="text-base text-[#172B4D]/85 leading-relaxed">
              The right initial use case must be shaped by people who manage
              health information and by healthcare professionals who understand
              real workflows. MEDRELEX is exploring these needs before making
              claims about availability or clinical value.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A192F] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D] active:scale-[0.98] shrink-0"
          >
            <span>Share Your Perspective</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
