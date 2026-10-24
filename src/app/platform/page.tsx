import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/content/SectionHeading";
import ConceptLabel from "@/components/content/ConceptLabel";
import ProcessStep from "@/components/content/ProcessStep";
import ConceptDemo from "@/components/demo/ConceptDemo";
import {
  ArrowDown,
  Layers,
  Activity,
  Calendar,
  MessageSquare,
  ShieldAlert,
  Scale,
  CheckCircle2,
  FileText,
  Stethoscope,
} from "lucide-react";

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
  const comparisonItems = [
    {
      term: "A record",
      icon: <FileText className="h-5 w-5" />,
      category: "Point-in-Time Event",
      status: "Clinical Baseline",
      definition:
        "A discrete clinical document, laboratory report, or encounter note capturing a specific interaction at a single healthcare facility.",
      limitation:
        "Typically stored in an isolated electronic health record (EHR) system. Often disconnected from outside clinic visits, daily habits, or personal context.",
      perspective: "Shows what occurred at one clinic visit.",
    },
    {
      term: "A reading",
      icon: <Activity className="h-5 w-5" />,
      category: "Isolated Metric",
      status: "Raw Measurement",
      definition:
        "A single numerical data point—such as blood pressure, fasting glucose, or resting heart rate—recorded during a clinic visit or via home monitor.",
      limitation:
        "Lacks temporal context: why was it elevated? Was medication taken? Did sleep, stress, or symptoms change around the same time?",
      perspective: "Shows what a number was at one instant.",
    },
    {
      term: "A longitudinal view",
      icon: <Calendar className="h-5 w-5" />,
      category: "Temporal Relationship",
      status: "Product Vision",
      definition:
        "Information from authorized clinical sources, home devices, and patient notes arranged chronologically on a unified timeline.",
      limitation:
        "Enables individuals and authorized clinicians to observe intervals, trends, and temporal associations across weeks, months, or years.",
      perspective: "Shows how events and changes relate over time.",
      highlight: true,
    },
    {
      term: "A conversation aid",
      icon: <MessageSquare className="h-5 w-5" />,
      category: "Structured Preparation",
      status: "Design Goal • Not CDS",
      definition:
        "A neutral, synthesized summary of timeline events and questions intended to assist a person when preparing for a clinical appointment.",
      limitation:
        "Empowers focused patient-clinician discussion without generating automated diagnoses, predictions, or replacing clinical judgment.",
      perspective: "Helps organize questions for medical review.",
      highlight: true,
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Authorized information",
      desc: "The long-term concept is to bring together information from authorized clinical records, wearable devices, and personal notes—strictly with patient permission, access, and technical feasibility.",
      status: "Product vision",
    },
    {
      step: "02",
      title: "A shared timeline",
      desc: "Organize events chronologically so that changes, treatments, lab measurements, and reported symptoms can be viewed in temporal relation to one another.",
      status: "Core Thesis",
    },
    {
      step: "03",
      title: "Context around changes",
      desc: "Preserve the provenance, recorded date, and verification status of every entry. Recorded clinical facts remain distinct from self-reported notes and automated synthesis.",
      status: "Design goal",
    },
    {
      step: "04",
      title: "Questions for a clinician",
      desc: "Help individuals identify structured, neutral questions to discuss with an authorized healthcare professional during a consultation. MEDRELEX never provides medical advice or diagnostic conclusions.",
      status: "Potential use • Not CDS",
    },
  ];

  const boundaryItems = [
    {
      title: "Not a live product",
      boundaryType: "Stage Boundary",
      icon: <ShieldAlert className="h-5 w-5 text-[#64748B]" />,
      description:
        "MEDRELEX is in early research and validation. We do not operate a commercial health data service, and this website does not store or process protected health information (PHI).",
      rule: "No commercial or operational availability claims.",
    },
    {
      title: "No automated diagnosis or prediction",
      boundaryType: "Clinical Boundary",
      icon: <Scale className="h-5 w-5 text-[#64748B]" />,
      description:
        "The platform does not diagnose medical conditions, predict disease onset, detect acute emergencies, or recommend treatment regimens. It is not clinical decision support (CDS).",
      rule: "No diagnostic, prognostic, or treatment claims.",
    },
    {
      title: "No proven integration claims",
      boundaryType: "Technical Boundary",
      icon: <Layers className="h-5 w-5 text-[#64748B]" />,
      description:
        "We do not claim certified integrations with specific EHR vendors (such as Epic or Cerner), commercial lab networks, or proprietary wearable platforms until live, tested, and contractually executed.",
      rule: "No unverified third-party connectivity claims.",
    },
    {
      title: "Does not replace professional clinical judgment",
      boundaryType: "Safety Boundary",
      icon: <Stethoscope className="h-5 w-5 text-[#64748B]" />,
      description:
        "Any timeline visualization or discussion summary is designed strictly as a conversation aid between a patient and their authorized clinician. Clinician evaluation and judgment remain paramount.",
      rule: "Support for clinical judgment—not a replacement.",
    },
  ];

  return (
    <div className="py-16 sm:py-24 space-y-20 sm:space-y-28">
      {/* 1. Hero Section */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <header className="border-b border-[#D7E0EA] pb-12 sm:pb-16 max-w-4xl space-y-6">
          <SectionHeading
            eyebrow="THE MEDRELEX VISION"
            title="A clearer view of health, across time."
            description="A health record can capture an event. A measurement can show a moment. MEDRELEX is exploring how relevant information from different moments and sources could be brought into a longitudinal view—with context about when it happened, where it came from, and what questions it may raise."
            as="h1"
          />

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#concept-demo"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A192F] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D] active:scale-[0.98]"
            >
              <span>Explore Concept Demonstration</span>
              <ArrowDown className="h-3.5 w-3.5" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-lg border border-[#D7E0EA] bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0A192F] shadow-xs transition-all hover:bg-[#E8EEF5]"
            >
              How the Concept Works
            </a>
          </div>

          <div className="pt-2">
            <ConceptLabel />
          </div>
        </header>
      </section>

      {/* 2. Conceptual Comparison Table / Cards ("Records are useful. Context can add another layer.") */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 space-y-8">
        <div>
          <SectionHeading
            eyebrow="CONCEPTUAL FOUNDATION"
            title="Records are useful. Context can add another layer."
            description="Understanding health across time requires distinguishing between static data points and longitudinal relationships. Here is how MEDRELEX defines these layers:"
            as="h2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {comparisonItems.map((item) => (
            <div
              key={item.term}
              className={`rounded-[14px] border p-6 sm:p-7 shadow-xs flex flex-col justify-between transition-colors ${
                item.highlight
                  ? "border-[#36978F]/50 bg-white ring-1 ring-[#36978F]/20"
                  : "border-[#D7E0EA] bg-white"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      item.highlight
                        ? "bg-[#36978F]/10 text-[#36978F]"
                        : "bg-[#E8EEF5] text-[#0A192F]"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className="rounded bg-[#F8FAFC] border border-[#D7E0EA] px-2 py-0.5 text-[10px] font-mono font-medium text-[#64748B]">
                    {item.status}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#64748B]">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-semibold text-[#0A192F] mt-0.5">
                    {item.term}
                  </h3>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#D7E0EA]/70">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
                    Definition
                  </p>
                  <p className="text-xs sm:text-sm text-[#172B4D]/85 leading-relaxed">
                    {item.definition}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#D7E0EA]/70">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
                    {item.highlight ? "Added Perspective" : "Current Limitation"}
                  </p>
                  <p className="text-xs sm:text-sm text-[#172B4D]/75 leading-relaxed">
                    {item.limitation}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-[#D7E0EA]/60">
                <p className="text-[11px] font-mono text-[#36978F]">
                  {item.perspective}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. How the Concept Could Work (id="how-it-works") */}
      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 space-y-8 scroll-mt-24 sm:scroll-mt-28"
      >
        <div>
          <SectionHeading
            eyebrow="STEP-BY-STEP ARCHITECTURE"
            title="How the concept could work."
            description="The four architectural phases of the proposed longitudinal health intelligence workflow."
            as="h2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((st) => (
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

      {/* 4. Interactive Concept Demonstration (id="concept-demo") */}
      <section
        id="concept-demo"
        className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 space-y-6 scroll-mt-24 sm:scroll-mt-28"
      >
        <div className="space-y-4">
          <SectionHeading
            eyebrow="INTERACTIVE DEMONSTRATION"
            title="Illustrative Concept Demonstration"
            description="This interactive walkthrough illustrates how fragmented health records from different sources might be arranged into a longitudinal view. All data is invented."
            as="h2"
          />
          <ConceptLabel showDisclaimer={true} />
        </div>

        <div className="pt-2">
          <ConceptDemo />
        </div>
      </section>

      {/* 5. Boundary Matrix ("What this concept does not claim") */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 space-y-8">
        <div>
          <SectionHeading
            eyebrow="SAFETY & CLAIMS GOVERNANCE"
            title="What this concept does not claim."
            description="To maintain absolute credibility and patient safety, MEDRELEX adheres to clear, non-negotiable boundaries regarding current capabilities and intended scope."
            as="h2"
          />
        </div>

        <div className="rounded-2xl border border-[#D7E0EA] bg-white p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D7E0EA] pb-5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#36978F]" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0A192F]">
                Institutional Governance Boundary Matrix
              </span>
            </div>
            <span className="text-xs font-mono text-[#64748B]">
              Ref: Specification Section 2.3 & Claims Register
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {boundaryItems.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#D7E0EA] bg-[#F8FAFC] p-5 sm:p-6 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-[#D7E0EA]">
                      {item.icon}
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#64748B]">
                      {item.boundaryType}
                    </span>
                  </div>
                  <span className="rounded bg-[#E8EEF5] px-2 py-0.5 text-[10px] font-mono text-[#0A192F] border border-[#D7E0EA]">
                    Non-Negotiable
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-[#0A192F]">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#172B4D]/85 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-[#D7E0EA]/70">
                  <p className="text-[11px] font-mono text-[#64748B] flex items-center gap-1.5">
                    <span className="text-[#36978F] font-bold">Rule:</span>
                    <span>{item.rule}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-[#D7E0EA] bg-[#E8EEF5]/40 p-4 text-xs text-[#172B4D]/80 flex items-start gap-3">
            <div className="mt-0.5 rounded bg-white p-1 text-[#36978F] border border-[#D7E0EA] shrink-0">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
            <p className="leading-relaxed">
              <strong>Claims Governance Note:</strong> Any future commercial
              availability, clinical validation study, or regulatory submission
              would depend on rigorous evidence, patient authorizations, institutional
              partnerships, and appropriate oversight.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Next Step Validation CTA */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="rounded-2xl border border-[#D7E0EA] bg-white p-8 sm:p-12 shadow-xs space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#36978F]">
              RESEARCH & COLLABORATION
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A192F]">
              The next step is validation.
            </h2>
            <p className="text-base text-[#172B4D]/85 leading-relaxed">
              The right initial use case must be shaped by people who manage
              health information and by healthcare professionals who understand
              real workflows. MEDRELEX is exploring these needs before making
              claims about availability or clinical value.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/contact?audience=individual"
              className="inline-flex items-center justify-center rounded-lg bg-[#0A192F] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D] active:scale-[0.98]"
            >
              Join Early Research (Individuals)
            </Link>
            <Link
              href="/contact?audience=clinician"
              className="inline-flex items-center justify-center rounded-lg border border-[#D7E0EA] bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0A192F] shadow-xs transition-all hover:bg-[#E8EEF5]"
            >
              Share Clinician Workflow Feedback
            </Link>
            <Link
              href="/contact?audience=partner"
              className="inline-flex items-center justify-center rounded-lg border border-[#D7E0EA] bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0A192F] shadow-xs transition-all hover:bg-[#E8EEF5]"
            >
              Explore Partnership Conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
