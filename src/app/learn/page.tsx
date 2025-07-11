
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Scale, Thermometer, Ruler, Clock, FlaskConical, Database, CircuitBoard, DollarSign, Container, GaugeCircle, AreaChart, Bolt, Gauge, Power, Fuel } from 'lucide-react';
import { LearningModuleCard } from '@/components/learn/learning-module';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { learningContent } from '@/data/learning-content';

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
    "Length": Ruler,
    "Weight": Scale,
    "Temperature": Thermometer,
    "Time": Clock,
    "Chemistry": FlaskConical,
    "Data Storage": Database,
    "Electrical": CircuitBoard,
    "Currency": DollarSign,
    "Volume": Container,
    "Speed": GaugeCircle,
    "Area": AreaChart,
    "Energy": Bolt,
    "Pressure": Gauge,
    "Power": Power,
    "Fuel Economy": Fuel,
};

export default function LearningPage({ searchParams }: { searchParams?: { category?: string } }) {
  const groupedContent = groupContentByCategory(learningContent);
  const categories = Object.keys(groupedContent);

  const categoryFromQuery = searchParams?.category;
  const defaultTab = categoryFromQuery && categories.includes(categoryFromQuery) ? categoryFromQuery : categories[0];

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

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="h-auto flex-wrap justify-center mb-6">
          {categories.map((category) => {
            const Icon = categoryIcons[category] || BookOpen;
            return (
              <TabsTrigger
                key={category}
                value={category}
                className="flex items-center gap-2 px-3 py-1.5 text-sm m-1"
              >
                <Icon className="h-4 w-4" />
                {category}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0 pt-0">
             <h2 className="text-2xl font-semibold mb-8 mt-4 text-center">{category} Systems Explained</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedContent[category].map((module, index) => (
                <LearningModuleCard key={index} module={module} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
