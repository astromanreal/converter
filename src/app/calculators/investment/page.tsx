
import type { Metadata } from 'next';
import { InvestmentCalculator } from '@/components/calculators/investment-calculator';
import { InfoCard } from '@/components/ui/info-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart2, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Investment Return Calculator',
  description: 'Project the future value of your investments based on initial amount, contributions, time horizon, and expected annual return rate. Visualize your investment growth over time.',
  keywords: ['investment calculator', 'future value calculator', 'compound interest calculator', 'investment growth', 'CAGR', 'stock market calculator'],
};

export default function InvestmentPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-md">
                <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
                <CardTitle>Investment Return Calculator</CardTitle>
                <CardDescription>Forecast the future value of your investments.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <InvestmentCalculator />
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Learn About Investing</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="cagr">
                <AccordionTrigger>Compound Annual Growth Rate (CAGR)</AccordionTrigger>
                <AccordionContent>
                  CAGR is the average annual growth rate of an investment over a specified period longer than one year. It provides a smoothed representation of the investment's performance, making it easier to compare with other investments.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="volatility">
                <AccordionTrigger>Market Volatility & Risk</AccordionTrigger>
                <AccordionContent>
                  Volatility measures how much an investment's price fluctuates. Higher volatility means higher risk but also the potential for higher returns. It's important to remember that the "expected return rate" is an average; actual returns will vary year to year.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        <InfoCard
          icon={BarChart2}
          title="Visualize Your Growth"
          description="The chart shows how your investment can grow over time. Notice how the growth accelerates in later years—that's the power of compounding!"
        />
         <InfoCard
          icon={Briefcase}
          title="Risk vs. Return"
          description="Generally, investments with higher potential returns (like stocks) come with higher risk. Diversifying your portfolio can help manage this risk."
        />
      </div>
    </div>
  );
}
