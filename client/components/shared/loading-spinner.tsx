import Image from "next/image"

import type { LoadingSpinnerProps } from "@/types/shared"

export const LoadingSpinner = ({ message, ariaLabel }: LoadingSpinnerProps) => (
  <div
    role="status"
    aria-label={ariaLabel ?? `${message}, please wait`}
    className="flex h-full flex-col items-center justify-center gap-3 py-10"
  >
    {/* Light mode: dark flower — Dark mode: white flower */}
    <div className="size-16" aria-hidden>
      <Image
        src="/loading.gif"
        alt=""
        width={64}
        height={64}
        className="size-full dark:hidden"
        priority
        unoptimized
      />
      <Image
        src="/loading_white.gif"
        alt=""
        width={64}
        height={64}
        className="hidden size-full dark:block"
        priority
        unoptimized
      />
    </div>

    <div className="space-y-1.5 text-center">
      <p className="text-sm font-medium">{message}</p>
      <p className="text-xs text-muted-foreground">
        This may take a few seconds
      </p>
    </div>
  </div>
)
