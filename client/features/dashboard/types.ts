export type ActivityType = "analysis" | "match" | "cover-letter" | "history"

export interface ActivityItem {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: string
  href: string
}

export interface ShortcutItem {
  label: string
  href: string
}

export interface GuideStep {
  step: string
  title: string
  description: string
  href: string
  linkLabel: string
}
