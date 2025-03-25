
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Frequency } from '@/lib/types';
import { getCategoryColor, createPopupContent } from '@/lib/utils/mapUtils';

interface FrequencyMarkersProps {
  map: mapboxgl.Map | null;
  frequencies: Frequency[];
  mapLoaded: boolean;
  onSelectFrequency?: (id: string) => void;
}

export const FrequencyMarkers: React.FC<FrequencyMarkersProps> = ({ 
  map,
  frequencies,
  mapLoaded,
  onSelectFrequency
}) => {
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!map || !mapLoaded) return;
    
    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    frequencies.forEach(freq => {
      const { latitude, longitude } = freq.location.coordinates;
      
      // Create a custom element for the marker
      const el = document.createElement('div');
      
      // Special styling for APRS markers
      if (freq.category === 'APRS') {
        el.className = 'flex items-center justify-center w-6 h-6 rounded-full border-2 border-lime-300 shadow-md cursor-pointer';
        el.style.backgroundColor = getCategoryColor(freq.category);
        
        // Add directional indicator for moving APRS stations
        if (freq.course !== undefined) {
          const innerEl = document.createElement('div');
          innerEl.className = 'w-2 h-2 bg-white rounded-full';
          
          // Create a small arrow in the direction of travel
          const arrowEl = document.createElement('div');
          arrowEl.className = 'absolute w-0.5 h-3 bg-white';
          arrowEl.style.transformOrigin = 'bottom center';
          arrowEl.style.transform = `rotate(${freq.course - 90}deg) translateY(-1px)`;
          
          el.appendChild(innerEl);
          el.appendChild(arrowEl);
        }
      } else {
        el.className = 'flex items-center justify-center w-6 h-6 rounded-full border-2 border-white shadow-md cursor-pointer';
        el.style.backgroundColor = getCategoryColor(freq.category);
      }
      
      const popupContent = createPopupContent(freq);
      
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(popupContent))
        .addTo(map);
      
      if (onSelectFrequency) {
        el.addEventListener('click', () => {
          onSelectFrequency(freq.id);
        });
      }
      
      markers.current.push(marker);
    });

    return () => {
      markers.current.forEach(marker => marker.remove());
    };
  }, [frequencies, mapLoaded, onSelectFrequency, map]);

  return null;
};
