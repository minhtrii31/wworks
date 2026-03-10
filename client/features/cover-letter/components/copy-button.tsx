"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

interface CopyButtonProps {
  text: string
}

export const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Fallback for environments without clipboard API
      const el = document.createElement("textarea")
      el.value = text
      el.style.position = "fixed"
      el.style.opacity = "0"
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
    } finally {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleCopy}
      aria-label={
        copied ? "Cover letter copied to clipboard" : "Copy cover letter to clipboard"
      }
    >
      {copied ? (
        <>
          <Check className="size-3.5" aria-hidden />
          Copied
        </>
      ) : (
        <>
          <Copy className="size-3.5" aria-hidden />
          Copy
        </>
      )}
    </Button>
  )
}
