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

const quickExamples = [
  { fromUnit: 'h', toUnit: 'min', value: 1, label: '1 hour → min' },
  { fromUnit: 'd', toUnit: 'h', value: 1, label: '1 day → hours' },
  { fromUnit: 'min', toUnit: 's', value: 1, label: '1 min → sec' },
  { fromUnit: 'wk', toUnit: 'd', value: 1, label: '1 week → days' },
];

export function TimeConverter() {
  return (
    <ConverterLayout
      units={timeUnits}
       // Default units will be handled by preferences or fallback in ConverterLayout
      conversionFn={convertTime}
      converterType="time" // Pass the type for preference lookup
      quickExamples={quickExamples}
    />
  );
}
