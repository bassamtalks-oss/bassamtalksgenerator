import { ShotSize, CompositionStyle, MovementEquipment, MovementType, MovementTiming, Mood, ColorTone, AspectRatio, TimeOfDay, TargetModel, ArtStyle } from './types';

export const shotSizes: { id: ShotSize; name: string; abbr: string }[] = [
  { id: 'MS', name: 'Medium Shot', abbr: 'MS' },
  { id: 'CU', name: 'Close-Up', abbr: 'CU' },
  { id: 'ECU', name: 'Extreme Close-Up', abbr: 'ECU' },
];

export const compositionStyles: { id: CompositionStyle; name: string }[] = [
  { id: 'front', name: 'Front' },
  { id: 'angle_45', name: '45°' },
  { id: 'profile', name: 'Profile' },
];

export const movementEquipments: { id: MovementEquipment; name: string }[] = [
  { id: 'static', name: 'Static (Tripod)' },
  { id: 'handheld', name: 'Handheld' },
  { id: 'shoulder_rig', name: 'Shoulder Rig' },
  { id: 'steadicam', name: 'Steadicam' },
  { id: 'gimbal', name: 'Gimbal' },
  { id: 'dolly', name: 'Dolly' },
  { id: 'slider', name: 'Slider' },
  { id: 'crane', name: 'Crane' },
  { id: 'jib', name: 'Jib' },
  { id: 'technocrane', name: 'Technocrane' },
  { id: 'drone', name: 'Drone' },
  { id: 'cable_cam', name: 'Cable Cam' },
  { id: 'car_mount', name: 'Car Mount' },
  { id: 'snorricam', name: 'SnorriCam' },
];

export const movementTypes: { id: MovementType; name: string }[] = [
  { id: 'static', name: 'Static' },
  { id: 'pan', name: 'Pan' },
  { id: 'tilt', name: 'Tilt' },
  { id: 'track_in', name: 'Track In' },
  { id: 'track_out', name: 'Track Out' },
  { id: 'push_in', name: 'Push In' },
  { id: 'pull_back', name: 'Pull Back' },
  { id: 'crane_up', name: 'Crane Up' },
  { id: 'crane_down', name: 'Crane Down' },
  { id: 'arc', name: 'Arc' },
  { id: 'dolly_zoom', name: 'Dolly Zoom' },
  { id: 'whip_pan', name: 'Whip Pan' },
  { id: 'follow', name: 'Follow' },
  { id: 'orbit', name: 'Orbit' },
  { id: 'reveal', name: 'Reveal' },
  { id: 'fly_through', name: 'Fly Through' },
];

export const movementTimings: { id: MovementTiming; name: string }[] = [
  { id: 'static', name: 'Static' },
  { id: 'very_slow', name: 'Very Slow' },
  { id: 'slow', name: 'Slow' },
  { id: 'moderate', name: 'Moderate' },
  { id: 'fast', name: 'Fast' },
  { id: 'whip_fast', name: 'Whip Fast' },
];

export const moods: { id: Mood; name: string }[] = [
  { id: 'serene', name: 'Serene' },
  { id: 'melancholic', name: 'Melancholic' },
  { id: 'tense', name: 'Tense' },
  { id: 'mysterious', name: 'Mysterious' },
  { id: 'romantic', name: 'Romantic' },
  { id: 'gritty', name: 'Gritty' },
  { id: 'ethereal', name: 'Ethereal' },
  { id: 'ominous', name: 'Ominous' },
  { id: 'hopeful', name: 'Hopeful' },
  { id: 'nostalgic', name: 'Nostalgic' },
  { id: 'chaotic', name: 'Chaotic' },
  { id: 'contemplative', name: 'Contemplative' },
  { id: 'triumphant', name: 'Triumphant' },
  { id: 'desolate', name: 'Desolate' },
  { id: 'whimsical', name: 'Whimsical' },
];

export const colorTones: { id: ColorTone; name: string }[] = [
  { id: 'warm_saturated', name: 'Warm Saturated' },
  { id: 'warm_desaturated', name: 'Warm Desaturated' },
  { id: 'cool_saturated', name: 'Cool Saturated' },
  { id: 'cool_desaturated', name: 'Cool Desaturated' },
  { id: 'neutral', name: 'Neutral' },
  { id: 'monochrome', name: 'Monochrome' },
  { id: 'sepia', name: 'Sepia' },
  { id: 'teal_orange', name: 'Teal & Orange' },
  { id: 'cross_processed', name: 'Cross Processed' },
  { id: 'bleach_bypass', name: 'Bleach Bypass' },
];

export const aspectRatios: { id: AspectRatio; name: string; description: string }[] = [
  { id: '1.33:1', name: '1.33:1 (4:3)', description: 'Academy Standard' },
  { id: '1.37:1', name: '1.37:1', description: 'Academy Ratio' },
  { id: '1.43:1', name: '1.43:1', description: 'IMAX' },
  { id: '1.66:1', name: '1.66:1', description: 'European Widescreen' },
  { id: '1.78:1', name: '1.78:1 (16:9)', description: 'HDTV Standard' },
  { id: '1.85:1', name: '1.85:1', description: 'American Widescreen' },
  { id: '2.35:1', name: '2.35:1', description: 'Anamorphic Scope' },
  { id: '2.39:1', name: '2.39:1', description: 'Modern Anamorphic' },
  { id: '2.76:1', name: '2.76:1', description: 'Ultra Panavision 70' },
];

export const timesOfDay: { id: TimeOfDay; name: string }[] = [
  { id: 'dawn', name: 'Dawn' },
  { id: 'morning', name: 'Morning' },
  { id: 'midday', name: 'Midday' },
  { id: 'afternoon', name: 'Afternoon' },
  { id: 'golden_hour', name: 'Golden Hour' },
  { id: 'blue_hour', name: 'Blue Hour' },
  { id: 'dusk', name: 'Dusk' },
  { id: 'night', name: 'Night' },
];

export const targetModels: { id: TargetModel; name: string; type: 'image' | 'video' }[] = [
  { id: 'midjourney', name: 'Midjourney', type: 'image' },
  { id: 'flux', name: 'FLUX', type: 'image' },
  { id: 'wan22', name: 'Wan 2.2', type: 'video' },
  { id: 'nano_banana_pro', name: 'Nano Banana Pro', type: 'image' },
  { id: 'seedance', name: 'Seedance', type: 'video' },
];

export const artStyles: { id: ArtStyle; name: string }[] = [
  { id: 'photorealistic', name: 'Photorealistic' },
  { id: 'cinematic', name: 'Cinematic' },
  { id: 'anime', name: 'Anime' },
  { id: 'cartoon_comic', name: 'Cartoon & Comic' },
  { id: 'cgi_3d', name: 'CGI & 3D Rendered' },
  { id: 'digital_painting', name: 'Digital Painting' },
  { id: 'fantasy', name: 'Fantasy' },
  { id: 'pixel_art', name: 'Pixel Art' },
  { id: 'scifi_cyberpunk', name: 'Sci-Fi & Cyberpunk' },
  { id: 'surreal', name: 'Surreal & Abstract' },
  { id: 'black_white', name: 'Black & White' },
  { id: 'watercolor', name: 'Watercolor' },
  { id: 'oil_painting', name: 'Oil Painting' },
  { id: 'pop_art', name: 'Pop Art' },
  { id: 'steampunk', name: 'Steampunk' },
  { id: 'impressionist', name: 'Impressionist' },
  { id: 'vaporwave', name: 'Vaporwave' },
  { id: 'minimalist', name: 'Minimalist' },
  { id: 'art_nouveau', name: 'Art Nouveau' },
  { id: 'gothic', name: 'Gothic' },
];
