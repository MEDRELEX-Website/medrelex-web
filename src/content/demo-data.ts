/**
 * MEDRELEX Interactive Concept Demonstration — Fictional Data Model
 * Section 6.3: All content is illustrative only. No real health data.
 */

export type EventCategory =
  | "home-measurement"
  | "lab-report"
  | "medication-history"
  | "wearable-sleep"
  | "personal-note"
  | "conversation-prep";

export interface DemoEvent {
  id: string;
  dateStart: string;
  dateEnd: string;
  dateLabel: string;
  category: EventCategory;
  categoryLabel: string;
  title: string;
  detail: string;
  status: string;
  contextCaveat?: string;
  isRange: boolean;
  /** 0–100: position along April 2026 axis */
  timelinePosition: number;
}

export interface DemoScenario {
  personLabel: string;
  scenarioTitle: string;
  timelineAxisStart: string;
  timelineAxisEnd: string;
  timelineAxisLabel: string;
  events: DemoEvent[];
  discussionNote: string;
  discussionQuestions: string[];
  frameDisclaimer: string;
}

export const DEMO_SCENARIO: DemoScenario = {
  personLabel: "Example person (fictional)",
  scenarioTitle: "A fictional month of health information",
  timelineAxisStart: "2026-04-01",
  timelineAxisEnd: "2026-04-30",
  timelineAxisLabel: "April 2026",

  events: [
    {
      id: "E1",
      dateStart: "2026-04-03",
      dateEnd: "2026-04-03",
      dateLabel: "3 Apr 2026",
      category: "home-measurement",
      categoryLabel: "Home measurement",
      title: "Home measurement",
      detail: "Example resting measurement: 72 units",
      status: "User-entered example • not verified",
      isRange: false,
      timelinePosition: 10,
    },
    {
      id: "E2",
      dateStart: "2026-04-08",
      dateEnd: "2026-04-08",
      dateLabel: "8 Apr 2026",
      category: "lab-report",
      categoryLabel: "Lab report",
      title: "Lab report",
      detail: "Example lab result recorded",
      status: "Illustrative lab entry • source not connected",
      isRange: false,
      timelinePosition: 26,
    },
    {
      id: "E3",
      dateStart: "2026-04-12",
      dateEnd: "2026-04-12",
      dateLabel: "12 Apr 2026",
      category: "medication-history",
      categoryLabel: "Medication history",
      title: "Medication history",
      detail: "Example medication entry changed",
      status: "Illustrative medication event • not verified",
      contextCaveat:
        "A medication entry and a self-reported note appear in a nearby period on this fictional timeline. Timing alone does not show that events are related.",
      isRange: false,
      timelinePosition: 42,
    },
    {
      id: "E4",
      dateStart: "2026-04-14",
      dateEnd: "2026-04-20",
      dateLabel: "14–20 Apr 2026",
      category: "wearable-sleep",
      categoryLabel: "Wearable / sleep",
      title: "Wearable / sleep",
      detail: "Example sleep duration varied across several nights",
      status: "Illustrative trend • no device connected",
      contextCaveat:
        "A medication entry and a self-reported note appear in a nearby period on this fictional timeline. Timing alone does not show that events are related.",
      isRange: true,
      timelinePosition: 58,
    },
    {
      id: "E5",
      dateStart: "2026-04-18",
      dateEnd: "2026-04-18",
      dateLabel: "18 Apr 2026",
      category: "personal-note",
      categoryLabel: "Personal note",
      title: "Personal note",
      detail: "Example person reports feeling more tired than usual",
      status: "Fictional self-reported note",
      contextCaveat:
        "A medication entry and a self-reported note appear in a nearby period on this fictional timeline. Timing alone does not show that events are related.",
      isRange: false,
      timelinePosition: 74,
    },
    {
      id: "E6",
      dateStart: "2026-04-22",
      dateEnd: "2026-04-22",
      dateLabel: "22 Apr 2026",
      category: "conversation-prep",
      categoryLabel: "Conversation prep",
      title: "Conversation prep",
      detail: "Question: Could the timing of these events be relevant?",
      status: "Draft discussion question • not a clinical conclusion",
      isRange: false,
      timelinePosition: 90,
    },
  ],

  discussionNote:
    "This fictional timeline places a medication entry, a sleep trend, and a self-reported change in the same period. The example does not establish that one event caused another.",

  discussionQuestions: [
    "Is there a connection between the medication entry around 12 April and the sleep pattern changes noted in the wearable data?",
    "Could the tiredness reported on 18 April be related to the medication change, the sleep variation, or something else entirely?",
    "Would it be helpful to review the lab result from 8 April in the context of these other entries?",
  ],

  frameDisclaimer:
    "This illustrative scenario is not a live MEDRELEX product, medical assessment, or medical advice. Discuss personal health questions with a qualified healthcare professional.",
};

export interface SourceCategory {
  key: EventCategory;
  label: string;
  description: string;
}

export const SOURCE_CATEGORIES: SourceCategory[] = [
  { key: "home-measurement", label: "Home measurement", description: "Self-recorded measurements at home" },
  { key: "lab-report", label: "Lab report", description: "Illustrative laboratory entries" },
  { key: "medication-history", label: "Medication history", description: "Illustrative medication events" },
  { key: "wearable-sleep", label: "Wearable / sleep", description: "Illustrative wearable trend data" },
  { key: "personal-note", label: "Personal note", description: "Self-reported observations" },
  { key: "conversation-prep", label: "Conversation prep", description: "Draft discussion questions" },
];
