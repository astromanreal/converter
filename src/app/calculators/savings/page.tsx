
import type { Metadata } from 'next';
import { SavingsCalculator } from '@/components/calculators/savings-calculator';
import { InfoCard } from '@/components/ui/info-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PiggyBank, Target, CalendarClock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Savings Goal Planner',
  description: 'Calculate the monthly savings required to reach a specific financial goal by a target date, factoring in the power of compound interest.',
  keywords: ['savings goal calculator', 'savings planner', 'compound interest', 'future value', 'how much to save', 'financial goal planner'],
};

export default function SavingsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2 shadow-lg">
        <CardHeader>
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                    <PiggyBank className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <CardTitle>Savings Goal Planner</CardTitle>
                    <CardDescription>Find out how much to save for your goals.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <SavingsCalculator />
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Learn About Saving</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="compound-interest">
                <AccordionTrigger>The Power of Compound Interest</AccordionTrigger>
                <AccordionContent>
                  Compound interest is "interest on interest." It means the interest you earn also starts earning interest, causing your savings to grow at an accelerating rate over time. It's the most powerful force in building wealth.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="strategy">
                <AccordionTrigger>Effective Saving Strategies</AccordionTrigger>
                <AccordionContent>
                  The best strategy is to "pay yourself first." Set up automatic transfers to your savings account on payday. This ensures you're consistently working toward your goal before you have a chance to spend the money elsewhere.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        <InfoCard
          icon={Target}
          title="Set Specific Goals"
          description="It's easier to save when you have a clear target, like a down payment for a house, a new car, or a vacation. Use this calculator to make your goal concrete."
        />
        <InfoCard
          icon={CalendarClock}
          title="Time is Your Ally"
          description="Adjust the time horizon to see how saving for longer can significantly reduce the required monthly amount, thanks to the magic of compounding."
        />
      </div>
    </div>
  );
}
