"use client"

import { memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import type { NavItem } from "@/constants/navigation"

interface SidebarNavProps {
  items: NavItem[]
  collapsed: boolean
}

export const SidebarNav = memo(({ items, collapsed }: SidebarNavProps) => {
  const pathname = usePathname()

  return (
    <nav aria-label="Sidebar navigation" className="flex flex-col gap-0.5">
      {items.map((item) => {
        const Icon = item.icon
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(item.href + "/")

        return (
          <Link
            key={item.href}
            href={item.href}
            title={collapsed ? item.label : undefined}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group relative flex h-9 items-center overflow-hidden rounded-md text-sm font-medium transition-colors duration-150",
              "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]",
              collapsed ? "justify-center px-2" : "gap-3 px-2.5",
              isActive && "bg-foreground/[0.06] text-foreground",
            )}
          >
            <Icon
              className={cn(
                "size-4 shrink-0 transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
              aria-hidden
            />

            {!collapsed && (
              <span className="flex-1 truncate">{item.label}</span>
            )}

            {!collapsed && item.badge && (
              <span className="rounded bg-foreground/[0.08] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-foreground/60">
                {item.badge}
              </span>
            )}

            {isActive && (
              <span
                aria-hidden
                className="absolute inset-y-0.5 right-0 w-[2px] rounded-l-full bg-foreground"
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
})
SidebarNav.displayName = "SidebarNav"
