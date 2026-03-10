import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const countWords = (str: string): number =>
  str.trim() ? str.trim().split(/\s+/).length : 0

