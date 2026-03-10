"use client"

import { useState, useCallback, useEffect, startTransition } from "react"
import { Briefcase, Building2 } from "lucide-react"

import { LoadingSpinner, UsageGuide, PageHeader } from "@/components/shared"
import { CoverLetterForm } from "@/features/cover-letter/components/cover-letter-form"
import { GeneratedLetterCard } from "@/features/cover-letter/components/generated-letter-card"
import { MOCK_COVER_LETTER, GUIDE_STEPS } from "@/features/cover-letter/data"
import type { CoverLetterResult, FormValues } from "@/features/cover-letter/types"
import type { PageStatus } from "@/types/common"

const CL_PREFILL_KEY = "cl_prefill"

type PrefillData = Pick<FormValues, "jobTitle" | "jobDescription">

const PAGE_TITLE: Record<PageStatus, string> = {
  idle: "Generate Cover Letter",
  loading: "Generating\u2026",
  done: "Cover Letter Ready",
}

export default function CoverLetterPage() {
  const [status, setStatus] = useState<PageStatus>("idle")
  const [result, setResult] = useState<CoverLetterResult | null>(null)
  const [prefill, setPrefill] = useState<Partial<FormValues> | undefined>(undefined)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CL_PREFILL_KEY)
      if (raw) {
        sessionStorage.removeItem(CL_PREFILL_KEY)
        const parsed = JSON.parse(raw) as Partial<PrefillData>
        startTransition(() => {
          setPrefill({
            jobTitle: parsed.jobTitle ?? "",
            jobDescription: parsed.jobDescription ?? "",
          })
        })
      }
    } catch {
      // sessionStorage unavailable or JSON parse error — proceed without prefill
    }
  }, [])

  const handleGenerate = useCallback((values: FormValues) => {
    setStatus("loading")
    setTimeout(() => {
      setResult({
        companyName: values.companyName,
        jobTitle: values.jobTitle,
        content: MOCK_COVER_LETTER.content
          .replace("Acme Corp", values.companyName)
          .replace("Full Stack Developer", values.jobTitle),
      })
      setStatus("done")
    }, 2500)
  }, [])

  const handleReset = useCallback(() => {
    setResult(null)
    setStatus("idle")
  }, [])

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        sectionLabel="Cover Letter Generator"
        title={PAGE_TITLE[status]}
        subtitle={
          status === "done" && result ? (
            <>
              {result.jobTitle}
              <span aria-hidden className="mx-1.5 opacity-40">·</span>
              {result.companyName}
            </>
          ) : undefined
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-1 divide-y divide-border/60 overflow-hidden lg:grid-cols-[2fr_3fr] lg:divide-x lg:divide-y-0">
        <aside
          aria-label="Cover letter form panel"
          className="flex flex-col gap-8 overflow-y-auto px-8 py-8"
        >
          <CoverLetterForm onSubmit={handleGenerate} initialValues={prefill} />

          {result && (
            <div className="border-t border-border/60 pt-6">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                Last generated
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Building2
                    className="size-3.5 shrink-0 text-muted-foreground/40"
                    aria-hidden
                  />
                  <span className="truncate text-xs text-muted-foreground">
                    {result.companyName}
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
                    aria-label="Clear the current cover letter and start over"
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
              ariaLabel="Steps to generate a cover letter"
            />
          )}

          {status === "loading" && (
            <LoadingSpinner message="Writing your cover letter" />
          )}

          {status === "done" && result && (
            <GeneratedLetterCard
              content={result.content}
              companyName={result.companyName}
              jobTitle={result.jobTitle}
            />
          )}
        </div>
      </div>
    </div>
  )
}
