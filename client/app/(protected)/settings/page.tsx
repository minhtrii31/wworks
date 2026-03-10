"use client"

import { useState } from "react"

import { PageHeader } from "@/components/shared"
import { AccountSection } from "@/features/settings/components/account-section"
import { BillingSection } from "@/features/settings/components/billing-section"
import { DataSection } from "@/features/settings/components/data-section"
import { SecuritySection } from "@/features/settings/components/security-section"
import { SettingsNav } from "@/features/settings/components/settings-nav"
import type { SettingsSection } from "@/features/settings/types"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("account")

  return (
    <div className="flex h-full flex-col">
      <PageHeader sectionLabel="Settings" title="Preferences" />
      <SettingsNav active={activeSection} onChange={setActiveSection} />

      <div className="min-h-0 flex-1 overflow-y-auto">
        {activeSection === "account" && <AccountSection />}
        {activeSection === "security" && <SecuritySection />}
        {activeSection === "billing" && <BillingSection />}
        {activeSection === "data" && <DataSection />}
      </div>
    </div>
  )
}
