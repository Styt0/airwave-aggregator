
import React from 'react';
import { cn } from '@/lib/utils';
import { ActivityStatus } from '@/lib/types';
import { Signal } from 'lucide-react';

interface ActivityIndicatorProps {
  status: ActivityStatus;
  showLabel?: boolean;
  className?: string;
}

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  status,
  showLabel = false,
  className
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'green': return 'text-activity-green';
      case 'yellow': return 'text-activity-yellow';
      case 'orange': return 'text-activity-orange';
      case 'red': return 'text-activity-red';
      default: return 'text-gray-300';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'green': return 'Active (< 5m)';
      case 'yellow': return 'Active (< 10m)';
      case 'orange': return 'Active (< 30m)';
      case 'red': return 'Active (< 1h)';
      default: return 'Inactive';
    }
  };

  const getAnimation = () => {
    if (status === 'green') return 'animate-pulse';
    return '';
  };

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <Signal 
        className={cn(
          'w-4 h-4',
          getStatusColor(),
          getAnimation()
        )} 
      />
      {showLabel && (
        <span className={cn('text-xs font-medium', getStatusColor())}>
          {getStatusLabel()}
        </span>
      )}
    </div>
  );
};
