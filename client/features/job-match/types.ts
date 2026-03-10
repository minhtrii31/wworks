export type { GuideStep } from "@/types/common"

export interface ResumeOption {
  id: string
  name: string
  analyzedAt: string
  score: number
}

export interface MatchResult {
  score: number
  maxScore: number
  missingKeywords: string[]
  suggestions: string[]
  jobTitle: string
  resumeName: string
}
