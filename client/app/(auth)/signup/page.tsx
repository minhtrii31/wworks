import { Mail, User, Lock } from "lucide-react"

import { AuthCard } from "@/features/auth/components/auth-card"
import { AuthDivider } from "@/features/auth/components/auth-divider"
import { GoogleIcon } from "@/features/auth/components/google-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  return (
    <div className="space-y-5">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create account
        </h1>
        <p className="text-sm text-muted-foreground">
          Get started with your free account
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
                <Label htmlFor="name">Full name</Label>
                <div className="relative">
                  <User
                    className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="h-10 pl-9"
                    autoComplete="name"
                  />
                </div>
              </div>

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

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
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
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirm-password">Confirm</Label>
                  <div className="relative">
                    <Lock
                      className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden
                    />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="h-10 pl-9"
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              </div>

              <Button className="mt-1 h-10 w-full" size="lg">
                Create account
              </Button>
            </form>
          </div>
        </AuthCard>
      </div>
    </div>
  )
}
