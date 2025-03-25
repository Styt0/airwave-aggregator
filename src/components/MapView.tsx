
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Frequency } from '@/lib/types';
import { MAPBOX_TOKEN } from '@/lib/utils/mapUtils';
import { EmptyMapState } from './map/EmptyMapState';
import { FrequencyMarkers } from './map/FrequencyMarkers';
import { UserLocationMarker } from './map/UserLocationMarker';

interface MapViewProps {
  frequencies: Frequency[];
  userCoordinates: { latitude: number; longitude: number } | null;
  onSelectFrequency?: (id: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({ 
  frequencies, 
  userCoordinates,
  onSelectFrequency 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    const initialCoordinates = userCoordinates 
      ? [userCoordinates.longitude, userCoordinates.latitude] 
      : [4.3517, 50.8503]; // Default to Brussels
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Changed to dark style for NASA command hub look
      center: initialCoordinates as [number, number],
      zoom: userCoordinates ? 9 : 6,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [userCoordinates]);

  if (!frequencies.length) {
    return <EmptyMapState />;
  }

  return (
    <div className="relative w-full h-[70vh] rounded-lg overflow-hidden border animate-fade-in">
      <div 
        ref={mapContainer} 
        className="absolute inset-0 bg-muted" 
      />
      
      {mapLoaded && (
        <>
          <FrequencyMarkers 
            map={map.current}
            frequencies={frequencies}
            mapLoaded={mapLoaded}
            onSelectFrequency={onSelectFrequency}
          />
          
          {userCoordinates && (
            <UserLocationMarker
              map={map.current}
              coordinates={userCoordinates}
              mapLoaded={mapLoaded}
            />
          )}
        </>
      )}
      
      <div className="absolute bottom-2 left-2 z-10 text-xs text-cyan-300 bg-black/80 px-2 py-1 rounded-md">
        Map data provided by Mapbox
      </div>
    </div>
  );
};
