import {
  BarChart2,
  FileEdit,
  History,
  LayoutDashboard,
  Settings,
  Target,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { ROUTES } from "./routes"

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  badge?: string
}

export const NAV_MAIN: NavItem[] = [
  { href: ROUTES.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.RESUME_ANALYSIS, label: "Resume Analysis", icon: BarChart2 },
  { href: ROUTES.JOB_MATCH, label: "Job Match", icon: Target },
  { href: ROUTES.COVER_LETTER, label: "Cover Letter Generator", icon: FileEdit },
  { href: ROUTES.HISTORY, label: "History", icon: History },
]

export const NAV_SECONDARY: NavItem[] = [
  { href: ROUTES.SETTINGS, label: "Settings", icon: Settings },
]
