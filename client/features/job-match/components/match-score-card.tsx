import { ScoreRing } from "@/components/shared"

interface MatchScoreCardProps {
  score: number
  maxScore: number
}

const getScoreMeta = (
  score: number
): { label: string; description: string } => {
  if (score >= 80)
    return {
      label: "Strong Match",
      description:
        "Your profile aligns well with the role. Polish your application and apply with confidence.",
    }
  if (score >= 60)
    return {
      label: "Decent Match",
      description:
        "A solid foundation. Address the missing keywords below to significantly improve your fit.",
    }
  return {
    label: "Weak Match",
    description:
      "Notable gaps exist between the role requirements and your resume. Follow the suggestions to close them.",
  }
}

export const MatchScoreCard = ({ score, maxScore }: MatchScoreCardProps) => {
  const { label, description } = getScoreMeta(score)

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-center gap-7">
        <ScoreRing
          score={score}
          maxScore={maxScore}
          suffix="%"
          ariaLabel={`Match score: ${score} percent`}
        />

        <div>
          <p className="mb-2 text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
            Match Score
          </p>
          <p className="text-2xl font-semibold tracking-tight">{label}</p>
          <p className="mt-2.5 max-w-[26ch] text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
