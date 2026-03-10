import type { UsageGuideProps } from "@/types/shared"

export const UsageGuide = ({ steps, ariaLabel = "How it works" }: UsageGuideProps) => (
  <div className="px-8 py-8">
    <p className="mb-8 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
      How it works
    </p>

    <ol className="space-y-6" aria-label={ariaLabel}>
      {steps.map(({ number, title, description }) => (
        <li key={number} className="flex items-start gap-5">
          <span
            aria-hidden
            className="mt-px w-5 shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground/40"
          >
            {number}
          </span>
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  </div>
)
