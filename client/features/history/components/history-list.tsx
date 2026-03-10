"use client"

import { useState, useMemo } from "react"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"

import { HistoryCard } from "./history-card"
import type { HistoryEntry, HistoryFilterType } from "../types"

const FILTER_TABS: { id: HistoryFilterType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "resume-analysis", label: "Resume Analysis" },
  { id: "job-match", label: "Job Match" },
  { id: "cover-letter", label: "Cover Letter" },
]

interface HistoryListProps {
  entries: HistoryEntry[]
}

export const HistoryList = ({ entries }: HistoryListProps) => {
  const [activeFilter, setActiveFilter] = useState<HistoryFilterType>("all")

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? entries
        : entries.filter((e) => e.type === activeFilter),
    [entries, activeFilter]
  )

  return (
    <div className="flex flex-col">
      {/* Filter tabs */}
      <div
        role="tablist"
        aria-label="Filter history by feature type"
        className="flex gap-6 border-b border-border/60 px-8"
      >
        {FILTER_TABS.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeFilter === id}
            onClick={() => setActiveFilter(id)}
            className={cn(
              "-mb-px border-b-2 pt-4 pb-3 text-xs font-medium transition-colors",
              activeFilter === id
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Record count */}
      <div className="flex items-center border-b border-border/40 px-8 py-2.5">
        <p className="text-[11px] text-muted-foreground/50">
          {filtered.length} {filtered.length === 1 ? "record" : "records"}
        </p>
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <Clock aria-hidden className="mb-3 size-5 text-muted-foreground/20" />
          <p className="text-sm text-muted-foreground/50">No records yet.</p>
          <p className="mt-1 text-xs text-muted-foreground/40">
            Use a feature to start building your history.
          </p>
        </div>
      ) : (
        <ul role="list" aria-label="History entries" className="flex flex-col">
          {filtered.map((entry) => (
            <HistoryCard key={entry.id} entry={entry} />
          ))}
        </ul>
      )}
    </div>
  )
}
