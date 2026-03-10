"use client"

import { memo } from "react"
import Image from "next/image"
import Link from "next/link"
import { PanelLeftClose, PanelLeftOpen, Zap, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { NAV_MAIN, NAV_SECONDARY } from "@/constants/navigation"
import { ROUTES } from "@/constants/routes"

import { useSidebarContext } from "./context"
import { SidebarNav } from "./sidebar-nav"
import { SidebarUser } from "./sidebar-user"

const SidebarContent = memo(({ isMobile = false }: { isMobile?: boolean }) => {
  const { collapsed, toggle, closeMobile } = useSidebarContext()
  const isCollapsed = collapsed && !isMobile

  return (
    <>
      {/* Logo header */}
      <div
        className={cn(
          "flex h-14 shrink-0 items-center border-b border-border/50",
          isCollapsed ? "justify-center px-3" : "gap-2.5 px-4"
        )}
      >
        <Link href={ROUTES.DASHBOARD} aria-label="Go to dashboard">
          <Image
            src="/logo.png"
            alt="wworks"
            width={28}
            height={28}
            className="h-7 w-auto object-contain dark:hidden"
            priority
          />
          <Image
            src="/logo_white.png"
            alt="wworks"
            width={28}
            height={28}
            className="hidden h-7 w-auto object-contain dark:block"
            priority
          />
        </Link>

        {!isCollapsed && (
          <span className="text-base font-bold tracking-tight">wworks</span>
        )}

        {isMobile && (
          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close navigation menu"
            className="ml-auto flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
          >
            <X className="size-4" aria-hidden />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="scrollbar-none flex-1 overflow-x-hidden overflow-y-auto px-2 py-3">
        <SidebarNav items={NAV_MAIN} collapsed={isCollapsed} />
        <div className="my-2.5 h-px bg-border/50" aria-hidden />
        <SidebarNav items={NAV_SECONDARY} collapsed={isCollapsed} />
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-border/50 px-2 py-2">
        {/* Desktop-only collapse / expand — styled as a nav link for visual consistency */}
        {!isMobile && (
          <>
            <button
              type="button"
              onClick={toggle}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={isCollapsed ? "Expand sidebar" : undefined}
              className={cn(
                "flex h-9 w-full cursor-pointer items-center rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/[0.04] hover:text-foreground",
                isCollapsed ? "justify-center px-2" : "gap-3 px-2.5"
              )}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="size-4 shrink-0" aria-hidden />
              ) : (
                <>
                  <PanelLeftClose className="size-4 shrink-0" aria-hidden />
                  <span className="truncate">Collapse</span>
                </>
              )}
            </button>
            <div className="my-1 h-px bg-border/50" aria-hidden />
          </>
        )}

        {/* Upgrade widget */}
        {isCollapsed ? (
          <Link
            href="/pricing"
            title="Upgrade to Pro"
            aria-label="Upgrade to Pro plan"
            className="flex h-9 w-full items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          >
            <Zap className="size-4" aria-hidden />
          </Link>
        ) : (
          <div className="rounded-md border border-border/60 px-3 py-3">
            <p className="mb-3 text-[11px] leading-relaxed text-muted-foreground">
              Subscribe for unlimited requests
            </p>
            <Link
              href="/pricing"
              aria-label="Upgrade to Pro plan"
              className="flex h-7 w-full items-center justify-center rounded bg-foreground text-[11px] font-medium text-background transition-opacity hover:opacity-80"
            >
              Upgrade now
            </Link>
          </div>
        )}

        <div className="mt-1">
          <SidebarUser collapsed={isCollapsed} />
        </div>
      </div>
    </>
  )
})
SidebarContent.displayName = "SidebarContent"

export const Sidebar = () => {
  const { collapsed, mobileOpen, closeMobile, transitionReady } =
    useSidebarContext()

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "relative hidden h-dvh shrink-0 flex-col border-r border-border/50 bg-sidebar lg:flex",
          // Transition is enabled only after the first RAF so the initial paint
          // at the server-resolved width is instant — no animated layout jump.
          transitionReady && "transition-[width] duration-200 ease-in-out",
          collapsed ? "w-[56px]" : "w-60"
        )}
        aria-label="Main navigation"
      >
        <SidebarContent />
      </aside>

      {/* Mobile: Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity duration-200 lg:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={closeMobile}
        aria-hidden
      />

      {/* Mobile: Slide-in panel */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border/50 bg-sidebar transition-transform duration-200 ease-in-out lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <SidebarContent isMobile />
      </aside>
    </>
  )
}
