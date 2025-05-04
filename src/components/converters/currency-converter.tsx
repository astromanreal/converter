
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ConverterLayout } from './shared/converter-layout';
import { getExchangeRates } from '@/services/currency'; // Assuming this service exists
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { currencyUnits } from '@/lib/units'; // Import shared units

// Base currency for the fetched rates (in this mock implementation)
const BASE_CURRENCY = 'USD'; // This remains relevant for understanding the mock structure

export function CurrencyConverter() {
  const [rates, setRates] = useState<{ [key: string]: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch rates (mock returns USD-based rates)
      const fetchedRates = await getExchangeRates();
      // Ensure the base currency itself is included in the rates for calculations
      // Although the mock provides USD=1, this ensures robustness if the mock changes
      if (!fetchedRates[BASE_CURRENCY]) {
          fetchedRates[BASE_CURRENCY] = 1;
      }
      setRates(fetchedRates);
    } catch (err) {
      console.error("Failed to fetch exchange rates:", err);
      setError("Could not load exchange rates. Conversion may be unavailable or inaccurate. Please try again later.");
      setRates(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates(); // Initial fetch
  }, [fetchRates]);


  const convertCurrency = useCallback((value: number, fromUnit: string, toUnit: string): number | string => {
    if (loading) return "Loading...";
    if (error || !rates) return "Error"; // Keep it short for the input field
    if (fromUnit === toUnit) return value;

    const fromRate = rates[fromUnit];
    const toRate = rates[toUnit];

    if (fromRate === undefined || fromRate === null) {
        console.warn(`Rate unavailable for ${fromUnit}`);
        return `Rate N/A`;
      }
      if (toRate === undefined || toRate === null) {
        console.warn(`Rate unavailable for ${toUnit}`);
        return `Rate N/A`;
      }

      if (fromRate === 0) {
         console.warn(`Rate for ${fromUnit} is zero, cannot convert.`);
         return "Invalid Rate";
      }

    // Since all rates are relative to BASE_CURRENCY (e.g., USD):
    // Value in BASE = value * (1 / fromRate)
    // Value in Target = Value in BASE * toRate
    // Simplified: Value in Target = value * (toRate / fromRate)
    const result = value * (toRate / fromRate);

    // Return a number for the layout component to format
    return result;

  }, [rates, error, loading]);


   if (loading && !rates) { // Only show full loader if rates haven't loaded at all
        return (
            <div className="flex items-center justify-center p-4 text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading exchange rates...
            </div>
        );
    }

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <ConverterLayout
        units={currencyUnits}
        // Default units will be handled by preferences or fallback in ConverterLayout
        conversionFn={convertCurrency}
        converterType="currency" // Pass the type for preference lookup
        isLoading={loading} // Pass loading state for individual calculations
        errorMessage={error ? "Rate Error" : undefined} // Pass error state as message
      />
    </>
  );
}
