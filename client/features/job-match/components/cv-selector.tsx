"use client"

import { useState } from "react"
import { Check, ChevronDown, FileText } from "lucide-react"
import { Popover } from "radix-ui"

import { cn } from "@/lib/utils"
import type { ResumeOption } from "../types"

interface CvSelectorProps {
  resumes: ResumeOption[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export const CvSelector = ({
  resumes,
  selectedId,
  onSelect,
}: CvSelectorProps) => {
  const [open, setOpen] = useState(false)
  const selected = resumes.find((r) => r.id === selectedId) ?? null

  if (resumes.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border px-4 py-4">
        <p className="text-xs text-muted-foreground">
          No analyzed resumes yet.{" "}
          <a
            href="/resume-analysis"
            className="text-foreground underline underline-offset-2 transition-opacity hover:opacity-70"
          >
            Analyze one first
          </a>{" "}
          to get started.
        </p>
      </div>
    )
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      {/* ── Trigger ─────────────────────────────────────────────────── */}
      <Popover.Trigger asChild>
        <button
          aria-label="Select a resume to match against"
          className={cn(
            "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors",
            open
              ? "border-foreground/20 bg-foreground/[0.02]"
              : "border-border hover:border-foreground/10 hover:bg-foreground/[0.02]",
          )}
        >
          {selected ? (
            <>
              <FileText
                className="size-3.5 shrink-0 text-muted-foreground/40"
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium">{selected.name}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground/50">
                  Score {selected.score}/100
                  <span aria-hidden className="mx-1.5">·</span>
                  {selected.analyzedAt}
                </p>
              </div>
              {/* Score badge */}
              <span
                aria-hidden
                className="shrink-0 rounded-sm bg-foreground/[0.06] px-1.5 py-0.5 text-[10px] tabular-nums text-muted-foreground"
              >
                {selected.score}
              </span>
            </>
          ) : (
            <span className="flex-1 text-xs text-muted-foreground/40">
              Choose a resume…
            </span>
          )}

          <ChevronDown
            className={cn(
              "size-3 shrink-0 text-muted-foreground/30 transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </button>
      </Popover.Trigger>

      {/* ── Dropdown ────────────────────────────────────────────────── */}
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          className="z-50 w-[var(--radix-popover-trigger-width)] rounded-lg border border-border bg-background p-1 shadow-lg outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <ul role="listbox" aria-label="Resume options">
            {resumes.map((resume) => {
              const isSelected = resume.id === selectedId

              return (
                <li key={resume.id}>
                  <button
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onSelect(resume.id)
                      setOpen(false)
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
                      isSelected
                        ? "bg-foreground/[0.04]"
                        : "hover:bg-foreground/[0.03]",
                    )}
                  >
                    <FileText
                      className="size-3.5 shrink-0 text-muted-foreground/40"
                      aria-hidden
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">
                        {resume.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground/50">
                        Score {resume.score}/100
                        <span aria-hidden className="mx-1.5">·</span>
                        {resume.analyzedAt}
                      </p>
                    </div>

                    <Check
                      className={cn(
                        "size-3 shrink-0 text-muted-foreground/50 transition-opacity",
                        isSelected ? "opacity-100" : "opacity-0",
                      )}
                      aria-hidden
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
