import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/content/SectionHeading";
import {
  HelpCircle,
  Stethoscope,
  Clock,
  FileCheck2,
  MessageSquare,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "For Healthcare Professionals | MEDRELEX",
  description:
    "Share clinician workflow feedback as MEDRELEX explores longitudinal health context and patient-centered consultation preparation.",
  alternates: {
    canonical: "https://medrelex.com/healthcare-professionals",
  },
  openGraph: {
    title: "For Healthcare Professionals | MEDRELEX",
    description:
      "Share clinician workflow feedback as MEDRELEX explores longitudinal health context and patient-centered consultation preparation.",
    url: "https://medrelex.com/healthcare-professionals",
    siteName: "MEDRELEX",
    locale: "en_US",
    type: "website",
  },
};

export default function HealthcareProfessionalsPage() {
  const clinicianQuestions = [
    "Which parts of a patient’s history are hardest to reconstruct before or during a consultation?",
    "How do you distinguish source-recorded information, patient-reported information, and information that has been clinically reviewed?",
    "When a measurement changes, what surrounding context is useful—and what risks making a display misleading?",
    "What would make a pre-visit summary useful, safe, and easy to review without adding workflow burden?",
  ];

  const workflowConcepts = [
    {
      concept: "Pre-consultation summary",
      copy: "A concise, time-ordered view of selected history and questions could help structure a discussion.",
      status: "Product vision",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      concept: "Changes over time",
      copy: "A timeline could show measurements, medication events, symptoms reported by the person, and relevant dates together.",
      status: "Product vision",
      icon: <Stethoscope className="h-5 w-5" />,
    },
    {
      concept: "Source clarity",
      copy: "The interface should make the origin and status of information visible, rather than treating all entries as equally verified.",
      status: "Design goal",
      icon: <FileCheck2 className="h-5 w-5" />,
    },
    {
      concept: "Conversation support",
      copy: "A summary could help the patient and clinician identify questions or gaps for review.",
      status: "Potential use; not clinical decision support",
      icon: <MessageSquare className="h-5 w-5" />,
    },
  ];

  const contributionPaths = [
    {
      title: "Share clinical workflow feedback",
      description:
        "A short discussion about current processes, electronic health record pain points, and unmet needs.",
      cta: "Provide Workflow Feedback",
    },
    {
      title: "Discuss an advisory or research conversation",
      description:
        "Explore whether structured input could help shape the clinical validity and safety thesis.",
      cta: "Inquire About Advisory Input",
    },
    {
      title: "Explore a future pilot",
      description:
        "Register institutional interest only; no clinical pilot or validation trial is promised or currently active.",
      cta: "Register Pilot Interest",
    },
  ];

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 space-y-16 sm:space-y-20">
        {/* Hero Section */}
        <header className="border-b border-[#D7E0EA] pb-12 sm:pb-16 max-w-5xl">
          <SectionHeading
            eyebrow="FOR PHYSICIANS AND HEALTHCARE PROFESSIONALS"
            title="A clearer longitudinal view of the patient."
            description="MEDRELEX is exploring how relevant health information across time and sources could be presented in a more useful context for patients and their authorized healthcare professionals. We are seeking clinician input to understand where current workflows fall short and what would genuinely help in practice."
            as="h1"
          />
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/contact?audience=clinician"
              className="inline-flex items-center justify-center rounded-lg bg-[#0A192F] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D] active:scale-[0.98]"
            >
              Share Clinical Workflow Feedback
            </Link>
            <Link
              href="/contact?audience=clinician"
              className="inline-flex items-center justify-center rounded-lg border border-[#D7E0EA] bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0A192F] shadow-xs transition-all hover:bg-[#E8EEF5]"
            >
              Discuss an Advisory Conversation
            </Link>
          </div>
        </header>

        {/* Questions we want to understand */}
        <section className="space-y-6">
          <SectionHeading
            title="Questions we want to understand"
            description="We are speaking with practicing clinicians across primary care and specialties to ground our development in clinical reality."
            as="h2"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
            {clinicianQuestions.map((question, idx) => (
              <div
                key={idx}
                className="rounded-[14px] border border-[#D7E0EA] bg-white p-6 sm:p-7 shadow-xs flex items-start gap-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8EEF5] text-[#36978F]">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <p className="text-base text-[#172B4D]/90 font-medium leading-relaxed">
                  {question}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Potential workflow concepts */}
        <section className="space-y-6">
          <SectionHeading
            title="Potential workflow concepts"
            description="Exploratory concepts designed to inform patient preparation and consultation clarity."
            as="h2"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {workflowConcepts.map((item) => (
              <div
                key={item.concept}
                className="rounded-[14px] border border-[#D7E0EA] bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between hover:border-[#36978F]/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] text-[#36978F]">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0A192F]">
                      {item.concept}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-[#172B4D]/80 leading-relaxed">
                      {item.copy}
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#D7E0EA]/60">
                  <span className="inline-block rounded bg-[#E8EEF5] px-2.5 py-1 text-[11px] font-mono text-[#0A192F] border border-[#D7E0EA]">
                    Status: {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Support for clinical judgment—not a replacement */}
        <section className="rounded-[14px] border border-[#D7E0EA] bg-white p-6 sm:p-10 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] text-[#64748B]">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#0A192F]">
                Support for clinical judgment—not a replacement.
              </h2>
              <p className="text-base text-[#172B4D]/85 leading-relaxed">
                Any future MEDRELEX workflow must preserve clinician judgment,
                communicate uncertainty, and avoid presenting an automated
                interpretation as a definitive medical conclusion. The concepts
                shown here are illustrative and have not been presented as
                clinically validated.
              </p>
            </div>
          </div>
        </section>

        {/* Ways to contribute */}
        <section className="space-y-6">
          <SectionHeading
            title="Ways to contribute"
            description="Help us validate whether longitudinal context can reduce documentation fatigue and improve consultation alignment."
            as="h2"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {contributionPaths.map((path) => (
              <div
                key={path.title}
                className="rounded-[14px] border border-[#D7E0EA] bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold text-[#0A192F]">
                    {path.title}
                  </h3>
                  <p className="text-sm text-[#172B4D]/80 leading-relaxed">
                    {path.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#D7E0EA]/60">
                  <Link
                    href="/contact?audience=clinician"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#0A192F] hover:text-[#36978F] transition-colors uppercase tracking-wider"
                  >
                    <span>{path.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
