interface ResultSectionProps {
  label: string
  items: string[]
}

export const ResultSection = ({ label, items }: ResultSectionProps) => {
  const id = `section-${label.toLowerCase().replace(/\s+/g, "-")}`

  return (
    <section aria-labelledby={id} className="px-8 py-7">
      <p
        id={id}
        className="mb-4 text-[11px] font-medium uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </p>

      <ul role="list" className="space-y-2.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-[7px] size-1 shrink-0 rounded-full bg-foreground/20"
            />
            <span className="text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
