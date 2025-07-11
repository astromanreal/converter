
'use client';

import { ConverterLayout } from './shared/converter-layout';
import { distanceUnits } from '@/lib/units';

// Conversion factors relative to 1 meter
const factors: { [key: string]: number } = {
  km: 0.001,
  m: 1,
  cm: 100,
  mm: 1000,
  mi: 0.000621371,
  yd: 1.09361,
  ft: 3.28084,
  in: 39.3701,
};

const convertDistance = (value: number, fromUnit: string, toUnit: string): number => {
  if (fromUnit === toUnit) return value;

  const valueInMeters = value / factors[fromUnit];
  return valueInMeters * factors[toUnit];
};

const quickExamples = [
  { fromUnit: 'km', toUnit: 'mi', value: 1, label: '1 km → mi' },
  { fromUnit: 'm', toUnit: 'ft', value: 1, label: '1 m → ft' },
  { fromUnit: 'in', toUnit: 'cm', value: 1, label: '1 in → cm' },
  { fromUnit: 'mi', toUnit: 'km', value: 1, label: '1 mi → km' },
];

export function DistanceConverter() {
  return (
    <ConverterLayout
      units={distanceUnits}
      conversionFn={convertDistance}
      converterType="distance"
      quickExamples={quickExamples}
    />
  );
}
