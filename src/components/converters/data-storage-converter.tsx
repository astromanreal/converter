
'use client';

import { ConverterLayout } from './shared/converter-layout';
import { dataStorageUnits } from '@/lib/units'; // Import shared units

// Conversion factors relative to 1 Byte (B)
const factors: { [key: string]: number } = {
  B: 1,
  KB: 1 / 1000,
  KiB: 1 / 1024,
  MB: 1 / 1_000_000,
  MiB: 1 / (1024 ** 2),
  GB: 1 / 1_000_000_000,
  GiB: 1 / (1024 ** 3),
  TB: 1 / 1_000_000_000_000,
  TiB: 1 / (1024 ** 4),
  bit: 8, // 1 Byte = 8 bits
};

const convertDataStorage = (value: number, fromUnit: string, toUnit: string): number => {
  if (fromUnit === toUnit) return value;

  const valueInBytes = value / factors[fromUnit];
  return valueInBytes * factors[toUnit];
};

export function DataStorageConverter() {
  return (
    <ConverterLayout
      units={dataStorageUnits}
      // Default units will be handled by preferences or fallback in ConverterLayout
      conversionFn={convertDataStorage}
      converterType="data-storage" // Pass the type for preference lookup
    />
  );
}
