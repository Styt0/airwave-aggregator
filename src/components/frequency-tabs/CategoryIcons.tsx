
import React from 'react';
import { 
  Globe, 
  Satellite, 
  Plane, 
  CloudLightning, 
  Ship, 
  Cpu, 
  Radio as RadioIcon, 
  BarChart3, 
  Building2, 
  Signal, 
  Network, 
  Radar, 
  PlaneTakeoff 
} from 'lucide-react';
import { FrequencyCategory } from '@/lib/types';

export const getCategoryIcon = (category: string): React.ReactNode => {
  switch(category) {
    case 'Space': return <Globe className="h-3.5 w-3.5" />;
    case 'Satellite': return <Satellite className="h-3.5 w-3.5" />;
    case 'Airband': return <Plane className="h-3.5 w-3.5" />;
    case 'Weather': return <CloudLightning className="h-3.5 w-3.5" />;
    case 'Maritime': return <Ship className="h-3.5 w-3.5" />;
    case 'Digital': return <Cpu className="h-3.5 w-3.5" />;
    case 'Amateur': return <RadioIcon className="h-3.5 w-3.5" />;
    case 'VOLMET': return <CloudLightning className="h-3.5 w-3.5" />;
    case 'Utility': return <BarChart3 className="h-3.5 w-3.5" />;
    case 'Airport': return <Building2 className="h-3.5 w-3.5" />;
    case 'APRS': return <Signal className="h-3.5 w-3.5" />;
    case 'LoRa': return <Network className="h-3.5 w-3.5" />;
    case 'Meshtastic': return <Radar className="h-3.5 w-3.5" />;
    case 'ModeS': return <PlaneTakeoff className="h-3.5 w-3.5" />;
    default: return null;
  }
};

export const getCategoryCounts = (frequencies: Array<{ category: string }>) => {
  const counts: Record<string, number> = {};
  frequencies.forEach(freq => {
    counts[freq.category] = (counts[freq.category] || 0) + 1;
  });
  return counts;
};

export const getUniqueCategories = (frequencies: Array<{ category: string }>): FrequencyCategory[] => {
  const categories = new Set<FrequencyCategory>(
    frequencies.map(f => f.category as FrequencyCategory)
  );
  return ['All', ...Array.from(categories)] as FrequencyCategory[];
};
