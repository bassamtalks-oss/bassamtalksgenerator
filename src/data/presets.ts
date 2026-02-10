import { FilmPreset } from './types';

export const filmPresets: FilmPreset[] = [
  {
    id: 'blade_runner', name: 'Blade Runner', year: 1982, director: 'Ridley Scott', cinematographer: 'Jordan Cronenweth',
    category: 'modern_film',
    config: { camera: 'panavision_panaflex', lens: 'panavision_c_series', filmStock: 'eastman_5247', lightSource: 'neon', lightingStyle: 'low_key', mood: 'mysterious', colorTone: 'cool_desaturated', aspectRatio: '2.39:1', shotSize: 'WS', composition: 'depth_layering' }
  },
  {
    id: 'godfather', name: 'The Godfather', year: 1972, director: 'Francis Ford Coppola', cinematographer: 'Gordon Willis',
    category: 'new_hollywood',
    config: { camera: 'arriflex_35bl', lens: 'arri_ultra_prime', filmStock: 'eastman_5247', lightSource: 'tungsten', lightingStyle: 'low_key', mood: 'ominous', colorTone: 'warm_desaturated', aspectRatio: '1.85:1', shotSize: 'MCU', composition: 'rule_of_thirds' }
  },
  {
    id: 'mad_max', name: 'Mad Max: Fury Road', year: 2015, director: 'George Miller', cinematographer: 'John Seale',
    category: 'modern_digital',
    config: { camera: 'alexa_xt', lens: 'arri_master_prime', lightSource: 'sun', lightingStyle: 'hard', mood: 'chaotic', colorTone: 'teal_orange', aspectRatio: '2.39:1', shotSize: 'WS', composition: 'leading_lines', movementEquipment: 'car_mount', movementType: 'follow', movementTiming: 'fast' }
  },
  {
    id: 'parasite', name: 'Parasite', year: 2019, director: 'Bong Joon-ho', cinematographer: 'Hong Kyung-pyo',
    category: 'modern_digital',
    config: { camera: 'alexa_65', lens: 'arri_prime_65', lightSource: 'window', lightingStyle: 'naturalistic', mood: 'tense', colorTone: 'neutral', aspectRatio: '2.39:1', shotSize: 'MS', composition: 'symmetrical' }
  },
  {
    id: 'moonlight', name: 'Moonlight', year: 2016, director: 'Barry Jenkins', cinematographer: 'James Laxton',
    category: 'modern_digital',
    config: { camera: 'alexa_mini', lens: 'arri_master_prime', lightSource: 'available', lightingStyle: 'naturalistic', mood: 'contemplative', colorTone: 'cool_saturated', aspectRatio: '2.39:1', shotSize: 'CU', composition: 'centered' }
  },
  {
    id: 'lawrence_arabia', name: 'Lawrence of Arabia', year: 1962, director: 'David Lean', cinematographer: 'Freddie Young',
    category: 'new_wave',
    config: { camera: 'super_panavision_70', lens: 'panavision_primo_70', filmStock: 'kodak_65mm_250d', lightSource: 'sun', lightingStyle: 'hard', mood: 'triumphant', colorTone: 'warm_saturated', aspectRatio: '2.76:1', shotSize: 'EWS', composition: 'leading_lines' }
  },
  {
    id: '2001_space', name: '2001: A Space Odyssey', year: 1968, director: 'Stanley Kubrick', cinematographer: 'Geoffrey Unsworth',
    category: 'new_wave',
    config: { camera: 'super_panavision_70', lens: 'panavision_primo_70', filmStock: 'kodak_65mm_200t', lightSource: 'practical', lightingStyle: 'hard', mood: 'mysterious', colorTone: 'neutral', aspectRatio: '2.35:1', shotSize: 'WS', composition: 'symmetrical' }
  },
  {
    id: 'schindlers_list', name: "Schindler's List", year: 1993, director: 'Steven Spielberg', cinematographer: 'Janusz Kamiński',
    category: 'modern_film',
    config: { camera: 'arricam_st', lens: 'arri_ultra_prime', filmStock: 'kodak_double_x', lightSource: 'available', lightingStyle: 'naturalistic', mood: 'melancholic', colorTone: 'monochrome', aspectRatio: '1.85:1', shotSize: 'MS', composition: 'rule_of_thirds', movementEquipment: 'handheld' }
  },
  {
    id: 'her', name: 'Her', year: 2013, director: 'Spike Jonze', cinematographer: 'Hoyte van Hoytema',
    category: 'modern_digital',
    config: { camera: 'alexa_xt', lens: 'arri_master_prime', lightSource: 'window', lightingStyle: 'soft', mood: 'romantic', colorTone: 'warm_saturated', aspectRatio: '1.85:1', shotSize: 'CU', composition: 'centered' }
  },
  {
    id: 'dark_knight', name: 'The Dark Knight', year: 2008, director: 'Christopher Nolan', cinematographer: 'Wally Pfister',
    category: 'modern_film',
    config: { camera: 'imax_msm', lens: 'hasselblad_v', filmStock: 'imax_500t', lightSource: 'hmi', lightingStyle: 'dramatic', mood: 'tense', colorTone: 'cool_desaturated', aspectRatio: '1.43:1', shotSize: 'WS', composition: 'leading_lines' }
  },
  {
    id: 'drive', name: 'Drive', year: 2011, director: 'Nicolas Winding Refn', cinematographer: 'Newton Thomas Sigel',
    category: 'modern_digital',
    config: { camera: 'alexa_xt', lens: 'arri_master_prime', lightSource: 'neon', lightingStyle: 'chiaroscuro', mood: 'tense', colorTone: 'warm_saturated', aspectRatio: '2.39:1', shotSize: 'CU', composition: 'centered' }
  },
  {
    id: 'roma', name: 'Roma', year: 2018, director: 'Alfonso Cuarón', cinematographer: 'Alfonso Cuarón',
    category: 'modern_digital',
    config: { camera: 'alexa_65', lens: 'arri_prime_65', lightSource: 'available', lightingStyle: 'naturalistic', mood: 'nostalgic', colorTone: 'monochrome', aspectRatio: '2.39:1', shotSize: 'WS', composition: 'depth_layering' }
  },
];
