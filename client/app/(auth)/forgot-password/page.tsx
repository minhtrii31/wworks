import Link from "next/link"
import { Mail, ArrowLeft } from "lucide-react"

import { AuthCard } from "@/features/auth/components/auth-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-5">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Reset password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

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

            <Button className="mt-3 h-10 w-full" size="lg">
              Send reset link
            </Button>

            <Link
              href="/login"
              className="flex items-center justify-center gap-1.5 pt-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" aria-hidden />
              Back to sign in
            </Link>
          </form>
        </div>
      </AuthCard>
    </div>
  )
}
