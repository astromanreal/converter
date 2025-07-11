
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Beaker, BookOpen, FlaskConical, TestTube } from 'lucide-react';
import { MolarMassConverter } from '@/components/converters/chemistry/molar-mass-converter';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const pageTitle = 'Molar Mass Calculator - Chemistry Tool';
const pageDescription = 'Accurately calculate the molar mass (g/mol) of any chemical formula with SmartConvert. Supports complex formulas, parentheses, and hydrates. Essential tool for students and chemistry professionals.';
const canonicalUrl = '/converters/molar-mass';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'molar mass calculator', 'molecular weight calculator', 'chemistry calculator',
    'g/mol calculator', 'chemical formula mass', 'stoichiometry tool', 'SmartConvert',
    'atomic mass', 'compound mass', 'online chemistry tool', 'formula parser', 'hydrates'
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

export default function MolarMassPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <Button asChild variant="outline" className="mb-6">
            <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
        </Button>
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Molar Mass Calculator</CardTitle>
          <CardDescription>Calculate the molar mass of a chemical compound based on its formula.</CardDescription>
        </CardHeader>
        <CardContent>
          <MolarMassConverter />
        </CardContent>

        <Separator className="my-4" />
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="learn-molar-mass">
              <AccordionTrigger className="text-lg font-semibold text-primary/90 hover:no-underline">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learn About Molar Mass
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
                <p>Molar mass is a fundamental concept in chemistry, representing the mass of one mole (approximately 6.022 x 10²³) of a substance. It's a bridge between the mass of a substance and the number of particles (atoms, molecules) it contains.</p>
                
                <div className="p-3 rounded-md border bg-muted/50">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><FlaskConical className="h-4 w-4" /> How It's Calculated</h4>
                  <p>To find the molar mass of a compound, you sum the atomic masses of all atoms present in its formula. Atomic masses are found on the periodic table.</p>
                  <p className="font-mono mt-2 text-xs bg-background p-2 rounded">
                    <strong>Example: Water (H₂O)</strong><br />
                    (2 × Atomic Mass of H) + (1 × Atomic Mass of O)<br />
                    (2 × 1.008 g/mol) + (1 × 15.999 g/mol) = <strong className="text-foreground">18.015 g/mol</strong>
                  </p>
                </div>

                <div className="p-3 rounded-md border bg-muted/50">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Beaker className="h-4 w-4" /> Real-World Use Cases</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong className="text-foreground">Stoichiometry:</strong> Determining the amount of reactants needed or products formed in a chemical reaction.</li>
                    <li><strong className="text-foreground">Lab Solutions:</strong> Preparing solutions of a specific molar concentration (molarity).</li>
                    <li><strong className="text-foreground">Pharmaceuticals:</strong> Calculating dosages and formulating medicines.</li>
                  </ul>
                </div>
                
                <div className="p-3 rounded-md border bg-muted/50">
                  <h4 className="font-semibold text-foreground mb-2">Fun Fact</h4>
                  <p className="italic">The molar mass of caffeine (C₈H₁₀N₄O₂) is 194.19 g/mol. A typical cup of coffee contains about 95 mg of caffeine, which is about 0.00049 moles of caffeine molecules!</p>
                </div>

                 <div className="text-center pt-2">
                   <Button asChild variant="link">
                     <Link href="/learn?category=Chemistry">
                       Explore More in Measurement Academy <ArrowRight className="ml-2 h-4 w-4" />
                     </Link>
                   </Button>
                 </div>

                 <Card className="mt-4 bg-secondary/40">
                   <CardHeader className="flex-row items-center justify-between p-4">
                     <div className="space-y-1">
                       <CardTitle className="text-base">Test Your Knowledge</CardTitle>
                       <CardDescription className="text-xs">Can you calculate molar mass correctly?</CardDescription>
                     </div>
                     <Button asChild size="sm">
                       <Link href="/quiz">Take Molar Mass Quiz</Link>
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
