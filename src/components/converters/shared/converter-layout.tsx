
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserPreferences } from '@/hooks/use-user-preferences'; // Import the preferences hook
import type { Unit } from '@/lib/units'; // Import Unit type
import { addHistoryEntry } from '@/services/history'; // Import history service

// Define the types of converters that have preferences
type PreferableConverterType = 'currency' | 'distance' | 'weight'; // Add more as needed

interface ConverterLayoutProps {
  units: Unit[];
  conversionFn: (value: number, fromUnit: string, toUnit: string) => number | string; // Allow string for formatted results or errors
  converterType: string; // Type of the converter (e.g., 'currency', 'distance')
  isLoading?: boolean; // Optional loading state from parent
  errorMessage?: string; // Optional error message from parent
}

export function ConverterLayout({
    units,
    conversionFn,
    converterType, // Use the converter type
    isLoading = false, // Default to false if not provided
    errorMessage
}: ConverterLayoutProps) {
  const { preferences, isLoaded: preferencesLoaded } = useUserPreferences();

  // State for units and values
  const [fromValue, setFromValue] = useState<string>('1');
  const [toValue, setToValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  const [defaultsSet, setDefaultsSet] = useState(false);

  // Determine default units based on preferences or fallbacks
  useEffect(() => {
    if (preferencesLoaded && !defaultsSet) {
        let defaultFrom = units[0]?.value || ''; // Fallback to first unit
        let defaultTo = units[1]?.value || units[0]?.value || ''; // Fallback to second or first unit

        // Set defaults based on converter type and preferences
        switch (converterType as PreferableConverterType) {
            case 'currency':
                defaultFrom = preferences.preferredCurrency || defaultFrom;
                // Try to set a different default 'to' unit if possible
                defaultTo = units.find(u => u.value !== defaultFrom)?.value || defaultTo;
                 // Specific common pairing if preference is USD
                 if (defaultFrom === 'USD' && units.some(u => u.value === 'INR')) {
                    defaultTo = 'INR';
                } else if (defaultFrom === 'EUR' && units.some(u => u.value === 'USD')) {
                    defaultTo = 'USD';
                }
                break;
            case 'distance':
                defaultFrom = preferences.preferredDistanceUnit || defaultFrom;
                defaultTo = units.find(u => u.value !== defaultFrom)?.value || defaultTo;
                // Common pairing
                if (defaultFrom === 'km' && units.some(u => u.value === 'mi')) defaultTo = 'mi';
                else if (defaultFrom === 'mi' && units.some(u => u.value === 'km')) defaultTo = 'km';
                break;
            case 'weight':
                defaultFrom = preferences.preferredWeightUnit || defaultFrom;
                defaultTo = units.find(u => u.value !== defaultFrom)?.value || defaultTo;
                 // Common pairing
                 if (defaultFrom === 'kg' && units.some(u => u.value === 'lb')) defaultTo = 'lb';
                 else if (defaultFrom === 'lb' && units.some(u => u.value === 'kg')) defaultTo = 'kg';
                break;
            // Add cases for other preference types here
            default:
                 // Keep generic fallbacks for converters without specific preferences
                 defaultFrom = units[0]?.value || '';
                 defaultTo = units[1]?.value || units[0]?.value || '';
        }

         // Ensure defaultFrom and defaultTo are valid units in the list
         if (!units.some(u => u.value === defaultFrom)) defaultFrom = units[0]?.value || '';
         if (!units.some(u => u.value === defaultTo) || defaultFrom === defaultTo) {
             // Find the next available different unit
             defaultTo = units.find(u => u.value !== defaultFrom)?.value || units[0]?.value || '';
         }

        setFromUnit(defaultFrom);
        setToUnit(defaultTo);
        setDefaultsSet(true); // Mark defaults as set
    }
  }, [preferencesLoaded, preferences, units, converterType, defaultsSet]);


  const calculateConversion = useCallback((triggeredByUserInteraction = false) => {
    // Wait until default units are set
     if (!defaultsSet || fromUnit === '' || toUnit === '') {
        setToValue(''); // Or a loading indicator if preferred
        return;
    }

    if (isLoading) {
        setToValue("Loading...");
        return;
    }
     if (errorMessage) {
        setToValue(errorMessage);
        return;
    }

    const value = parseFloat(fromValue);
    if (!isNaN(value) && fromValue.trim() !== '') { // Ensure input is not just whitespace
      try {
        const result = conversionFn(value, fromUnit, toUnit);
        let resultString: string;

        if (typeof result === 'number') {
           const formattedResult = Number(result.toFixed(6));
           // Remove trailing zeros after decimal, but keep integer part
           resultString = formattedResult.toString().includes('.') ? formattedResult.toString().replace(/\.?0+$/, '') : formattedResult.toString();
        } else {
           resultString = result; // Use string result directly (e.g., "Rate N/A")
        }
        setToValue(resultString);

        // Save to history only if the conversion was successful (result is not an error/loading string)
        // and triggered by user interaction (value change, unit change, swap)
         if (triggeredByUserInteraction && typeof result === 'number' && !isNaN(result) && resultString !== "Error" && resultString !== "Invalid Input" && resultString !== "Loading..." ) {
             addHistoryEntry({
               converterType,
               fromUnit,
               toUnit,
               fromValue: fromValue.trim(),
               toValue: resultString,
             });
         }

      } catch (error) {
        console.error("Conversion error:", error);
        setToValue("Error");
      }
    } else if (fromValue.trim() === '') {
        setToValue(''); // Clear output if input is empty
    } else {
        setToValue("Invalid Input"); // Handle non-numeric input
    }
  }, [fromValue, fromUnit, toUnit, conversionFn, isLoading, errorMessage, defaultsSet, converterType]); // Added dependencies


  useEffect(() => {
    // Calculate conversion on initial load once defaults are set
    if(defaultsSet) {
        calculateConversion(false); // Initial calculation is not user-triggered for history
    }
  }, [calculateConversion, defaultsSet]); // Rerun calculation when defaults are set

  // Recalculate when units change (user-triggered)
  useEffect(() => {
      if(defaultsSet) {
          calculateConversion(true);
      }
  }, [fromUnit, toUnit, calculateConversion, defaultsSet]);


  const handleSwapUnits = () => {
     const currentFromUnit = fromUnit;
     const currentToUnit = toUnit;
     const currentToValue = toValue; // Capture current result

     setFromUnit(currentToUnit);
     setToUnit(currentFromUnit);

      // Check if the current 'toValue' is a valid number before swapping
      const numericToValue = parseFloat(currentToValue);
       if (!isNaN(numericToValue) && currentToValue.trim() !== '' && !["Loading...", "Error", "Rate N/A", "Invalid Input"].includes(currentToValue) ) {
           setFromValue(currentToValue); // Swap value only if it's a valid number result
       } else {
           // If 'toValue' wasn't a valid number, keep 'fromValue' as is
           // and just trigger recalculation with the new units.
           // calculateConversion will run due to the state change of units.
           // We still need to ensure it's marked as user-triggered if needed.
           // Note: The useEffect for unit changes already handles this.
       }
       // The useEffect watching fromUnit/toUnit will trigger recalculation and history add
  };

  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
     // Allow empty, '-', or valid number patterns (including decimals)
    if (value === '' || value === '-' || /^-?\d*\.?\d*$/.test(value)) {
       setFromValue(value);
       // Trigger calculation immediately on valid input change (user-triggered)
        if (value !== '' && value !== '-' && !value.endsWith('.')) {
             calculateConversion(true);
        } else if (value === '') {
             setToValue(''); // Clear result if input is cleared
        }
    }
  };

  // Wait until preferences are loaded and defaults are set before rendering the full layout
   if (!defaultsSet) {
       return <div className="text-center p-4 text-muted-foreground">Loading preferences...</div>; // Or a Skeleton loader
   }


  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-4">
        {/* From Section */}
        <div className="space-y-2">
          <Label htmlFor={`${converterType}-from-value`} className="text-sm font-medium">From</Label>
          <div className="flex gap-2">
            <Input
              id={`${converterType}-from-value`}
              type="text"
              inputMode="decimal"
              value={fromValue}
              onChange={handleFromValueChange}
              placeholder="Enter value"
              className="flex-grow"
              autoComplete="off"
            />
             <Select value={fromUnit} onValueChange={setFromUnit} disabled={!units.length}>
              <SelectTrigger id={`${converterType}-from-unit`} className="w-[150px] shrink-0">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Swap Button */}
         <Button
          variant="ghost"
          size="icon"
          onClick={handleSwapUnits}
          aria-label="Swap units"
          className="self-end mb-1 hidden md:inline-flex"
          disabled={isLoading || !units.length}
         >
          <ArrowRightLeft className="h-5 w-5 text-primary" />
         </Button>
          <Button
             variant="outline"
             onClick={handleSwapUnits}
             aria-label="Swap units"
             className="w-full md:hidden mt-2"
             disabled={isLoading || !units.length}
            >
             <ArrowRightLeft className="mr-2 h-4 w-4 text-primary" /> Swap Units
         </Button>

        {/* To Section */}
        <div className="space-y-2">
          <Label htmlFor={`${converterType}-to-value`} className="text-sm font-medium">To</Label>
          <div className="flex gap-2">
           <Input
              id={`${converterType}-to-value`}
              type="text"
              value={toValue}
              readOnly
              placeholder="Result"
              className="flex-grow bg-muted/50 border-muted"
              aria-live="polite"
            />
            <Select value={toUnit} onValueChange={setToUnit} disabled={!units.length}>
              <SelectTrigger id={`${converterType}-to-unit`} className="w-[150px] shrink-0">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
