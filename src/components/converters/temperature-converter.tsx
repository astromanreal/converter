
'use client';

import { ConverterLayout } from './shared/converter-layout';
import { temperatureUnits } from '@/lib/units'; // Import shared units

const convertTemperature = (value: number, fromUnit: string, toUnit: string): number => {
  if (fromUnit === toUnit) return value;

  let celsiusValue: number;

  // Convert input to Celsius first
  switch (fromUnit) {
    case 'F':
      celsiusValue = (value - 32) * 5 / 9;
      break;
    case 'K':
      celsiusValue = value - 273.15;
      break;
    case 'C':
    default:
      celsiusValue = value;
      break;
  }

  // Convert from Celsius to the target unit
  switch (toUnit) {
    case 'F':
      return (celsiusValue * 9 / 5) + 32;
    case 'K':
      return celsiusValue + 273.15;
    case 'C':
    default:
      return celsiusValue;
  }
};

export function TemperatureConverter() {
  return (
    <ConverterLayout
      units={temperatureUnits}
      // Default units will be handled by preferences or fallback in ConverterLayout
      conversionFn={convertTemperature}
      converterType="temperature" // Pass the type for preference lookup
    />
  );
}
