
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react'; // Added BookOpen
import { PHCalculator } from '@/components/converters/chemistry/ph-calculator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'; // Added Tooltip

export const metadata: Metadata = {
  title: 'pH Calculator',
  description: 'Calculate pH, pOH, [H+], or [OH-] based on the known value.',
  alternates: {
    canonical: '/converters/ph-calculator',
  },
};

export default function PHCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <Button asChild variant="outline" className="mb-6">
            <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
        </Button>
      <Card className="w-full max-w-2xl mx-auto shadow-lg relative">
        <CardHeader>
           <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-2xl font-bold text-primary">pH Calculator</CardTitle>
                    <CardDescription>Calculate pH, pOH, H⁺ concentration, or OH⁻ concentration.</CardDescription>
                 </div>
                 {/* Learn More Tooltip */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                           <Button asChild variant="ghost" size="icon" className="ml-auto">
                               <Link href="/learn">
                                   <BookOpen className="h-5 w-5 text-muted-foreground hover:text-primary" />
                               </Link>
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Learn more about pH</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </CardHeader>
        <CardContent>
          <PHCalculator />

          {/* Ad Placeholder Section */}
          <Separator className="my-8" />
          <div className="mt-8 p-4 border border-dashed rounded-lg text-center text-muted-foreground bg-muted/20">
            <p className="text-sm">Advertisement Placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
