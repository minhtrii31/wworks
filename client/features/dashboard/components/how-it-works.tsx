import Link from "next/link"
import { FileSearch, GitCompare, PenLine, History } from "lucide-react"

import type { GuideStep } from "../types"

const STEP_ICONS = [FileSearch, GitCompare, PenLine, History] as const

interface HowItWorksProps {
  steps: GuideStep[]
}

export const HowItWorks = ({ steps }: HowItWorksProps) => {
  return (
    <section
      aria-labelledby="guide-heading"
      className="shrink-0 border-t border-border/60"
    >
      {/* Section header */}
      <div className="border-b border-border/60 px-8 py-5">
        <h2
          id="guide-heading"
          className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground"
        >
          How it works
        </h2>
      </div>

      {/* Step grid */}
      <ol
        role="list"
        className="grid grid-cols-1 divide-y divide-border/60 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:[&>li:not(:first-child)]:border-l lg:[&>li:not(:first-child)]:border-border/60 sm:[&>li:nth-child(n+3)]:border-t sm:[&>li:nth-child(n+3)]:border-border/60"
      >
        {steps.map((step, index) => {
          const Icon = STEP_ICONS[index]
          return (
            <li key={step.step} className="flex flex-col gap-5 px-8 py-7">
              {/* Number + Icon row */}
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground/40">
                  {step.step}
                </span>
                <Icon
                  className="size-4 text-muted-foreground/40"
                  aria-hidden
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-2">
                <p className="text-sm font-medium leading-snug">{step.title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {/* CTA link */}
              <Link
                href={step.href}
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                aria-label={`${step.linkLabel} — ${step.title}`}
              >
                {step.linkLabel}
                <span aria-hidden className="text-muted-foreground/30">→</span>
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
