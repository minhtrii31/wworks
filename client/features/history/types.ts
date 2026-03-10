export type HistoryFeatureType = "resume-analysis" | "job-match" | "cover-letter"

export type HistoryFilterType = HistoryFeatureType | "all"

export interface HistoryEntry {
  id: string
  type: HistoryFeatureType
  title: string
  description: string
  score?: number
  maxScore?: number
  date: string
  dateLabel: string
  href: string
}
