import { cn } from "@/lib/utils"

import type { SettingsSection } from "../types"

const NAV_ITEMS: { id: SettingsSection; label: string }[] = [
  { id: "account", label: "Account" },
  { id: "security", label: "Security" },
  { id: "billing", label: "Billing" },
  { id: "data", label: "Data & Privacy" },
]

interface SettingsNavProps {
  active: SettingsSection
  onChange: (section: SettingsSection) => void
}

export const SettingsNav = ({ active, onChange }: SettingsNavProps) => {
  return (
    <div
      role="tablist"
      aria-label="Settings sections"
      className="flex gap-6 overflow-x-auto border-b border-border/60 px-8"
    >
      {NAV_ITEMS.map(({ id, label }) => (
        <button
          key={id}
          role="tab"
          aria-selected={active === id}
          onClick={() => onChange(id)}
          className={cn(
            "-mb-px border-b-2 pt-4 pb-3 text-xs font-medium whitespace-nowrap transition-colors",
            active === id
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
