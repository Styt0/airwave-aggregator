
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
  'Airport': 'bg-sky-700',
  'APRS': 'bg-lime-500',
  'LoRa': 'bg-fuchsia-600',
  'Meshtastic': 'bg-orange-500',
  'ModeS': 'bg-rose-800',
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

// Signal Identification Utilities
export interface SignalType {
  name: string;
  description: string;
  frequencyRange: string;
  modulation: string;
  bandwidth: string;
  image: string;
  category: string;
  source: string;
}

export const commonSignalTypes: SignalType[] = [
  {
    name: "AM Voice",
    description: "Amplitude Modulated voice transmission, commonly used in aviation",
    frequencyRange: "118-137 MHz",
    modulation: "AM",
    bandwidth: "8 kHz",
    image: "am_voice.png",
    category: "Airband",
    source: "ARES Valley"
  },
  {
    name: "FM Voice",
    description: "Frequency Modulated voice transmission, used in amateur and public service radio",
    frequencyRange: "144-148 MHz, 420-450 MHz",
    modulation: "FM",
    bandwidth: "12.5-25 kHz",
    image: "fm_voice.png",
    category: "Amateur",
    source: "ARES Valley"
  },
  {
    name: "Single Side Band (SSB)",
    description: "Voice and data transmission using single sideband modulation",
    frequencyRange: "1.8-30 MHz",
    modulation: "SSB",
    bandwidth: "2.4-2.8 kHz",
    image: "ssb.png",
    category: "HF",
    source: "ARES Valley"
  },
  {
    name: "ACARS",
    description: "Aircraft Communications Addressing and Reporting System",
    frequencyRange: "129-137 MHz",
    modulation: "AM-MSK",
    bandwidth: "2.4 kHz",
    image: "acars.png",
    category: "Airband",
    source: "ARES Valley"
  },
  {
    name: "POCSAG",
    description: "Post Office Code Standardization Advisory Group - pager protocol",
    frequencyRange: "138-174 MHz",
    modulation: "FSK",
    bandwidth: "12.5 kHz",
    image: "pocsag.png",
    category: "Digital",
    source: "ARES Valley"
  },
  {
    name: "DMR",
    description: "Digital Mobile Radio standard",
    frequencyRange: "144-148 MHz, 420-450 MHz",
    modulation: "4-FSK",
    bandwidth: "12.5 kHz",
    image: "dmr.png",
    category: "Digital",
    source: "ARES Valley"
  },
  {
    name: "FT8",
    description: "Digital mode for weak signal communication",
    frequencyRange: "Multiple HF bands",
    modulation: "8-FSK",
    bandwidth: "50 Hz",
    image: "ft8.png",
    category: "Digital",
    source: "ARES Valley"
  },
  {
    name: "APRS",
    description: "Automatic Packet Reporting System",
    frequencyRange: "144.39-144.80 MHz",
    modulation: "AFSK",
    bandwidth: "16 kHz",
    image: "aprs.png",
    category: "APRS",
    source: "ARES Valley"
  }
];

// Function to search for signal types based on frequency or name
export const findSignalTypesByFrequency = (freq: number): SignalType[] => {
  return commonSignalTypes.filter(signal => {
    const rangeText = signal.frequencyRange;
    const ranges = rangeText.split(',').map(r => r.trim());
    
    for (const range of ranges) {
      if (range.includes('-')) {
        const [min, max] = range.split('-').map(r => {
          // Convert to MHz for comparison
          const value = parseFloat(r.trim());
          if (r.includes('kHz') || r.includes('KHz')) {
            return value / 1000; // Convert kHz to MHz
          }
          return value;
        });
        
        if (freq >= min && freq <= max) {
          return true;
        }
      }
    }
    
    return false;
  });
};

export const findSignalTypesByName = (searchTerm: string): SignalType[] => {
  const term = searchTerm.toLowerCase();
  return commonSignalTypes.filter(
    signal => 
      signal.name.toLowerCase().includes(term) || 
      signal.description.toLowerCase().includes(term) ||
      signal.modulation.toLowerCase().includes(term) ||
      signal.category.toLowerCase().includes(term)
  );
};
