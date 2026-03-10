"use client"

import { useState, useCallback } from "react"
import { FileText } from "lucide-react"

import {
  LoadingSpinner,
  UsageGuide,
  PdfUploadArea,
  TextareaInput,
  PageHeader,
} from "@/components/shared"
import { cn } from "@/lib/utils"
import { ResultSection } from "@/features/resume-analysis/components/result-section"
import { ScoreCard } from "@/features/resume-analysis/components/score-card"
import { SuggestionList } from "@/components/shared"
import { MOCK_ANALYSIS_RESULT, GUIDE_STEPS } from "@/features/resume-analysis/data"
import type { AnalysisResult } from "@/features/resume-analysis/types"
import type { PageStatus } from "@/types/common"

type InputMode = "file" | "text"

const PAGE_TITLE: Record<PageStatus, string> = {
  idle: "Analyze Resume",
  loading: "Analyzing\u2026",
  done: "Analysis Result",
}

export default function ResumeAnalysisPage() {
  const [status, setStatus] = useState<PageStatus>("idle")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [inputMode, setInputMode] = useState<InputMode>("file")

  const triggerAnalysis = useCallback((displayName: string) => {
    setStatus("loading")
    setTimeout(() => {
      setResult({ ...MOCK_ANALYSIS_RESULT, fileName: displayName })
      setStatus("done")
    }, 2500)
  }, [])

  const handleFileSelect = useCallback(
    (file: File) => triggerAnalysis(file.name),
    [triggerAnalysis],
  )

  const handleTextSubmit = useCallback(
    (text: string) => triggerAnalysis(text.slice(0, 40).trim() || "Pasted resume"),
    [triggerAnalysis],
  )

  const handleReset = useCallback(() => {
    setResult(null)
    setStatus("idle")
  }, [])

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        sectionLabel="Resume Analysis"
        title={PAGE_TITLE[status]}
        subtitle={
          status === "done" && result?.fileName ? result.fileName : undefined
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-1 divide-y divide-border/60 overflow-hidden lg:grid-cols-[2fr_3fr] lg:divide-x lg:divide-y-0">
        <aside
          aria-label="Input panel"
          className="flex flex-col overflow-y-auto px-8 py-8"
        >
          {/* Tab switcher */}
          <div
            role="tablist"
            aria-label="Input method"
            className="mb-6 flex gap-6 border-b border-border/60"
          >
            {(["file", "text"] as const).map((mode) => (
              <button
                key={mode}
                role="tab"
                aria-selected={inputMode === mode}
                onClick={() => setInputMode(mode)}
                className={cn(
                  "-mb-px border-b-2 pb-3 text-xs font-medium transition-colors",
                  inputMode === mode
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {mode === "file" ? "Upload PDF" : "Paste Text"}
              </button>
            ))}
          </div>

          {inputMode === "file" ? (
            <PdfUploadArea
              onFileSelect={handleFileSelect}
              dropLabel="Drop your resume here"
              ariaLabel="Upload resume PDF — click or drag and drop"
            />
          ) : (
            <TextareaInput
              onSubmit={handleTextSubmit}
              placeholder="Paste your resume text here…"
              ariaLabel="Resume text content"
              submitLabel="Analyze Resume"
              errorMessage="Please paste more content — at least a few sentences of your resume."
            />
          )}

          {result && (
            <div className="mt-8 border-t border-border/60 pt-6">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                Last analyzed
              </p>
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <FileText
                    className="size-3.5 shrink-0 text-muted-foreground/50"
                    aria-hidden
                  />
                  <span className="truncate text-xs text-muted-foreground">
                    {result.fileName}
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="shrink-0 text-[11px] text-muted-foreground/50 transition-colors hover:text-foreground"
                  aria-label="Clear current analysis and reset"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </aside>

        <div className="overflow-y-auto">
          {status === "idle" && (
            <UsageGuide
              steps={GUIDE_STEPS}
              ariaLabel="Steps to analyze your resume"
            />
          )}

          {status === "loading" && (
            <LoadingSpinner message="Analyzing resume" />
          )}

          {status === "done" && result && (
            <div className="divide-y divide-border/60">
              <ScoreCard score={result.score} maxScore={result.maxScore} />

              <div className="grid grid-cols-1 divide-y divide-border/60 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <ResultSection label="Strengths" items={result.strengths} />
                <ResultSection label="Weaknesses" items={result.weaknesses} />
              </div>

              <SuggestionList suggestions={result.suggestions} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
