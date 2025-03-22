
import React from 'react';
import { Frequency } from '@/lib/types';
import { ActivityIndicator } from './ActivityIndicator';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface FrequencyItemProps {
  frequency: Frequency;
  isNew?: boolean;
}

export const FrequencyItem: React.FC<FrequencyItemProps> = ({ frequency, isNew = false }) => {
  const formatLastActivity = (date: Date | null) => {
    if (!date) return 'No recent activity';
    
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes === 1) return '1 minute ago';
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div 
      className={cn(
        "border rounded-xl p-4 transition-all duration-300 animate-scale-in",
        "backdrop-blur-md bg-card/80 hover:bg-card/90",
        "hover:shadow-md hover:scale-[1.01] group"
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{frequency.name}</h3>
            {isNew && (
              <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                New
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{frequency.description}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-lg font-semibold tabular-nums tracking-tight">
            {frequency.frequency}
          </span>
          <span className="text-xs text-muted-foreground uppercase font-medium">
            MHz
          </span>
        </div>
      </div>
      
      <div className="mt-3 flex flex-wrap items-center justify-between text-sm gap-y-2">
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span className="text-xs">
            {frequency.location.name}
            {frequency.distance && (
              <span className="ml-1 text-xs text-muted-foreground/70">
                ({frequency.distance} km)
              </span>
            )}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {formatLastActivity(frequency.lastActivity)}
          </span>
          <ActivityIndicator status={frequency.activityStatus} />
        </div>
      </div>
      
      <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/5 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};
