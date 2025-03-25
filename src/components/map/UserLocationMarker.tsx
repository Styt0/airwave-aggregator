
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_TOKEN } from '@/lib/utils/mapUtils';

interface UserLocationMarkerProps {
  map: mapboxgl.Map | null;
  coordinates: { latitude: number; longitude: number };
  mapLoaded: boolean;
}

export const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({ 
  map,
  coordinates,
  mapLoaded
}) => {
  const userMarker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!map || !mapLoaded || !coordinates) return;
    
    if (userMarker.current) {
      userMarker.current.remove();
    }

    // Create a custom element for the user marker
    const el = document.createElement('div');
    el.className = 'relative flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 border-2 border-white shadow-lg radar-ping';
    
    // Adding a centered inner dot
    const innerDot = document.createElement('div');
    innerDot.className = 'absolute w-4 h-4 bg-cyan-300 rounded-full';
    el.appendChild(innerDot);
    
    userMarker.current = new mapboxgl.Marker({ element: el })
      .setLngLat([coordinates.longitude, coordinates.latitude])
      .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML('<div class="p-2 bg-black bg-opacity-80 text-cyan-400 border border-cyan-500 rounded"><strong>Your Location</strong></div>'))
      .addTo(map);
    
    // Center the map on user's location
    map.flyTo({
      center: [coordinates.longitude, coordinates.latitude],
      zoom: 9,
      essential: true
    });

    return () => {
      if (userMarker.current) {
        userMarker.current.remove();
      }
    };
    
  }, [coordinates, mapLoaded, map]);

  return null;
};
