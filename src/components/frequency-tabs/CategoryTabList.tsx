
import React from 'react';
import { FrequencyCategory } from '@/lib/types';
import { TabsList } from '@/components/ui/tabs';
import { getCategoryIcon, getCategoryCounts } from './CategoryIcons';

interface CategoryTabListProps {
  categories: FrequencyCategory[];
  activeCategory: FrequencyCategory;
  onCategoryChange: (category: FrequencyCategory) => void;
  frequencies: Array<{ category: string }>;
}

export const CategoryTabList: React.FC<CategoryTabListProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  frequencies
}) => {
  const categoryCounts = getCategoryCounts(frequencies);

  return (
    <div className="mb-4 border-b flex overflow-x-auto pb-1 scrollbar-none">
      <TabsList className="bg-transparent p-0 h-auto">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-colors ${
              activeCategory === category
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {getCategoryIcon(category)}
            <span>{category}</span>
            {category !== 'All' && categoryCounts[category] && (
              <span className="ml-1.5 h-4 min-w-4 px-1 inline-flex items-center justify-center rounded-full bg-muted-foreground/20 text-xs">
                {categoryCounts[category]}
              </span>
            )}
          </button>
        ))}
      </TabsList>
    </div>
  );
};
