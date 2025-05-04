
'use client';

import { ConverterLayout } from './shared/converter-layout';
import { distanceUnits } from '@/lib/units'; // Import shared units

// Conversion factors relative to 1 meter
const factors: { [key: string]: number } = {
  km: 0.001,
  m: 1,
  cm: 100,
  mm: 1000,
  mi: 0.000621371,
  yd: 1.09361,
  ft: 3.28084,
  in: 39.3701,
};

const convertDistance = (value: number, fromUnit: string, toUnit: string): number => {
  if (fromUnit === toUnit) return value;

  const valueInMeters = value / factors[fromUnit];
  return valueInMeters * factors[toUnit];
};

export function DistanceConverter() {
  return (
    <ConverterLayout
      units={distanceUnits}
       // Default units will be handled by preferences or fallback in ConverterLayout
      conversionFn={convertDistance}
      converterType="distance" // Pass the type for preference lookup
    />
  );
}
