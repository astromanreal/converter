
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
  initialInvestment: z.number().min(0, "Cannot be negative"),
  monthlyContribution: z.number().min(0, "Cannot be negative"),
  years: z.number().min(1, "Must be at least 1 year").max(50, "Maximum 50 years"),
  returnRate: z.number().min(0, "Cannot be negative").max(30, "Rate seems too high"),
});

type InvestmentFormValues = z.infer<typeof formSchema>;

export function InvestmentCalculator() {
  const [result, setResult] = useState<{ futureValue: number; totalContributions: number; totalGains: number } | null>(null);
  const [chartData, setChartData] = useState<InvestmentGrowthPoint[]>([]);

  const form = useForm<InvestmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialInvestment: 1000,
      monthlyContribution: 200,
      years: 10,
      returnRate: 7,
    },
  });

  function onSubmit(values: InvestmentFormValues) {
    const { growthData, finalValue } = calculateInvestmentGrowth(
      values.initialInvestment,
      values.monthlyContribution,
      values.years,
      values.returnRate
    );

    const totalContributions = values.initialInvestment + values.monthlyContribution * values.years * 12;
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
              name="initialInvestment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Investment ($)</FormLabel>
                  <FormControl>
                    <NumberInput {...field} />
                  </FormControl>
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
                  <FormLabel>Time Horizon (Years)</FormLabel>
                  <FormControl>
                    <NumberInput {...field} allowDecimal={false} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="returnRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Annual Return (%)</FormLabel>
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
            <h3 className="text-xl font-semibold text-center">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-muted-foreground">Future Value</CardTitle>
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
             <h3 className="text-xl font-semibold text-center">Investment Growth Over Time</h3>
            <div className="w-full h-[400px]">
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
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
