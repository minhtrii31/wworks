"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UsageBar } from "@/components/shared"

const USAGE_TODAY = 3
const USAGE_LIMIT = 5

export const AccountSection = () => {
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [profileSaved, setProfileSaved] = useState(false)

  const handleSaveProfile = () => {
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2500)
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-8 py-8 lg:grid-cols-2 lg:items-start">
      {/* ── Profile ─────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="border-b border-border/60">
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your display name and email address.</CardDescription>
        </CardHeader>

        <CardContent className="pt-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="settings-name">Display Name</Label>
              <Input
                id="settings-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="settings-email">Email Address</Label>
              <Input
                id="settings-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="justify-between border-t border-border/60">
          <span
            className={cn(
              "flex items-center gap-1.5 text-xs text-muted-foreground transition-opacity duration-300",
              profileSaved ? "opacity-100" : "opacity-0"
            )}
            aria-live="polite"
          >
            <Check aria-hidden className="size-3" />
            Saved
          </span>
          <Button size="sm" onClick={handleSaveProfile}>
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      {/* ── Subscription ────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="border-b border-border/60">
          <CardTitle>Subscription</CardTitle>
          <CardDescription>Your current plan and daily usage.</CardDescription>
        </CardHeader>

        <CardContent className="pt-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                Current Plan
              </p>
              <p className="mt-1 text-sm font-medium">Free</p>
            </div>
            <span className="text-xs text-muted-foreground">Free tier</span>
          </div>

          <div className="mt-5 border-t border-border/60 pt-5">
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Today&rsquo;s Usage
            </p>

            <p className="mt-2.5 text-2xl font-semibold leading-none tabular-nums">
              {USAGE_TODAY}/{USAGE_LIMIT}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">requests used today</p>

            <div className="mt-4">
              <UsageBar used={USAGE_TODAY} limit={USAGE_LIMIT} showRemaining />
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t border-border/60">
          <Button variant="outline" size="sm">
            Upgrade to Pro
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
