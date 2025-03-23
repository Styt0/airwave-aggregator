
import React from 'react';
import { cn } from '@/lib/utils';
import { ActivityStatus } from '@/lib/types';
import { Signal, Radio } from 'lucide-react';

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
      case 'green': return 'text-[#0ceb70]';
      case 'yellow': return 'text-[#facc15]';
      case 'orange': return 'text-[#fb923c]';
      case 'red': return 'text-[#f87171]';
      default: return 'text-gray-300';
    }
  };

  const getBackgroundColor = () => {
    switch (status) {
      case 'green': return 'bg-[#0ceb70]/20';
      case 'yellow': return 'bg-[#facc15]/20';
      case 'orange': return 'bg-[#fb923c]/20';
      case 'red': return 'bg-[#f87171]/20';
      default: return 'bg-gray-200/20';
    }
  };

  const getGlowEffect = () => {
    switch (status) {
      case 'green': return 'shadow-[0_0_8px_rgba(12,235,112,0.6)]';
      case 'yellow': return 'shadow-[0_0_8px_rgba(250,204,21,0.5)]';
      case 'orange': return 'shadow-[0_0_8px_rgba(251,146,60,0.5)]';
      case 'red': return 'shadow-[0_0_8px_rgba(248,113,113,0.5)]';
      default: return '';
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
      <div className={cn(
        'relative rounded-full p-1.5',
        getBackgroundColor(),
        getGlowEffect(),
        status !== 'none' ? 'ring-1 ring-opacity-70' : '',
        status === 'green' ? 'ring-[#0ceb70]' : '',
        status === 'yellow' ? 'ring-[#facc15]' : '',
        status === 'orange' ? 'ring-[#fb923c]' : '',
        status === 'red' ? 'ring-[#f87171]' : '',
        status === 'green' ? 'radar-ping' : ''
      )}>
        <Radio 
          className={cn(
            'w-4 h-4 relative z-10',
            getStatusColor(),
            getAnimation()
          )} 
        />
      </div>
      {showLabel && (
        <span className={cn('text-xs font-medium', getStatusColor())}>
          {getStatusLabel()}
        </span>
      )}
    </div>
  );
};
