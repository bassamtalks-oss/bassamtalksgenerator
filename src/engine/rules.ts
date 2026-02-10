import { CPEConfiguration, RuleViolation, Camera, Lens } from '@/data/types';
import { cameras } from '@/data/cameras';
import { lenses } from '@/data/lenses';
import { lightSources } from '@/data/lighting';
import { filmStocks } from '@/data/filmStocks';

type RuleChecker = (config: CPEConfiguration) => RuleViolation | null;

const getCamera = (id: string | null): Camera | undefined => id ? cameras.find(c => c.id === id) : undefined;
const getLens = (id: string | null): Lens | undefined => id ? lenses.find(l => l.id === id) : undefined;

const rules: RuleChecker[] = [
  // === Camera ↔ Film Stock ===
  (config) => {
    const cam = getCamera(config.camera);
    if (cam?.type === 'digital' && config.filmStock) {
      return { id: 'no_stock_digital', severity: 'HARD', message: 'Film stock cannot be selected with digital cameras.', fields: ['filmStock', 'camera'] };
    }
    return null;
  },
  (config) => {
    const cam = getCamera(config.camera);
    if (cam?.type === 'film' && !config.filmStock) {
      return { id: 'stock_required_film', severity: 'WARNING', message: 'Film cameras typically require a film stock selection.', fields: ['filmStock'] };
    }
    return null;
  },
  (config) => {
    const cam = getCamera(config.camera);
    const stock = config.filmStock ? filmStocks.find(f => f.id === config.filmStock) : undefined;
    if (cam && stock) {
      if (stock.format === 'IMAX' && cam.type !== 'imax') return { id: 'imax_stock_camera', severity: 'HARD', message: 'IMAX film stock requires an IMAX camera.', fields: ['filmStock', 'camera'] };
      if (stock.format === '65mm' && !['Film 65mm', '65mm'].includes(cam.sensorSize)) return { id: '65mm_stock_camera', severity: 'HARD', message: '65mm film stock requires a 65mm/large format camera.', fields: ['filmStock', 'camera'] };
    }
    return null;
  },

  // === Camera ↔ Lens Ecosystem ===
  (config) => {
    const cam = getCamera(config.camera);
    const lens = getLens(config.lens);
    if (cam && lens) {
      const isPanavisionCamera = cam.manufacturer === 'Panavision';
      const isPanavisionLens = lens.manufacturer === 'Panavision';
      if (isPanavisionCamera && !isPanavisionLens) {
        return { id: 'pv_camera_lens', severity: 'HARD', message: 'Panavision cameras only accept Panavision lenses (closed ecosystem).', fields: ['lens', 'camera'] };
      }
      if (isPanavisionLens && !isPanavisionCamera && cam.id !== 'alexa_65') {
        return { id: 'pv_lens_camera', severity: 'HARD', message: 'Panavision lenses require Panavision cameras.', fields: ['lens', 'camera'] };
      }
    }
    return null;
  },
  (config) => {
    const cam = getCamera(config.camera);
    const lens = getLens(config.lens);
    if (cam?.id === 'alexa_65' && lens) {
      const allowed65 = ['arri_prime_65', 'panavision_primo_70', 'hasselblad_v'];
      if (!allowed65.includes(lens.id)) {
        return { id: 'alexa65_lens', severity: 'HARD', message: 'Alexa 65 only accepts 65mm-format lenses (ARRI Prime 65, Primo 70, Hasselblad V).', fields: ['lens'] };
      }
    }
    return null;
  },
  (config) => {
    const cam = getCamera(config.camera);
    const lens = getLens(config.lens);
    if (cam && lens && ['Large Format'].includes(cam.sensorSize)) {
      if (!lens.compatibleSensors.some(s => ['Large Format', 'Full Frame', '65mm'].includes(s))) {
        return { id: 'lf_lens_vignette', severity: 'WARNING', message: 'This lens may not fully cover the large format sensor — expect vignetting.', fields: ['lens'] };
      }
    }
    return null;
  },

  // === Weight-Based Movement ===
  (config) => {
    const cam = getCamera(config.camera);
    if (cam && ['heavy', 'medium'].includes(cam.weightClass)) {
      if (['handheld', 'gimbal', 'drone'].includes(config.movementEquipment || '')) {
        if (cam.weightClass === 'heavy') {
          return { id: 'heavy_handheld', severity: 'HARD', message: `${cam.name} is too heavy for ${config.movementEquipment}. Use dolly, crane, or tripod.`, fields: ['movementEquipment', 'camera'] };
        }
        if (cam.weightClass === 'medium' && config.movementEquipment === 'handheld') {
          return { id: 'medium_handheld', severity: 'WARNING', message: `${cam.name} is medium-weight — expect operator fatigue for handheld shooting.`, fields: ['movementEquipment'] };
        }
      }
    }
    return null;
  },
  (config) => {
    if (config.movementEquipment === 'jib') {
      const allowed = ['crane_up', 'crane_down', 'arc', 'static'];
      if (config.movementType && !allowed.includes(config.movementType)) {
        return { id: 'jib_movement', severity: 'HARD', message: 'Jib cranes only allow Crane Up/Down, Arc, and Static movements.', fields: ['movementType'] };
      }
    }
    return null;
  },
  (config) => {
    if (config.movementEquipment === 'drone') {
      const allowed = ['track_in', 'track_out', 'crane_up', 'crane_down', 'arc', 'static', 'orbit', 'fly_through', 'reveal'];
      if (config.movementType && !allowed.includes(config.movementType)) {
        return { id: 'drone_movement', severity: 'HARD', message: 'Drones are limited to aerial movement types (Track, Crane, Arc, Orbit, Fly Through).', fields: ['movementType'] };
      }
    }
    return null;
  },
  (config) => {
    if (config.movementType === 'dolly_zoom' && !['dolly', 'slider'].includes(config.movementEquipment || '')) {
      return { id: 'dolly_zoom_equip', severity: 'HARD', message: 'Dolly zoom requires dolly or slider equipment.', fields: ['movementEquipment', 'movementType'] };
    }
    return null;
  },

  // === Era-Appropriate Technology ===
  (config) => {
    const source = config.lightSource ? lightSources.find(l => l.id === config.lightSource) : undefined;
    const cam = getCamera(config.camera);
    if (source && cam && source.availableFrom && cam.year < source.availableFrom) {
      return { id: 'era_light', severity: 'HARD', message: `${source.name} was not available until ${source.availableFrom}. This camera is from ${cam.year}.`, fields: ['lightSource'] };
    }
    return null;
  },

  // === Natural Light Physics ===
  (config) => {
    if (config.lightSource === 'sun' && config.timeOfDay === 'night') {
      return { id: 'sun_night', severity: 'HARD', message: 'Sunlight is not available at night.', fields: ['lightSource', 'timeOfDay'] };
    }
    return null;
  },
  (config) => {
    if (config.lightSource === 'moon' && config.timeOfDay === 'midday') {
      return { id: 'moon_midday', severity: 'HARD', message: 'Moonlight is not possible at midday.', fields: ['lightSource', 'timeOfDay'] };
    }
    return null;
  },
  (config) => {
    if (config.lightSource === 'sun' && config.timeOfDay === 'blue_hour') {
      return { id: 'sun_blue_hour', severity: 'WARNING', message: 'Direct sunlight is not available during blue hour — use ambient sky.', fields: ['lightSource', 'timeOfDay'] };
    }
    return null;
  },
  (config) => {
    if (config.lightingStyle === 'low_key' && config.timeOfDay === 'midday' && ['sun', 'overcast'].includes(config.lightSource || '')) {
      return { id: 'lowkey_midday', severity: 'WARNING', message: 'Low-key lighting is extremely difficult to achieve at midday outdoors.', fields: ['lightingStyle', 'timeOfDay'] };
    }
    return null;
  },

  // === Optical Warnings ===
  (config) => {
    if (config.shotSize && ['CU', 'BCU', 'ECU'].includes(config.shotSize)) {
      const lens = getLens(config.lens);
      if (lens?.focalRange) {
        const minFocal = parseInt(lens.focalRange);
        if (!isNaN(minFocal) && minFocal < 35) {
          return { id: 'wide_closeup', severity: 'WARNING', message: 'Wide lenses (<35mm) on close-ups cause facial distortion. Consider a longer focal length.', fields: ['lens', 'shotSize'] };
        }
      }
    }
    return null;
  },
  (config) => {
    if (config.shotSize && ['EWS', 'WS'].includes(config.shotSize)) {
      const lens = getLens(config.lens);
      if (lens?.focalRange) {
        const parts = lens.focalRange.split('-');
        const maxFocal = parseInt(parts[parts.length - 1]);
        if (!isNaN(maxFocal) && maxFocal < 50) {
          // This is actually fine — wide lens for wide shot
        }
      }
    }
    return null;
  },

  // === Anamorphic Info ===
  (config) => {
    const lens = getLens(config.lens);
    if (lens?.lensType === 'anamorphic') {
      return { id: 'anamorphic_info', severity: 'INFO', message: 'Remember to set 2x de-squeeze in post for anamorphic lens. Expect oval bokeh and horizontal flares.', fields: ['lens'] };
    }
    return null;
  },

  // === Mood + Lighting Mismatch ===
  (config) => {
    const cheerful: string[] = ['hopeful', 'whimsical', 'triumphant', 'romantic', 'serene'];
    if (config.mood && cheerful.includes(config.mood) && config.lightingStyle === 'low_key') {
      return { id: 'mood_light_mismatch', severity: 'WARNING', message: `${config.mood} mood with low-key lighting is unusual — this creates tension between tone and visuals.`, fields: ['mood', 'lightingStyle'] };
    }
    return null;
  },

  // === Aspect Ratio ===
  (config) => {
    const cam = getCamera(config.camera);
    if (cam?.id === 'imax_msm' && config.aspectRatio && config.aspectRatio !== '1.43:1') {
      return { id: 'imax_aspect', severity: 'WARNING', message: 'IMAX cameras are natively 1.43:1 — other ratios require cropping.', fields: ['aspectRatio'] };
    }
    return null;
  },
  (config) => {
    if (config.aspectRatio === '2.76:1') {
      const cam = getCamera(config.camera);
      if (cam && cam.id !== 'super_panavision_70') {
        return { id: 'ultra_pv_aspect', severity: 'WARNING', message: '2.76:1 is the Ultra Panavision 70 format — typically requires Super Panavision 70 camera.', fields: ['aspectRatio', 'camera'] };
      }
    }
    return null;
  },
];

export function validateConfiguration(config: CPEConfiguration): RuleViolation[] {
  const violations: RuleViolation[] = [];
  for (const rule of rules) {
    const result = rule(config);
    if (result) violations.push(result);
  }
  return violations;
}

export function hasHardViolations(violations: RuleViolation[]): boolean {
  return violations.some(v => v.severity === 'HARD');
}
