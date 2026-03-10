import type { GuideStep, MatchResult, ResumeOption } from "./types"

export const MOCK_RESUMES: ResumeOption[] = [
  {
    id: "r1",
    name: "John_Doe_Resume.pdf",
    analyzedAt: "2 days ago",
    score: 72,
  },
  {
    id: "r2",
    name: "John_Doe_Resume_v2.pdf",
    analyzedAt: "1 week ago",
    score: 65,
  },
  {
    id: "r3",
    name: "Frontend_Dev_CV.pdf",
    analyzedAt: "3 weeks ago",
    score: 58,
  },
]

export const MOCK_MATCH_RESULT: Omit<MatchResult, "jobTitle" | "resumeName"> = {
  score: 68,
  maxScore: 100,
  missingKeywords: ["Docker", "Unit Testing", "AWS", "CI/CD", "Kubernetes"],
  suggestions: [
    "Add a deployment project to showcase DevOps awareness",
    "Highlight backend experience more prominently in your summary",
    "Mention cloud platforms or services you have worked with",
    "Include any testing frameworks you have used (e.g. Jest, Cypress)",
  ],
}

export const GUIDE_STEPS: GuideStep[] = [
  {
    number: "01",
    title: "Paste a job description",
    description:
      "Copy any job posting text and paste it into the input on the left — the more detail, the better the match.",
  },
  {
    number: "02",
    title: "AI cross-references your resume",
    description:
      "The model compares the job requirements against your uploaded resume skills, experience, and keywords.",
  },
  {
    number: "03",
    title: "Close the gap",
    description:
      "Review your match score, spot missing keywords, and follow the tailored suggestions to strengthen your application.",
  },
]
