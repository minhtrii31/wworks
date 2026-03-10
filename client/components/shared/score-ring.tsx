import type { ScoreRingProps } from "@/types/shared"

// Internal config type — not part of the public API
interface ScoreRingConfig {
  r: number
  viewBox: string
  svgSize: string
  strokeWidth: number
  centerTextSize: string
  transitionDuration: string
  foregroundOpacity: number
}

const SIZE_CONFIG: Record<"sm" | "lg", ScoreRingConfig> = {
  sm: {
    r: 14,
    viewBox: "0 0 40 40",
    svgSize: "size-10",
    strokeWidth: 2.5,
    centerTextSize: "text-[11px]",
    transitionDuration: "duration-500",
    foregroundOpacity: 0.55,
  },
  lg: {
    r: 36,
    viewBox: "0 0 100 100",
    svgSize: "size-24",
    strokeWidth: 5,
    centerTextSize: "text-xl",
    transitionDuration: "duration-700",
    foregroundOpacity: 0.65,
  },
}

export const ScoreRing = ({
  score,
  maxScore,
  suffix,
  size = "lg",
  ariaLabel,
}: ScoreRingProps) => {
  const config = SIZE_CONFIG[size]
  const circumference = 2 * Math.PI * config.r
  const progress = (score / maxScore) * circumference
  const gap = circumference - progress

  const cx = size === "sm" ? 20 : 50
  const cy = size === "sm" ? 20 : 50

  const displaySuffix = suffix ?? `/${maxScore}`
  const label = ariaLabel ?? `Score: ${score} out of ${maxScore}`

  return (
    <div className="relative inline-flex shrink-0 items-center justify-center">
      <svg
        viewBox={config.viewBox}
        className={`${config.svgSize} -rotate-90`}
        aria-hidden
      >
        <circle
          cx={cx}
          cy={cy}
          r={config.r}
          fill="none"
          strokeWidth={config.strokeWidth}
          style={{ stroke: "var(--foreground)", opacity: 0.07 }}
        />
        <circle
          cx={cx}
          cy={cy}
          r={config.r}
          fill="none"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${gap}`}
          style={{ stroke: "var(--foreground)", opacity: config.foregroundOpacity }}
          className={`transition-all ease-out ${config.transitionDuration}`}
        />
      </svg>

      <div className="absolute flex flex-col items-center" aria-label={label}>
        <span className={`${config.centerTextSize} font-semibold leading-none tabular-nums`}>
          {score}
        </span>
        {size === "lg" && (
          <span className="mt-0.5 text-[10px] text-muted-foreground/50">
            {displaySuffix}
          </span>
        )}
        {size === "sm" && (
          <span className="sr-only">{displaySuffix}</span>
        )}
      </div>
    </div>
  )
}
