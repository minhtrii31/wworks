import { ScoreRing } from "@/components/shared"

interface ScoreCardProps {
  score: number
  maxScore: number
}

const getScoreMeta = (
  score: number
): { label: string; description: string } => {
  if (score >= 80)
    return {
      label: "Excellent",
      description:
        "Your resume stands out strongly for most roles. Keep it polished and up to date.",
    }
  if (score >= 60)
    return {
      label: "Good",
      description:
        "A solid foundation. A few targeted improvements could significantly boost your chances.",
    }
  return {
    label: "Needs Work",
    description:
      "There is meaningful room to grow. Follow the suggestions below for the biggest impact.",
  }
}

export const ScoreCard = ({ score, maxScore }: ScoreCardProps) => {
  const { label, description } = getScoreMeta(score)

  return (
    <div className="px-8 py-7">
      <div className="flex items-center justify-center gap-6">
        <ScoreRing
          score={score}
          maxScore={maxScore}
          suffix={`/${maxScore}`}
          ariaLabel={`Score: ${score} out of ${maxScore}`}
        />

        <div>
          <p className="mb-1.5 text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
            Resume Score
          </p>
          <p className="text-2xl font-semibold tracking-tight">{label}</p>
          <p className="mt-2 max-w-[28ch] text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
