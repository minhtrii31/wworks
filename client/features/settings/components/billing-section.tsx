import { Check, CreditCard, Receipt, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const FREE_FEATURES = [
  "5 AI requests per day",
  "Resume Analysis",
  "Job Match",
  "Cover Letter Generator",
  "Activity History",
]

const PRO_FEATURES = [
  "Unlimited AI requests",
  "Priority processing",
  "Advanced resume insights",
  "Bulk job matching",
  "Export to PDF",
  "Priority support",
]

export const BillingSection = () => {
  return (
    <div className="flex flex-col gap-4 px-8 py-8">
      {/* ── Current Plan ─ full width, has 2-col plan grid inside ─────── */}
      <Card>
        <CardHeader className="border-b border-border/60">
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            You are on the Free plan. Upgrade to unlock unlimited requests.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Free tier */}
            <div className="flex flex-col gap-4 rounded-lg border border-border p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">Free</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Get started</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold leading-none">$0</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">/month</p>
                </div>
              </div>

              <ul className="flex flex-col gap-2">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check aria-hidden className="size-3 shrink-0 text-foreground/40" />
                    {f}
                  </li>
                ))}
              </ul>

              <p className="text-[11px] font-medium text-muted-foreground">
                ✓ Current plan
              </p>
            </div>

            {/* Pro tier */}
            <div className="flex flex-col gap-4 rounded-lg border border-border p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-medium">
                    <Zap aria-hidden className="size-3.5" />
                    Pro
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">For power users</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold leading-none">$12</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">/month</p>
                </div>
              </div>

              <ul className="flex flex-col gap-2">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check aria-hidden className="size-3 shrink-0 text-foreground/40" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t border-border/60">
          <Button size="sm">
            <Zap aria-hidden className="size-3.5" />
            Upgrade to Pro
          </Button>
        </CardFooter>
      </Card>

      {/* ── Payment Method + Billing History ─ side by side on desktop ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-start">
        <Card>
          <CardHeader className="border-b border-border/60">
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>No payment method on file.</CardDescription>
          </CardHeader>

          <CardContent className="pt-5">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <CreditCard aria-hidden className="size-4 shrink-0" />
              <span>Add a payment method to upgrade your plan.</span>
            </div>
          </CardContent>

          <CardFooter className="border-t border-border/60">
            <Button variant="outline" size="sm">
              <CreditCard aria-hidden className="size-3.5" />
              Add Payment Method
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="border-b border-border/60">
            <CardTitle>Billing History</CardTitle>
            <CardDescription>A record of all your past invoices.</CardDescription>
          </CardHeader>

          <CardContent className="pt-5">
            <div className="flex flex-col items-center py-6 text-center">
              <Receipt aria-hidden className="mb-2.5 size-4 text-muted-foreground/30" />
              <p className="text-xs text-muted-foreground">No invoices yet.</p>
              <p className="mt-1 text-[11px] text-muted-foreground/60">
                Invoices will appear here after your first payment.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
