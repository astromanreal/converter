
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateSavingsPlan } from '@/lib/formulas';
import { formatCurrency } from '@/lib/utils';
import type { InvestmentGrowthPoint } from '@/lib/types';
import { NumberInput } from '@/components/ui/number-input';

const formSchema = z.object({
  targetAmount: z.number().min(1, "Must be at least 1"),
  initialAmount: z.number().min(0, "Cannot be negative"),
  years: z.number().min(1, "Must be at least 1 year").max(50, "Maximum 50 years"),
  interestRate: z.number().min(0, "Cannot be negative").max(30, "Rate seems too high"),
});

type SavingsFormValues = z.infer<typeof formSchema>;

export function SavingsCalculator() {
  const [result, setResult] = useState<{ monthlySaving: number; totalSaved: number; totalInterest: number } | null>(null);
  const [chartData, setChartData] = useState<InvestmentGrowthPoint[]>([]);

  const form = useForm<SavingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetAmount: 50000,
      initialAmount: 1000,
      years: 5,
      interestRate: 4,
    },
  });

  function onSubmit(values: SavingsFormValues) {
    const { monthlySaving, growthData } = calculateSavingsPlan(
      values.targetAmount,
      values.initialAmount,
      values.years,
      values.interestRate
    );

    const totalSaved = values.initialAmount + monthlySaving * values.years * 12;
    const totalInterest = values.targetAmount - totalSaved;
    
    setResult({
      monthlySaving,
      totalSaved,
      totalInterest,
    });
    setChartData(growthData);
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="targetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Savings Goal ($)</FormLabel>
                  <FormControl>
                    <NumberInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="initialAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Savings ($)</FormLabel>
                  <FormControl>
                    <NumberInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="years"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time to Save (Years)</FormLabel>
                  <FormControl>
                    <NumberInput {...field} allowDecimal={false} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Annual Interest (%)</FormLabel>
                  <FormControl>
                    <NumberInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">Calculate</Button>
        </form>
      </Form>

      {result && (
        <>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">Your Savings Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-muted-foreground">Required Monthly Saving</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(result.monthlySaving)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-muted-foreground">Total You'll Save</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatCurrency(result.totalSaved)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-muted-foreground">Total Interest Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(result.totalInterest)}</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator />
          <div className="space-y-4">
             <h3 className="text-xl font-semibold text-center">Savings Growth Over Time</h3>
            <div className="w-full h-[400px]">
              <ResponsiveContainer>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => formatCurrency(value, 0)} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorValue)" name="Total Savings" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
