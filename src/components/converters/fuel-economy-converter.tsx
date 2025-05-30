
'use client';

import { ConverterLayout } from './shared/converter-layout';
import { fuelEconomyUnits } from '@/lib/units';

// Conversion factors to and from a base of km/L
const KM_PER_MILE = 1.60934;
const LITERS_PER_US_GALLON = 3.78541;
const LITERS_PER_UK_GALLON = 4.54609;

const factors: { [key: string]: { toKmPerL: (val: number) => number; fromKmPerL: (val: number) => number } } = {
  km_l: {
    toKmPerL: (val) => val,
    fromKmPerL: (val) => val,
  },
  l_100km: {
    toKmPerL: (val) => (val === 0 ? Infinity : 100 / val), // Avoid division by zero
    fromKmPerL: (val) => (val === 0 ? Infinity : 100 / val),
  },
  mpg_us: {
    toKmPerL: (val) => val * KM_PER_MILE / LITERS_PER_US_GALLON,
    fromKmPerL: (val) => val * LITERS_PER_US_GALLON / KM_PER_MILE,
  },
  mpg_uk: {
    toKmPerL: (val) => val * KM_PER_MILE / LITERS_PER_UK_GALLON,
    fromKmPerL: (val) => val * LITERS_PER_UK_GALLON / KM_PER_MILE,
  },
};

const convertFuelEconomy = (value: number, fromUnit: string, toUnit: string): number => {
  if (fromUnit === toUnit) return value;
  if (!factors[fromUnit] || !factors[toUnit]) {
    console.error('Invalid unit provided for fuel economy conversion');
    return NaN; // Or throw an error
  }

  // Convert input value to km/L
  const valueInKmPerL = factors[fromUnit].toKmPerL(value);

  if (valueInKmPerL === Infinity && (toUnit === 'l_100km' || fromUnit === 'l_100km')) {
    // Handling the case where 0 L/100km means infinite km/L or vice-versa
    // If converting to L/100km and km/L is infinite (meaning 0 L/100km originally), result is 0
    // If converting from L/100km (which was 0) to another unit, it implies infinite efficiency
    return toUnit === 'l_100km' ? 0 : Infinity;
  }


  // Convert from km/L to the target unit
  const result = factors[toUnit].fromKmPerL(valueInKmPerL);

  // For L/100km, if the result is Infinity (e.g. from 0 km/L), it should be displayed as such
  // otherwise, very high numbers for MPG should be fine.
  return result;
};


export function FuelEconomyConverter() {
  return (
    <ConverterLayout
      units={fuelEconomyUnits}
      conversionFn={convertFuelEconomy}
      converterType="fuel-economy"
    />
  );
}
