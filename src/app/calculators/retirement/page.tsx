
import type { Metadata } from 'next';
import { RetirementCalculator } from '@/components/calculators/retirement-calculator';
import { InfoCard } from '@/components/ui/info-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, BadgeDollarSign, BrainCircuit } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Retirement Calculator',
  description: 'Estimate your total retirement savings based on your current age, savings, contributions, and expected return. Plan for your financial future and long-term goals.',
  keywords: ['retirement calculator', '401k calculator', 'IRA calculator', 'retirement savings', 'nest egg calculator', 'long-term investment'],
};

export default function RetirementPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2 shadow-lg">
        <CardHeader>
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                    <BarChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <CardTitle>Retirement Savings Calculator</CardTitle>
                    <CardDescription>Project your savings and plan for retirement.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <RetirementCalculator />
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Learn About Retirement</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="401k">
                <AccordionTrigger>401(k) / IRA Basics</AccordionTrigger>
                <AccordionContent>
                  These are tax-advantaged retirement accounts. A 401(k) is typically offered by an employer, who may offer a "match" (free money!). An IRA (Individual Retirement Account) is one you open yourself. Both help your money grow more efficiently than a standard brokerage account.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="inflation">
                <AccordionTrigger>The Impact of Inflation</AccordionTrigger>
                <AccordionContent>
                  Inflation is the rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling. A key goal of investing for retirement is to generate returns that outpace inflation, so your money doesn't lose value over time.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        <InfoCard
          icon={BadgeDollarSign}
          title="Employer Match"
          description="If your employer offers a 401(k) match, contribute at least enough to get the full match. It's an instant, guaranteed return on your investment!"
        />
        <InfoCard
          icon={BrainCircuit}
          title="Start Early"
          description="The most powerful factor in retirement saving is time. Thanks to compounding, even small amounts invested early can grow larger than big amounts invested later."
        />
      </div>
    </div>
  );
}
