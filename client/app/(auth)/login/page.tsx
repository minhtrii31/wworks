import Link from "next/link"
import { Mail, Lock } from "lucide-react"

import { AuthCard } from "@/features/auth/components/auth-card"
import { AuthDivider } from "@/features/auth/components/auth-divider"
import { GoogleIcon } from "@/features/auth/components/google-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="space-y-5">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      <div className="space-y-3">
        <Button variant="outline" className="h-10 w-full gap-2.5">
          <GoogleIcon />
          Continue with Google
        </Button>

        <AuthDivider />

        <AuthCard>
          <div>
            <form className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail
                    className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="h-10 pl-9"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-10 pl-9"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <Button className="mt-1 h-10 w-full" size="lg">
                Sign in
              </Button>
            </form>
          </div>
        </AuthCard>
      </div>
    </div>
  )
}
