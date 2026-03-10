import Link from "next/link"

import { ROUTES } from "@/constants/routes"

import type { ActivityItem } from "../types"

interface ActivityFeedProps {
  items: ActivityItem[]
}

export const ActivityFeed = ({ items }: ActivityFeedProps) => {
  return (
    <section
      aria-labelledby="activity-heading"
      className="flex min-h-0 flex-col overflow-hidden"
    >
      <div className="flex shrink-0 items-center justify-between border-b border-border/60 px-8 py-3.5">
        <h2
          id="activity-heading"
          className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground"
        >
          Recent Activity
        </h2>
        <Link
          href={ROUTES.HISTORY}
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          aria-label="View full activity history"
        >
          View all
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="px-8 py-12 text-sm text-muted-foreground">
          No activity yet.
        </p>
      ) : (
        <ul role="list" className="overflow-y-auto">
          {items.map((item) => (
            <li
              key={item.id}
              className="border-b border-border/40 last:border-b-0"
            >
              <Link
                href={item.href}
                aria-label={`${item.title}: ${item.description}`}
                className="flex items-baseline justify-between gap-10 px-8 py-4 transition-colors hover:bg-foreground/[0.02]"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-none">
                    {item.title}
                  </p>
                  <p className="mt-1.5 truncate text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground/50">
                  {item.timestamp}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
