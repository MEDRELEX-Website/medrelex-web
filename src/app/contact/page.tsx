'use client';

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SectionHeading from "@/components/content/SectionHeading";
import {
  ShieldAlert,
  Send,
  User,
  Stethoscope,
  Building2,
  TrendingUp,
  HelpCircle,
  Lock,
} from "lucide-react";

type AudienceType = "individual" | "clinician" | "partner" | "investor" | "other";

const audienceOptions: {
  id: AudienceType;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "individual",
    label: "Individual or Family Member",
    sublabel: "Share your experience managing health records across time",
    icon: <User className="h-5 w-5" />,
  },
  {
    id: "clinician",
    label: "Physician or Healthcare Professional",
    sublabel: "Discuss clinical workflows, timeline views, and consultation needs",
    icon: <Stethoscope className="h-5 w-5" />,
  },
  {
    id: "partner",
    label: "Healthcare or Strategic Partner",
    sublabel: "Explore institutional alignment and infrastructure interoperability",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    id: "investor",
    label: "Investor or Advisor",
    sublabel: "Discuss the platform thesis, validation roadmap, and research milestones",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    id: "other",
    label: "Other Inquiry",
    sublabel: "General questions, privacy/governance inquiries, or press",
    icon: <HelpCircle className="h-5 w-5" />,
  },
];

function ContactFormInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedAudience, setSelectedAudience] = useState<AudienceType | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    region: "",
    interests: [] as string[],
    message: "",
    reason: "",
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const audParam = searchParams.get("audience");
    const reasonParam = searchParams.get("reason");

    if (audParam && ["individual", "clinician", "partner", "investor", "other"].includes(audParam)) {
      setSelectedAudience(audParam as AudienceType);
    }
    if (reasonParam === "privacy") {
      setFormData((prev) => ({
        ...prev,
        reason: "Privacy or governance question",
        message: prev.message || "I have a question regarding MEDRELEX's privacy practices and data governance.",
      }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!formData.consent) {
      setErrorMessage("Please acknowledge the website privacy terms to submit.");
      return;
    }

    setSubmitting(true);
    // Simulate brief client confirmation before routing to thank-you page
    setTimeout(() => {
      router.push("/thank-you");
    }, 400);
  };

  return (
    <div className="space-y-12">
      {/* Audience Selector */}
      <section aria-labelledby="audience-heading" className="space-y-4">
        <h2 id="audience-heading" className="text-lg font-semibold text-[#0A192F]">
          I&rsquo;m contacting MEDRELEX as&hellip;
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {audienceOptions.map((opt) => {
            const isSelected = selectedAudience === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedAudience(opt.id)}
                className={`p-4 rounded-[14px] border text-left flex items-start gap-3 transition-all ${
                  isSelected
                    ? "border-[#36978F] bg-white ring-2 ring-[#36978F]/20 shadow-xs"
                    : "border-[#D7E0EA] bg-white/70 hover:bg-white hover:border-[#36978F]/40"
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                    isSelected
                      ? "bg-[#36978F] text-white"
                      : "bg-[#E8EEF5] text-[#36978F]"
                  }`}
                >
                  {opt.icon}
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#0A192F]">
                    {opt.label}
                  </div>
                  <div className="text-xs text-[#172B4D]/70 mt-1 leading-relaxed">
                    {opt.sublabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Selected Form Container */}
      {selectedAudience ? (
        <form
          onSubmit={handleSubmit}
          className="rounded-[14px] border border-[#D7E0EA] bg-white p-6 sm:p-10 shadow-xs space-y-6"
        >
          <div className="border-b border-[#D7E0EA] pb-4">
            <h3 className="text-xl font-semibold text-[#0A192F]">
              {audienceOptions.find((o) => o.id === selectedAudience)?.label}
            </h3>
            <p className="text-xs text-[#64748B] font-mono uppercase mt-1">
              Validation & Research Inquiry Form
            </p>
          </div>

          {errorMessage && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-700 font-medium">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#0A192F] mb-1.5 font-mono">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#172B4D] focus:border-[#36978F] focus:outline-none focus:ring-2 focus:ring-[#36978F]/20"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#0A192F] mb-1.5 font-mono">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#172B4D] focus:border-[#36978F] focus:outline-none focus:ring-2 focus:ring-[#36978F]/20"
                placeholder="jane@example.com"
              />
            </div>
          </div>

          {(selectedAudience === "clinician" ||
            selectedAudience === "partner" ||
            selectedAudience === "investor") && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="organization" className="block text-xs font-semibold uppercase tracking-wider text-[#0A192F] mb-1.5 font-mono">
                  Organization / Affiliation
                </label>
                <input
                  id="organization"
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#172B4D] focus:border-[#36978F] focus:outline-none focus:ring-2 focus:ring-[#36978F]/20"
                  placeholder="Hospital, Practice, or Firm"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-xs font-semibold uppercase tracking-wider text-[#0A192F] mb-1.5 font-mono">
                  Professional Role / Specialty
                </label>
                <input
                  id="role"
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#172B4D] focus:border-[#36978F] focus:outline-none focus:ring-2 focus:ring-[#36978F]/20"
                  placeholder="e.g. Primary Care Physician"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#0A192F] mb-1.5 font-mono">
              Your Message or Questions *
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-lg border border-[#D7E0EA] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#172B4D] focus:border-[#36978F] focus:outline-none focus:ring-2 focus:ring-[#36978F]/20"
              placeholder="Tell us what aspects of longitudinal health intelligence interest you..."
            />
          </div>

          <div className="flex items-start gap-3 pt-2">
            <input
              id="consent"
              type="checkbox"
              required
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-[#D7E0EA] text-[#36978F] focus:ring-[#36978F]"
            />
            <label htmlFor="consent" className="text-xs text-[#172B4D]/80 leading-relaxed">
              I agree that MEDRELEX may process this contact information to review
              and respond to my inquiry per the{" "}
              <a href="/privacy-notice" className="text-[#36978F] underline hover:text-[#0A192F]">
                Website Privacy Notice
              </a>
              . I understand not to submit medical records or sensitive health
              information.
            </label>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A192F] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D] active:scale-[0.98] disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{submitting ? "Submitting..." : "Submit Inquiry"}</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="rounded-[14px] border border-dashed border-[#D7E0EA] p-8 text-center bg-white/40">
          <p className="text-sm text-[#64748B]">
            Choose the option above that best describes your interest to display
            the relevant contact form.
          </p>
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
        {/* Hero Section */}
        <header className="border-b border-[#D7E0EA] pb-10 sm:pb-12">
          <SectionHeading
            eyebrow="GET INVOLVED"
            title="Help shape what MEDRELEX should become."
            description="We are speaking with individuals, families, physicians, healthcare professionals, healthcare organizations, investors, and advisors to understand which problems matter most and what a useful longitudinal health intelligence experience should do."
            as="h1"
          />
        </header>

        {/* Mandatory Safety Callout */}
        <div className="rounded-[14px] border border-[#D7E0EA] bg-[#E8EEF5]/70 p-5 sm:p-6 shadow-xs flex items-start gap-4">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-[#D7E0EA] text-[#0A192F]">
            <ShieldAlert className="h-4 w-4 text-[#36978F]" />
          </div>
          <div>
            <h2 className="text-xs font-semibold tracking-wider uppercase text-[#0A192F] font-mono">
              Medical Privacy & Intake Warning
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#172B4D]/85 leading-relaxed">
              Please do not submit medical records, diagnoses, medication lists,
              insurance details, or other sensitive health information through
              this website.
            </p>
          </div>
        </div>

        {/* Contact Form with Suspense for URL search params */}
        <Suspense
          fallback={
            <div className="p-8 text-center text-sm text-[#64748B]">
              Loading contact form...
            </div>
          }
        >
          <ContactFormInner />
        </Suspense>
      </div>
    </div>
  );
}
