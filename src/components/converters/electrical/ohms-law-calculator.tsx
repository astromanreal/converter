
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bolt, Waves } from 'lucide-react';

const OmegaIcon = () => <span className="font-bold text-lg leading-none">Ω</span>;

type UnknownVariable = 'voltage' | 'current' | 'resistance';
type Unit = { label: string; factor: number };

const voltageUnits: Record<string, Unit> = { V: { label: 'Volts (V)', factor: 1 }, mV: { label: 'Millivolts (mV)', factor: 1e-3 }, kV: { label: 'Kilovolts (kV)', factor: 1e3 } };
const currentUnits: Record<string, Unit> = { A: { label: 'Amps (A)', factor: 1 }, mA: { label: 'Milliamps (mA)', factor: 1e-3 }, kA: { label: 'Kiloamps (kA)', factor: 1e3 } };
const resistanceUnits: Record<string, Unit> = { Ohm: { label: 'Ohms (Ω)', factor: 1 }, kOhm: { label: 'Kiloohms (kΩ)', factor: 1e3 }, MOhm: { label: 'Megaohms (MΩ)', factor: 1e6 } };

export function OhmsLawCalculator() {
  const [unknownVariable, setUnknownVariable] = useState<UnknownVariable>('voltage');
  const [voltage, setVoltage] = useState<string>('');
  const [current, setCurrent] = useState<string>('');
  const [resistance, setResistance] = useState<string>('');
  const [voltageUnit, setVoltageUnit] = useState<string>('V');
  const [currentUnit, setCurrentUnit] = useState<string>('A');
  const [resistanceUnit, setResistanceUnit] = useState<string>('Ohm');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setResult(null);

    const v = parseFloat(voltage) * (voltageUnits[voltageUnit]?.factor ?? 1);
    const i = parseFloat(current) * (currentUnits[currentUnit]?.factor ?? 1);
    const r = parseFloat(resistance) * (resistanceUnits[resistanceUnit]?.factor ?? 1);

    try {
      let calculatedValue: number | null = null;
      let resultUnitLabel = '';

      switch (unknownVariable) {
        case 'voltage':
          if (isNaN(i) || isNaN(r)) throw new Error("Please enter valid Current and Resistance values.");
          calculatedValue = i * r;
          resultUnitLabel = voltageUnits[voltageUnit]?.label || 'Volts';
          calculatedValue /= (voltageUnits[voltageUnit]?.factor ?? 1);
          break;
        case 'current':
          if (isNaN(v) || isNaN(r)) throw new Error("Please enter valid Voltage and Resistance values.");
          if (r === 0) throw new Error("Resistance cannot be zero when calculating current.");
          calculatedValue = v / r;
          resultUnitLabel = currentUnits[currentUnit]?.label || 'Amps';
          calculatedValue /= (currentUnits[currentUnit]?.factor ?? 1);
          break;
        case 'resistance':
          if (isNaN(v) || isNaN(i)) throw new Error("Please enter valid Voltage and Current values.");
          if (i === 0) throw new Error("Current cannot be zero when calculating resistance.");
          calculatedValue = v / i;
          resultUnitLabel = resistanceUnits[resistanceUnit]?.label || 'Ohms';
           calculatedValue /= (resistanceUnits[resistanceUnit]?.factor ?? 1);
          break;
        default:
          throw new Error("Invalid calculation type.");
      }

      if (calculatedValue === null || !isFinite(calculatedValue)) {
          throw new Error("Calculation resulted in an invalid or infinite number.");
      }
      
      const resultString = Number(calculatedValue.toPrecision(6)).toString();
      setResult(`${resultString} ${resultUnitLabel}`);

    } catch (err: any) {
      setError(err.message || "Calculation error.");
    }
  };
  
   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
          calculate();
      }
  };

   const renderInput = (variable: UnknownVariable, value: string, setValue: (val: string) => void, unit: string, setUnit: (val: string) => void, units: Record<string, Unit>, Icon: React.ElementType) => {
     if (unknownVariable === variable) return null;

     return (
        <div className="space-y-2">
         <Label htmlFor={variable} className="text-sm font-medium capitalize flex items-center gap-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            {variable}
         </Label>
          <div className="flex gap-2">
             <Input
               id={variable}
               type="text"
               inputMode="decimal"
               value={value}
               onChange={(e) => setValue(e.target.value)}
               onKeyPress={handleKeyPress}
               placeholder={`Enter ${variable}`}
               className="flex-grow"
             />
              <Select value={unit} onValueChange={setUnit}>
                 <SelectTrigger className="w-[160px] shrink-0">
                     <SelectValue placeholder="Unit" />
                 </SelectTrigger>
                 <SelectContent>
                     {Object.entries(units).map(([key, unitData]) => (
                         <SelectItem key={key} value={key}>
                             {unitData.label}
                         </SelectItem>
                     ))}
                 </SelectContent>
             </Select>
          </div>
        </div>
     );
   };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium mb-2 block">Choose value to calculate:</Label>
        <RadioGroup
          value={unknownVariable}
          onValueChange={(value) => {
              setUnknownVariable(value as UnknownVariable);
              setResult(null);
              setError(null);
          }}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="voltage" id="calc-voltage" />
            <Label htmlFor="calc-voltage">Voltage (V)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="current" id="calc-current" />
            <Label htmlFor="calc-current">Current (I)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="resistance" id="calc-resistance" />
            <Label htmlFor="calc-resistance">Resistance (R)</Label>
          </div>
        </RadioGroup>
      </div>

      {renderInput('voltage', voltage, setVoltage, voltageUnit, setVoltageUnit, voltageUnits, Bolt)}
      {renderInput('current', current, setCurrent, currentUnit, setCurrentUnit, currentUnits, Waves)}
      {renderInput('resistance', resistance, setResistance, resistanceUnit, setResistanceUnit, resistanceUnits, OmegaIcon)}


      <Button onClick={calculate} className="w-full">Calculate {unknownVariable}</Button>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result !== null && (
        <Alert variant="default" className="border-primary/50">
          <AlertTitle>Result</AlertTitle>
          <AlertDescription className="text-base">
            Calculated {unknownVariable} is{' '}
            <span className="font-semibold text-primary text-lg">{result}</span>.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
