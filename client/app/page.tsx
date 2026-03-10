import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { FileSearch, GitCompare, PenLine, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants/routes"
import { LandingHeader } from "@/features/landing/components/landing-header"
import { ScrollReveal } from "@/features/landing/components/scroll-reveal"

export const metadata: Metadata = {
  title: "wworks — AI-Powered Career Tools",
  description:
    "Analyze your resume, match it to any job, and generate tailored cover letters — all from one intelligent workspace.",
}

const RING_R = 36
const RING_C = 2 * Math.PI * RING_R
const SCORE = 85
const RING_DASH = `${RING_C * (SCORE / 100)} ${RING_C * (1 - SCORE / 100)}`

const FEATURES = [
  {
    title: "Resume Analysis",
    description:
      "Upload your resume and receive an instant AI-powered score with actionable insights to strengthen every section.",
    icon: FileSearch,
    href: ROUTES.RESUME_ANALYSIS,
  },
  {
    title: "Job Match",
    description:
      "Paste any job description and see how your resume aligns — with compatibility scores and missing keyword analysis.",
    icon: GitCompare,
    href: ROUTES.JOB_MATCH,
  },
  {
    title: "Cover Letter Generator",
    description:
      "Generate tailored, professional cover letters that connect your experience to the role — ready to send in seconds.",
    icon: PenLine,
    href: ROUTES.COVER_LETTER,
  },
] as const

const STEPS = [
  {
    title: "Upload your resume",
    description:
      "Start by uploading a PDF or pasting your resume text directly into the editor.",
  },
  {
    title: "Get your analysis",
    description:
      "Receive a detailed score with strengths, weaknesses, and specific improvement suggestions.",
  },
  {
    title: "Match with jobs",
    description:
      "Compare against any job description to identify keyword gaps and compatibility.",
  },
  {
    title: "Generate & apply",
    description:
      "Create polished cover letters tailored to specific roles and start applying with confidence.",
  },
] as const

const MARQUEE_ITEMS = [
  "Resume Analysis",
  "Job Matching",
  "Cover Letters",
  "Score Analysis",
  "Keyword Insights",
  "AI-Powered",
] as const

const SHOWCASE_BARS = [
  { label: "Format", value: 90 },
  { label: "Content", value: 78 },
  { label: "Skills", value: 88 },
] as const

const FOUND_KW = ["react", "next.js", "typescript", "tailwind"] as const
const MISSING_KW = ["docker", "aws"] as const

const FEATURE_BARS = [35, 55, 42, 68, 50, 62, 75, 48, 70, 82, 58, 78]
const LETTER_LINES = [100, 100, 85, 0, 100, 100, 65, 0, 40]

export default function HomePage() {
  return (
    <ScrollReveal>
      <div className="min-h-dvh bg-background">
        <LandingHeader />

        {/* ═══════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════ */}
        <section className="relative flex min-h-[85dvh] flex-col items-center justify-center overflow-hidden px-6 pt-16 md:min-h-dvh md:pt-0">
          {/* Large rotating flower logo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
          >
            <Image
              src="/logo.png"
              alt=""
              width={500}
              height={500}
              className="size-[min(55vw,500px)] animate-[landing-spin_80s_linear_infinite] opacity-[0.05] dark:hidden"
              priority
            />
            <Image
              src="/logo_white.png"
              alt=""
              width={500}
              height={500}
              className="hidden size-[min(55vw,500px)] animate-[landing-spin_80s_linear_infinite] opacity-[0.05] dark:block"
              priority
            />
          </div>

          {/* Floating flower accents */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden overflow-hidden select-none md:block"
          >
            <Image
              src="/logo.png"
              alt=""
              width={28}
              height={28}
              className="absolute top-[22%] left-[10%] size-7 animate-[landing-float_6s_ease-in-out_infinite] opacity-[0.08] dark:invert"
            />
            <Image
              src="/logo.png"
              alt=""
              width={18}
              height={18}
              className="absolute top-[30%] right-[12%] size-[18px] animate-[landing-float_5s_ease-in-out_infinite_1s] opacity-[0.06] dark:invert"
            />
            <Image
              src="/logo.png"
              alt=""
              width={22}
              height={22}
              className="absolute bottom-[26%] left-[18%] size-[22px] animate-[landing-float_7s_ease-in-out_infinite_0.5s] opacity-[0.07] dark:invert"
            />
          </div>

          {/* Watermark */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center select-none"
          >
            <span className="translate-y-1/4 text-[clamp(6rem,18vw,20rem)] font-black tracking-wide text-foreground/[0.04]">
              wworks
            </span>
          </div>

          {/* Hero content */}
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="hero-reveal hero-reveal-d1 text-[clamp(2.5rem,8vw,7.5rem)] leading-[1.08] font-bold tracking-tight">
              Your next career move,{" "}
              <span className="inline-flex items-baseline">
                <span className="font-extralight italic">refined</span>
                <Image
                  src="/logo.png"
                  alt=""
                  width={64}
                  height={64}
                  className="relative -top-[0.06em] ml-[0.1em] inline size-[0.35em] shrink-0 opacity-50 dark:hidden"
                />
                <Image
                  src="/logo_white.png"
                  alt=""
                  width={64}
                  height={64}
                  className="relative -top-[0.06em] ml-[0.1em] hidden size-[0.35em] shrink-0 opacity-50 dark:inline"
                />
              </span>
            </h1>

            <p className="hero-reveal hero-reveal-d2 mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:mt-8 md:text-base">
              Analyze your resume, match it to any job, and generate tailored
              cover letters — all from one elegant workspace.
            </p>

            <div className="hero-reveal hero-reveal-d3 mt-8 flex items-center justify-center gap-3 md:mt-10">
              <Button asChild size="lg">
                <Link href={ROUTES.SIGNUP}>
                  Get started free
                  <ArrowRight data-icon="inline-end" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={ROUTES.LOGIN}>Sign in</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            MARQUEE
        ═══════════════════════════════════════════ */}
        <div
          className="overflow-hidden border-y border-border/60 py-4"
          aria-hidden
        >
          <div className="flex animate-[landing-marquee_30s_linear_infinite] whitespace-nowrap">
            {Array.from({ length: 4 }).map((_, setIndex) => (
              <div
                key={setIndex}
                className="flex shrink-0 items-center gap-8 px-4"
              >
                {MARQUEE_ITEMS.map((item) => (
                  <div key={item} className="flex items-center gap-8">
                    <span className="text-[11px] font-medium tracking-widest text-muted-foreground/40 uppercase">
                      {item}
                    </span>
                    <span className="text-muted-foreground/20">·</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            SHOWCASE — Bento grid of app previews
        ═══════════════════════════════════════════ */}
        <section className="mx-auto max-w-[1440px] px-6 md:px-8">
          <div className="border-b border-border/60 py-4 md:py-5">
            <h2
              data-animate
              className="text-[11px] font-medium tracking-widest text-muted-foreground uppercase"
            >
              Preview
            </h2>
          </div>

          <div className="mx-auto max-w-5xl py-10 md:py-20">
            <div className="grid gap-3 md:grid-cols-2 md:gap-4">
              {/* ── Resume Analysis Card ── */}
              <div
                data-animate
                data-delay="1"
                className="showcase-card relative flex flex-col overflow-hidden rounded-xl border border-border bg-card"
              >
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
                  aria-hidden
                />
                <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="size-2 rounded-full bg-foreground/10" />
                    <div className="size-2 rounded-full bg-foreground/10" />
                    <div className="size-2 rounded-full bg-foreground/10" />
                  </div>
                  <span className="text-[10px] text-muted-foreground/50">
                    Resume Analysis
                  </span>
                </div>

                <div className="flex flex-1 flex-col items-center gap-6 p-5 md:gap-8 md:p-8">
                  <div className="relative inline-flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className="size-20 -rotate-90 md:size-28"
                      aria-hidden
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r={RING_R}
                        fill="none"
                        strokeWidth="5"
                        style={{
                          stroke: "var(--foreground)",
                          opacity: 0.07,
                        }}
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r={RING_R}
                        fill="none"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={RING_DASH}
                        style={{
                          stroke: "var(--foreground)",
                          opacity: 0.65,
                        }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-lg leading-none font-semibold tabular-nums md:text-2xl">
                        {SCORE}
                      </span>
                      <span className="mt-0.5 text-[10px] text-muted-foreground/50">
                        /100
                      </span>
                    </div>
                  </div>

                  <div className="w-full space-y-4">
                    {SHOWCASE_BARS.map((bar) => (
                      <div key={bar.label}>
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="text-[11px] text-muted-foreground">
                            {bar.label}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground/50 tabular-nums">
                            {bar.value}
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/[0.06]">
                          <div
                            className="h-full rounded-full bg-foreground/30"
                            style={{ width: `${bar.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Job Match Card ── */}
              <div
                data-animate
                data-delay="2"
                className="showcase-card relative flex flex-col overflow-hidden rounded-xl border border-border bg-card"
              >
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
                  aria-hidden
                />
                <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="size-2 rounded-full bg-foreground/10" />
                    <div className="size-2 rounded-full bg-foreground/10" />
                    <div className="size-2 rounded-full bg-foreground/10" />
                  </div>
                  <span className="text-[10px] text-muted-foreground/50">
                    Job Match
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-8">
                  <p className="text-[2.5rem] leading-none font-bold tabular-nums md:text-[3.5rem]">
                    92
                    <span className="text-xl text-muted-foreground/50">%</span>
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    compatibility score
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] font-medium tracking-widest text-muted-foreground/60 uppercase">
                        Found
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {FOUND_KW.map((kw) => (
                          <span
                            key={kw}
                            className="rounded-md bg-foreground/[0.07] px-2 py-0.5 text-[10px] text-muted-foreground"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium tracking-widest text-muted-foreground/60 uppercase">
                        Missing
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {MISSING_KW.map((kw) => (
                          <span
                            key={kw}
                            className="rounded-md border border-dashed border-foreground/15 px-2 py-0.5 text-[10px] text-muted-foreground/60"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Cover Letter Card ── */}
              <div
                data-animate
                data-delay="3"
                className="showcase-card relative flex flex-col overflow-hidden rounded-xl border border-border bg-card md:col-span-2"
              >
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
                  aria-hidden
                />
                <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="size-2 rounded-full bg-foreground/10" />
                    <div className="size-2 rounded-full bg-foreground/10" />
                    <div className="size-2 rounded-full bg-foreground/10" />
                  </div>
                  <span className="text-[10px] text-muted-foreground/50">
                    Cover Letter
                  </span>
                </div>

                <div className="p-5 md:p-8">
                  <p className="text-sm font-medium text-foreground/40">
                    Dear Hiring Manager,
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="h-2 w-full rounded-full bg-foreground/[0.05]" />
                    <div className="h-2 w-full rounded-full bg-foreground/[0.05]" />
                    <div className="h-2 w-[85%] rounded-full bg-foreground/[0.05]" />
                    <div className="h-3" />
                    <div className="h-2 w-full rounded-full bg-foreground/[0.05]" />
                    <div className="h-2 w-full rounded-full bg-foreground/[0.05]" />
                    <div className="h-2 w-[65%] rounded-full bg-foreground/[0.05]" />
                    <div className="h-3" />
                    <div className="h-2 w-[40%] rounded-full bg-foreground/[0.05]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FEATURES
        ═══════════════════════════════════════════ */}
        <section className="mx-auto max-w-[1440px]">
          <div className="border-y border-border/60 px-5 py-4 md:px-8 md:py-5">
            <h2
              data-animate
              className="text-[11px] font-medium tracking-widest text-muted-foreground uppercase"
            >
              Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 divide-y divide-border/60 md:grid-cols-3 md:divide-x md:divide-y-0">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon
              return (
                <article
                  key={feature.title}
                  data-animate
                  data-delay={String(i + 1)}
                  className="group relative flex flex-col gap-5 overflow-hidden px-5 py-8 transition-colors hover:bg-muted/30 md:gap-6 md:px-8 md:py-10"
                >
                  <span
                    aria-hidden
                    className="absolute -top-4 -right-2 font-mono text-[7rem] leading-none font-bold text-foreground/[0.03] tabular-nums transition-colors duration-700 group-hover:text-foreground/[0.06]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10 flex items-start justify-between">
                    <span className="font-mono text-[11px] text-muted-foreground/40 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      className="size-4 text-muted-foreground/40"
                      aria-hidden
                    />
                  </div>

                  <div className="relative z-10 flex flex-1 flex-col">
                    <h3 className="text-lg font-medium tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>

                  <div className="relative z-10" aria-hidden>
                    {i === 0 && (
                      <div className="flex items-end gap-1 pt-4">
                        {FEATURE_BARS.map((h, j) => (
                          <div
                            key={j}
                            className="flex-1 rounded-t-sm bg-foreground/[0.08] transition-colors duration-700 group-hover:bg-foreground/[0.15]"
                            style={{ height: `${h * 0.5}px` }}
                          />
                        ))}
                      </div>
                    )}
                    {i === 1 && (
                      <p className="pt-4 font-mono text-[3rem] leading-none font-bold text-foreground/[0.06] tabular-nums transition-colors duration-700 group-hover:text-foreground/[0.12]">
                        92%
                      </p>
                    )}
                    {i === 2 && (
                      <div className="flex flex-col gap-1.5 pt-4">
                        {LETTER_LINES.map((w, j) =>
                          w > 0 ? (
                            <div
                              key={j}
                              className="h-1.5 rounded-full bg-foreground/[0.07] transition-colors duration-700 group-hover:bg-foreground/[0.14]"
                              style={{ width: `${w}%` }}
                            />
                          ) : (
                            <div key={j} className="h-2" />
                          )
                        )}
                      </div>
                    )}
                  </div>

                  <Link
                    href={feature.href}
                    className="relative z-10 flex items-center gap-1.5 text-xs text-muted-foreground transition-colors group-hover:text-foreground"
                    aria-label={`Try ${feature.title}`}
                  >
                    Try it now
                    <span
                      aria-hidden
                      className="text-muted-foreground/30 transition-colors group-hover:text-foreground/40"
                    >
                      →
                    </span>
                  </Link>
                </article>
              )
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            PROCESS
        ═══════════════════════════════════════════ */}
        <section className="mx-auto max-w-[1440px]">
          <div className="border-y border-border/60 px-5 py-4 md:px-8 md:py-5">
            <h2
              data-animate
              className="text-[11px] font-medium tracking-widest text-muted-foreground uppercase"
            >
              How it works
            </h2>
          </div>

          <ol
            role="list"
            className="grid grid-cols-1 divide-y divide-border/60 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:[&>li:not(:first-child)]:border-l lg:[&>li:not(:first-child)]:border-border/60 sm:[&>li:nth-child(n+3)]:border-t sm:[&>li:nth-child(n+3)]:border-border/60"
          >
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                data-animate
                data-delay={String(i + 1)}
                className="flex flex-col gap-4 px-5 py-6 md:gap-5 md:px-8 md:py-8"
              >
                <span className="flex size-8 items-center justify-center rounded-full border border-border/60 font-mono text-[11px] text-muted-foreground/60 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-sm leading-snug font-medium">
                    {step.title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ═══════════════════════════════════════════
            CTA
        ═══════════════════════════════════════════ */}
        <section className="relative overflow-hidden border-t border-border/60 px-6 py-20 text-center md:py-32">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center select-none"
          >
            <span className="translate-y-1/3 text-[clamp(4rem,14vw,16rem)] font-black tracking-wide text-foreground/[0.04]">
              wworks
            </span>
          </div>

          <div className="relative z-10" data-animate>
            {/* Animated flower accent */}
            <div className="mb-8 flex justify-center" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/loading.gif"
                alt=""
                width={28}
                height={28}
                className="size-7 opacity-25 dark:hidden"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/loading_white.gif"
                alt=""
                width={28}
                height={28}
                className="hidden size-7 opacity-25 dark:block"
              />
            </div>

            <h2 className="text-[clamp(1.75rem,5vw,4rem)] leading-tight font-bold tracking-tight">
              Ready to elevate
              <br />
              <span className="font-extralight text-foreground/70 italic">
                your career?
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:mt-5 md:text-base">
              Join wworks and take control of your job search with intelligent,
              AI-powered tools.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href={ROUTES.SIGNUP}>
                  Get started free
                  <ArrowRight data-icon="inline-end" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════ */}
        <footer className="border-t border-border/60">
          <div className="mx-auto max-w-[1440px] px-6 md:px-8">
            <div className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-4 sm:gap-10 sm:py-12">
              <div className="col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2">
                  <Image
                    src="/logo.png"
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-auto object-contain dark:hidden"
                  />
                  <Image
                    src="/logo_white.png"
                    alt=""
                    width={20}
                    height={20}
                    className="hidden h-5 w-auto object-contain dark:block"
                  />
                  <span className="text-sm font-semibold tracking-tight">
                    wworks
                  </span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  Intelligent career tools
                  <br />
                  for the modern job seeker.
                </p>
              </div>

              <nav aria-label="Features">
                <p className="text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
                  Features
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  <li>
                    <Link
                      href={ROUTES.RESUME_ANALYSIS}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Resume Analysis
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={ROUTES.JOB_MATCH}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Job Match
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={ROUTES.COVER_LETTER}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Cover Letter
                    </Link>
                  </li>
                </ul>
              </nav>

              <nav aria-label="Product">
                <p className="text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
                  Product
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  <li>
                    <Link
                      href={ROUTES.DASHBOARD}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={ROUTES.HISTORY}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      History
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={ROUTES.SETTINGS}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Settings
                    </Link>
                  </li>
                </ul>
              </nav>

              <nav aria-label="Account">
                <p className="text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
                  Account
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  <li>
                    <Link
                      href={ROUTES.SIGNUP}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Sign up
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={ROUTES.LOGIN}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Sign in
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex flex-col items-center gap-1 border-t border-border/60 py-6 sm:flex-row sm:justify-between sm:gap-0">
              <p className="text-[11px] text-muted-foreground">© 2026 wworks</p>
              <p className="text-[11px] text-muted-foreground">
                All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ScrollReveal>
  )
}
