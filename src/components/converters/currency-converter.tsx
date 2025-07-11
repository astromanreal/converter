
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ConverterLayout } from './shared/converter-layout';
import { getExchangeRates } from '@/services/currency';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { currencyUnits } from '@/lib/units';
import { formatDistanceToNow } from 'date-fns';

const BASE_CURRENCY = 'USD';

export function CurrencyConverter() {
  const [rates, setRates] = useState<{ [key: string]: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);


  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedRates = await getExchangeRates();
      if (!fetchedRates[BASE_CURRENCY]) {
          fetchedRates[BASE_CURRENCY] = 1;
      }
      setRates(fetchedRates);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch exchange rates:", err);
      setError("Could not load exchange rates. Conversion may be unavailable or inaccurate. Please try again later.");
      setRates(null);
      setLastUpdated(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);


  const convertCurrency = useCallback((value: number, fromUnit: string, toUnit: string): number | string => {
    if (loading) return "Loading...";
    if (error || !rates) return "Error";
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

    const result = value * (toRate / fromRate);
    return result;

  }, [rates, error, loading]);

  const getRateInfo = useCallback((fromUnit: string, toUnit: string): {rate: string, lastUpdated: string} | null => {
      if (!rates || !lastUpdated || !fromUnit || !toUnit || fromUnit === toUnit) return null;

      const fromRate = rates[fromUnit];
      const toRate = rates[toUnit];

      if (!fromRate || !toRate) return null;

      const displayRate = (toRate / fromRate).toFixed(4);

      return {
          rate: `1 ${fromUnit} = ${displayRate} ${toUnit}`,
          lastUpdated: `(rates updated ${formatDistanceToNow(lastUpdated, { addSuffix: true })})`
      }
  }, [rates, lastUpdated]);


   if (loading && !rates) {
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
        conversionFn={convertCurrency}
        converterType="currency"
        isLoading={loading}
        errorMessage={error ? "Rate Error" : undefined}
        rateInfoFn={getRateInfo}
      />
    </>
  );
}
