"use client"

import { createContext, startTransition, useCallback, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface SidebarContextValue {
  collapsed: boolean
  mobileOpen: boolean
  /** True after the first RAF — gates CSS transition to prevent animated jump on page load. */
  transitionReady: boolean
  toggle: () => void
  openMobile: () => void
  closeMobile: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

const COOKIE_KEY = "sidebar-collapsed"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

export interface SidebarProviderProps {
  children: React.ReactNode
  /** Server-resolved initial value read from the cookie — eliminates layout shift. */
  defaultCollapsed?: boolean
}

export const SidebarProvider = ({
  children,
  defaultCollapsed = false,
}: SidebarProviderProps) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [transitionReady, setTransitionReady] = useState(false)

  // Enable CSS transition only after the first frame so the initial paint
  // at the server-resolved width is instant (no animated jump).
  useEffect(() => {
    const raf = requestAnimationFrame(() => setTransitionReady(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const toggle = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev
      document.cookie = `${COOKIE_KEY}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
      return next
    })
  }, [])

  const openMobile = useCallback(() => setMobileOpen(true), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const pathname = usePathname()
  useEffect(() => {
    startTransition(closeMobile)
  }, [pathname, closeMobile])

  return (
    <SidebarContext.Provider
      value={{ collapsed, mobileOpen, transitionReady, toggle, openMobile, closeMobile }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = (): SidebarContextValue => {
  const ctx = useContext(SidebarContext)
  if (!ctx)
    throw new Error("useSidebarContext must be used within <SidebarProvider>")
  return ctx
}
