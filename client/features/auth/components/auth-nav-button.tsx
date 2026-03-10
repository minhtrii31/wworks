"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function AuthNavButton() {
  const pathname = usePathname()
  const isLogin = pathname === "/login"

  return (
    <Link
      href={isLogin ? "/signup" : "/login"}
      className="text-[16px] font-semibold uppercase"
    >
      {isLogin ? "Sign up" : "Sign in"}
    </Link>
  )
}
