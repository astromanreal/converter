
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

const quickExamples = [
  { fromUnit: 'acre', toUnit: 'm2', value: 1, label: '1 acre → m²' },
  { fromUnit: 'ha', toUnit: 'acre', value: 1, label: '1 ha → acres' },
  { fromUnit: 'ft2', toUnit: 'm2', value: 1000, label: '1000 ft² → m²' },
  { fromUnit: 'm2', toUnit: 'ft2', value: 100, label: '100 m² → ft²' },
];

export function AreaConverter() {
  return (
    <ConverterLayout
      units={areaUnits}
      // Default units will be handled by preferences or fallback in ConverterLayout
      conversionFn={convertArea}
      converterType="area" // Pass the type for preference lookup
      quickExamples={quickExamples}
    />
  );
}
