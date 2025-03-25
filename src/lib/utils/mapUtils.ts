
import mapboxgl from 'mapbox-gl';
import { FrequencyCategory } from '../types';

// Mapbox token provided by user
export const MAPBOX_TOKEN = 'pk.eyJ1Ijoic3R5dG8iLCJhIjoiY204a2VtOXhkMHhqZTJrcXI5bjlyZjhsNSJ9.xeo91AG44Yz9q-zp7LEMrg';

// Get color for each category
export const getCategoryColor = (category: FrequencyCategory): string => {
  const colorMap: Record<string, string> = {
    'Airband': '#ef4444',    // red-500
    'VHF': '#3b82f6',        // blue-500
    'UHF': '#8b5cf6',        // violet-500
    'Repeaters': '#10b981',  // emerald-500
    'CW': '#f59e0b',         // amber-500
    'HF': '#6366f1',         // indigo-500
    'APRS': '#84cc16'        // lime-500
  };
  
  return colorMap[category] || '#6b7280'; // gray-500 as default
};

// Create a popup content based on frequency data
export const createPopupContent = (freq: {
  category: string;
  callsign?: string;
  name: string;
  frequency: string;
  speed?: string | number;
  course?: string | number;
  altitude?: string | number;
}) => {
  return freq.category === 'APRS' 
    ? `
      <div class="p-2 bg-black bg-opacity-80 text-cyan-400 border border-cyan-500 rounded">
        <h3 class="font-bold">${freq.callsign || freq.name}</h3>
        <p class="text-sm">${freq.frequency} MHz</p>
        ${freq.speed !== undefined ? `<p class="text-xs text-cyan-300">Speed: ${freq.speed} km/h</p>` : ''}
        ${freq.course !== undefined ? `<p class="text-xs text-cyan-300">Course: ${freq.course}°</p>` : ''}
        ${freq.altitude !== undefined ? `<p class="text-xs text-cyan-300">Alt: ${freq.altitude} m</p>` : ''}
        <p class="text-xs text-cyan-300">APRS</p>
      </div>
    `
    : `
      <div class="p-2 bg-black bg-opacity-80 text-cyan-400 border border-cyan-500 rounded">
        <h3 class="font-bold">${freq.name}</h3>
        <p class="text-sm">${freq.frequency} MHz</p>
        <p class="text-xs text-cyan-300">${freq.category}</p>
      </div>
    `;
};
