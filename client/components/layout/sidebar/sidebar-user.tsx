"use client"

import { memo, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { LogOut, Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"
import { useThemeTransition } from "@/components/layout/theme-provider"

interface SidebarUserProps {
  collapsed: boolean
}

export const SidebarUser = memo(({ collapsed }: SidebarUserProps) => {
  const { resolvedTheme } = useTheme()
  const { toggleTheme } = useThemeTransition()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // resolvedTheme is undefined on the server — defer to client to avoid hydration mismatch.
  const isDark = mounted && resolvedTheme === "dark"

  return (
    <div className="flex flex-col gap-1">
      {/* Theme toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        title={collapsed ? (isDark ? "Light mode" : "Dark mode") : undefined}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={cn(
          "group flex h-9 w-full items-center rounded-md text-sm font-medium transition-colors duration-150",
          "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]",
          collapsed ? "justify-center px-2" : "gap-3 px-2.5",
        )}
      >
        {isDark ? (
          <Sun className="size-4 shrink-0" aria-hidden />
        ) : (
          <Moon className="size-4 shrink-0" aria-hidden />
        )}
        {!collapsed && (
          <span className="truncate">{isDark ? "Light mode" : "Dark mode"}</span>
        )}
      </button>

      <div className="h-px bg-border/60" aria-hidden />

      {/* User row */}
      <div
        className={cn(
          "flex items-center gap-2.5 rounded-md px-2 py-2",
          collapsed && "justify-center",
        )}
      >
        <div
          aria-hidden
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground/[0.1] text-[11px] font-bold uppercase text-foreground"
        >
          JD
        </div>

        {!collapsed && (
          <>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-xs font-medium leading-none text-foreground">
                John Doe
              </span>
              <span className="truncate text-[11px] leading-none text-muted-foreground">
                john@example.com
              </span>
            </div>

            <button
              type="button"
              aria-label="Sign out"
              title="Sign out"
              className="ml-auto shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            >
              <LogOut className="size-3.5" aria-hidden />
            </button>
          </>
        )}
      </div>
    </div>
  )
})
SidebarUser.displayName = "SidebarUser"
