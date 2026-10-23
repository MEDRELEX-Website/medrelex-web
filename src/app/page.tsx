import Link from "next/link";
import SectionHeading from "@/components/content/SectionHeading";
import ConceptLabel from "@/components/content/ConceptLabel";
import ProcessStep from "@/components/content/ProcessStep";
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Building2,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  const problemCards = [
    {
      title: "Different pieces",
      desc: "Records, lab reports, medications, home measurements, and personal observations may live in different places.",
    },
    {
      title: "Context matters",
      desc: "A single reading can be difficult to interpret without knowing what else was happening around that time.",
    },
    {
      title: "The story spans time",
      desc: "People may need to explain the same history repeatedly when preparing for a conversation with a healthcare professional.",
    },
  ];

  const thesisSteps = [
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

  const audienceCards = [
    {
      title: "Individuals and families",
      copy: "Help shape how health information could be understood across time and prepared for a healthcare conversation.",
      cta: "Join Early Research",
      href: "/contact?audience=individual",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Physicians and clinicians",
      copy: "Share how history, patient-reported information, and changes over time are reviewed in your current workflow.",
      cta: "Share Clinical Workflow Feedback",
      href: "/contact?audience=clinician",
      icon: <Stethoscope className="h-5 w-5" />,
    },
    {
      title: "Healthcare organizations",
      copy: "Explore whether a longitudinal context layer could complement existing services, workflows, or infrastructure.",
      cta: "Explore a Partnership Conversation",
      href: "/contact?audience=partner",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      title: "Investors and advisors",
      copy: "Discuss the product thesis, validation priorities, and the path from concept to an evidence-informed product.",
      cta: "Contact the Founder",
      href: "/contact?audience=investor",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 py-12 sm:py-20">
      {/* 1. Hero Section */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              eyebrow="LONGITUDINAL HEALTH INTELLIGENCE — IN DEVELOPMENT"
              title="Your health is a story, not a collection of readings."
              description="Health information can be spread across records, lab reports, medications, home measurements, wearable devices, and conversations with different providers. MEDRELEX is developing a private health intelligence platform designed to connect relevant information over time and help people and their healthcare teams see the bigger picture."
              as="h1"
            />
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/contact?audience=individual"
                className="inline-flex items-center justify-center rounded-lg bg-[#0A192F] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D] active:scale-[0.98]"
              >
                Join Early Research
              </Link>
              <Link
                href="/healthcare-professionals"
                className="inline-flex items-center justify-center rounded-lg border border-[#D7E0EA] bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0A192F] shadow-xs transition-all hover:bg-[#E8EEF5]"
              >
                For Healthcare Professionals
              </Link>
              <Link
                href="/platform#concept-demo"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#36978F] hover:text-[#0A192F] transition-colors py-2 px-1"
              >
                <span>Explore the concept</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Hero Visual: Abstract Timeline Demonstration Mock */}
          <div className="lg:col-span-5 space-y-3">
            <ConceptLabel />
            <div className="rounded-[14px] border border-[#D7E0EA] bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#D7E0EA] pb-3">
                <span className="font-mono text-xs font-semibold text-[#0A192F] uppercase">
                  Connected Health Story
                </span>
                <span className="text-[11px] font-mono text-[#64748B]">
                  Fictional Timeline
                </span>
              </div>

              {/* Fictional Timeline Stream */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] p-3 text-xs">
                  <div className="mt-0.5 rounded bg-[#E8EEF5] p-1.5 text-[#36978F]">
                    <Activity className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-4 font-mono text-[11px] text-[#64748B]">
                      <span>May 12</span>
                      <span>Lab Result</span>
                    </div>
                    <div className="font-semibold text-[#0A192F] mt-0.5">
                      Fasting Glucose: 108 mg/dL
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] p-3 text-xs">
                  <div className="mt-0.5 rounded bg-[#E8EEF5] p-1.5 text-[#36978F]">
                    <Calendar className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-4 font-mono text-[11px] text-[#64748B]">
                      <span>Jun 04</span>
                      <span>Self-Reported</span>
                    </div>
                    <div className="font-semibold text-[#0A192F] mt-0.5">
                      Morning Dizziness Recorded
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] p-3 text-xs">
                  <div className="mt-0.5 rounded bg-[#E8EEF5] p-1.5 text-[#36978F]">
                    <Clock className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-4 font-mono text-[11px] text-[#64748B]">
                      <span>Jul 19</span>
                      <span>Physician Note</span>
                    </div>
                    <div className="font-semibold text-[#0A192F] mt-0.5">
                      Medication Review: Lisinopril
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded border border-[#D7E0EA] bg-[#E8EEF5]/40 p-3 text-xs text-[#172B4D]/80">
                <strong className="text-[#0A192F]">Context Synthesis:</strong> Events
                correlated across time to prepare structured questions for medical review.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem Section */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 space-y-8">
        <div>
          <SectionHeading
            title="Your health information tells a bigger story."
            description="Different sources can each show one part of a person’s health. Understanding how those pieces relate over time may take effort, especially when information is reviewed across appointments or providers."
            as="h2"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problemCards.map((c) => (
            <div
              key={c.title}
              className="rounded-[14px] border border-[#D7E0EA] bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-[#0A192F]">{c.title}</h3>
                <p className="mt-2 text-sm text-[#172B4D]/80 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs font-mono text-[#64748B]">
          These are problems MEDRELEX is investigating; experiences differ across
          people and healthcare settings.
        </p>
      </section>

      {/* 3. Product Thesis Section */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 space-y-8">
        <div>
          <SectionHeading
            title="From information to context."
            description="The four architectural phases of the proposed longitudinal health intelligence model."
            as="h2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {thesisSteps.map((s) => (
            <ProcessStep
              key={s.step}
              stepNumber={s.step}
              title={s.title}
              description={s.desc}
              statusQualifier={s.status}
            />
          ))}
        </div>
        <div className="pt-2">
          <Link
            href="/platform#concept-demo"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0A192F] hover:text-[#36978F] uppercase tracking-wider transition-colors"
          >
            <span>See the concept demonstration</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 4. Who It Is For Section */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 space-y-8">
        <div>
          <SectionHeading
            title="Built around real questions from different perspectives."
            description="We are validating our platform concept with participants across the healthcare ecosystem."
            as="h2"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audienceCards.map((item) => (
            <div
              key={item.title}
              className="rounded-[14px] border border-[#D7E0EA] bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between hover:border-[#36978F]/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] text-[#36978F]">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0A192F]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#172B4D]/80 leading-relaxed">
                    {item.copy}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#D7E0EA]/60">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A192F] hover:text-[#36978F] uppercase tracking-wider"
                >
                  <span>{item.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Privacy & Trust Banner */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="rounded-[14px] border border-[#D7E0EA] bg-[#E8EEF5]/60 p-8 sm:p-10 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-[#36978F]">
              <ShieldCheck className="h-4 w-4" />
              <span>Privacy & Discretion</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#0A192F]">
              Health information deserves discretion.
            </h2>
            <p className="text-sm sm:text-base text-[#172B4D]/85 leading-relaxed">
              MEDRELEX is being designed around privacy, permissioned access,
              transparent source information, and responsible use of health data.
              These are design goals that must be reflected in the actual
              architecture, policies, and user experience. MEDRELEX is at an early
              development stage; this website does not establish that a production
              health-data service or compliance program is in place.
            </p>
          </div>
          <Link
            href="/privacy-trust"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A192F] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D] active:scale-[0.98] shrink-0"
          >
            <span>Read our approach</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 6. Current Stage & Closing CTA */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="rounded-[14px] border border-[#D7E0EA] bg-white p-8 sm:p-12 shadow-xs space-y-8 text-center max-w-4xl mx-auto">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-wider text-[#64748B]">
              EARLY DEVELOPMENT & VALIDATION
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A192F]">
              Help shape a more connected view of health.
            </h2>
            <p className="text-base text-[#172B4D]/80 max-w-2xl mx-auto leading-relaxed">
              MEDRELEX is in an early development and validation stage. We are
              seeking input from individuals, physicians, and healthcare
              professionals to understand which initial use cases matter most and
              what would make a longitudinal view genuinely useful.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact?audience=individual"
              className="inline-flex items-center justify-center rounded-lg bg-[#0A192F] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D]"
            >
              I’m interested as an individual
            </Link>
            <Link
              href="/contact?audience=clinician"
              className="inline-flex items-center justify-center rounded-lg border border-[#D7E0EA] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#0A192F] shadow-xs transition-all hover:bg-[#E8EEF5]"
            >
              I’m a healthcare professional
            </Link>
            <Link
              href="/contact?audience=partner"
              className="inline-flex items-center justify-center rounded-lg border border-[#D7E0EA] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#0A192F] shadow-xs transition-all hover:bg-[#E8EEF5]"
            >
              Partnership or investment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
