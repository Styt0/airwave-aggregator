
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
  'Amateur': 'bg-green-600',
  'VOLMET': 'bg-amber-600',
  'Utility': 'bg-slate-600',
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

// Format frequency with proper spacing
export const formatFrequency = (freq: string): string => {
  // Check if it's already formatted
  if (freq.includes('.')) return freq;
  
  // Convert to standard decimal format if in kHz
  if (freq.length <= 3) {
    return `${freq} kHz`;
  }
  
  // Format MHz frequencies (assuming input in MHz)
  const len = freq.length;
  if (len >= 4 && len <= 6) {
    const intPart = freq.slice(0, len - 3);
    const decPart = freq.slice(len - 3);
    return `${intPart}.${decPart}`;
  }
  
  return freq;
}

// Format repeater offset
export const formatOffset = (offset: string | undefined): string => {
  if (!offset) return '';
  
  // If already formatted (contains +/- and decimal), return as is
  if (offset.match(/^[+-][0-9]+\.[0-9]+$/)) return offset;
  
  // Format based on common standards
  // Convert to MHz if needed
  if (offset.match(/^[+-][0-9]+$/)) {
    const value = parseInt(offset.slice(1));
    const sign = offset[0];
    if (value >= 1000) {
      // Assume in kHz, convert to MHz
      return `${sign}${(value / 1000).toFixed(3)}`;
    } else {
      // Already in MHz
      return `${sign}${value.toFixed(3)}`;
    }
  }
  
  return offset;
}
