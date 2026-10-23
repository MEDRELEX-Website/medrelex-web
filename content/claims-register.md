# MEDRELEX Content Claims Register

**Version:** 1.0  
**Effective Date:** 17 October 2026  
**Status:** Confidential Working Specification / Claims Governance Reference  
**Applicability:** All public web content, marketing copy, interactive demonstrations, interface labels, documentation, and external communications for MEDRELEX.

---

## 1. Governance & Truth Policy (Specification Section 2.3)

Every substantive product, clinical, privacy, security, partnership, or market claim concerning MEDRELEX must be classified into one of the following tiers:

1. **Approved Current Fact:** An established factual statement verified by the founder and engineering team.
2. **Product Vision:** An intended platform direction described conditionally as a goal or prospective capability.
3. **Concept-Only:** Fabricated, browser-based illustrative material created solely to demonstrate design interactions.
4. **Prohibited Pending Evidence:** Any claim of clinical efficacy, regulatory status, legal certification, automated diagnostic capability, or third-party integration that lacks verified documentation and legal review.

> **Foundational Governance Rule:**  
> A founder or designated product owner must explicitly approve any transition of wording from future-tense or conditional status ("MEDRELEX is exploring...", "The concept is designed to...") to present-tense fact. No capability is assumed verified without documented evidence.

---

## 2. Approved Core Positioning

### 2.1 Core Positioning Statement
> "MEDRELEX is developing a private health intelligence platform designed to connect health information over time, surface meaningful changes, and help individuals and their healthcare teams see the bigger picture."

### 2.2 Primary Messaging
* **Primary Headline:** "Your health is a story, not a collection of readings."
* **Primary Supporting Message:** "Health information can be spread across records, lab reports, medications, home measurements, wearable devices, and conversations with different providers. MEDRELEX is exploring how relevant context across time could help people prepare for more informed healthcare conversations."
* **Initial Market Focus:** United States first. Language must speak to U.S. individuals, families, physicians, healthcare organizations, investors, and advisors without claiming nationwide operational availability or state-specific licensure.

---

## 3. Product Maturity & Truth Model (Specification Section 1.3)

| Tier / Label | Defined Meaning | Permitted Public Presentation |
| :--- | :--- | :--- |
| **Current stage** | MEDRELEX is in an early development and validation stage. | Use "is developing," "is exploring," and "we are seeking feedback." Never imply commercial availability or active clinical deployment. |
| **Product vision** | Intended platform direction: unifying authorized information, organizing chronologically, surfacing contextual changes, and preparing healthcare discussions. | Present as design goals or potential capabilities, explicitly conditional on research, authorized access, patient permissions, technical feasibility, and clinical validation. |
| **Concept demonstration** | A fabricated, browser-based, interactive illustration using fictional data. | Every screen, data point, and timeline state must carry the persistent label: `CONCEPT DEMONSTRATION • FICTIONAL DATA ONLY` and the standard disclaimer. |
| **Verified existing functionality** | Functionality explicitly verified through technical testing and sign-off before publication. | No capability is assumed verified by default. Claims must be substantiated in this register before publication. |
| **Future roadmap** | Prospective directions dependent on validation and technological advancements. | Use "may," "could," and "would depend on evidence." Never promise delivery dates, specific integrations, or clinical outcomes. |

---

## 4. Approved Language Patterns

The following exact phrasing patterns must be adhered to across all pages:

* "MEDRELEX is developing..."
* "MEDRELEX is exploring..."
* "The concept is designed to..."
* "The platform aims to..."
* "Potentially useful..."
* "Illustrative scenario using fictional data..."
* "Any future availability would depend on validation, permissions, technical feasibility, and appropriate review."
* "Support for clinical judgment—not a replacement."

---

## 5. Prohibited Claims & Negative Constraints

The following terms and concepts are strictly prohibited across all public materials unless independently verified, substantiated with documentary proof, and approved by legal counsel:

### 5.1 Regulatory, Compliance & Certification Claims
* ❌ **"FDA-approved" / "FDA-cleared":** Strictly prohibited. MEDRELEX is not a cleared medical device.
* ❌ **"HIPAA-compliant":** Strictly prohibited as a blanket marketing guarantee or badge. The public marketing website does not store protected health information (PHI) and cannot certify enterprise HIPAA compliance for unreleased software.
* ❌ **"Clinically proven" / "Clinically validated":** Strictly prohibited. No prospective or retrospective clinical trials have been completed.
* ❌ **"Secure by design" / "Guaranteed secure":** Prohibited as a marketing guarantee. Security measures must be described with technical restraint (e.g., "safeguards appropriate to the website implementation").

### 5.2 Clinical Capability & Diagnostic Claims
* ❌ Prohibited: Claims that MEDRELEX **diagnoses**, **predicts disease**, **detects emergencies**, **monitors patients continuously**, or **recommends treatment courses**.
* ❌ Prohibited: Claims that MEDRELEX **improves patient outcomes**, **reduces readmissions**, or **lowers healthcare costs**.
* ❌ Prohibited: Presenting automated software output as definitive medical judgment or clinical decision support (CDS).

### 5.3 Commercial, Integration & Ecosystem Claims
* ❌ **Named Integrations:** Do not claim connections to named Electronic Health Record (EHR) systems (e.g., Epic, Cerner), laboratory chains (e.g., Quest, Labcorp), wearable devices (e.g., Apple Watch, Fitbit), or health information exchanges (HIEs) until live, tested, and contractually executed.
* ❌ **Fictional Testimonials / Logos:** No customer logos, hospital affiliations, investor logos, clinician endorsements, or stock physician portraits implying clinical adoption.
* ❌ **Unsupported Metrics:** No fabricated user counts, records processed, or physician advisory board sizes.
* ❌ **Attributed Quotes:** Do not state that "doctors have told the founder X" unless an exact, signed testimonial release is on file.

---

## 6. Required Concept Disclaimers

### 6.1 Standard Concept Label
Every visual representation of the software interface must prominently feature:
```
CONCEPT DEMONSTRATION • FICTIONAL DATA ONLY
```

### 6.2 Standard Concept Disclaimer Text
```
This illustrative screen is not a live MEDRELEX product, medical record, clinical assessment, or medical advice. The example is fictional and does not represent a real person or validated clinical workflow.
```

### 6.3 Contact Form Safety Banner
Every form and data intake surface must display:
```
Please do not submit medical records, diagnoses, medication lists, insurance details, or other sensitive health information through this website.
```

---

## 7. Page-by-Page Claims Audit Summary

| Route | Primary Theme | Claims Status & Verification Rules |
| :--- | :--- | :--- |
| `/about` | Mission & Stage | Founder bio limited strictly to: "Ahsan Ishfaq — Founder. Ahsan is building MEDRELEX around the question of how health information can be understood more clearly over time. The company is in an early development and validation stage." No degrees, prior exits, or unverified claims. |
| `/privacy-trust` | Privacy Architecture | Six principles qualified strictly as "Design goal", "Intended product behavior", or "Proposed model". Explicit disclaimer that the site does not claim HIPAA compliance or a live health-data service. |
| `/healthcare-professionals` | Clinical Collaboration | Concepts framed as "Product vision" and "Design goal". Prominent disclaimer: "Support for clinical judgment—not a replacement." Calls to action invite feedback, not pilot participation guarantees. |
| `/privacy-notice` | Website Privacy Notice | Covers website contact forms only. Does not claim zero data sharing (acknowledges third-party form processors/hosting). Retains publication gate until deployment specifics are configured. |
| `/thank-you` | Intake Confirmation | Set to `noindex, nofollow`. Confirms receipt without promising response times or program admission. Reiterates prohibition on sending medical records in follow-up. |

---

## 8. Claims Audit & Maintenance Process

1. **Code Review Gate:** Any pull request modifying user-facing text in `src/app/` or `src/components/` must be cross-referenced against Section 4 and Section 5 of this register.
2. **Automated Keyword Scans:** Continuous integration checks should fail if prohibited tokens (`"FDA-approved"`, `"HIPAA-compliant"`, `"clinically proven"`, `"diagnose"`) are detected in static strings without a negative qualifier.
3. **Escalation Path:** Ambiguous copy must be escalated to the founder and legal/regulatory counsel before publication.
