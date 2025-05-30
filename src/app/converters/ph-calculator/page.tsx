
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PHCalculator } from '@/components/converters/chemistry/ph-calculator';

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
          <Separator className="my-8" />
          <div className="mt-8 p-4 border border-dashed rounded-lg text-center text-muted-foreground bg-muted/20">
            <p className="text-sm">Advertisement Placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
