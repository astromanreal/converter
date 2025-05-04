
'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';

type CalculationType = 'h_concentration' | 'oh_concentration' | 'ph' | 'poh';

export function PHCalculator() {
  const [calculationType, setCalculationType] = useState<CalculationType>('ph');
  const [inputValue, setInputValue] = useState<string>('7'); // Default to pH 7
  const [result, setResult] = useState<{ ph: number | null, poh: number | null, h: number | null, oh: number | null }>({ ph: 7, poh: 7, h: 1e-7, oh: 1e-7 });
  const [error, setError] = useState<string | null>(null);

  // Ensure calculation runs client-side after mount
  const [isMounted, setIsMounted] = useState(false);
   useEffect(() => {
     setIsMounted(true);
     // Calculate initial default values after mount
     calculatePH(7, 'ph');
   }, []);


  const calculatePH = (value: number | string, type: CalculationType) => {
    setError(null);
    let numValue: number;

    // Validate input
    if (typeof value === 'string') {
        if (value.trim() === '') {
            setError("Please enter a value.");
            setResult({ ph: null, poh: null, h: null, oh: null });
            return;
        }
        numValue = parseFloat(value);
        if (isNaN(numValue)) {
            setError("Invalid numeric input.");
            setResult({ ph: null, poh: null, h: null, oh: null });
            return;
        }
    } else {
        numValue = value;
    }


    let ph: number | null = null;
    let poh: number | null = null;
    let hConcentration: number | null = null;
    let ohConcentration: number | null = null;

    try {
        switch (type) {
            case 'ph':
                ph = numValue;
                if (ph < 0 || ph > 14) throw new Error("pH must be between 0 and 14.");
                poh = 14 - ph;
                hConcentration = 10 ** (-ph);
                ohConcentration = 10 ** (-poh);
                break;
            case 'poh':
                poh = numValue;
                if (poh < 0 || poh > 14) throw new Error("pOH must be between 0 and 14.");
                ph = 14 - poh;
                hConcentration = 10 ** (-ph);
                ohConcentration = 10 ** (-poh);
                break;
            case 'h_concentration':
                hConcentration = numValue;
                 if (hConcentration <= 0) throw new Error("[H+] must be positive.");
                ph = -Math.log10(hConcentration);
                 if (ph < 0 || ph > 14) { // Check calculated pH range
                    ph = Math.max(0, Math.min(14, ph)); // Clamp pH
                     // Optionally set an info message instead of error?
                     // setError("Calculated pH outside typical range (0-14).")
                 }
                poh = 14 - ph;
                ohConcentration = 10 ** (-poh);
                break;
            case 'oh_concentration':
                ohConcentration = numValue;
                 if (ohConcentration <= 0) throw new Error("[OH-] must be positive.");
                poh = -Math.log10(ohConcentration);
                 if (poh < 0 || poh > 14) { // Check calculated pOH range
                     poh = Math.max(0, Math.min(14, poh)); // Clamp pOH
                 }
                ph = 14 - poh;
                hConcentration = 10 ** (-ph);
                break;
            default:
                 throw new Error("Invalid calculation type.");
        }

         // Check final values are valid numbers before setting state
         if (isNaN(ph!) || isNaN(poh!) || isNaN(hConcentration!) || isNaN(ohConcentration!)) {
            throw new Error("Calculation resulted in invalid numbers.");
         }

        setResult({
            ph: Number(ph.toFixed(2)), // Round pH/pOH
            poh: Number(poh.toFixed(2)),
            h: hConcentration,
            oh: ohConcentration
        });

    } catch (err: any) {
        setError(err.message || "Calculation error.");
         setResult({ ph: null, poh: null, h: null, oh: null });
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setInputValue(e.target.value);
     // Debounced calculation could be added here if needed
      // For simplicity, calculation happens on button click or slider change
  };

   const handleSliderChange = (value: number[]) => {
     const phValue = value[0];
     setInputValue(phValue.toString());
     calculatePH(phValue, 'ph'); // Assume slider always controls pH
     setCalculationType('ph'); // Ensure calculation type is set to pH when slider moves
   };

   const handleCalculateClick = () => {
        calculatePH(inputValue, calculationType);
    };

   // Adjust input type based on calculation type
   const getInputType = () => {
     return (calculationType === 'h_concentration' || calculationType === 'oh_concentration')
       ? 'text' // Use text to allow scientific notation e.g., 1e-7
       : 'number';
   };

    const getPlaceholder = () => {
        switch (calculationType) {
            case 'ph': return "Enter pH (0-14)";
            case 'poh': return "Enter pOH (0-14)";
            case 'h_concentration': return "Enter [H+] (e.g., 1e-7)";
            case 'oh_concentration': return "Enter [OH-] (e.g., 1e-10)";
            default: return "Enter value";
        }
    };

    // Only render if mounted
    if (!isMounted) {
       return <div className="text-center p-4 text-muted-foreground">Loading calculator...</div>;
    }

  return (
    <div className="space-y-6">
       <div>
          <Label className="text-sm font-medium mb-2 block">Calculate from:</Label>
          <RadioGroup
            value={calculationType}
            onValueChange={(value) => {
                const newType = value as CalculationType;
                setCalculationType(newType);
                 // Reset input value or set a sensible default when type changes
                 setInputValue(newType === 'ph' || newType === 'poh' ? '7' : '1e-7');
                 // Recalculate immediately when type changes? Optional.
                 // calculatePH(newType === 'ph' || newType === 'poh' ? 7 : 1e-7, newType);
            }}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ph" id="ph" />
              <Label htmlFor="ph">pH</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="poh" id="poh" />
              <Label htmlFor="poh">pOH</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="h_concentration" id="h_concentration" />
              <Label htmlFor="h_concentration">[H⁺] Concentration (mol/L)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oh_concentration" id="oh_concentration" />
              <Label htmlFor="oh_concentration">[OH⁻] Concentration (mol/L)</Label>
            </div>
          </RadioGroup>
       </div>

      <div>
        <Label htmlFor="ph-input" className="text-sm font-medium">Input Value</Label>
        <Input
          id="ph-input"
          type={getInputType()}
          inputMode={getInputType() === 'number' ? 'decimal' : 'text'} // Adjust input mode
          value={inputValue}
          onChange={handleInputChange}
          placeholder={getPlaceholder()}
          step={calculationType === 'ph' || calculationType === 'poh' ? "0.01" : undefined}
          className="mt-1"
        />
      </div>

       {/* Only show slider when calculating from pH */}
       {calculationType === 'ph' && (
           <div>
               <Label htmlFor="ph-slider" className="text-sm font-medium">Adjust pH</Label>
               <Slider
                   id="ph-slider"
                   min={0}
                   max={14}
                   step={0.1}
                   value={[result.ph ?? 7]} // Use calculated pH or default
                   onValueChange={handleSliderChange}
                   className="mt-2"
               />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                   <span>0 (Acidic)</span>
                   <span>7 (Neutral)</span>
                   <span>14 (Alkaline)</span>
               </div>
           </div>
       )}


      <Button onClick={handleCalculateClick}>Calculate</Button>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result.ph !== null && (
        <Alert>
          <AlertTitle>Results</AlertTitle>
          <AlertDescription>
            <ul className="space-y-1 list-disc list-inside">
                 <li>pH: <span className="font-semibold">{result.ph}</span> ({result.ph < 7 ? 'Acidic' : result.ph > 7 ? 'Alkaline' : 'Neutral'})</li>
                 <li>pOH: <span className="font-semibold">{result.poh}</span></li>
                 <li>[H⁺]: <span className="font-semibold">{result.h?.toExponential(2)}</span> mol/L</li>
                 <li>[OH⁻]: <span className="font-semibold">{result.oh?.toExponential(2)}</span> mol/L</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
      <div className="text-xs text-muted-foreground pt-2">
          Calculations assume standard temperature (25°C) where Kw = 1.0 x 10⁻¹⁴.
      </div>
    </div>
  );
}
