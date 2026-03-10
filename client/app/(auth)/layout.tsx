import { AuthNavButton } from "@/features/auth/components/auth-nav-button"
import Image from "next/image"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-[1440px] flex-col overflow-hidden bg-background">
      {/* Background watermark — anchored to bottom, bleeds off edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center select-none"
      >
        <span className="translate-y-1/3 text-[18vw] font-black tracking-wide text-foreground/[0.1] dark:text-foreground/[0.1]">
          wworks
        </span>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between bg-background/80 px-4 py-6 backdrop-blur-sm">
        {/* Left: Logo image */}
        <Link href="/" className="flex items-center" aria-label="Home">
          <Image
            src="/logo.png"
            alt="wworks logo"
            width={32}
            height={32}
            className="h-8 w-auto object-contain dark:hidden"
            priority
          />
          <Image
            src="/logo_white.png"
            alt="wworks logo"
            width={32}
            height={32}
            className="hidden h-8 w-auto object-contain dark:block"
            priority
          />
        </Link>

        {/* Center: Brand name */}
        <span className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold tracking-tight">
          wworks
        </span>

        {/* Right: Nav button */}
        <AuthNavButton />
      </header>

      {/* Form — centered relative to full viewport, not just below header */}
      <main className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 pb-28">
        <div className="pointer-events-auto w-full max-w-[400px]">
          {children}
        </div>
      </main>
    </div>
  )
}
