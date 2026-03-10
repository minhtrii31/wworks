import { cn } from "@/lib/utils"
import type { UsageBarProps } from "@/types/shared"

export const UsageBar = ({ used, limit, showRemaining = false }: UsageBarProps) => {
  const remaining = limit - used
  const isExhausted = remaining === 0

  return (
    <div>
      <div
        role="progressbar"
        aria-valuenow={used}
        aria-valuemin={0}
        aria-valuemax={limit}
        aria-label={`${used} of ${limit} AI requests used today`}
        className="flex gap-[5px]"
      >
        {Array.from({ length: limit }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-[3px] flex-1 rounded-full transition-colors duration-300",
              i < used
                ? isExhausted
                  ? "bg-foreground"
                  : "bg-foreground/50"
                : "bg-foreground/[0.09]",
            )}
          />
        ))}
      </div>

      {showRemaining && (
        <p className="mt-2 text-[11px] text-muted-foreground/55">
          {isExhausted
            ? "Daily limit reached — resets at midnight"
            : `${remaining} request${remaining !== 1 ? "s" : ""} remaining · resets at midnight`}
        </p>
      )}
    </div>
  )
}
