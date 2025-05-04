
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Scale, Thermometer, Ruler, Clock, FlaskConical, Database, CircuitBoard } from 'lucide-react'; // Added CircuitBoard
import { LearningModuleCard } from '@/components/learn/learning-module';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { learningContent } from '@/data/learning-content'; // Assuming content is structured here
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // Import ScrollArea

export const metadata: Metadata = {
  title: 'Learning Mode - Measurement Academy',
  description: 'Learn about different measurement systems, units, and their history in the SmartConvert Measurement Academy.',
  alternates: {
    canonical: '/learn',
  },
};

// Helper to group content by category
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
    "Electrical": CircuitBoard, // Added Electrical icon
    // Add more icons as categories expand
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
        {/* Redesigned TabsList using ScrollArea for horizontal scrolling */}
        <ScrollArea className="w-full whitespace-nowrap rounded-md border mb-6">
            <div className="flex w-max space-x-2 p-2 justify-center mx-auto">
                <TabsList className="inline-flex h-auto"> {/* Adjust TabsList styling */}
                {categories.map((category) => {
                    const Icon = categoryIcons[category] || BookOpen; // Fallback icon
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
          <TabsContent key={category} value={category} className="mt-6">
             {/* Centered title with appropriate margins */}
             <h2 className="text-2xl font-semibold mb-8 mt-4 text-center">{category} Systems Explained</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedContent[category].map((module, index) => (
                <LearningModuleCard key={index} module={module} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

       {/* Ad Placeholder Section */}
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

