
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateInvestmentGrowth } from '@/lib/formulas';
import { formatCurrency } from '@/lib/utils';
import type { InvestmentGrowthPoint } from '@/lib/types';
import { NumberInput } from '@/components/ui/number-input';

const formSchema = z.object({
  currentAge: z.number().min(18, "Must be at least 18").max(99),
  retirementAge: z.number().min(19, "Must be older than current age").max(100),
  currentSavings: z.number().min(0, "Cannot be negative"),
  monthlyContribution: z.number().min(0, "Cannot be negative"),
  returnRate: z.number().min(0, "Cannot be negative").max(30, "Rate seems too high"),
}).refine(data => data.retirementAge > data.currentAge, {
  message: "Retirement age must be after current age.",
  path: ["retirementAge"],
});

type RetirementFormValues = z.infer<typeof formSchema>;

export function RetirementCalculator() {
  const [result, setResult] = useState<{ futureValue: number; totalContributions: number; totalGains: number } | null>(null);
  const [chartData, setChartData] = useState<InvestmentGrowthPoint[]>([]);

  const form = useForm<RetirementFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 25000,
      monthlyContribution: 500,
      returnRate: 7,
    },
  });

  function onSubmit(values: RetirementFormValues) {
    const years = values.retirementAge - values.currentAge;

    const { growthData, finalValue } = calculateInvestmentGrowth(
      values.currentSavings,
      values.monthlyContribution,
      years,
      values.returnRate
    );

    const totalContributions = values.currentSavings + values.monthlyContribution * years * 12;
    const totalGains = finalValue - totalContributions;

    setResult({
      futureValue: finalValue,
      totalContributions,
      totalGains,
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
              name="currentAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Age</FormLabel>
                  <FormControl><NumberInput {...field} allowDecimal={false} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="retirementAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retirement Age</FormLabel>
                  <FormControl><NumberInput {...field} allowDecimal={false} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="currentSavings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Savings ($)</FormLabel>
                  <FormControl><NumberInput {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyContribution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Contribution ($)</FormLabel>
                  <FormControl><NumberInput {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="returnRate"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Expected Annual Return (%)</FormLabel>
                  <FormControl><NumberInput {...field} /></FormControl>
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
            <h3 className="text-xl font-semibold text-center">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-muted-foreground">Retirement Nest Egg</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(result.futureValue)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-muted-foreground">Total Contributions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatCurrency(result.totalContributions)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-muted-foreground">Total Gains</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(result.totalGains)}</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator />
          <div className="space-y-4">
             <h3 className="text-xl font-semibold text-center">Portfolio Growth Until Retirement</h3>
            <div className="w-full h-[400px]">
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: 'Years from now', position: 'insideBottom', offset: -5 }} />
                  <YAxis tickFormatter={(value) => formatCurrency(value, 0)} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="contributions" stackId="a" fill="hsl(var(--chart-1))" name="Total Contributions" />
                  <Bar dataKey="gains" stackId="a" fill="hsl(var(--chart-2))" name="Total Gains" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
