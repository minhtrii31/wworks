import Link from "next/link"

import { UsageBar } from "@/components/shared"

import type { ShortcutItem } from "../types"

interface UsagePanelProps {
  used: number
  limit: number
  shortcuts: ShortcutItem[]
}

export const UsagePanel = ({ used, limit, shortcuts }: UsagePanelProps) => {
  return (
    <aside
      aria-labelledby="usage-heading"
      className="flex flex-col overflow-y-auto px-8 py-8"
    >
      <div>
        <p
          id="usage-heading"
          className="mb-5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground"
        >
          Today&rsquo;s usage
        </p>

        <p className="mb-1 text-[3rem] font-semibold leading-none tabular-nums">
          {used}/{limit}
        </p>
        <p className="mt-1.5 text-xs text-muted-foreground">
          requests used today
        </p>

        <div className="mt-5">
          <UsageBar used={used} limit={limit} showRemaining />
        </div>
      </div>

      <nav aria-label="Quick navigation" className="mt-auto pt-10">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          Start new
        </p>
        <ul className="flex flex-col">
          {shortcuts.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center justify-between py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
                <span aria-hidden className="text-muted-foreground/30">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
