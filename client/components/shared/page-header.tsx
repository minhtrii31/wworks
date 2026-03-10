import type { PageHeaderProps } from "@/types/shared"

export const PageHeader = ({ sectionLabel, title, subtitle }: PageHeaderProps) => (
  <header className="shrink-0 border-b border-border/60 px-8 py-6">
    <p className="mb-1.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
      {sectionLabel}
    </p>
    <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
    {subtitle && (
      <div className="mt-1 truncate text-xs text-muted-foreground">{subtitle}</div>
    )}
  </header>
)
