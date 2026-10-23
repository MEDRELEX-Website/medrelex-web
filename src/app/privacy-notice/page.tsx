import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/content/SectionHeading";
import { ShieldAlert, ArrowRight, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Website Privacy Notice | MEDRELEX",
  description:
    "Read how the MEDRELEX public website handles contact form information.",
  alternates: {
    canonical: "https://medrelex.com/privacy-notice",
  },
  openGraph: {
    title: "Website Privacy Notice | MEDRELEX",
    description:
      "Read how the MEDRELEX public website handles contact form information.",
    url: "https://medrelex.com/privacy-notice",
    siteName: "MEDRELEX",
    locale: "en_US",
    type: "website",
  },
};

export default function PrivacyNoticePage() {
  const effectiveDate = "October 17, 2026";

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
        {/* Header */}
        <header className="border-b border-[#D7E0EA] pb-10 sm:pb-12">
          <SectionHeading
            eyebrow="LEGAL & DISCLOSURES"
            title="MEDRELEX Website Privacy Notice"
            description="This notice explains how the MEDRELEX public website handles information submitted through its contact forms. This notice applies to this website only; it is not a statement about the privacy practices of a future MEDRELEX health product."
            as="h1"
          />
          <div className="mt-4 flex items-center gap-3 text-xs font-mono text-[#64748B]">
            <span>Effective date: {effectiveDate}</span>
            <span>•</span>
            <span>Applies exclusively to public website inquiries</span>
          </div>
        </header>

        {/* Publication Gate Callout */}
        <aside
          aria-label="Publication Gate Notice"
          className="rounded-[14px] border border-[#D7E0EA] bg-[#E8EEF5]/70 p-6 sm:p-8 shadow-xs"
        >
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-[#D7E0EA] text-[#0A192F]">
              <ShieldAlert className="h-4 w-4 text-[#36978F]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-[#0A192F] font-mono">
                Publication Gate Notice (Section 5.7)
              </h2>
              <p className="text-sm text-[#172B4D]/85 leading-relaxed">
                The privacy notice is not launch-ready until the operator confirms
                the actual form processors and data flows, defines
                retention/deletion schedules, and obtains appropriate legal review.
                The official privacy contact route is the website contact form with
                &ldquo;Privacy or governance question&rdquo; selected.
              </p>
            </div>
          </div>
        </aside>

        {/* Complete Policy Text per Section 5.7 */}
        <article className="space-y-10 text-base text-[#172B4D]/90 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#0A192F]">
              Information you submit
            </h2>
            <p>
              Depending on the form you select, the website may collect your name,
              email address, country or region, professional role, organization,
              areas of interest, preferred contact method, and the message you
              choose to provide. Please do not submit medical records or sensitive
              health information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#0A192F]">
              How information is used
            </h2>
            <p>
              Contact information is used to review and respond to your inquiry,
              understand interest in MEDRELEX, and manage requested follow-up. It
              must not be used for unrelated marketing without an appropriate
              lawful basis and any consent required by applicable law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#0A192F]">
              Service providers and access
            </h2>
            <p>
              Form submissions may be processed by the website hosting,
              form-delivery, spam-prevention, or business communication services
              actually configured for this site. The published notice must name or
              accurately describe the relevant providers and explain access
              controls based on the real implementation. Do not state that data is
              never shared if service providers process it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#0A192F]">Retention</h2>
            <p>
              MEDRELEX will retain inquiry information only for the period defined
              in the website&rsquo;s approved retention schedule, then delete or
              de-identify it unless retention is required for a legitimate legal or
              operational reason. The final retention period and deletion process
              must be configured and documented before launch.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#0A192F]">
              Your choices and requests
            </h2>
            <p>
              To ask about, correct, or request deletion of a website inquiry,
              use the verified privacy contact route shown on this page. Requests
              will be reviewed under applicable law. Do not send sensitive health
              information in a request.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#0A192F]">Security</h2>
            <p>
              MEDRELEX will apply safeguards appropriate to the actual website
              implementation. No website or transmission method can be
              represented as risk-free. Specific security measures must not be
              claimed unless verified.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#0A192F]">Children</h2>
            <p>
              This public website is not designed to collect information directly
              from children. A parent or guardian should make contact on a
              child&rsquo;s behalf and should not submit medical details.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#0A192F]">Changes</h2>
            <p>
              This notice may be updated as the website changes. The current
              effective date will be displayed at the top of the published
              notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#0A192F]">Contact</h2>
            <p>
              For privacy questions about this website, use the MEDRELEX contact
              page and select &ldquo;Privacy or governance question.&rdquo;
              Effective date: the date this notice is first published or most
              recently updated.
            </p>
          </section>
        </article>

        {/* Direct Action Link */}
        <section className="pt-8 border-t border-[#D7E0EA]">
          <div className="rounded-[14px] border border-[#D7E0EA] bg-white p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-[#0A192F]">
                Submit a privacy inquiry
              </h3>
              <p className="text-sm text-[#172B4D]/80">
                Contact our privacy governance team directly via our secure form.
              </p>
            </div>
            <Link
              href="/contact?audience=other&reason=privacy"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A192F] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#172B4D] active:scale-[0.98] shrink-0"
            >
              <Lock className="h-4 w-4" />
              <span>Contact About Privacy</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
