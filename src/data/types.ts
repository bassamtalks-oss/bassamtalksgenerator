// ===== Core Cinema Types =====

export type CameraType = 'digital' | 'film' | 'imax';
export type SensorSize = 'Super 35' | 'Full Frame' | 'Large Format' | '65mm' | 'Micro Four Thirds' | 'Film 35mm' | 'Film 65mm' | 'Film 70mm' | 'IMAX 15/70' | 'IMAX GT';
export type WeightClass = 'ultra_light' | 'light' | 'medium' | 'heavy';
export type MountType = 'PL' | 'LPL' | 'XPL' | 'Panavision' | 'Mitchell BNC' | 'IMAX' | 'EF' | 'RF';
export type LensType = 'spherical' | 'anamorphic';
export type RuleSeverity = 'HARD' | 'WARNING' | 'INFO';

export interface Camera {
  id: string;
  name: string;
  manufacturer: string;
  type: CameraType;
  sensorSize: SensorSize;
  weightClass: WeightClass;
  year: number;
  mountType: MountType;
}

export interface Lens {
  id: string;
  name: string;
  manufacturer: string;
  mountType: MountType;
  focalRange: string;
  lensType: LensType;
  compatibleSensors: SensorSize[];
}

export interface FilmStock {
  id: string;
  name: string;
}

export interface LightSource {
  id: string;
  name: string;
  category: 'natural' | 'classic' | 'modern' | 'practical' | 'mixed';
  availableFrom?: number; // year
  availableUntil?: number;
}

export type LightingStyle = 'high_key' | 'low_key' | 'soft' | 'hard' | 'naturalistic' | 'chiaroscuro' | 'rembrandt' | 'split' | 'rim' | 'silhouette' | 'dramatic' | 'flat';

export type ShotSize = 'EWS' | 'WS' | 'MWS' | 'MS' | 'MCU' | 'CU' | 'BCU' | 'ECU' | 'OTS' | 'POV';

export type CompositionStyle = 'rule_of_thirds' | 'centered' | 'symmetrical' | 'golden_ratio' | 'leading_lines' | 'frame_within_frame' | 'negative_space' | 'depth_layering' | 'dutch_angle' | 'worms_eye' | 'birds_eye';

export type MovementEquipment = 'static' | 'handheld' | 'shoulder_rig' | 'steadicam' | 'gimbal' | 'dolly' | 'slider' | 'crane' | 'jib' | 'technocrane' | 'drone' | 'cable_cam' | 'car_mount' | 'snorricam';

export type MovementType = 'static' | 'pan' | 'tilt' | 'track_in' | 'track_out' | 'push_in' | 'pull_back' | 'crane_up' | 'crane_down' | 'arc' | 'dolly_zoom' | 'whip_pan' | 'follow' | 'orbit' | 'reveal' | 'fly_through';

export type MovementTiming = 'static' | 'very_slow' | 'slow' | 'moderate' | 'fast' | 'whip_fast';

export type Mood = 'serene' | 'melancholic' | 'tense' | 'mysterious' | 'romantic' | 'gritty' | 'ethereal' | 'ominous' | 'hopeful' | 'nostalgic' | 'chaotic' | 'contemplative' | 'triumphant' | 'desolate' | 'whimsical';

export type ColorTone = 'warm_saturated' | 'warm_desaturated' | 'cool_saturated' | 'cool_desaturated' | 'neutral' | 'monochrome' | 'sepia' | 'teal_orange' | 'cross_processed' | 'bleach_bypass';

export type AspectRatio = '1.33:1' | '1.37:1' | '1.43:1' | '1.66:1' | '1.78:1' | '1.85:1' | '2.35:1' | '2.39:1' | '2.76:1';

export type TimeOfDay = 'dawn' | 'morning' | 'midday' | 'afternoon' | 'golden_hour' | 'blue_hour' | 'dusk' | 'night';

export type TargetModel = 'midjourney' | 'flux' | 'wan22' | 'nano_banana_pro' | 'seedance';

export type ArtStyle = 'photorealistic' | 'cinematic' | 'anime' | 'cartoon_comic' | 'cgi_3d' | 'digital_painting' | 'fantasy' | 'pixel_art' | 'scifi_cyberpunk' | 'surreal' | 'black_white' | 'watercolor' | 'oil_painting' | 'pop_art' | 'steampunk' | 'impressionist' | 'vaporwave' | 'minimalist' | 'art_nouveau' | 'gothic';

// ===== Configuration State =====

export interface CPEConfiguration {
  camera: string | null;
  lens: string | null;
  filmStock: string | null;
  lightSource: string | null;
  lightingStyle: LightingStyle | null;
  shotSize: ShotSize | null;
  composition: CompositionStyle | null;
  movementEquipment: MovementEquipment | null;
  movementType: MovementType | null;
  movementTiming: MovementTiming | null;
  mood: Mood | null;
  colorTone: ColorTone | null;
  aspectRatio: AspectRatio | null;
  timeOfDay: TimeOfDay | null;
  artStyle: ArtStyle | null;
  targetModel: TargetModel;
  subjectDescription: string;
  sceneDescription: string;
}

export interface RuleViolation {
  id: string;
  severity: RuleSeverity;
  message: string;
  fields: string[];
}

// ===== Presets =====

export interface FilmPreset {
  id: string;
  name: string;
  year: number;
  director: string;
  cinematographer: string;
  category: 'silent_era' | 'noir' | 'new_wave' | 'new_hollywood' | 'modern_film' | 'modern_digital';
  config: Partial<CPEConfiguration>;
}

export interface AnimationPreset {
  id: string;
  name: string;
  studio: string;
  category: 'anime' | 'manga' | '3d_animation' | 'illustration';
  style: string;
}

// ===== Storyboard =====

export interface StoryboardPanel {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  config: CPEConfiguration;
  images: string[];
  currentImageIndex: number;
  rating: number;
  notes: string;
  prompt: string;
}

export interface StoryboardProject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  panels: StoryboardPanel[];
  canvasZoom: number;
  canvasX: number;
  canvasY: number;
}
