import { cn } from "@/lib/utils"

interface AuthCardProps {
  children: React.ReactNode
  className?: string
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div className={cn("relative overflow-hidden bg-transparent", className)}>
      <div className="absolute inset-x-0 top-0 h-px" />
      {children}
    </div>
  )
}
