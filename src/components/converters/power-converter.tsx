
'use client';

import { ConverterLayout } from './shared/converter-layout';
import { powerUnits } from '@/lib/units'; // Import shared units

// Conversion factors relative to 1 Watt (W)
const factors: { [key: string]: number } = {
  W: 1,
  kW: 0.001,
  MW: 0.000001,
  hp_m: 0.00135962, // Metric horsepower
  hp_e: 0.00134102, // Mechanical horsepower (Imperial)
  'Btu/h': 3.41214, // BTU (International Table) per hour
  'ftlb/s': 0.737562,
};

const convertPower = (value: number, fromUnit: string, toUnit: string): number => {
  if (fromUnit === toUnit) return value;

  const valueInWatts = value / factors[fromUnit];
  return valueInWatts * factors[toUnit];
};

const quickExamples = [
  { fromUnit: 'kW', toUnit: 'W', value: 1, label: '1 kW → W' },
  { fromUnit: 'hp_e', toUnit: 'W', value: 1, label: '1 hp → W' },
  { fromUnit: 'W', toUnit: 'Btu/h', value: 100, label: '100 W → BTU/h' },
  { fromUnit: 'kW', toUnit: 'hp_e', value: 10, label: '10 kW → hp' },
];

export function PowerConverter() {
  return (
    <ConverterLayout
      units={powerUnits}
      // Default units will be handled by preferences or fallback in ConverterLayout
      conversionFn={convertPower}
      converterType="power" // Pass the type for preference lookup
      quickExamples={quickExamples}
    />
  );
}
