
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { ArrowRightLeft, Copy, Share2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserPreferences } from '@/hooks/use-user-preferences';
import type { Unit } from '@/lib/units';
import { addHistoryEntry } from '@/services/history';
import { Combobox } from '@/components/ui/combobox';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';

type PreferableConverterType = 'currency' | 'distance' | 'weight' | 'temperature' | 'volume' | 'area';

interface QuickExample {
  fromUnit: string;
  toUnit: string;
  value: number;
  label: string;
}

interface ConverterLayoutProps {
  units: Unit[];
  conversionFn: (value: number, fromUnit: string, toUnit: string) => number | string;
  converterType: string;
  isLoading?: boolean;
  errorMessage?: string;
  rateInfoFn?: (fromUnit: string, toUnit: string) => {rate: string} | null;
  quickExamples?: QuickExample[];
}

export function ConverterLayout({
    units,
    conversionFn,
    converterType,
    isLoading = false,
    errorMessage,
    rateInfoFn,
    quickExamples,
}: ConverterLayoutProps) {
  const { preferences, isLoaded: preferencesLoaded } = useUserPreferences();
  const { toast } = useToast();

  const [fromValue, setFromValue] = useState<string>('1');
  const [toValue, setToValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  const [defaultsSet, setDefaultsSet] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [hint, setHint] = useState<string | null>(null);


  useEffect(() => {
    if (preferencesLoaded && !defaultsSet) {
        let defaultFrom = units[0]?.value || '';
        let defaultTo = units[1]?.value || units[0]?.value || '';

        switch (converterType as PreferableConverterType) {
            case 'currency':
                defaultFrom = preferences.preferredCurrency || defaultFrom;
                break;
            case 'distance':
                defaultFrom = preferences.preferredDistanceUnit || defaultFrom;
                break;
            case 'weight':
                defaultFrom = preferences.preferredWeightUnit || defaultFrom;
                break;
             case 'temperature':
                defaultFrom = preferences.preferredTemperatureUnit || defaultFrom;
                break;
             case 'volume':
                defaultFrom = preferences.preferredVolumeUnit || defaultFrom;
                break;
             case 'area':
                defaultFrom = preferences.preferredAreaUnit || defaultFrom;
                break;
            default:
                 break;
        }
        
        // Ensure defaultFrom exists in the current converter's units
        if (!units.some(u => u.value === defaultFrom)) defaultFrom = units[0]?.value || '';

        // Pick a different defaultTo unit
        if (converterType === 'currency' && defaultFrom === 'USD' && units.some(u => u.value === 'INR')) {
            defaultTo = 'INR';
        } else if (converterType === 'distance' && defaultFrom === 'km' && units.some(u => u.value === 'mi')) {
            defaultTo = 'mi';
        } else if (converterType === 'weight' && defaultFrom === 'kg' && units.some(u => u.value === 'lb')) {
            defaultTo = 'lb';
        } else {
             defaultTo = units.find(u => u.value !== defaultFrom)?.value || units[0]?.value || '';
        }

        setFromUnit(defaultFrom);
        setToUnit(defaultTo);
        setDefaultsSet(true);
    }
  }, [preferencesLoaded, preferences, units, converterType, defaultsSet]);


  const calculateConversion = useCallback((triggeredByUserInteraction = false) => {
     if (!defaultsSet || fromUnit === '' || toUnit === '') {
        setToValue('');
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
    if (!isNaN(value) && fromValue.trim() !== '') {
      try {
        const result = conversionFn(value, fromUnit, toUnit);
        let resultString: string;

        if (typeof result === 'number') {
           const precision = preferences.resultPrecision ?? 4;
           const formattedResult = Number(result.toFixed(precision));
           resultString = formattedResult.toString().includes('.') ? formattedResult.toString().replace(/\.?0+$/, '') : formattedResult.toString();
        } else {
           resultString = result;
        }
        setToValue(resultString);
        setAnimationKey(prev => prev + 1);

         if (preferences.saveHistory && triggeredByUserInteraction && typeof result === 'number' && !isNaN(result) && !["Error", "Rate N/A", "Invalid Rate", "Invalid Input", "Loading..."].includes(resultString) ) {
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
        setToValue('');
    } else {
        setToValue("Invalid Input");
    }
  }, [fromValue, fromUnit, toUnit, conversionFn, isLoading, errorMessage, defaultsSet, converterType, preferences.resultPrecision, preferences.saveHistory]);

  useEffect(() => {
    if(defaultsSet) {
        calculateConversion(false);
    }
  }, [calculateConversion, defaultsSet]);

  useEffect(() => {
      if(defaultsSet) {
          calculateConversion(true);
      }
  }, [fromUnit, toUnit, calculateConversion, defaultsSet]);

   useEffect(() => {
    const numericToValue = parseFloat(toValue);
    if (isNaN(numericToValue) || numericToValue === 0) {
      setHint(null);
      return;
    }
    const precision = preferences.resultPrecision ?? 4;
    if (numericToValue > 0 && numericToValue < (1 / (10 ** (precision - 1))) ) {
       setHint("Result is very small. Try a different 'To' unit for better readability.");
    } else {
      setHint(null);
    }
   }, [toValue, preferences.resultPrecision]);


  const handleSwapUnits = () => {
     const currentFromUnit = fromUnit;
     setFromUnit(toUnit);
     setToUnit(currentFromUnit);
  };

  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || value === '-' || /^-?\d*\.?\d*$/.test(value)) {
       setFromValue(value);
        if (value !== '' && value !== '-' && !value.endsWith('.')) {
             calculateConversion(true);
        } else if (value === '') {
             setToValue('');
        }
    }
  };

  const handleCopy = async () => {
    if (!toValue || isNaN(parseFloat(toValue))) {
        toast({ title: "Nothing to copy", description: "Please perform a valid conversion first.", variant: "destructive" });
        return;
    }
    await navigator.clipboard.writeText(toValue);
    toast({ title: "Copied!", description: `Result "${toValue}" copied to clipboard.`});
  };

  const handleShare = async () => {
    if (!toValue || isNaN(parseFloat(toValue))) {
        toast({ title: "Nothing to share", description: "Please perform a valid conversion first.", variant: "destructive" });
        return;
    }
    const shareData = {
      title: 'SmartConvert Conversion',
      text: `${fromValue} ${fromUnit} is ${toValue} ${toUnit}`,
      url: window.location.href,
    };
    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err: any) {
            if (err.name !== 'AbortError' && err.name !== 'NotAllowedError') {
                 console.error("Share failed:", err);
                 toast({
                    title: "Sharing Failed",
                    description: "An unexpected error occurred while trying to share.",
                    variant: "destructive",
                  });
            }
        }
    } else {
        await navigator.clipboard.writeText(shareData.text);
        toast({ title: "Link Copied!", description: "Sharing not supported, conversion details copied instead." });
    }
  };

  const handleQuickExampleClick = (example: QuickExample) => {
    setFromUnit(example.fromUnit);
    setToUnit(example.toUnit);
    setFromValue(String(example.value));
  };


   if (!defaultsSet) {
       return <div className="text-center p-4 text-muted-foreground">Loading preferences...</div>;
   }

  const rateInfo = rateInfoFn ? rateInfoFn(fromUnit, toUnit) : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${converterType}-from-unit`}>From</Label>
          <Combobox
              units={units}
              value={fromUnit}
              onChange={setFromUnit}
              placeholder="Select a unit"
              searchPlaceholder="Search units..."
              emptyPlaceholder="No units found."
            />
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
        </div>

        <div className="w-full md:w-auto flex justify-center items-end h-full">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleSwapUnits}
                            aria-label="Swap units"
                            className="self-center mt-2 md:mt-0 group"
                            disabled={isLoading || !units.length}
                        >
                            <ArrowRightLeft className="h-5 w-5 text-primary transition-transform duration-300 group-hover:rotate-180" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Swap Units</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${converterType}-to-unit`}>To</Label>
          <Combobox
              units={units}
              value={toUnit}
              onChange={setToUnit}
              placeholder="Select a unit"
              searchPlaceholder="Search units..."
              emptyPlaceholder="No units found."
            />
          <div className="relative">
            <Input
              key={animationKey}
              id={`${converterType}-to-value`}
              type="text"
              value={toValue}
              readOnly
              placeholder="Result"
              className="flex-grow bg-muted/50 border-muted pr-20 animate-in fade-in duration-300"
              aria-live="polite"
            />
             <div className="absolute right-1 top-0 h-full flex items-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={handleCopy}><Copy className="h-4 w-4"/></Button></TooltipTrigger>
                        <TooltipContent>Copy Result</TooltipContent>
                    </Tooltip>
                    {typeof navigator !== 'undefined' && navigator.share && <Tooltip>
                        <TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={handleShare}><Share2 className="h-4 w-4"/></Button></TooltipTrigger>
                        <TooltipContent>Share Result</TooltipContent>
                    </Tooltip>}
                </TooltipProvider>
            </div>
          </div>
           {hint && (
            <div className="text-center text-xs text-muted-foreground pt-1 flex items-center justify-center gap-1">
              <Lightbulb className="h-3 w-3 text-yellow-500" /> {hint}
            </div>
           )}
        </div>
      </div>
      {rateInfo && (
            <div className="text-center text-sm text-muted-foreground pt-2">
                <p className="font-medium text-foreground">{rateInfo.rate}</p>
            </div>
      )}
      {quickExamples && quickExamples.length > 0 && (
        <div className="pt-4">
          <p className="text-sm font-medium text-center mb-2 text-muted-foreground">Quick Conversions</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickExamples.map((ex, i) => (
              <Button key={i} variant="outline" size="sm" onClick={() => handleQuickExampleClick(ex)}>
                {ex.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
