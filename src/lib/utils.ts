
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { FrequencyCategory } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const categoryColors: Record<FrequencyCategory, string> = {
  'Airband': 'bg-red-500',
  'VHF': 'bg-blue-500',
  'UHF': 'bg-violet-500',
  'Repeaters': 'bg-emerald-500',
  'CW': 'bg-amber-500',
  'HF': 'bg-indigo-500',
  'All': 'bg-slate-500'
}

export const getCategoryColor = (category: FrequencyCategory): string => {
  return categoryColors[category] || 'bg-slate-500';
}
