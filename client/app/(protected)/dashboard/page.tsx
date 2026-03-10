import { PageHeader } from "@/components/shared"
import { ActivityFeed } from "@/features/dashboard/components/activity-feed"
import { HowItWorks } from "@/features/dashboard/components/how-it-works"
import { UsagePanel } from "@/features/dashboard/components/usage-panel"
import {
  AI_USAGE_LIMIT,
  AI_USAGE_TODAY,
  guideSteps,
  recentActivity,
  shortcuts,
} from "@/features/dashboard/data"

const today = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
}).format(new Date())

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <PageHeader sectionLabel={today} title="Welcome back, John." />

      <div className="grid min-h-0 grid-cols-1 divide-y divide-border/60 lg:grid-cols-[2fr_3fr] lg:divide-x lg:divide-y-0">
        <UsagePanel
          used={AI_USAGE_TODAY}
          limit={AI_USAGE_LIMIT}
          shortcuts={shortcuts}
        />
        <ActivityFeed items={recentActivity} />
      </div>

      <HowItWorks steps={guideSteps} />
    </div>
  )
}
