
import type { Metadata } from 'next';
import { LoanCalculator } from '@/components/calculators/loan-calculator';
import { InfoCard } from '@/components/ui/info-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark, HandCoins, Percent } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Loan Calculator',
  description: 'Calculate monthly payments, total interest, and see a full amortization schedule for any type of loan, including mortgages, auto loans, or personal loans.',
  keywords: ['loan calculator', 'emi calculator', 'mortgage calculator', 'amortization schedule', 'loan payment calculator', 'total loan interest'],
};

export default function LoanPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2 shadow-lg">
        <CardHeader>
           <div className="flex items-center gap-3">
             <div className="p-2 bg-primary/10 rounded-md">
                <Landmark className="h-6 w-6 text-primary" />
             </div>
             <div>
                <CardTitle>Loan Payment Calculator</CardTitle>
                <CardDescription>Estimate your loan payments and total interest.</CardDescription>
             </div>
           </div>
        </CardHeader>
        <CardContent>
          <LoanCalculator />
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Learn About Loans</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="amortization">
                        <AccordionTrigger>What is Amortization?</AccordionTrigger>
                        <AccordionContent>
                        Amortization is the process of spreading out a loan into a series of fixed payments. Each payment consists of both principal and interest. In the beginning, a larger portion of your payment goes to interest. Over time, more of it goes toward paying down your principal.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="apr-vs-interest">
                        <AccordionTrigger>APR vs. Interest Rate</AccordionTrigger>
                        <AccordionContent>
                        The Interest Rate is the cost of borrowing the principal loan amount. The Annual Percentage Rate (APR) is a broader measure that includes the interest rate plus any lender fees or other costs, giving you a more complete picture of the loan's yearly cost.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
        <InfoCard 
          icon={HandCoins}
          title="Principal vs. Interest"
          description="Use the amortization chart to see how much of each payment goes towards the loan balance (principal) versus the cost of borrowing (interest)."
        />
        <InfoCard 
          icon={Percent}
          title="Impact of Interest Rate"
          description="Try changing the interest rate by a small amount. You'll see how even a fraction of a percent can significantly change the total interest paid over the life of the loan."
        />
      </div>
    </div>
  );
}
