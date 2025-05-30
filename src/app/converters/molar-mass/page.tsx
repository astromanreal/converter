
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { MolarMassConverter } from '@/components/converters/chemistry/molar-mass-converter';

const pageTitle = 'Molar Mass Calculator - Chemistry Tool';
const pageDescription = 'Accurately calculate the molar mass (g/mol) of any chemical formula with SmartConvert. Essential tool for students and chemistry professionals.';
const canonicalUrl = '/converters/molar-mass';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'molar mass calculator', 'molecular weight calculator', 'chemistry calculator',
    'g/mol calculator', 'chemical formula mass', 'stoichiometry tool', 'SmartConvert',
    'atomic mass', 'compound mass', 'online chemistry tool'
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteUrl}${canonicalUrl}`,
    type: 'website',
    // images: Inherit from layout or add specific image
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    // images: Inherit from layout or add specific image
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
          <Separator className="my-8" />
          <div className="mt-8 p-4 border border-dashed rounded-lg text-center text-muted-foreground bg-muted/20">
            <p className="text-sm">Advertisement Placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
