export type { GuideStep } from "@/types/common"

export interface AnalysisResult {
  score: number
  maxScore: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  fileName: string
}
