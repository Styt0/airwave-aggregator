
import React from 'react';
import { Frequency } from '@/lib/types';
import { ActivityIndicator } from './ActivityIndicator';
import { cn } from '@/lib/utils';
import { MapPin, Star, Clock, Globe } from 'lucide-react';

interface FrequencyItemProps {
  frequency: Frequency;
  isNew?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export const FrequencyItem: React.FC<FrequencyItemProps> = ({ 
  frequency, 
  isNew = false,
  isFavorite = false,
  onToggleFavorite
}) => {
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
        "relative border rounded-xl p-4 transition-all duration-300 animate-scale-in",
        "backdrop-blur-md bg-card/80 hover:bg-card/90",
        "hover:shadow-md hover:scale-[1.01] group"
      )}
    >
      {onToggleFavorite && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star 
            className={cn(
              "h-5 w-5 transition-colors",
              isFavorite 
                ? "fill-amber-400 text-amber-400" 
                : "text-muted-foreground hover:text-amber-400"
            )} 
          />
        </button>
      )}
      
      <div className="flex justify-between items-start">
        <div className="pr-10">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{frequency.name}</h3>
            {isNew && (
              <span className="px-1.5 py-0.5 bg-cyan-500/10 text-cyan-500 text-xs rounded-full font-medium">
                New
              </span>
            )}
            {frequency.mode && (
              <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                {frequency.mode}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{frequency.description}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-lg font-semibold tabular-nums tracking-tight pr-8">
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
        
        <div className="flex items-center gap-2 bg-background/50 px-2 py-1 rounded-full shadow-sm">
          <ActivityIndicator status={frequency.activityStatus} />
          <span className="text-xs text-muted-foreground ml-0.5">
            {formatLastActivity(frequency.lastActivity)}
          </span>
        </div>
      </div>
      
      {/* Additional metadata for VOLMET and utility frequencies */}
      {(frequency.schedule || frequency.language || frequency.operationHours) && (
        <div className="mt-2 pt-2 border-t border-border/50 grid grid-cols-2 gap-x-4 gap-y-1">
          {frequency.schedule && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1.5" />
              <span>Schedule: {frequency.schedule}</span>
            </div>
          )}
          {frequency.language && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Globe className="h-3 w-3 mr-1.5" />
              <span>Language: {frequency.language}</span>
            </div>
          )}
          {frequency.operationHours && (
            <div className="flex items-center text-xs text-muted-foreground col-span-2">
              <Clock className="h-3 w-3 mr-1.5" />
              <span>Hours: {frequency.operationHours}</span>
            </div>
          )}
          {frequency.source && (
            <div className="flex items-center text-xs text-muted-foreground col-span-2">
              <span className="text-xs opacity-75">Source: {frequency.source}</span>
            </div>
          )}
        </div>
      )}
      
      <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/5 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};
