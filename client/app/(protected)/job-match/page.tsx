"use client"

import { useState, useCallback } from "react"
import { Briefcase, FileEdit, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  LoadingSpinner,
  UsageGuide,
  PdfUploadArea,
  TextareaInput,
  PageHeader,
  SuggestionList,
} from "@/components/shared"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CvSelector } from "@/features/job-match/components/cv-selector"
import { KeywordList } from "@/features/job-match/components/keyword-list"
import { MatchScoreCard } from "@/features/job-match/components/match-score-card"
import { MOCK_MATCH_RESULT, MOCK_RESUMES, GUIDE_STEPS } from "@/features/job-match/data"
import type { MatchResult } from "@/features/job-match/types"
import type { PageStatus } from "@/types/common"
import { ROUTES } from "@/constants/routes"

const CL_PREFILL_KEY = "cl_prefill"

type InputMode = "file" | "text"

const PAGE_TITLE: Record<PageStatus, string> = {
  idle: "Match Resume to Job",
  loading: "Analyzing\u2026",
  done: "Match Result",
}

export default function JobMatchPage() {
  const router = useRouter()
  const [status, setStatus] = useState<PageStatus>("idle")
  const [result, setResult] = useState<MatchResult | null>(null)
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [inputMode, setInputMode] = useState<InputMode>("file")

  const selectedResume = MOCK_RESUMES.find((r) => r.id === selectedResumeId) ?? null

  const triggerMatchFromText = useCallback(
    (jobText: string) => {
      if (!selectedResume) return
      const firstLine = jobText.split(/\n/)[0].trim().slice(0, 60)
      const jobTitle = firstLine || "Pasted description"

      setJobDescription(jobText)
      setStatus("loading")
      setTimeout(() => {
        setResult({
          ...MOCK_MATCH_RESULT,
          jobTitle,
          resumeName: selectedResume.name,
        })
        setStatus("done")
      }, 2500)
    },
    [selectedResume],
  )

  const triggerMatchFromFile = useCallback(
    (file: File) => {
      if (!selectedResume) return
      const rawName = file.name.replace(/\.pdf$/i, "").replace(/[_\-]+/g, " ").trim()
      const jobTitle = rawName.slice(0, 60) || file.name

      setJobDescription("")
      setStatus("loading")
      setTimeout(() => {
        setResult({
          ...MOCK_MATCH_RESULT,
          jobTitle,
          resumeName: selectedResume.name,
        })
        setStatus("done")
      }, 2500)
    },
    [selectedResume],
  )

  const handleReset = useCallback(() => {
    setResult(null)
    setStatus("idle")
    setJobDescription("")
  }, [])

  const handleGoToCoverLetter = useCallback(() => {
    if (!result) return
    try {
      sessionStorage.setItem(
        CL_PREFILL_KEY,
        JSON.stringify({ jobTitle: result.jobTitle, jobDescription }),
      )
    } catch {
      // sessionStorage unavailable — navigate without prefill
    }
    router.push(ROUTES.COVER_LETTER)
  }, [result, jobDescription, router])

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        sectionLabel="Job Match"
        title={PAGE_TITLE[status]}
        subtitle={
          status === "done" && result ? (
            <>
              {result.resumeName}
              <span aria-hidden className="mx-1.5 opacity-40">·</span>
              {result.jobTitle}
            </>
          ) : undefined
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-1 divide-y divide-border/60 overflow-hidden lg:grid-cols-[2fr_3fr] lg:divide-x lg:divide-y-0">
        <aside
          aria-label="Resume and job description input panel"
          className="flex flex-col gap-8 overflow-y-auto px-8 py-8"
        >
          {/* Section 1: Resume selector */}
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Select Resume
            </p>
            <CvSelector
              resumes={MOCK_RESUMES}
              selectedId={selectedResumeId}
              onSelect={setSelectedResumeId}
            />
          </div>

          <div className="border-t border-border/60" aria-hidden />

          {/* Section 2: Job description */}
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Job Description
            </p>

            {/* Tab switcher */}
            <div
              role="tablist"
              aria-label="Job description input method"
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
                onFileSelect={triggerMatchFromFile}
                disabled={!selectedResumeId}
                dropLabel="Drop job description PDF here"
                ariaLabel="Upload job description PDF — click or drag and drop"
              />
            ) : (
              <TextareaInput
                onSubmit={triggerMatchFromText}
                disabled={!selectedResumeId}
                placeholder={"Paste the job description here…\n\ne.g. We are looking for a Full Stack Developer with experience in React, Node.js, and cloud platforms…"}
                ariaLabel="Job description text"
                submitLabel="Analyze Match"
                disabledTitle="Select a resume above first"
                errorMessage="Please paste more content — at least a few sentences of the job description."
                rows={12}
              />
            )}
          </div>

          {/* Last matched */}
          {result && (
            <div className="border-t border-border/60 pt-2">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                Last matched
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <FileText
                    className="size-3.5 shrink-0 text-muted-foreground/40"
                    aria-hidden
                  />
                  <span className="truncate text-xs text-muted-foreground">
                    {result.resumeName}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <Briefcase
                      className="size-3.5 shrink-0 text-muted-foreground/40"
                      aria-hidden
                    />
                    <span className="truncate text-xs text-muted-foreground">
                      {result.jobTitle}
                    </span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="shrink-0 text-[11px] text-muted-foreground/50 transition-colors hover:text-foreground"
                    aria-label="Clear current match result and reset"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>

        <div className="overflow-y-auto">
          {status === "idle" && (
            <UsageGuide
              steps={GUIDE_STEPS}
              ariaLabel="Steps to match your resume to a job"
            />
          )}

          {status === "loading" && (
            <LoadingSpinner message="Matching resume to job" />
          )}

          {status === "done" && result && (
            <div className="divide-y divide-border/60">
              <MatchScoreCard score={result.score} maxScore={result.maxScore} />
              <KeywordList keywords={result.missingKeywords} />
              <SuggestionList suggestions={result.suggestions} />

              <section aria-label="Next step" className="px-8 py-8">
                <p className="mb-1.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  Next Step
                </p>
                <p className="mb-5 text-xs leading-relaxed text-muted-foreground">
                  Ready to apply? Generate a cover letter tailored to this role
                  — job title and description will be pre-filled for you.
                </p>
                <Button
                  variant="outline"
                  onClick={handleGoToCoverLetter}
                  aria-label="Go to Cover Letter Generator with this job pre-filled"
                >
                  <FileEdit className="size-3.5" aria-hidden />
                  Generate Cover Letter
                </Button>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
