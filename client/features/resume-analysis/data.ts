import type { AnalysisResult, GuideStep } from "./types"

export const MOCK_ANALYSIS_RESULT: Omit<AnalysisResult, "fileName"> = {
  score: 72,
  maxScore: 100,
  strengths: [
    "Strong React experience",
    "REST API development",
    "Clear project descriptions",
  ],
  weaknesses: [
    "No testing experience",
    "No Docker knowledge",
    "Missing quantified achievements",
  ],
  suggestions: [
    "Add a backend deployment project to showcase DevOps awareness",
    "Mention testing tools such as Jest or Cypress",
    "Quantify impact with metrics (e.g. reduced load time by 40%)",
  ],
}

export const GUIDE_STEPS: GuideStep[] = [
  {
    number: "01",
    title: "Upload or paste your resume",
    description:
      "Drop a PDF into the left panel, click to browse, or switch to Paste Text to copy your CV content directly.",
  },
  {
    number: "02",
    title: "AI reads your CV",
    description:
      "Our model scans your skills, work experience, project history, and formatting in seconds.",
  },
  {
    number: "03",
    title: "Read your report",
    description:
      "Receive a score out of 100, a list of strengths and weaknesses, and numbered improvement steps.",
  },
]
