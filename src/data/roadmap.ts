import type { Phase, RoadmapDef } from '../types';

/**
 * The MACP monetization roadmap — 9 phases, 32 mini-projects, in exact order.
 * This data is the source of truth for definitions and never changes at runtime.
 */

export const PHASES: Phase[] = [
  {
    id: 1,
    title: 'Monetization Foundation',
    description:
      'Build the usage, entitlement, and premium-gating foundation before billing.',
  },
  {
    id: 2,
    title: 'Stronger AI Product',
    description:
      'Make the AI valuable enough that users understand why premium exists.',
  },
  {
    id: 3,
    title: 'Retention Loops',
    description:
      'Build reasons for users to return and keep progress visible.',
  },
  {
    id: 4,
    title: 'Onboarding and Conversion',
    description:
      'Improve the first-session experience and set up paid conversion.',
  },
  {
    id: 5,
    title: 'Web Payments',
    description: 'Add paid web subscriptions and billing management.',
  },
  {
    id: 6,
    title: 'App-Store Mobile Foundation',
    description:
      'Prepare the product for real iOS and Android app packaging.',
  },
  {
    id: 7,
    title: 'Mobile Subscriptions',
    description:
      'Add app-store-compliant subscriptions through Apple and Google.',
  },
  {
    id: 8,
    title: 'Store Readiness',
    description: 'Prepare trust, legal, listing, and testing requirements.',
  },
  {
    id: 9,
    title: 'Launch and Growth',
    description: 'Build acquisition, measurement, and launch systems.',
  },
];

const padId = (n: number): string => `mp-${String(n).padStart(2, '0')}`;

export const ROADMAP_ITEMS: RoadmapDef[] = [
  // Phase 1 — Monetization Foundation
  {
    id: padId(1),
    phaseId: 1,
    number: 1,
    title: 'MACP Monetization Architecture Audit',
    goal: 'Inspect current app, schema, AI calls, user state, and define where premium gates belong.',
  },
  {
    id: padId(2),
    phaseId: 1,
    number: 2,
    title: 'AI Usage Tracking Foundation',
    goal: 'Track every AI generation event.',
  },
  {
    id: padId(3),
    phaseId: 1,
    number: 3,
    title: 'Usage Limits Enforcement',
    goal: 'Stop unlimited free AI use with free/premium limits.',
  },
  {
    id: padId(4),
    phaseId: 1,
    number: 4,
    title: 'Entitlement System',
    goal: 'Create one source of truth for free vs premium.',
  },
  {
    id: padId(5),
    phaseId: 1,
    number: 5,
    title: 'Premium Gate Components',
    goal: 'Reusable premium locked-feature UI.',
  },

  // Phase 2 — Stronger AI Product
  {
    id: padId(6),
    phaseId: 2,
    number: 6,
    title: 'Prompt Versioning System',
    goal: 'Make AI prompts maintainable and track prompt versions.',
  },
  {
    id: padId(7),
    phaseId: 2,
    number: 7,
    title: 'Plan Quality Upgrade',
    goal: 'Make generated plans more realistic, useful, and premium.',
  },
  {
    id: padId(8),
    phaseId: 2,
    number: 8,
    title: 'Plan Modes v1',
    goal: 'Add General, Fitness, Exam, College, and Deep Work modes.',
  },
  {
    id: padId(9),
    phaseId: 2,
    number: 9,
    title: 'Adaptive Weekly Review',
    goal: 'Make weekly reviews adjust next week’s behavior.',
  },
  {
    id: padId(10),
    phaseId: 2,
    number: 10,
    title: 'Recovery Plan Generator',
    goal: 'Help users recover after missed days or failed weeks.',
  },

  // Phase 3 — Retention Loops
  {
    id: padId(11),
    phaseId: 3,
    number: 11,
    title: 'Streaks + Consistency Score',
    goal: 'Make progress visible and sticky.',
  },
  {
    id: padId(12),
    phaseId: 3,
    number: 12,
    title: 'Progress Insights',
    goal: 'Show best days, weak habits, and completion trends.',
  },
  {
    id: padId(13),
    phaseId: 3,
    number: 13,
    title: 'Smart Nudges',
    goal: 'Add lightweight coaching and daily priority suggestions.',
  },
  {
    id: padId(14),
    phaseId: 3,
    number: 14,
    title: 'Weekly Review UX Polish',
    goal: 'Make weekly review feel like a strong product ritual.',
  },

  // Phase 4 — Onboarding and Conversion
  {
    id: padId(15),
    phaseId: 4,
    number: 15,
    title: 'Onboarding Rewrite',
    goal: 'Make onboarding sell the outcome and collect better personalization data.',
  },
  {
    id: padId(16),
    phaseId: 4,
    number: 16,
    title: 'AI Plan Preview Moment',
    goal: 'Make the generated plan feel valuable before asking for payment.',
  },
  {
    id: padId(17),
    phaseId: 4,
    number: 17,
    title: 'Free vs Premium Design',
    goal: 'Define exactly what is free and what is paid.',
  },
  {
    id: padId(18),
    phaseId: 4,
    number: 18,
    title: 'Paywall v1',
    goal: 'Create a clean premium SaaS paywall.',
  },

  // Phase 5 — Web Payments
  {
    id: padId(19),
    phaseId: 5,
    number: 19,
    title: 'Stripe Subscription Backend',
    goal: 'Add Stripe checkout, webhooks, and subscription sync.',
  },
  {
    id: padId(20),
    phaseId: 5,
    number: 20,
    title: 'Premium Enforcement',
    goal: 'Enforce paid status server-side and in UI.',
  },
  {
    id: padId(21),
    phaseId: 5,
    number: 21,
    title: 'Billing Settings UI',
    goal: 'Let users manage their plan and billing.',
  },

  // Phase 6 — App-Store Mobile Foundation
  {
    id: padId(22),
    phaseId: 6,
    number: 22,
    title: 'Capacitor Setup',
    goal: 'Turn the web app into an iOS/Android shell.',
  },
  {
    id: padId(23),
    phaseId: 6,
    number: 23,
    title: 'Native Mobile UI Pass',
    goal: 'Make the app feel polished inside a mobile shell.',
  },
  {
    id: padId(24),
    phaseId: 6,
    number: 24,
    title: 'App Auth Check',
    goal: 'Verify Clerk auth works correctly in mobile.',
  },

  // Phase 7 — Mobile Subscriptions
  {
    id: padId(25),
    phaseId: 7,
    number: 25,
    title: 'RevenueCat Integration',
    goal: 'Unify Apple/Google subscriptions.',
  },
  {
    id: padId(26),
    phaseId: 7,
    number: 26,
    title: 'Native Paywall',
    goal: 'Add app-store subscription purchase flow.',
  },
  {
    id: padId(27),
    phaseId: 7,
    number: 27,
    title: 'Subscription Webhook Sync',
    goal: 'Sync RevenueCat subscription status to Supabase entitlements.',
  },

  // Phase 8 — Store Readiness
  {
    id: padId(28),
    phaseId: 8,
    number: 28,
    title: 'Legal and Trust Pages',
    goal: 'Add privacy policy, terms, support, AI disclaimer, and subscription terms.',
  },
  {
    id: padId(29),
    phaseId: 8,
    number: 29,
    title: 'App Store Assets',
    goal: 'Create app icon, screenshots, descriptions, keywords, and listing assets.',
  },
  {
    id: padId(30),
    phaseId: 8,
    number: 30,
    title: 'TestFlight + Internal Testing',
    goal: 'Test devices, auth, subscriptions, plan generation, weekly review, and restore purchases.',
  },

  // Phase 9 — Launch and Growth
  {
    id: padId(31),
    phaseId: 9,
    number: 31,
    title: 'Marketing Website',
    goal: 'Create conversion-focused landing page, pricing, FAQ, SEO basics, and download buttons.',
  },
  {
    id: padId(32),
    phaseId: 9,
    number: 32,
    title: 'Launch Analytics',
    goal: 'Track onboarding, plan generation, paywall views, conversion, subscription start, and churn.',
  },
];

export const TOTAL_ITEMS = ROADMAP_ITEMS.length;

/** Quick lookup: phaseId -> Phase. */
export const PHASE_BY_ID: Record<number, Phase> = Object.fromEntries(
  PHASES.map((p) => [p.id, p]),
);
