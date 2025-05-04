
import type { Metadata } from 'next';
import { HistoryList } from '@/components/history/history-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Conversion History',
  description: 'View your recent conversion history stored locally in your browser.',
   alternates: {
    canonical: '/history', // Add canonical URL
  },
  robots: { // Prevent indexing of personal history page
    index: false,
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
