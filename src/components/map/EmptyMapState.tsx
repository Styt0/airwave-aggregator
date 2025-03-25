
import React from 'react';
import { Map } from 'lucide-react';

export const EmptyMapState: React.FC = () => {
  return (
    <div className="text-center py-8 border border-dashed rounded-xl">
      <Map className="w-10 h-10 mx-auto text-muted-foreground/50 mb-2" />
      <h3 className="text-lg font-medium text-muted-foreground">No frequencies to display</h3>
      <p className="text-sm text-muted-foreground/70 mt-1">
        Add frequencies to see them on the map
      </p>
    </div>
  );
};
