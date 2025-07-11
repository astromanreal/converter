
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

const quickExamples = [
  { fromUnit: 'C', toUnit: 'F', value: 100, label: '100°C → °F' },
  { fromUnit: 'F', toUnit: 'C', value: 32, label: '32°F → °C' },
  { fromUnit: 'C', toUnit: 'K', value: 0, label: '0°C → K' },
];

export function TemperatureConverter() {
  return (
    <ConverterLayout
      units={temperatureUnits}
      conversionFn={convertTemperature}
      converterType="temperature"
      quickExamples={quickExamples}
    />
  );
}
