
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, BookOpen, Droplets, FlaskConical } from 'lucide-react';
import { PHCalculator } from '@/components/converters/chemistry/ph-calculator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const pageTitle = 'pH Calculator - Acidity & Alkalinity Tool';
const pageDescription = "Calculate pH, pOH, Hydrogen ion [H+], or Hydroxide ion [OH-] concentration with SmartConvert's pH calculator. Useful for chemistry, biology, and environmental science.";
const canonicalUrl = '/converters/ph-calculator';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'pH calculator', 'pOH calculator', 'hydrogen ion concentration', 'hydroxide ion concentration',
    '[H+] calculator', '[OH-] calculator', 'acidity calculator', 'alkalinity calculator',
    'chemistry tool', 'solution pH', 'SmartConvert', 'online pH tool'
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

export default function PHCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <Button asChild variant="outline" className="mb-6">
            <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
        </Button>
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">pH Calculator</CardTitle>
          <CardDescription>Calculate pH, pOH, H⁺ concentration, or OH⁻ concentration.</CardDescription>
        </CardHeader>
        <CardContent>
          <PHCalculator />
        </CardContent>

        <Separator className="my-4" />
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="learn-ph">
              <AccordionTrigger className="text-lg font-semibold text-primary/90 hover:no-underline">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learn About pH & pOH
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
                <p>The pH scale is a logarithmic scale used to specify the acidity or basicity of an aqueous solution. It's a fundamental concept in chemistry, biology, and environmental science.</p>
                
                <div className="p-3 rounded-md border bg-muted/50">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><FlaskConical className="h-4 w-4" /> Core Concepts</h4>
                  <p><strong className="text-foreground">pH:</strong> "Power of Hydrogen". Measures hydrogen ion [H⁺] concentration. The formula is <span className="font-mono text-xs bg-background p-1 rounded">pH = -log₁₀[H⁺]</span>.</p>
                  <p><strong className="text-foreground">pOH:</strong> "Power of Hydroxide". Measures hydroxide ion [OH⁻] concentration. The formula is <span className="font-mono text-xs bg-background p-1 rounded">pOH = -log₁₀[OH⁻]</span>.</p>
                   <p><strong className="text-foreground">Relationship:</strong> At 25°C, <span className="font-mono text-xs bg-background p-1 rounded">pH + pOH = 14</span>.</p>
                </div>

                <div className="p-3 rounded-md border bg-muted/50">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Droplets className="h-4 w-4" /> The pH Scale</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong className="text-red-500">Acidic (pH &lt; 7):</strong> High [H⁺] concentration. Examples: Lemon juice (pH 2), vinegar (pH 3).</li>
                    <li><strong className="text-green-500">Neutral (pH = 7):</strong> Equal [H⁺] and [OH⁻]. Example: Pure water.</li>
                    <li><strong className="text-blue-500">Basic/Alkaline (pH &gt; 7):</strong> Low [H⁺] concentration. Examples: Soap (pH 10), bleach (pH 13).</li>
                  </ul>
                </div>
                
                 <div className="p-3 rounded-md border bg-muted/50">
                  <h4 className="font-semibold text-foreground mb-2">Fun Fact</h4>
                  <p className="italic">Your blood maintains a tightly controlled pH of about 7.4. A deviation of just a few tenths can be life-threatening!</p>
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
                       <CardDescription className="text-xs">Can you balance acids and bases?</CardDescription>
                     </div>
                     <Button asChild size="sm">
                       <Link href="/quiz">Take pH Quiz</Link>
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
