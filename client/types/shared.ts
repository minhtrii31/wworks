import type { ReactNode } from "react"

import type { GuideStep } from "./common"

export interface LoadingSpinnerProps {
  message: string
  ariaLabel?: string
}

export interface UsageGuideProps {
  steps: GuideStep[]
  ariaLabel?: string
}

export interface SuggestionListProps {
  suggestions: string[]
}

export interface ScoreRingProps {
  score: number
  maxScore: number
  /** Display string shown below the score number (e.g. "%" or "/100") */
  suffix?: string
  size?: "sm" | "lg"
  ariaLabel?: string
}

export interface PdfUploadAreaProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
  dropLabel?: string
  ariaLabel?: string
}

export interface TextareaInputProps {
  onSubmit: (text: string) => void
  disabled?: boolean
  placeholder?: string
  ariaLabel?: string
  submitLabel?: string
  disabledTitle?: string
  minChars?: number
  errorMessage?: string
  rows?: number
}

export interface PageHeaderProps {
  sectionLabel: string
  title: string
  subtitle?: ReactNode
}

export interface UsageBarProps {
  used: number
  limit: number
  /** When true, shows remaining count + reset note below the bar */
  showRemaining?: boolean
}
