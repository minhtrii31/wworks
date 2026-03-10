import Link from "next/link"
import { BarChart2, FileEdit, Target } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { ScoreRing } from "@/components/shared"

import type { HistoryEntry, HistoryFeatureType } from "../types"

const FEATURE_META: Record<HistoryFeatureType, { icon: LucideIcon; label: string }> = {
  "resume-analysis": { icon: BarChart2, label: "Resume Analysis" },
  "job-match": { icon: Target, label: "Job Match" },
  "cover-letter": { icon: FileEdit, label: "Cover Letter" },
}

interface HistoryCardProps {
  entry: HistoryEntry
}

export const HistoryCard = ({ entry }: HistoryCardProps) => {
  const { icon: Icon, label } = FEATURE_META[entry.type]
  const hasScore =
    typeof entry.score === "number" && typeof entry.maxScore === "number"

  return (
    <li className="border-b border-border/40 last:border-b-0">
      <Link
        href={entry.href}
        aria-label={`${entry.title}${hasScore ? `, score ${entry.score} out of ${entry.maxScore}` : ""}, ${entry.dateLabel}`}
        className="flex items-center gap-5 px-8 py-4 transition-colors hover:bg-foreground/[0.02]"
      >
        <Icon
          aria-hidden
          className="size-4 shrink-0 text-muted-foreground"
        />

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
          <p className="mt-0.5 truncate text-sm font-medium leading-snug">
            {entry.description}
          </p>
        </div>

        {hasScore && (
          <ScoreRing
            size="sm"
            score={entry.score!}
            maxScore={entry.maxScore!}
            ariaLabel={`Score ${entry.score} out of ${entry.maxScore}`}
          />
        )}

        <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground/50">
          {entry.dateLabel}
        </span>
      </Link>
    </li>
  )
}
