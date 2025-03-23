
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { FrequencyCategory } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const categoryColors: Record<FrequencyCategory, string> = {
  'Airband': 'bg-rose-500',
  'VHF': 'bg-cyan-500',
  'UHF': 'bg-violet-500',
  'Repeaters': 'bg-emerald-500',
  'CW': 'bg-amber-500',
  'HF': 'bg-indigo-500',
  'Satellite': 'bg-blue-400',
  'Space': 'bg-purple-600',
  'Military': 'bg-red-700',
  'Weather': 'bg-sky-400',
  'Maritime': 'bg-blue-600',
  'Digital': 'bg-teal-500',
  'All': 'bg-slate-500'
}

export const getCategoryColor = (category: FrequencyCategory): string => {
  return categoryColors[category] || 'bg-slate-500';
}

// Pagination helpers
export const paginateItems = <T>(items: T[], page: number, itemsPerPage: number): T[] => {
  const startIndex = (page - 1) * itemsPerPage;
  return items.slice(startIndex, startIndex + itemsPerPage);
}

