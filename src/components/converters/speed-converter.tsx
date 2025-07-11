
'use client';

import { ConverterLayout } from './shared/converter-layout';
import { speedUnits } from '@/lib/units'; // Import shared units

// Conversion factors relative to 1 meter per second (m/s)
const factors: { [key: string]: number } = {
  'm/s': 1,
  'km/h': 3.6,
  mph: 2.23694,
  'ft/s': 3.28084,
  knot: 1.94384,
};

const convertSpeed = (value: number, fromUnit: string, toUnit: string): number => {
   if (fromUnit === toUnit) return value;

  const valueInMetersPerSecond = value / factors[fromUnit];
  return valueInMetersPerSecond * factors[toUnit];
};

const quickExamples = [
  { fromUnit: 'km/h', toUnit: 'mph', value: 100, label: '100 km/h → mph' },
  { fromUnit: 'mph', toUnit: 'km/h', value: 60, label: '60 mph → km/h' },
  { fromUnit: 'm/s', toUnit: 'km/h', value: 1, label: '1 m/s → km/h' },
];

export function SpeedConverter() {
  return (
    <ConverterLayout
      units={speedUnits}
      // Default units will be handled by preferences or fallback in ConverterLayout
      conversionFn={convertSpeed}
      converterType="speed" // Pass the type for preference lookup
      quickExamples={quickExamples}
    />
  );
}
