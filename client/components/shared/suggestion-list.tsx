import type { SuggestionListProps } from "@/types/shared"

export const SuggestionList = ({ suggestions }: SuggestionListProps) => (
  <section aria-labelledby="section-suggestions" className="px-8 py-7">
    <p
      id="section-suggestions"
      className="mb-4 text-[11px] font-medium uppercase tracking-widest text-muted-foreground"
    >
      Suggestions
    </p>

    <ol role="list" className="space-y-3">
      {suggestions.map((item, index) => (
        <li key={index} className="flex items-start gap-4">
          <span
            aria-hidden
            className="mt-0.5 w-5 shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground/40"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ol>
  </section>
)
