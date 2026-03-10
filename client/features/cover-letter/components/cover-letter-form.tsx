"use client"

import { useState, type ChangeEvent } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { FormValues } from "../types"

interface CoverLetterFormProps {
  onSubmit: (values: FormValues) => void
  initialValues?: Partial<FormValues>
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const MIN_JD_CHARS = 80

const countWords = (str: string) =>
  str.trim() ? str.trim().split(/\s+/).length : 0

const inputBase =
  "w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"

const fieldLabel = "text-xs font-medium text-muted-foreground"

export const CoverLetterForm = ({
  onSubmit,
  initialValues,
}: CoverLetterFormProps) => {
  const hasPrefill = Boolean(
    initialValues?.jobTitle || initialValues?.jobDescription,
  )

  const [values, setValues] = useState<FormValues>({
    companyName: initialValues?.companyName ?? "",
    jobTitle: initialValues?.jobTitle ?? "",
    jobDescription: initialValues?.jobDescription ?? "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const wordCount = countWords(values.jobDescription)

  const set =
    (field: keyof FormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

  const validate = (): FormErrors => {
    const errs: FormErrors = {}
    if (!values.companyName.trim()) errs.companyName = "Company name is required."
    if (!values.jobTitle.trim()) errs.jobTitle = "Job title is required."
    if (values.jobDescription.trim().length < MIN_JD_CHARS)
      errs.jobDescription =
        "Please paste more content — at least a few sentences."
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    onSubmit(values)
  }

  return (
    <div className="flex w-full flex-col gap-5">
      {/* Company Name — always empty; auto-focused when arriving from Job Match */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cl-company" className={fieldLabel}>
          Company Name
        </label>
        <input
          id="cl-company"
          type="text"
          autoFocus={hasPrefill}
          value={values.companyName}
          onChange={set("companyName")}
          placeholder="e.g. Acme Corp"
          aria-describedby={errors.companyName ? "cl-company-error" : undefined}
          className={cn(
            inputBase,
            errors.companyName ? "border-destructive/50" : "border-border",
          )}
        />
        {errors.companyName && (
          <p id="cl-company-error" role="alert" className="text-xs text-destructive">
            {errors.companyName}
          </p>
        )}
      </div>

      {/* Job Title */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cl-job-title" className={cn(fieldLabel, "flex items-center gap-2")}>
          Job Title
          {initialValues?.jobTitle && (
            <span className="text-[10px] font-normal text-muted-foreground/40">
              · from Job Match
            </span>
          )}
        </label>
        <input
          id="cl-job-title"
          type="text"
          value={values.jobTitle}
          onChange={set("jobTitle")}
          placeholder="e.g. Full Stack Developer"
          aria-describedby={errors.jobTitle ? "cl-job-title-error" : undefined}
          className={cn(
            inputBase,
            errors.jobTitle ? "border-destructive/50" : "border-border",
          )}
        />
        {errors.jobTitle && (
          <p id="cl-job-title-error" role="alert" className="text-xs text-destructive">
            {errors.jobTitle}
          </p>
        )}
      </div>

      {/* Job Description */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cl-jd" className={cn(fieldLabel, "flex items-center gap-2")}>
          Job Description
          {initialValues?.jobDescription && (
            <span className="text-[10px] font-normal text-muted-foreground/40">
              · from Job Match
            </span>
          )}
        </label>
        <textarea
          id="cl-jd"
          value={values.jobDescription}
          onChange={set("jobDescription")}
          placeholder="Paste the job description here…"
          rows={8}
          aria-describedby={errors.jobDescription ? "cl-jd-error" : undefined}
          className={cn(
            "w-full resize-y rounded-lg border bg-transparent px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
            errors.jobDescription ? "border-destructive/50" : "border-border",
          )}
        />
        {errors.jobDescription && (
          <p id="cl-jd-error" role="alert" className="text-xs text-destructive">
            {errors.jobDescription}
          </p>
        )}
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between gap-3">
        <span
          className="text-[11px] text-muted-foreground/50"
          aria-live="polite"
        >
          {wordCount > 0 ? `${wordCount} word${wordCount !== 1 ? "s" : ""}` : ""}
        </span>
        <Button
          onClick={handleSubmit}
          aria-label="Generate a cover letter based on the provided information"
        >
          Generate Cover Letter
        </Button>
      </div>
    </div>
  )
}
