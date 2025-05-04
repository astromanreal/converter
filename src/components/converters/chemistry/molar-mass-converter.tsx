
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Very simplified mock atomic masses
const atomicMasses: { [key: string]: number } = {
  H: 1.008,
  C: 12.011,
  O: 15.999,
  N: 14.007,
  Na: 22.990,
  Cl: 35.453,
  // Add more elements as needed
};

export function MolarMassConverter() {
  const [formula, setFormula] = useState<string>('');
  const [molarMass, setMolarMass] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateMolarMass = () => {
    setError(null);
    setMolarMass(null);

    if (!formula.trim()) {
      setError("Please enter a chemical formula.");
      return;
    }

    // Very basic parsing logic (needs significant improvement for real use)
    // Handles simple formulas like H2O, CO2, NaCl
    // Does NOT handle parentheses, complex structures, or validation well
    try {
        let totalMass = 0;
        const regex = /([A-Z][a-z]*)(\d*)/g;
        let match;

        while ((match = regex.exec(formula)) !== null) {
            const element = match[1];
            const count = match[2] ? parseInt(match[2]) : 1;

            if (atomicMasses[element]) {
            totalMass += atomicMasses[element] * count;
            } else {
            throw new Error(`Unknown element: ${element}`);
            }
        }

         // Basic check if anything was parsed
         if (totalMass === 0 && formula.trim() !== '') {
             throw new Error("Invalid or unsupported formula format.");
         }


        setMolarMass(Number(totalMass.toFixed(3))); // Round to 3 decimal places
    } catch (err: any) {
        setError(err.message || "Failed to parse formula. Please use a simple format (e.g., H2O, CO2).");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="chemical-formula" className="text-sm font-medium">Chemical Formula</Label>
        <Input
          id="chemical-formula"
          type="text"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          placeholder="e.g., H2O, CO2, NaCl"
          className="mt-1"
        />
        <p className="text-xs text-muted-foreground mt-1">Enter a simple chemical formula. Case-sensitive.</p>
      </div>
      <Button onClick={calculateMolarMass}>Calculate Molar Mass</Button>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {molarMass !== null && (
        <Alert>
          <AlertTitle>Result</AlertTitle>
          <AlertDescription>
            The molar mass of {formula} is approximately{' '}
            <span className="font-semibold">{molarMass}</span> g/mol.
          </AlertDescription>
        </Alert>
      )}
       <div className="text-xs text-muted-foreground pt-2">
         Note: This is a simplified calculator with limited element support and basic parsing.
       </div>
    </div>
  );
}
