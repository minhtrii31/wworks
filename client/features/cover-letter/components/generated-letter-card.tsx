"use client"

import { useState } from "react"
import { Check, Pencil } from "lucide-react"

import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"
import { DownloadButton } from "./download-button"
import { EmailButton } from "./email-button"

interface GeneratedLetterCardProps {
  content: string
  companyName: string
  jobTitle: string
}

const toFilename = (companyName: string, jobTitle: string) => {
  const slug = `${companyName}_${jobTitle}`
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/gi, "")
    .toLowerCase()
  return `cover_letter_${slug}.txt`
}

export const GeneratedLetterCard = ({
  content: initialContent,
  companyName,
  jobTitle,
}: GeneratedLetterCardProps) => {
  const [content, setContent] = useState(initialContent)
  const [isEditing, setIsEditing] = useState(false)

  const filename = toFilename(companyName, jobTitle)

  return (
    <section aria-labelledby="section-letter" className="px-8 py-8">
      {/* ── Header row ──────────────────────────────────────────────── */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <p
          id="section-letter"
          className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground"
        >
          Generated Cover Letter
        </p>

        <button
          onClick={() => setIsEditing((prev) => !prev)}
          aria-label={isEditing ? "Finish editing cover letter" : "Edit cover letter"}
          className="flex items-center gap-1.5 text-[11px] text-muted-foreground/50 transition-colors hover:text-foreground"
        >
          {isEditing ? (
            <>
              <Check className="size-3" aria-hidden />
              Done
            </>
          ) : (
            <>
              <Pencil className="size-3" aria-hidden />
              Edit
            </>
          )}
        </button>
      </div>

      {/* ── Letter body ─────────────────────────────────────────────── */}
      <div
        className={cn(
          "rounded-lg border border-border bg-foreground/[0.015] px-6 py-5 transition-shadow",
          isEditing && "ring-2 ring-ring/20",
        )}
      >
        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            aria-label="Edit cover letter content"
            aria-multiline="true"
            className="min-h-96 w-full resize-y bg-transparent text-sm leading-[1.9] text-foreground focus:outline-none"
          />
        ) : (
          <p className="whitespace-pre-wrap text-sm leading-[1.9] text-foreground">
            {content}
          </p>
        )}
      </div>

      {/* ── Action row ──────────────────────────────────────────────── */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <CopyButton text={content} />
        <DownloadButton content={content} filename={filename} />
        <EmailButton
          content={content}
          companyName={companyName}
          jobTitle={jobTitle}
        />
      </div>
    </section>
  )
}
