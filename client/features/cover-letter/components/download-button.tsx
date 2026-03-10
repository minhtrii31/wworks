"use client"

import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"

interface DownloadButtonProps {
  content: string
  filename: string
}

export const DownloadButton = ({ content, filename }: DownloadButtonProps) => {
  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Button
      variant="outline"
      onClick={handleDownload}
      aria-label={`Download cover letter as ${filename}`}
    >
      <Download className="size-3.5" aria-hidden />
      Download
    </Button>
  )
}
