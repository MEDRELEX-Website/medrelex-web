import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/content/SectionHeading";
import TrustPrincipleCard from "@/components/content/TrustPrincipleCard";
import {
  ShieldCheck,
  FileSearch,
  CheckCircle,
  Lock,
  Sparkles,
  Eye,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy & Trust | MEDRELEX",
  description:
    "Learn about MEDRELEX’s intended approach to permissioned access, source clarity, and responsible health intelligence.",
  alternates: {
    canonical: "https://medrelex.com/privacy-trust",
  },
  openGraph: {
    title: "Privacy & Trust | MEDRELEX",
    description:
      "Learn about MEDRELEX’s intended approach to permissioned access, source clarity, and responsible health intelligence.",
    url: "https://medrelex.com/privacy-trust",
    siteName: "MEDRELEX",
    locale: "en_US",
    type: "website",
  },
};

export default function PrivacyTrustPage() {
  const principles = [
    {
      title: "Permissioned access",
      description:
        "Future access should be based on a clear authorization model, with people able to understand who is permitted to see relevant information.",
      qualifier: "Design goal; implementation not asserted.",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      title: "Source clarity",
      description:
        "People should be able to see where an item came from and when it was recorded or reported.",
      qualifier: "Intended product behavior.",
      icon: <FileSearch className="h-5 w-5" />,
    },
    {
      title: "Verification states",
      description:
        "The design should distinguish information that is user-reported, source-verified, user-confirmed, or clinically reviewed where those states are available and meaningful.",
      qualifier: "Proposed model; do not imply every state exists today.",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      title: "Least privilege",
      description:
        "Access should be limited to what a person or role needs and is authorized to see.",
      qualifier: "Architecture goal, subject to implementation and review.",
      icon: <Lock className="h-5 w-5" />,
    },
    {
      title: "Responsible interpretation",
      description:
        "Any future generated summary or interpretation should be clearly identified, contextualized, and never presented as a definitive diagnosis.",
      qualifier: "Design goal; no live medical AI feature is claimed.",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      title: "Transparency",
      description:
        "Policies should explain what information is collected, why it is used, how it is protected, and how people can contact MEDRELEX.",
      qualifier:
        "Publish only approved, accurate policies for the actual website and product stage.",
      icon: <Eye className="h-5 w-5" />,
    },
  ];

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 space-y-16 sm:space-y-20">
        {/* Hero Section */}
        <header className="border-b border-[#D7E0EA] pb-12 sm:pb-16 max-w-5xl">
          <SectionHeading
            eyebrow="PRIVACY & TRUST"
            title="Health information deserves discretion."
            description="Health information is personal. MEDRELEX’s intended approach places permission, source clarity, and responsible use at the center of the product vision. Those principles must be implemented, tested, and reviewed—not merely stated."
            as="h1"
          />
        </header>

        {/* 6 Core Principles */}
        <section className="space-y-8">
          <div>
            <SectionHeading
              title="Principles we intend to build around"
              description="Each principle represents a deliberate architectural constraint, qualified by our current development maturity."
              as="h2"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p) => (
              <TrustPrincipleCard
                key={p.title}
                icon={p.icon}
                title={p.title}
                description={p.description}
                qualifier={p.qualifier}
              />
            ))}
          </div>
        </section>

        {/* What this website currently collects */}
        <section className="rounded-[14px] border border-[#D7E0EA] bg-[#E8EEF5]/60 p-6 sm:p-10 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D7E0EA] bg-white text-[#36978F]">
              <Lock className="h-5 w-5" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#0A192F]">
                What this website currently collects
              </h2>
              <p className="text-base text-[#172B4D]/85 leading-relaxed">
                This public website is intended to collect only the contact and
                professional-interest details submitted through its forms. Do not
                submit medical records, diagnoses, medication lists, or other
                sensitive health information through this website. The final
                published Website Privacy Notice must describe the actual fields,
                recipients, processors, retention practices, and contact route used
                at launch.
              </p>
            </div>
          </div>
        </section>

        {/* What we are not claiming */}
        <section className="rounded-[14px] border border-[#D7E0EA] bg-white p-6 sm:p-10 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] text-[#64748B]">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#0A192F]">
                What we are not claiming
              </h2>
              <p className="text-base text-[#172B4D]/85 leading-relaxed">
                This page does not claim that MEDRELEX is HIPAA compliant,
                certified, clinically validated, or operating a production
                health-data service. Any future handling of real U.S. patient data
                will require appropriate privacy, security, technical, and legal
                review before launch.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pt-4 border-t border-[#D7E0EA]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#0A192F]">
                Have questions regarding our privacy architecture?
              </h3>
              <p className="text-sm text-[#172B4D]/80 mt-1">
                Reach out to discuss our proposed authorization models and data
                governance goals.
              </p>
            </div>
            <Link
              href="/contact?audience=partner&reason=privacy"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A192F] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D] active:scale-[0.98] shrink-0"
            >
              <span>Contact MEDRELEX about privacy</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
