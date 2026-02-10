import { LightSource, LightingStyle } from './types';

export const lightSources: LightSource[] = [
  // Natural
  { id: 'sun', name: 'Sunlight', category: 'natural' },
  { id: 'moon', name: 'Moonlight', category: 'natural' },
  { id: 'overcast', name: 'Overcast Sky', category: 'natural' },
  { id: 'window', name: 'Window Light', category: 'natural' },
  { id: 'skylight', name: 'Skylight', category: 'natural' },
  
  // Classic
  { id: 'tungsten', name: 'Tungsten', category: 'classic' },
  { id: 'carbon_arc', name: 'Carbon Arc', category: 'classic', availableUntil: 1970 },
  { id: 'mercury_vapor', name: 'Mercury Vapor', category: 'classic' },
  
  // Modern
  { id: 'hmi', name: 'HMI', category: 'modern', availableFrom: 1972 },
  { id: 'kino_flo', name: 'Kino Flo', category: 'modern', availableFrom: 1987 },
  { id: 'led', name: 'LED Panel', category: 'modern', availableFrom: 2002 },
  { id: 'fluorescent', name: 'Fluorescent', category: 'modern' },
  
  // Practical
  { id: 'practical', name: 'Practical Lights', category: 'practical' },
  { id: 'candle', name: 'Candlelight', category: 'practical' },
  { id: 'firelight', name: 'Firelight', category: 'practical' },
  { id: 'neon', name: 'Neon', category: 'practical', availableFrom: 1927 },
  
  // Mixed
  { id: 'mixed', name: 'Mixed Sources', category: 'mixed' },
  { id: 'available', name: 'Available Light', category: 'mixed' },
];

export const lightingStyles: { id: LightingStyle; name: string }[] = [
  { id: 'high_key', name: 'High Key' },
  { id: 'low_key', name: 'Low Key' },
  { id: 'soft', name: 'Soft' },
  { id: 'hard', name: 'Hard' },
  { id: 'naturalistic', name: 'Naturalistic' },
  { id: 'chiaroscuro', name: 'Chiaroscuro' },
  { id: 'rembrandt', name: 'Rembrandt' },
  { id: 'split', name: 'Split' },
  { id: 'rim', name: 'Rim/Backlight' },
  { id: 'silhouette', name: 'Silhouette' },
  { id: 'dramatic', name: 'Dramatic' },
  { id: 'flat', name: 'Flat' },
];
