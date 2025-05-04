
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { MolarMassConverter } from '@/components/converters/chemistry/molar-mass-converter';

export const metadata: Metadata = {
  title: 'Molar Mass Calculator',
  description: 'Calculate the molar mass (g/mol) of a chemical formula.',
  alternates: {
    canonical: '/converters/molar-mass',
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
