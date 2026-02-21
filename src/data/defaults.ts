import { CPEConfiguration } from '@/data/types';

export function getDefaultConfig(): CPEConfiguration {
  return {
    camera: null,
    lens: null,
    filmStock: null,
    lightSource: null,
    lightingStyle: null,
    shotSize: null,
    composition: null,
    movementEquipment: null,
    movementType: null,
    movementTiming: null,
    mood: null,
    colorTone: null,
    aspectRatio: null,
    timeOfDay: null,
    artStyle: null,
    movieLook: null,
    targetModel: 'midjourney',
    subjectDescription: '',
    sceneDescription: '',
  };
}
