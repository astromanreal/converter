
'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// Expanded atomic masses for common elements
const atomicMasses: { [key: string]: number } = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.180,
  Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078,
  Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
  Ga: 69.723, Ge: 72.630, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224,
  Ag: 107.87, Cd: 112.41, Sn: 118.71, I: 126.90, Ba: 137.33, Au: 196.97, Hg: 200.59, Pb: 207.2,
};

type BreakdownEntry = {
    element: string;
    count: number;
    atomicMass: number;
    totalMass: number;
};

const HISTORY_KEY = 'molar-mass-history';
const MAX_HISTORY = 5;

export function MolarMassConverter() {
  const [formula, setFormula] = useState<string>('');
  const [molarMass, setMolarMass] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<BreakdownEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
      try {
        const storedHistory = localStorage.getItem(HISTORY_KEY);
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
        }
      } catch (e) {
          console.error("Failed to load molar mass history:", e);
      }
  }, []);

  const updateHistory = (newFormula: string) => {
      const normalizedFormula = newFormula.trim();
      if (!normalizedFormula) return;
      
      const newHistory = [normalizedFormula, ...history.filter(f => f !== normalizedFormula)].slice(0, MAX_HISTORY);
      setHistory(newHistory);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const parseFormula = (formulaStr: string): Map<string, number> => {
    const elementCounts = new Map<string, number>();
    const stack: Map<string, number>[] = [new Map()];
    let i = 0;

    while (i < formulaStr.length) {
        const char = formulaStr[i];
        
        if (char === '(') {
            stack.push(new Map());
            i++;
        } else if (char === ')') {
            i++;
            let multiplier = 1;
            let numStr = '';
            while (i < formulaStr.length && !isNaN(parseInt(formulaStr[i]))) {
                numStr += formulaStr[i];
                i++;
            }
            if (numStr) {
                multiplier = parseInt(numStr);
            }

            if (stack.length < 2) throw new Error("Mismatched parentheses.");
            const topMap = stack.pop()!;
            const currentMap = stack[stack.length - 1];
            
            for (const [element, count] of topMap.entries()) {
                currentMap.set(element, (currentMap.get(element) || 0) + count * multiplier);
            }
        } else if (char >= 'A' && char <= 'Z') {
            let element = char;
            i++;
            if (i < formulaStr.length && formulaStr[i] >= 'a' && formulaStr[i] <= 'z') {
                element += formulaStr[i];
                i++;
            }

            if (!atomicMasses[element]) throw new Error(`Unknown element: ${element}`);
            
            let numStr = '';
            while (i < formulaStr.length && !isNaN(parseInt(formulaStr[i]))) {
                numStr += formulaStr[i];
                i++;
            }
            const count = numStr ? parseInt(numStr) : 1;
            
            const currentMap = stack[stack.length - 1];
            currentMap.set(element, (currentMap.get(element) || 0) + count);
        } else {
            throw new Error(`Invalid character in formula: ${char}`);
        }
    }
    
    if (stack.length !== 1) throw new Error("Mismatched parentheses.");
    return stack[0];
  };

  const calculateMolarMass = () => {
    setError(null);
    setMolarMass(null);
    setBreakdown([]);

    const cleanFormula = formula.replace(/\s/g, '');
    if (!cleanFormula) {
      setError("Please enter a chemical formula.");
      return;
    }

    try {
        let totalMass = 0;
        const finalElementCounts = new Map<string, number>();
        const newBreakdown: BreakdownEntry[] = [];
        
        // Handle hydrates (e.g., CuSO4·5H2O)
        const hydrateParts = cleanFormula.split(/[·*]/);
        
        for (const part of hydrateParts) {
            let multiplier = 1;
            let subFormula = part;
            
            const match = part.match(/^(\d+)(.*)$/);
            if (match) {
                multiplier = parseInt(match[1]);
                subFormula = match[2];
            }
            
            if (!subFormula) continue;
            
            const partCounts = parseFormula(subFormula);
            for (const [element, count] of partCounts.entries()) {
                finalElementCounts.set(element, (finalElementCounts.get(element) || 0) + count * multiplier);
            }
        }

        if (finalElementCounts.size === 0) {
            throw new Error("Invalid or empty formula. Could not parse any elements.");
        }

        const sortedElements = Array.from(finalElementCounts.keys()).sort();

        for (const element of sortedElements) {
            const count = finalElementCounts.get(element)!;
            const atomicMass = atomicMasses[element];
            const mass = count * atomicMass;
            totalMass += mass;
            newBreakdown.push({
                element,
                count,
                atomicMass: Number(atomicMass.toFixed(3)),
                totalMass: Number(mass.toFixed(3)),
            });
        }

        setMolarMass(Number(totalMass.toFixed(3)));
        setBreakdown(newBreakdown);
        updateHistory(formula);

    } catch (err: any) {
        setError(err.message || "Failed to parse formula. Please check for errors.");
    }
  };

  const handleHistoryClick = (histFormula: string) => {
      setFormula(histFormula);
      // We need to trigger calculation after state update
      // A button click is better, but to simulate it, we can use an effect
      // Or just call calculate directly, but the formula state won't be updated yet.
      // So, let's just set the formula and let the user click "Calculate".
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
          calculateMolarMass();
      }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="chemical-formula" className="text-sm font-medium">Chemical Formula</Label>
        <div className="flex gap-2">
            <Input
              id="chemical-formula"
              type="text"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., H2O, C6H12O6, (NH4)2SO4"
              className="mt-1"
            />
            <Button onClick={calculateMolarMass} className="mt-1">Calculate</Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Supports parentheses and hydrates (e.g. CuSO4·5H2O). Case-sensitive.</p>
      </div>

      {history.length > 0 && (
          <div className="space-y-2">
              <Label className="text-sm font-medium">Recent</Label>
              <div className="flex flex-wrap gap-2">
                  {history.map((hist, index) => (
                      <Button key={index} variant="outline" size="sm" onClick={() => handleHistoryClick(hist)}>
                          {hist}
                      </Button>
                  ))}
              </div>
          </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {molarMass !== null && (
        <Alert>
          <AlertTitle className="flex justify-between items-center">
              <span>Result for {formula}</span>
              <Badge variant="secondary">{molarMass} g/mol</Badge>
          </AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2 font-semibold">Breakdown:</p>
            <ScrollArea className="h-[150px] pr-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Element</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Atomic Mass</TableHead>
                    <TableHead className="text-right">Total Mass</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {breakdown.map((item) => (
                    <TableRow key={item.element}>
                      <TableCell className="font-medium">{item.element}</TableCell>
                      <TableCell className="text-right">{item.count}</TableCell>
                      <TableCell className="text-right">{item.atomicMass}</TableCell>
                      <TableCell className="text-right">{item.totalMass}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
