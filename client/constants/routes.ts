export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  RESUME_ANALYSIS: "/resume-analysis",
  JOB_MATCH: "/job-match",
  COVER_LETTER: "/cover-letter",
  HISTORY: "/history",
  SETTINGS: "/settings",
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
