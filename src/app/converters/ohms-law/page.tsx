
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { OhmsLawCalculator } from '@/components/converters/electrical/ohms-law-calculator';

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
          <CardTitle className="text-2xl font-bold text-primary">Ohm's Law Calculator</CardTitle>
          <CardDescription>Calculate Voltage, Current, or Resistance based on the other two values.</CardDescription>
        </CardHeader>
        <CardContent>
          <OhmsLawCalculator />
          <Separator className="my-8" />
          <div className="mt-8 p-4 border border-dashed rounded-lg text-center text-muted-foreground bg-muted/20">
            <p className="text-sm">Advertisement Placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
