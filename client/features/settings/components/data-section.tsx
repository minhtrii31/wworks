"use client"

import { useState } from "react"
import { Download, TriangleAlert } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// ── Inline confirmation helper ────────────────────────────────────────────────
interface InlineConfirmProps {
  message: string
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
  destructive?: boolean
}

const InlineConfirm = ({
  message,
  confirmLabel,
  onConfirm,
  onCancel,
  destructive = false,
}: InlineConfirmProps) => (
  <div className="flex flex-col gap-3">
    <p className="text-xs text-muted-foreground">{message}</p>
    <div className="flex gap-2">
      <Button
        size="sm"
        variant={destructive ? "destructive" : "default"}
        onClick={onConfirm}
      >
        {confirmLabel}
      </Button>
      <Button size="sm" variant="ghost" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  </div>
)

// ── DataSection ───────────────────────────────────────────────────────────────
export const DataSection = () => {
  const [clearConfirm, setClearConfirm] = useState(false)
  const [deactivateConfirm, setDeactivateConfirm] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleteInput, setDeleteInput] = useState("")

  const resetDeleteConfirm = () => {
    setDeleteConfirm(false)
    setDeleteInput("")
  }

  return (
    <div className="flex flex-col gap-4 px-8 py-8">
      {/* ── Export + Clear ─ side by side on desktop ────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-start">
        <Card>
          <CardHeader className="border-b border-border/60">
            <CardTitle>Export Data</CardTitle>
            <CardDescription>
              Download a full backup of your activity — analysis history, generated cover
              letters, and job match results.
            </CardDescription>
          </CardHeader>

          <CardFooter className="border-t border-border/60">
            <Button variant="outline" size="sm">
              <Download aria-hidden className="size-3.5" />
              Download Backup
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="border-b border-border/60">
            <CardTitle>Clear Activity Data</CardTitle>
            <CardDescription>
              Permanently remove all analysis history, cover letters, and job match results.
              Your account and profile remain intact.
            </CardDescription>
          </CardHeader>

          <CardFooter className="border-t border-border/60">
            {clearConfirm ? (
              <InlineConfirm
                message="This will permanently delete all your usage data. This action cannot be undone."
                confirmLabel="Yes, clear all data"
                onConfirm={() => setClearConfirm(false)}
                onCancel={() => setClearConfirm(false)}
                destructive
              />
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setClearConfirm(true)}
              >
                Clear All Data
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      {/* ── Danger Zone ─ full width ────────────────────────────────────── */}
      <Card className="ring-destructive/25">
        <CardHeader className="border-b border-destructive/10">
          <CardTitle className="flex items-center gap-2 text-destructive">
            <TriangleAlert aria-hidden className="size-3.5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible and destructive actions. Proceed with caution.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5">
          {/* Deactivate Account */}
          <div
            className={cn(
              "flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6",
              deactivateConfirm && "sm:items-start"
            )}
          >
            <div className="min-w-0">
              <p className="text-sm font-medium">Deactivate Account</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Temporarily disable your account. You can reactivate at any time by signing
                back in.
              </p>
            </div>

            <div className="shrink-0">
              {deactivateConfirm ? (
                <InlineConfirm
                  message="Are you sure? Your account will be temporarily disabled."
                  confirmLabel="Deactivate"
                  onConfirm={() => setDeactivateConfirm(false)}
                  onCancel={() => setDeactivateConfirm(false)}
                  destructive
                />
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeactivateConfirm(true)}
                >
                  Deactivate Account
                </Button>
              )}
            </div>
          </div>

          {/* Delete Account */}
          <div
            className={cn(
              "flex flex-col gap-4 pt-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6",
              deleteConfirm && "sm:items-start"
            )}
          >
            <div className="min-w-0">
              <p className="text-sm font-medium">Delete Account</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Permanently delete your account and all associated data. This action
                cannot be undone.
              </p>
            </div>

            <div className="shrink-0">
              {deleteConfirm ? (
                <div className="flex flex-col gap-3">
                  <p className="text-xs text-muted-foreground">
                    Type{" "}
                    <code className="rounded bg-foreground/[0.06] px-1 py-0.5 font-mono text-[11px] font-medium text-foreground">
                      DELETE
                    </code>{" "}
                    to confirm.
                  </p>
                  <Input
                    value={deleteInput}
                    onChange={(e) => setDeleteInput(e.target.value)}
                    placeholder="DELETE"
                    aria-label="Type DELETE to confirm account deletion"
                    className="w-36"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={deleteInput !== "DELETE"}
                      onClick={resetDeleteConfirm}
                    >
                      Delete Account
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={resetDeleteConfirm}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeleteConfirm(true)}
                >
                  Delete Account
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
