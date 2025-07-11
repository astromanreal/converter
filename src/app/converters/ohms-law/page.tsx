
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, BookOpen, CircuitBoard, Lightbulb, Zap } from 'lucide-react';
import { OhmsLawCalculator } from '@/components/converters/electrical/ohms-law-calculator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const pageTitle = "Ohm's Law Calculator - V, I, R Online Tool";
const pageDescription = "Use SmartConvert's Ohm's Law Calculator to find Voltage (V), Current (I), or Resistance (R) when two values are known. V=IR calculator for electrical engineering and physics.";
const canonicalUrl = '/converters/ohms-law';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "ohm's law calculator", 'voltage calculator', 'current calculator', 'resistance calculator',
    'V=IR calculator', 'electrical calculator', 'physics calculator', 'circuit analysis',
    'amps volts ohms', 'SmartConvert', 'online electrical tool'
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteUrl}${canonicalUrl}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
  },
};

export default function OhmsLawPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <Button asChild variant="outline" className="mb-6">
            <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
        </Button>
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              <CircuitBoard /> Ohm's Law Calculator
          </CardTitle>
          <CardDescription>Calculate Voltage, Current, or Resistance based on the other two values.</CardDescription>
        </CardHeader>
        <CardContent>
          <OhmsLawCalculator />
        </CardContent>
        <Separator className="my-4" />
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="learn-ohms-law">
              <AccordionTrigger className="text-lg font-semibold text-primary/90 hover:no-underline">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learn About Ohm's Law
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
                <p>Ohm's Law is a fundamental principle in electronics and physics. It states that the current through a conductor between two points is directly proportional to the voltage across those two points.</p>

                <div className="p-3 rounded-md border bg-muted/50">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">The Formula Triangle</h4>
                  <p>The relationship is described by the formula <span className="font-mono text-foreground bg-background p-1 rounded">V = I × R</span>.</p>
                  <Table className="mt-2">
                    <TableHeader>
                      <TableRow>
                        <TableHead>To Find</TableHead>
                        <TableHead>Formula</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Voltage (V)</TableCell>
                        <TableCell className="font-mono">I × R</TableCell>
                        <TableCell>Current multiplied by Resistance</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Current (I)</TableCell>
                        <TableCell className="font-mono">V / R</TableCell>
                        <TableCell>Voltage divided by Resistance</TableCell>
                      </TableRow>
                       <TableRow>
                        <TableCell className="font-medium">Resistance (R)</TableCell>
                        <TableCell className="font-mono">V / I</TableCell>
                        <TableCell>Voltage divided by Current</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-3 rounded-md border bg-muted/50">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Zap className="h-4 w-4" /> Real-World Examples</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong className="text-foreground">LED Circuit:</strong> To power a 2V LED from a 9V battery, you need a resistor to limit the current and prevent the LED from burning out.</li>
                    <li><strong className="text-foreground">Phone Charger:</strong> A standard USB charger provides 5V. If your phone draws 2A of current, the effective resistance of its charging circuit is 2.5Ω (R = 5V / 2A).</li>
                    <li><strong className="text-foreground">Toaster:</strong> A toaster has a heating element with a specific resistance. When plugged into a 120V outlet, it draws a large current, generating heat.</li>
                  </ul>
                </div>

                 <div className="p-3 rounded-md border bg-muted/50">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Lightbulb className="h-4 w-4" /> Fun Fact</h4>
                  <p className="italic">The law was named after the German physicist Georg Ohm, who published his findings in 1827. His work was initially met with skepticism by the scientific community!</p>
                </div>

                 <div className="text-center pt-2">
                   <Button asChild variant="link">
                     <Link href="/learn?category=Electrical">
                       Explore More in Measurement Academy <ArrowRight className="ml-2 h-4 w-4" />
                     </Link>
                   </Button>
                 </div>

                 <Card className="mt-4 bg-secondary/40">
                   <CardHeader className="flex-row items-center justify-between p-4">
                     <div className="space-y-1">
                       <CardTitle className="text-base">Test Your Knowledge</CardTitle>
                       <CardDescription className="text-xs">Ready to test your circuit IQ?</CardDescription>
                     </div>
                     <Button asChild size="sm">
                       <Link href="/quiz">Take Ohm's Law Quiz</Link>
                     </Button>
                   </CardHeader>
                 </Card>

              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
