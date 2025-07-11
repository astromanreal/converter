
'use client';

import { ConverterLayout } from './shared/converter-layout';
import { pressureUnits } from '@/lib/units'; // Import shared units

// Conversion factors relative to 1 Pascal (Pa)
const factors: { [key: string]: number } = {
  Pa: 1,
  kPa: 0.001,
  bar: 0.00001,
  psi: 0.000145038,
  atm: 9.86923e-6, // Standard atmosphere
  torr: 0.00750062,
};

const convertPressure = (value: number, fromUnit: string, toUnit: string): number => {
   if (fromUnit === toUnit) return value;

  const valueInPascals = value / factors[fromUnit];
  return valueInPascals * factors[toUnit];
};

const quickExamples = [
  { fromUnit: 'atm', toUnit: 'Pa', value: 1, label: '1 atm → Pa' },
  { fromUnit: 'bar', toUnit: 'psi', value: 1, label: '1 bar → psi' },
  { fromUnit: 'torr', toUnit: 'atm', value: 760, label: '760 mmHg → atm' },
];

export function PressureConverter() {
  return (
    <ConverterLayout
      units={pressureUnits}
      // Default units will be handled by preferences or fallback in ConverterLayout
      conversionFn={convertPressure}
      converterType="pressure" // Pass the type for preference lookup
      quickExamples={quickExamples}
    />
  );
}
