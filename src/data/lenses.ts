import { Lens } from './types';

export const lenses: Lens[] = [
  // ARRI / Zeiss
  { id: 'arri_signature_prime', name: 'ARRI Signature Prime', manufacturer: 'ARRI', mountType: 'LPL', focalRange: '12-280mm', lensType: 'spherical', compatibleSensors: ['Large Format', 'Full Frame', 'Super 35'] },
  { id: 'arri_master_prime', name: 'ARRI/Zeiss Master Prime', manufacturer: 'ARRI/Zeiss', mountType: 'PL', focalRange: '12-150mm', lensType: 'spherical', compatibleSensors: ['Super 35', 'Film 35mm'] },
  { id: 'arri_ultra_prime', name: 'ARRI/Zeiss Ultra Prime', manufacturer: 'ARRI/Zeiss', mountType: 'PL', focalRange: '8-180mm', lensType: 'spherical', compatibleSensors: ['Super 35', 'Film 35mm'] },
  { id: 'arri_prime_65', name: 'ARRI Prime 65 S', manufacturer: 'ARRI', mountType: 'XPL', focalRange: '25-300mm', lensType: 'spherical', compatibleSensors: ['65mm'] },
  
  // Panavision
  { id: 'panavision_primo', name: 'Panavision Primo', manufacturer: 'Panavision', mountType: 'Panavision', focalRange: '10-150mm', lensType: 'spherical', compatibleSensors: ['Film 35mm', 'Super 35'] },
  { id: 'panavision_primo_70', name: 'Panavision Primo 70', manufacturer: 'Panavision', mountType: 'Panavision', focalRange: '27-250mm', lensType: 'spherical', compatibleSensors: ['Film 65mm', '65mm', 'Large Format'] },
  { id: 'panavision_c_series', name: 'Panavision C Series Anamorphic', manufacturer: 'Panavision', mountType: 'Panavision', focalRange: '35-180mm', lensType: 'anamorphic', compatibleSensors: ['Film 35mm', 'Super 35'] },
  { id: 'panavision_t_series', name: 'Panavision T Series Anamorphic', manufacturer: 'Panavision', mountType: 'Panavision', focalRange: '50-180mm', lensType: 'anamorphic', compatibleSensors: ['Film 35mm', 'Super 35'] },
  
  // Cooke
  { id: 'cooke_s7i', name: 'Cooke S7/i Full Frame', manufacturer: 'Cooke', mountType: 'PL', focalRange: '16-300mm', lensType: 'spherical', compatibleSensors: ['Full Frame', 'Large Format', 'Super 35'] },
  { id: 'cooke_anamorphic', name: 'Cooke Anamorphic/i', manufacturer: 'Cooke', mountType: 'PL', focalRange: '25-135mm', lensType: 'anamorphic', compatibleSensors: ['Super 35', 'Film 35mm'] },
  
  // Zeiss
  { id: 'zeiss_supreme', name: 'Zeiss Supreme Prime', manufacturer: 'Zeiss', mountType: 'PL', focalRange: '15-200mm', lensType: 'spherical', compatibleSensors: ['Full Frame', 'Large Format', 'Super 35'] },
  
  // Angénieux
  { id: 'angenieux_optimo', name: 'Angénieux Optimo', manufacturer: 'Angénieux', mountType: 'PL', focalRange: '15-40mm to 24-290mm', lensType: 'spherical', compatibleSensors: ['Super 35', 'Full Frame'] },
  
  // Atlas
  { id: 'atlas_orion', name: 'Atlas Orion Anamorphic', manufacturer: 'Atlas', mountType: 'PL', focalRange: '32-100mm', lensType: 'anamorphic', compatibleSensors: ['Super 35', 'Full Frame'] },
  
  // Vintage
  { id: 'canon_k35', name: 'Canon K-35', manufacturer: 'Canon', mountType: 'PL', focalRange: '18-85mm', lensType: 'spherical', compatibleSensors: ['Super 35', 'Film 35mm'] },
  
  // IMAX
  { id: 'hasselblad_v', name: 'Hasselblad V System', manufacturer: 'Hasselblad', mountType: 'XPL', focalRange: '30-250mm', lensType: 'spherical', compatibleSensors: ['65mm', 'IMAX 15/70'] },
];
