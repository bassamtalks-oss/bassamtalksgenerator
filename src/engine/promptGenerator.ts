import { CPEConfiguration, TargetModel } from '@/data/types';
import { cameras } from '@/data/cameras';
import { lenses } from '@/data/lenses';
import { filmStocks } from '@/data/filmStocks';
import { lightSources, lightingStyles } from '@/data/lighting';
import { shotSizes, compositionStyles, movementEquipments, movementTypes, movementTimings, moods, colorTones, timesOfDay, artStyles } from '@/data/options';

function lookup<T extends { id: string; name: string }>(list: T[], id: string | null): string | null {
  if (!id) return null;
  return list.find(i => i.id === id)?.name ?? null;
}

function buildSegments(config: CPEConfiguration): string[] {
  const parts: string[] = [];

  if (config.subjectDescription) parts.push(config.subjectDescription);
  if (config.sceneDescription) parts.push(config.sceneDescription);

  const artStyle = lookup(artStyles, config.artStyle);
  if (artStyle) parts.push(`${artStyle} style`);

  const cam = config.camera ? cameras.find(c => c.id === config.camera) : null;
  const lens = config.lens ? lenses.find(l => l.id === config.lens) : null;
  const stock = config.filmStock ? filmStocks.find(f => f.id === config.filmStock) : null;

  if (cam) parts.push(`shot on ${cam.name}`);
  if (lens) parts.push(`${lens.name} lens`);
  if (stock) parts.push(`${stock.name} film stock`);

  const shotSize = lookup(shotSizes, config.shotSize);
  if (shotSize) parts.push(shotSize);

  const comp = lookup(compositionStyles, config.composition);
  if (comp) parts.push(`${comp} composition`);

  const tod = lookup(timesOfDay, config.timeOfDay);
  if (tod) parts.push(tod);

  const ls = config.lightSource ? lightSources.find(l => l.id === config.lightSource)?.name : null;
  if (ls) parts.push(`${ls} lighting`);

  const style = lookup(lightingStyles, config.lightingStyle);
  if (style) parts.push(`${style} lighting style`);

  const moodName = lookup(moods, config.mood);
  if (moodName) parts.push(`${moodName} mood`);

  const ct = lookup(colorTones, config.colorTone);
  if (ct) parts.push(`${ct} color tone`);

  if (config.movementEquipment && config.movementEquipment !== 'static') {
    const eq = lookup(movementEquipments, config.movementEquipment);
    const mt = lookup(movementTypes, config.movementType);
    const timing = lookup(movementTimings, config.movementTiming);
    const moveParts = [eq, mt, timing].filter(Boolean).join(' ');
    if (moveParts) parts.push(`camera movement: ${moveParts}`);
  }

  const ar = config.aspectRatio;
  if (ar) parts.push(`${ar} aspect ratio`);

  return parts;
}

export function generatePrompt(config: CPEConfiguration): string {
  const segments = buildSegments(config);
  if (segments.length === 0) return '';

  switch (config.targetModel) {
    case 'midjourney':
      return segments.join(', ') + ' --v 6 --q 2';

    case 'flux':
      return segments.join('. ') + '.';

    case 'wan22':
      return segments.join('. ') + '. Cinematic quality, high production value, professional cinematography.';

    case 'nano_banana_pro':
      return segments.join(', ');

    case 'seedance':
      return segments.join('. ') + '. Smooth motion, cinematic quality.';

    default:
      return segments.join(', ');
  }
}
