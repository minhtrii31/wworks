interface KeywordListProps {
  keywords: string[]
}

export const KeywordList = ({ keywords }: KeywordListProps) => {
  return (
    <section
      aria-labelledby="section-keywords"
      className="flex flex-col items-center justify-center px-8 py-8"
    >
      <p
        id="section-keywords"
        className="mb-5 text-[11px] font-medium tracking-widest text-muted-foreground uppercase"
      >
        Missing Keywords
      </p>

      <ul
        role="list"
        aria-label="Skills and keywords not found in your resume"
        className="flex flex-wrap gap-2"
      >
        {keywords.map((keyword) => (
          <li key={keyword}>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground">
              <span
                aria-hidden
                className="size-1 shrink-0 rounded-full bg-foreground/25"
              />
              {keyword}
            </span>
          </li>
        ))}
      </ul>

      {keywords.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No missing keywords — great coverage!
        </p>
      )}
    </section>
  )
}
