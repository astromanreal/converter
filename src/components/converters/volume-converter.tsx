
'use client';

import { ConverterLayout } from './shared/converter-layout';
import { volumeUnits } from '@/lib/units'; // Import shared units

// Conversion factors relative to 1 liter
const factors: { [key: string]: number } = {
  l: 1,
  ml: 1000,
  m3: 0.001,
  gal_us: 0.264172,
  qt_us: 1.05669,
  pt_us: 2.11338,
  cup_us: 4.22675,
  floz_us: 33.814,
  tbsp_us: 67.628, // 1 L = 67.628 US tbsp
  tsp_us: 202.884, // 1 L = 202.884 US tsp
  gal_uk: 0.219969, // Imperial gallon
  floz_uk: 35.1951, // Imperial fluid ounce
};

const convertVolume = (value: number, fromUnit: string, toUnit: string): number => {
  if (fromUnit === toUnit) return value;

  const valueInLiters = value / factors[fromUnit];
  return valueInLiters * factors[toUnit];
};

const quickExamples = [
  { fromUnit: 'l', toUnit: 'ml', value: 1, label: '1 L → mL' },
  { fromUnit: 'gal_us', toUnit: 'l', value: 1, label: '1 US gal → L' },
  { fromUnit: 'cup_us', toUnit: 'ml', value: 1, label: '1 US cup → mL' },
  { fromUnit: 'floz_uk', toUnit: 'ml', value: 1, label: '1 UK fl oz → mL' },
];

export function VolumeConverter() {
  return (
    <ConverterLayout
      units={volumeUnits}
      // Default units will be handled by preferences or fallback in ConverterLayout
      conversionFn={convertVolume}
      converterType="volume" // Pass the type for preference lookup
      quickExamples={quickExamples}
    />
  );
}
