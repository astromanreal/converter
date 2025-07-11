
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateAmortization } from '@/lib/formulas';
import { formatCurrency } from '@/lib/utils';
import type { AmortizationPoint } from '@/lib/types';
import { NumberInput } from '@/components/ui/number-input';

const formSchema = z.object({
  loanAmount: z.number().min(1, "Must be at least 1"),
  interestRate: z.number().min(0.1, "Rate must be positive").max(50, "Rate seems too high"),
  loanTerm: z.number().min(1, "Term must be at least 1 year").max(40, "Maximum 40 years"),
});

type LoanFormValues = z.infer<typeof formSchema>;

export function LoanCalculator() {
  const [result, setResult] = useState<{ monthlyPayment: number; totalPayment: number; totalInterest: number } | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationPoint[]>([]);

  const form = useForm<LoanFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanAmount: 250000,
      interestRate: 6.5,
      loanTerm: 30,
    },
  });

  function onSubmit(values: LoanFormValues) {
    const { schedule, monthlyPayment, totalPayment, totalInterest } = calculateAmortization(
      values.loanAmount,
      values.interestRate,
      values.loanTerm
    );
    setResult({ monthlyPayment, totalPayment, totalInterest });
    setAmortizationSchedule(schedule);
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="loanAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Amount ($)</FormLabel>
                  <FormControl>
                    <NumberInput {...field} />
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
                  <FormLabel>Interest Rate (%)</FormLabel>
                  <FormControl>
                    <NumberInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="loanTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Term (Years)</FormLabel>
                  <FormControl>
                    <NumberInput {...field} allowDecimal={false} />
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
                  <CardTitle className="text-base text-muted-foreground">Monthly Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(result.monthlyPayment)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-muted-foreground">Total Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatCurrency(result.totalPayment)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-muted-foreground">Total Interest</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-destructive">{formatCurrency(result.totalInterest)}</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator />
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">Payment Breakdown</h3>
            <div className="w-full h-[300px]">
              <ResponsiveContainer>
                <BarChart data={amortizationSchedule.filter(p => p.month % 12 === 0)} stackOffset="expand">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `${Math.round(value * 100)}%`} />
                  <Tooltip formatter={(value, name, props) => formatCurrency(props.payload.interest + props.payload.principal)} />
                  <Legend />
                  <Bar dataKey="principal" stackId="a" name="Principal" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="interest" stackId="a" name="Interest" fill="hsl(var(--chart-5))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <h3 className="text-xl font-semibold text-center pt-4">Amortization Schedule</h3>
            <ScrollArea className="h-[400px] border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead className="text-right">Interest Paid</TableHead>
                    <TableHead className="text-right">Principal Paid</TableHead>
                    <TableHead className="text-right">Remaining Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {amortizationSchedule.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell className="text-right text-destructive">{formatCurrency(row.interest)}</TableCell>
                      <TableCell className="text-right text-green-600">{formatCurrency(row.principal)}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(row.remainingBalance)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  );
}
