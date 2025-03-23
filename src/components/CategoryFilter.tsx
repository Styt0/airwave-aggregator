
import React from 'react';
import { FrequencyCategory } from '@/lib/types';
import { cn } from '@/lib/utils';
import { 
  Airplay, 
  Radio, 
  Wifi, 
  CircleDot, 
  Globe, 
  Layers,
  Building2,
  Satellite,
  CloudLightning,
  Ship,
  Cpu,
  Plane,
  BarChart3,
  Signal
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: FrequencyCategory;
  onCategoryChange: (category: FrequencyCategory) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  const categories: Array<{
    id: FrequencyCategory;
    name: string;
    icon: React.ReactNode;
  }> = [
    { id: 'All', name: 'All', icon: <Layers className="w-4 h-4" /> },
    { id: 'Airband', name: 'Airband', icon: <Airplay className="w-4 h-4" /> },
    { id: 'Airport', name: 'Airports', icon: <Building2 className="w-4 h-4" /> },
    { id: 'VHF', name: 'VHF', icon: <Radio className="w-4 h-4" /> },
    { id: 'UHF', name: 'UHF', icon: <Wifi className="w-4 h-4" /> },
    { id: 'Repeaters', name: 'Repeaters', icon: <Radio className="w-4 h-4" /> },
    { id: 'CW', name: 'CW', icon: <CircleDot className="w-4 h-4" /> },
    { id: 'HF', name: 'HF', icon: <Globe className="w-4 h-4" /> },
    { id: 'Satellite', name: 'Satellite', icon: <Satellite className="w-4 h-4" /> },
    { id: 'Space', name: 'Space', icon: <Globe className="w-4 h-4" /> },
    { id: 'Military', name: 'Military', icon: <Plane className="w-4 h-4" /> },
    { id: 'Weather', name: 'Weather', icon: <CloudLightning className="w-4 h-4" /> },
    { id: 'Maritime', name: 'Maritime', icon: <Ship className="w-4 h-4" /> },
    { id: 'Digital', name: 'Digital', icon: <Cpu className="w-4 h-4" /> },
    { id: 'Amateur', name: 'Amateur', icon: <Radio className="w-4 h-4" /> },
    { id: 'VOLMET', name: 'VOLMET', icon: <CloudLightning className="w-4 h-4" /> },
    { id: 'Utility', name: 'Utility', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'APRS', name: 'APRS', icon: <Signal className="w-4 h-4" /> },
  ];

  // Split categories into two rows for better display
  const firstRowCategories = categories.slice(0, 9);
  const secondRowCategories = categories.slice(9);

  return (
    <div className="w-full px-1 space-y-2">
      {/* First row of categories */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2">
        {firstRowCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
              "backdrop-blur-sm border w-full",
              selectedCategory === category.id
                ? "bg-primary/10 border-primary/30 text-primary shadow-sm"
                : "bg-card/60 border-border/50 text-muted-foreground hover:bg-card/80 hover:border-border/80 hover:text-foreground"
            )}
          >
            {category.icon}
            <span>{category.name}</span>
          </button>
        ))}
      </div>
      
      {/* Second row of categories */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2">
        {secondRowCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
              "backdrop-blur-sm border w-full",
              selectedCategory === category.id
                ? "bg-primary/10 border-primary/30 text-primary shadow-sm"
                : "bg-card/60 border-border/50 text-muted-foreground hover:bg-card/80 hover:border-border/80 hover:text-foreground"
            )}
          >
            {category.icon}
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
