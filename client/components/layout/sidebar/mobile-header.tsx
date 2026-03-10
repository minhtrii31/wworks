"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

import { ROUTES } from "@/constants/routes"
import { useSidebarContext } from "./context"

export const MobileHeader = () => {
  const { openMobile } = useSidebarContext()

  return (
    <header
      className="sticky top-0 z-40 flex h-14 items-center justify-between gap-3 bg-background/80 px-4 backdrop-blur-sm lg:hidden"
      aria-label="Mobile header"
    >
      <button
        type="button"
        onClick={openMobile}
        aria-label="Open navigation menu"
        className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
      >
        <Menu className="size-5" aria-hidden />
      </button>
      <Link
        href={ROUTES.DASHBOARD}
        className="flex items-center gap-1"
        aria-label="Go to dashboard"
      >
        <Image
          src="/logo.png"
          alt="wworks logo"
          width={24}
          height={24}
          className="h-6 w-auto object-contain dark:hidden"
          priority
        />
        <Image
          src="/logo_white.png"
          alt="wworks logo"
          width={24}
          height={24}
          className="hidden h-6 w-auto object-contain dark:block"
          priority
        />
        <span className="text-sm font-bold tracking-tight">wworks</span>
      </Link>
      <div className="size-8"></div>
    </header>
  )
}
