
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
  Building2 
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
  ];

  return (
    <div className="w-full overflow-x-auto pb-2 px-1 no-scrollbar">
      <div className="flex space-x-2 min-w-max">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
              "backdrop-blur-sm border",
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
