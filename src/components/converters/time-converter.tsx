
'use client';

import { ConverterLayout } from './shared/converter-layout';
import { timeUnits } from '@/lib/units'; // Import shared units

// Conversion factors relative to 1 second
const factors: { [key: string]: number } = {
  s: 1,
  ms: 1000,
  min: 1 / 60,
  h: 1 / 3600,
  d: 1 / 86400,
  wk: 1 / 604800,
  mo: 1 / (86400 * 30.4375), // Average month length
  yr: 1 / (86400 * 365.25), // Average year length (including leap year)
};

const convertTime = (value: number, fromUnit: string, toUnit: string): number => {
   if (fromUnit === toUnit) return value;

  const valueInSeconds = value / factors[fromUnit];
  return valueInSeconds * factors[toUnit];
};

export function TimeConverter() {
  return (
    <ConverterLayout
      units={timeUnits}
       // Default units will be handled by preferences or fallback in ConverterLayout
      conversionFn={convertTime}
      converterType="time" // Pass the type for preference lookup
    />
  );
}
