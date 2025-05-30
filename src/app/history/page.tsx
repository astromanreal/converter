
import type { Metadata } from 'next';
import { HistoryList } from '@/components/history/history-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const pageTitle = 'Conversion History | SmartConvert';
const pageDescription = 'View your recent conversion history on SmartConvert. Your history is stored locally in your browser for quick access to past calculations.';
const canonicalUrl = '/history';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
   alternates: {
    canonical: canonicalUrl,
  },
  // No need for extensive keywords as it's a personal history page
  keywords: ['conversion history', 'my conversions', 'past calculations', 'SmartConvert history'],
  robots: {
    index: false, // Good: Prevents indexing of personal history
    follow: false,
  }
};

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Conversion History</CardTitle>
          <CardDescription>Your recent conversion history is stored locally in your browser.</CardDescription>
        </CardHeader>
        <CardContent>
          <HistoryList />
        </CardContent>
      </Card>
    </div>
  );
}
