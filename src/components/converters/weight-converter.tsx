
'use client';

import { ConverterLayout } from './shared/converter-layout';
import { weightUnits } from '@/lib/units'; // Import shared units

// Conversion factors relative to 1 kilogram
const factors: { [key: string]: number } = {
  kg: 1,
  g: 1000,
  mg: 1000000,
  t: 0.001,
  lb: 2.20462,
  oz: 35.274,
  st: 0.157473,
};

const convertWeight = (value: number, fromUnit: string, toUnit: string): number => {
   if (fromUnit === toUnit) return value;

  const valueInKilograms = value / factors[fromUnit];
  return valueInKilograms * factors[toUnit];
};

export function WeightConverter() {
  return (
    <ConverterLayout
      units={weightUnits}
       // Default units will be handled by preferences or fallback in ConverterLayout
      conversionFn={convertWeight}
      converterType="weight" // Pass the type for preference lookup
    />
  );
}
