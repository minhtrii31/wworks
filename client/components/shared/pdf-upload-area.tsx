"use client"

import {
  useRef,
  useState,
  useCallback,
  type DragEvent,
  type ChangeEvent,
} from "react"
import { Upload } from "lucide-react"

import { cn } from "@/lib/utils"
import type { PdfUploadAreaProps } from "@/types/shared"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

export const PdfUploadArea = ({
  onFileSelect,
  disabled = false,
  dropLabel = "Drop your PDF here",
  ariaLabel = "Upload PDF — click or drag and drop",
}: PdfUploadAreaProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateAndSelect = useCallback(
    (file: File) => {
      if (disabled) return
      setError(null)
      if (file.type !== "application/pdf") {
        setError("Only PDF files are supported.")
        return
      }
      if (file.size > MAX_FILE_SIZE) {
        setError("File exceeds the 5 MB size limit.")
        return
      }
      onFileSelect(file)
    },
    [onFileSelect, disabled],
  )

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (disabled) return
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return
    const file = e.dataTransfer.files[0]
    if (file) validateAndSelect(file)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) validateAndSelect(file)
    e.target.value = ""
  }

  const openFilePicker = () => {
    if (!disabled) inputRef.current?.click()
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFilePicker}
        onKeyDown={(e) => e.key === "Enter" && openFilePicker()}
        className={cn(
          "flex w-full flex-col items-center gap-3.5 rounded-lg border border-dashed px-6 py-8 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
          disabled
            ? "cursor-not-allowed border-border/40 opacity-50"
            : isDragging
              ? "cursor-pointer border-foreground/30 bg-foreground/[0.03]"
              : "cursor-pointer border-border hover:border-foreground/20 hover:bg-foreground/[0.015]",
        )}
      >
        <div
          className={cn(
            "flex size-9 items-center justify-center rounded-md border border-border bg-muted/60 transition-colors",
            !disabled && isDragging && "border-foreground/20 bg-foreground/[0.06]",
          )}
        >
          <Upload
            className={cn(
              "size-3.5 transition-colors",
              isDragging ? "text-foreground" : "text-muted-foreground",
            )}
          />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">
            {isDragging ? "Release to upload" : dropLabel}
          </p>
          <p className="text-xs text-muted-foreground/50">PDF · 5 MB max</p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="sr-only"
          aria-hidden
          tabIndex={-1}
          onChange={handleInputChange}
          disabled={disabled}
        />
      </div>

      <p className="text-center text-xs text-muted-foreground/50">
        {error ? (
          <span role="alert" className="text-destructive">
            {error}
          </span>
        ) : (
          !disabled && (
            <>
              or{" "}
              <button
                type="button"
                onClick={openFilePicker}
                className="underline underline-offset-2 transition-colors hover:text-foreground"
                aria-label="Open file picker to select a PDF"
              >
                select a file
              </button>
            </>
          )
        )}
      </p>
    </div>
  )
}
