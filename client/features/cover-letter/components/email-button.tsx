"use client"

import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"

interface EmailButtonProps {
  content: string
  companyName: string
  jobTitle: string
}

export const EmailButton = ({
  content,
  companyName,
  jobTitle,
}: EmailButtonProps) => {
  const handleEmail = () => {
    const subject = encodeURIComponent(
      `Cover Letter – ${jobTitle} at ${companyName}`,
    )
    const body = encodeURIComponent(content)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  return (
    <Button
      variant="outline"
      onClick={handleEmail}
      aria-label={`Open email client with cover letter for ${jobTitle} at ${companyName}`}
    >
      <Mail className="size-3.5" aria-hidden />
      Send Email
    </Button>
  )
}
