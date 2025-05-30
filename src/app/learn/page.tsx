
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Scale, Thermometer, Ruler, Clock, FlaskConical, Database, CircuitBoard } from 'lucide-react';
import { LearningModuleCard } from '@/components/learn/learning-module';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { learningContent } from '@/data/learning-content';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const pageTitle = 'Measurement Academy - Learn About Units | SmartConvert';
const pageDescription = 'Explore the SmartConvert Measurement Academy to learn about different measurement systems, units, their history, and practical applications. Covers length, weight, temperature, chemistry, and more.';
const canonicalUrl = '/learn';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'learn units', 'measurement systems', 'metric system', 'imperial system', 'SI units',
    'unit history', 'conversion education', 'SmartConvert academy', 'science education',
    'math education', 'understanding measurements'
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

const groupContentByCategory = (content: typeof learningContent) => {
  return content.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof learningContent>);
};

const categoryIcons: Record<string, React.ElementType> = {
    Length: Ruler,
    Weight: Scale,
    Temperature: Thermometer,
    Time: Clock,
    Chemistry: FlaskConical,
    "Data Storage": Database,
    "Electrical": CircuitBoard,
};

export default function LearningPage() {
  const groupedContent = groupContentByCategory(learningContent);
  const categories = Object.keys(groupedContent);

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>

      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-3 flex items-center justify-center">
          <BookOpen className="mr-3 h-8 w-8" /> Measurement Academy
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore the fascinating world of units and measurement systems.
        </p>
      </section>

      <Tabs defaultValue={categories[0]} className="w-full">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border mb-6">
            <div className="flex w-max space-x-2 p-2 justify-center mx-auto">
                <TabsList className="inline-flex h-auto">
                {categories.map((category) => {
                    const Icon = categoryIcons[category] || BookOpen;
                    return (
                        <TabsTrigger key={category} value={category} className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-3 py-1.5 sm:py-2 h-auto text-xs sm:text-sm">
                            <Icon className="h-4 w-4 mb-1 sm:mb-0"/>
                            {category}
                        </TabsTrigger>
                    );
                })}
                </TabsList>
            </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0 pt-0"> {/* Adjusted mt-6 to mt-0/pt-0 if title is separate */}
             <h2 className="text-2xl font-semibold mb-8 mt-4 text-center">{category} Systems Explained</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedContent[category].map((module, index) => (
                <LearningModuleCard key={index} module={module} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

        <Separator className="my-12" />
        <section className="mt-12">
             <div className="mt-8 p-4 border border-dashed rounded-lg text-center text-muted-foreground bg-muted/20 max-w-4xl mx-auto">
                 <p className="text-sm font-medium">Advertisement Placeholder</p>
                 <p className="text-xs mt-1">Relevant ad content could be displayed here.</p>
             </div>
        </section>
    </div>
  );
}
