"use client"

import { useState, type ChangeEvent } from "react"

import { cn, countWords } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { TextareaInputProps } from "@/types/shared"

const DEFAULT_MIN_CHARS = 80

export const TextareaInput = ({
  onSubmit,
  disabled = false,
  placeholder = "Paste your text here…",
  ariaLabel = "Text input",
  submitLabel = "Submit",
  disabledTitle,
  minChars = DEFAULT_MIN_CHARS,
  errorMessage = "Please paste more content — at least a few sentences.",
  rows = 10,
}: TextareaInputProps) => {
  const [text, setText] = useState("")
  const [error, setError] = useState<string | null>(null)

  const wordCount = countWords(text)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    if (error) setError(null)
  }

  const handleSubmit = () => {
    if (disabled) return
    if (text.trim().length < minChars) {
      setError(errorMessage)
      return
    }
    onSubmit(text)
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        aria-label={ariaLabel}
        aria-describedby={error ? "textarea-input-error" : undefined}
        className={cn(
          "w-full resize-y rounded-lg border bg-transparent px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
          error ? "border-destructive/50" : "border-border",
        )}
      />

      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] text-muted-foreground/50" aria-live="polite">
          {wordCount > 0 ? `${wordCount} word${wordCount !== 1 ? "s" : ""}` : ""}
        </span>
        <Button
          onClick={handleSubmit}
          disabled={disabled}
          aria-label={disabled && disabledTitle ? disabledTitle : submitLabel}
          title={disabled ? disabledTitle : undefined}
        >
          {submitLabel}
        </Button>
      </div>

      {error && (
        <p id="textarea-input-error" role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
