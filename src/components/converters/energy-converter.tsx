
'use client';

import { ConverterLayout } from './shared/converter-layout';
import { energyUnits } from '@/lib/units'; // Import shared units

// Conversion factors relative to 1 Joule (J)
const factors: { [key: string]: number } = {
  J: 1,
  kJ: 0.001,
  cal: 0.239006, // thermochemical calorie
  kcal: 0.000239006,
  Wh: 1 / 3600,
  kWh: 1 / 3_600_000,
  Btu: 0.000947817, // International Table BTU
  ftlb: 0.737562,
};

const convertEnergy = (value: number, fromUnit: string, toUnit: string): number => {
  if (fromUnit === toUnit) return value;

  const valueInJoules = value / factors[fromUnit];
  return valueInJoules * factors[toUnit];
};

const quickExamples = [
  { fromUnit: 'kJ', toUnit: 'J', value: 1, label: '1 kJ → J' },
  { fromUnit: 'kcal', toUnit: 'kJ', value: 100, label: '100 kcal → kJ' },
  { fromUnit: 'kWh', toUnit: 'J', value: 1, label: '1 kWh → Joules' },
  { fromUnit: 'Btu', toUnit: 'kJ', value: 1, label: '1 BTU → kJ' },
];

export function EnergyConverter() {
  return (
    <ConverterLayout
      units={energyUnits}
      // Default units will be handled by preferences or fallback in ConverterLayout
      conversionFn={convertEnergy}
      converterType="energy" // Pass the type for preference lookup
      quickExamples={quickExamples}
    />
  );
}
