import { Camera } from './types';

export const cameras: Camera[] = [
  // Digital
  { id: 'alexa_mini', name: 'ARRI Alexa Mini', manufacturer: 'ARRI', type: 'digital', sensorSize: 'Super 35', weightClass: 'light', year: 2015, mountType: 'PL' },
  { id: 'alexa_xt', name: 'ARRI Alexa XT', manufacturer: 'ARRI', type: 'digital', sensorSize: 'Super 35', weightClass: 'medium', year: 2013, mountType: 'PL' },
  { id: 'alexa_lf', name: 'ARRI Alexa LF', manufacturer: 'ARRI', type: 'digital', sensorSize: 'Large Format', weightClass: 'medium', year: 2018, mountType: 'LPL' },
  { id: 'alexa_mini_lf', name: 'ARRI Alexa Mini LF', manufacturer: 'ARRI', type: 'digital', sensorSize: 'Large Format', weightClass: 'light', year: 2019, mountType: 'LPL' },
  { id: 'alexa_65', name: 'ARRI Alexa 65', manufacturer: 'ARRI', type: 'digital', sensorSize: '65mm', weightClass: 'heavy', year: 2014, mountType: 'XPL' },
  { id: 'alexa_35', name: 'ARRI Alexa 35', manufacturer: 'ARRI', type: 'digital', sensorSize: 'Super 35', weightClass: 'light', year: 2022, mountType: 'PL' },
  { id: 'red_v_raptor', name: 'RED V-Raptor', manufacturer: 'RED', type: 'digital', sensorSize: 'Full Frame', weightClass: 'light', year: 2021, mountType: 'PL' },
  { id: 'red_monstro', name: 'RED Monstro 8K', manufacturer: 'RED', type: 'digital', sensorSize: 'Full Frame', weightClass: 'medium', year: 2018, mountType: 'PL' },
  { id: 'sony_venice', name: 'Sony Venice 2', manufacturer: 'Sony', type: 'digital', sensorSize: 'Full Frame', weightClass: 'medium', year: 2022, mountType: 'PL' },
  { id: 'blackmagic_ursa', name: 'Blackmagic URSA Mini Pro 12K', manufacturer: 'Blackmagic', type: 'digital', sensorSize: 'Super 35', weightClass: 'medium', year: 2020, mountType: 'PL' },
  
  // Film
  { id: 'arricam_st', name: 'Arricam ST', manufacturer: 'ARRI', type: 'film', sensorSize: 'Film 35mm', weightClass: 'heavy', year: 2000, mountType: 'PL' },
  { id: 'arriflex_35bl', name: 'Arriflex 35BL', manufacturer: 'ARRI', type: 'film', sensorSize: 'Film 35mm', weightClass: 'heavy', year: 1972, mountType: 'PL' },
  { id: 'panavision_panaflex', name: 'Panavision Panaflex', manufacturer: 'Panavision', type: 'film', sensorSize: 'Film 35mm', weightClass: 'heavy', year: 1972, mountType: 'Panavision' },
  { id: 'panavision_platinum', name: 'Panavision Platinum', manufacturer: 'Panavision', type: 'film', sensorSize: 'Film 35mm', weightClass: 'heavy', year: 1997, mountType: 'Panavision' },
  { id: 'super_panavision_70', name: 'Super Panavision 70', manufacturer: 'Panavision', type: 'film', sensorSize: 'Film 65mm', weightClass: 'heavy', year: 1962, mountType: 'Panavision' },
  
  // IMAX
  { id: 'imax_msm', name: 'IMAX MSM 9802', manufacturer: 'IMAX', type: 'imax', sensorSize: 'IMAX 15/70', weightClass: 'heavy', year: 1998, mountType: 'IMAX' },
];
