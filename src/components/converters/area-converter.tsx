
'use client';

import { ConverterLayout } from './shared/converter-layout';
import { areaUnits } from '@/lib/units'; // Import shared units

// Conversion factors relative to 1 square meter (m²)
const factors: { [key: string]: number } = {
  m2: 1,
  km2: 0.000001,
  ha: 0.0001,
  ft2: 10.7639,
  yd2: 1.19599,
  acre: 0.000247105,
  mi2: 3.861e-7,
};

const convertArea = (value: number, fromUnit: string, toUnit: string): number => {
  if (fromUnit === toUnit) return value;

  const valueInSquareMeters = value / factors[fromUnit];
  return valueInSquareMeters * factors[toUnit];
};

export function AreaConverter() {
  return (
    <ConverterLayout
      units={areaUnits}
      // Default units will be handled by preferences or fallback in ConverterLayout
      conversionFn={convertArea}
      converterType="area" // Pass the type for preference lookup
    />
  );
}
