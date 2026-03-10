export interface GuideStep {
  number: string
  title: string
  description: string
}

export type PageStatus = "idle" | "loading" | "done"
