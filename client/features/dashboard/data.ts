import { ROUTES } from "@/constants/routes"

import type { ActivityItem, GuideStep, ShortcutItem } from "./types"

export const AI_USAGE_TODAY = 3
export const AI_USAGE_LIMIT = 5

export const recentActivity: ActivityItem[] = [
  {
    id: "1",
    type: "analysis",
    title: "Resume Analysis",
    description: "Software Engineer resume scored 87%",
    timestamp: "2h ago",
    href: ROUTES.RESUME_ANALYSIS,
  },
  {
    id: "2",
    type: "match",
    title: "Job Match",
    description: "Matched 5 roles at Stripe, Vercel, and Linear",
    timestamp: "Yesterday",
    href: ROUTES.JOB_MATCH,
  },
  {
    id: "3",
    type: "cover-letter",
    title: "Cover Letter Generator",
    description: "Cover letter generated for Full-Stack role at Shopify",
    timestamp: "2 days ago",
    href: ROUTES.COVER_LETTER,
  },
  {
    id: "4",
    type: "analysis",
    title: "Resume Analysis",
    description: "Product Designer resume scored 74%",
    timestamp: "3 days ago",
    href: ROUTES.RESUME_ANALYSIS,
  },
  {
    id: "5",
    type: "match",
    title: "Job Match",
    description: "Matched 3 roles based on updated resume",
    timestamp: "4 days ago",
    href: ROUTES.JOB_MATCH,
  },
]

export const shortcuts: ShortcutItem[] = [
  { label: "Resume Analysis", href: ROUTES.RESUME_ANALYSIS },
  { label: "Job Match", href: ROUTES.JOB_MATCH },
  { label: "Cover Letter Generator", href: ROUTES.COVER_LETTER },
]

export const guideSteps: GuideStep[] = [
  {
    step: "01",
    title: "Resume Analysis",
    description:
      "Upload your CV (PDF or paste text) and receive an AI-powered breakdown — score, strengths, and actionable suggestions to improve your profile.",
    href: ROUTES.RESUME_ANALYSIS,
    linkLabel: "Analyse my resume",
  },
  {
    step: "02",
    title: "Job Match",
    description:
      "Paste or upload a Job Description, then let the AI compare it against your uploaded CV to surface a match score, missing keywords, and tailored tips.",
    href: ROUTES.JOB_MATCH,
    linkLabel: "Match a job",
  },
  {
    step: "03",
    title: "Cover Letter Generator",
    description:
      "Generate a personalised cover letter for any role in seconds. Edit, copy, download as PDF, or send directly via email — all from one place.",
    href: ROUTES.COVER_LETTER,
    linkLabel: "Generate a cover letter",
  },
  {
    step: "04",
    title: "Activity History",
    description:
      "Every analysis, match, and generated letter is saved automatically. Browse your full history to revisit results or track your progress over time.",
    href: ROUTES.HISTORY,
    linkLabel: "View history",
  },
]
