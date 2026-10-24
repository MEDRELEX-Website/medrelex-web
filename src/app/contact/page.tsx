"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SectionHeading from "@/components/content/SectionHeading";
import AudienceSelector from "@/components/forms/AudienceSelector";
import IndividualForm from "@/components/forms/IndividualForm";
import ClinicianForm from "@/components/forms/ClinicianForm";
import PartnerForm from "@/components/forms/PartnerForm";
import InvestorForm from "@/components/forms/InvestorForm";
import OtherForm from "@/components/forms/OtherForm";
import {
  AUDIENCE_TYPES,
  type AudienceType,
  type OtherReasonType,
} from "@/lib/validation/contact-schemas";

function ContactFormManager() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedAudience, setSelectedAudience] = useState<AudienceType | null>(
    null
  );
  const [isDirty, setIsDirty] = useState(false);
  const [initialReason, setInitialReason] = useState<OtherReasonType | undefined>(
    undefined
  );

  // Sync state with URL search parameters on load/change
  useEffect(() => {
    const audParam = searchParams.get("audience");
    const reasonParam = searchParams.get("reason");

    if (audParam && (AUDIENCE_TYPES as readonly string[]).includes(audParam)) {
      setSelectedAudience(audParam as AudienceType);
    }

    if (reasonParam === "privacy") {
      setSelectedAudience("other");
      setInitialReason("Privacy & Data Governance");
    }
  }, [searchParams]);

  // Handle audience switch and update URL without page reload
  const handleSelectAudience = useCallback(
    (audience: AudienceType) => {
      setSelectedAudience(audience);
      setIsDirty(false); // Reset dirty flag when cleanly switched

      const params = new URLSearchParams(searchParams.toString());
      params.set("audience", audience);
      if (audience !== "other") {
        params.delete("reason");
      }
      router.replace(`/contact?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handleSuccess = useCallback(() => {
    router.push("/thank-you");
  }, [router]);

  return (
    <div className="space-y-12">
      {/* Dynamic Audience Selector */}
      <AudienceSelector
        selectedAudience={selectedAudience}
        onSelectAudience={handleSelectAudience}
        isDirty={isDirty}
      />

      {/* Render selected form variant */}
      {selectedAudience === "individual" && (
        <IndividualForm
          key="individual"
          onSuccess={handleSuccess}
          onDirtyChange={setIsDirty}
        />
      )}

      {selectedAudience === "clinician" && (
        <ClinicianForm
          key="clinician"
          onSuccess={handleSuccess}
          onDirtyChange={setIsDirty}
        />
      )}

      {selectedAudience === "partner" && (
        <PartnerForm
          key="partner"
          onSuccess={handleSuccess}
          onDirtyChange={setIsDirty}
        />
      )}

      {selectedAudience === "investor" && (
        <InvestorForm
          key="investor"
          onSuccess={handleSuccess}
          onDirtyChange={setIsDirty}
        />
      )}

      {selectedAudience === "other" && (
        <OtherForm
          key="other"
          initialReason={initialReason}
          onSuccess={handleSuccess}
          onDirtyChange={setIsDirty}
        />
      )}

      {!selectedAudience && (
        <div className="rounded-[14px] border border-dashed border-[#D7E0EA] p-10 text-center bg-white/60 space-y-2">
          <p className="text-base font-medium text-[#0A192F]">
            Please choose an option above
          </p>
          <p className="text-sm text-[#64748B] max-w-md mx-auto">
            Choose the option above that best describes your interest to display
            the relevant inquiry and qualification form.
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

        {/* Dynamic Contact Engine with Suspense Boundary */}
        <Suspense
          fallback={
            <div className="p-12 text-center text-sm text-[#64748B] rounded-[14px] border border-[#D7E0EA] bg-white">
              Loading contact options...
            </div>
          }
        >
          <ContactFormManager />
        </Suspense>
      </div>
    </div>
  );
}
