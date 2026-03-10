"use client"

import { memo, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { useThemeTransition } from "@/components/layout/theme-provider"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants/routes"

export const LandingHeader = memo(() => {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const { toggleTheme } = useThemeTransition()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="wworks home"
        >
          <Image
            src="/logo.png"
            alt=""
            width={24}
            height={24}
            className="h-6 w-auto object-contain dark:hidden"
            priority
          />
          <Image
            src="/logo_white.png"
            alt=""
            width={24}
            height={24}
            className="hidden h-6 w-auto object-contain dark:block"
            priority
          />
          <span className="text-sm font-semibold tracking-tight">wworks</span>
        </Link>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground sm:size-8"
          >
            {isDark ? (
              <Sun className="size-4" aria-hidden />
            ) : (
              <Moon className="size-4" aria-hidden />
            )}
          </button>

          <Button
            asChild
            variant="ghost"
            size="default"
            className="hidden sm:inline-flex"
          >
            <Link href={ROUTES.LOGIN}>Sign in</Link>
          </Button>

          <Button asChild size="default">
            <Link href={ROUTES.SIGNUP}>Get started</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
})

LandingHeader.displayName = "LandingHeader"
