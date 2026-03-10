"use client"

import { useState } from "react"
import { Check, Eye, EyeOff, Monitor } from "lucide-react"

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

interface PasswordFieldProps {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
}

const PasswordField = ({ id, label, value, onChange }: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pr-8"
          autoComplete="new-password"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 transition-colors hover:text-muted-foreground"
        >
          {visible ? (
            <EyeOff aria-hidden className="size-3.5" />
          ) : (
            <Eye aria-hidden className="size-3.5" />
          )}
        </button>
      </div>
    </div>
  )
}

export const SecuritySection = () => {
  const [currentPw, setCurrentPw] = useState("")
  const [newPw, setNewPw] = useState("")
  const [confirmPw, setConfirmPw] = useState("")
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)

  const handleUpdatePassword = () => {
    setError("")

    if (!currentPw || !newPw || !confirmPw) {
      setError("All fields are required.")
      return
    }
    if (newPw.length < 8) {
      setError("New password must be at least 8 characters.")
      return
    }
    if (newPw !== confirmPw) {
      setError("New passwords do not match.")
      return
    }

    setSaved(true)
    setCurrentPw("")
    setNewPw("")
    setConfirmPw("")
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-8 py-8 lg:grid-cols-2 lg:items-start">
      {/* ── Change Password ──────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="border-b border-border/60">
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password regularly to keep your account secure.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5">
          <div className="flex flex-col gap-4">
            <PasswordField
              id="current-pw"
              label="Current Password"
              value={currentPw}
              onChange={setCurrentPw}
            />
            <PasswordField
              id="new-pw"
              label="New Password"
              value={newPw}
              onChange={setNewPw}
            />
            <PasswordField
              id="confirm-pw"
              label="Confirm New Password"
              value={confirmPw}
              onChange={setConfirmPw}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="mt-4 text-xs text-destructive"
            >
              {error}
            </p>
          )}
        </CardContent>

        <CardFooter className="border-t border-border/60 justify-between">
          <span
            className={cn(
              "flex items-center gap-1.5 text-xs text-muted-foreground transition-opacity duration-300",
              saved ? "opacity-100" : "opacity-0"
            )}
            aria-live="polite"
          >
            <Check aria-hidden className="size-3" />
            Password updated
          </span>
          <Button size="sm" onClick={handleUpdatePassword}>
            Update Password
          </Button>
        </CardFooter>
      </Card>

      {/* ── Active Sessions ──────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="border-b border-border/60">
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Devices currently signed in to your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5">
          <div className="flex items-center gap-4">
            <Monitor aria-hidden className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Current device</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Windows · Chrome · Active now
              </p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">Current</span>
          </div>
        </CardContent>

        <CardFooter className="border-t border-border/60">
          <Button variant="outline" size="sm">
            Sign Out All Other Devices
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
