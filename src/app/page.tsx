
'use client';

import { ConverterCard } from '@/components/converter-card';
import { SearchConverters } from '@/components/search-converters';
import { Separator } from '@/components/ui/separator';
import {
  AreaChart,
  Thermometer,
  Clock,
  Scale,
  Ruler,
  GaugeCircle,
  DollarSign,
  Container,
  Database,
  Bolt,
  Gauge,
  Power,
  FlaskConical,
  Beaker,
  CircuitBoard,
  Fuel,
  BrainCircuit,
  BookOpen,
  Palette,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const allConverters = [
  { group: 'common', name: 'Currency Converter', icon: DollarSign, path: '/converters/currency', description: 'Convert between different currencies.' },
  { group: 'common', name: 'Distance Converter', icon: Ruler, path: '/converters/distance', description: 'Convert units of length.' },
  { group: 'common', name: 'Weight/Mass Converter', icon: Scale, path: '/converters/weight', description: 'Convert units of weight and mass.' },
  { group: 'common', name: 'Temperature Converter', icon: Thermometer, path: '/converters/temperature', description: 'Convert temperature scales.' },
  { group: 'common', name: 'Time Converter', icon: Clock, path: '/converters/time', description: 'Convert units of time.' },
  { group: 'common', name: 'Volume Converter', icon: Container, path: '/converters/volume', description: 'Convert units of volume.' },
  { group: 'common', name: 'Speed Converter', icon: GaugeCircle, path: '/converters/speed', description: 'Convert units of speed.' },
  { group: 'common', name: 'Area Converter', icon: AreaChart, path: '/converters/area', description: 'Convert units of area.' },
  
  { group: 'utility', name: 'Data Storage Converter', icon: Database, path: '/converters/data-storage', description: 'Convert units of digital information.' },
  { group: 'utility', name: 'Energy Converter', icon: Bolt, path: '/converters/energy', description: 'Convert units of energy.' },
  { group: 'utility', name: 'Pressure Converter', icon: Gauge, path: '/converters/pressure', description: 'Convert units of pressure.' },
  { group: 'utility', name: 'Power Converter', icon: Power, path: '/converters/power', description: 'Convert units of power.' },
  { group: 'utility', name: 'Fuel Economy Converter', icon: Fuel, path: '/converters/fuel-economy', description: 'Convert fuel efficiency units.' },
  
  { group: 'scientific', name: 'Molar Mass Calculator', icon: FlaskConical, path: '/converters/molar-mass', description: 'Calculate molar mass of formulas.' },
  { group: 'scientific', name: 'pH Calculator', icon: Beaker, path: '/converters/ph-calculator', description: 'Calculate pH, pOH, [H+], or [OH-].' },
  { group: 'scientific', name: 'Ohm\'s Law Calculator', icon: CircuitBoard, path: '/converters/ohms-law', description: 'Calculate V, I, or R (Ohm\'s Law).' },
];

const converterGroups = [
    { title: 'Common Converters', converters: allConverters.filter(c => c.group === 'common') },
    { title: 'Utility & Data Converters', converters: allConverters.filter(c => c.group === 'utility') },
    { title: 'Scientific & Electrical Tools', converters: allConverters.filter(c => c.group === 'scientific') }
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <div className="relative rounded-lg bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-inner border border-border/50 overflow-hidden">
          <div className="absolute inset-0 opacity-5 pattern-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPScyMCcgaGVpZ2h0PScyMCcgdmlld0JveD0nMCAwIDIwIDIwJz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9J25vbmUnLz48cGF0aCBkPSdNMCAwIEwxMCAxMCBNMTAgMCBMMCAxMCcgc3Ryb2tlLWxpbmVjYXA9J3NxdWFyZScgc3Ryb2tlPSdva3NsYSg0NSAlIDAgJSAvIDAuMyknIHN0cm9rZS13aWR0aD0nMC41Jy8+PC9zdmc+')]"></div>
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl"></div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-4 relative z-10">
            SmartConvert
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 relative z-10 max-w-3xl mx-auto">
            The intelligent, all-in-one converter for everyday units, scientific calculations, and everything in between.
          </p>
          <div className="relative z-10 max-w-2xl mx-auto">
              <SearchConverters categories={allConverters.map(({ icon, group, ...rest }) => rest)} />
          </div>
        </div>
      </section>

      <section className="space-y-16">
        {converterGroups.map(group => (
            <div key={group.title}>
                <h2 className="text-3xl font-semibold tracking-tight text-center mb-10 text-foreground">
                    {group.title}
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.converters.map((category) => (
                    <ConverterCard
                      key={category.name}
                      name={category.name}
                      icon={category.icon}
                      path={category.path}
                      description={category.description}
                    />
                  ))}
                </div>
            </div>
        ))}
      </section>

      <Separator className="my-16" />

      <section>
        <h2 className="text-3xl font-semibold tracking-tight text-center mb-10 text-foreground">
            Go Beyond Converting
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="flex flex-col text-center items-center p-6 transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
                        <BrainCircuit className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle>Quiz Mode</CardTitle>
                    <CardDescription>Test your knowledge with fun, interactive conversion challenges.</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                     <Button asChild>
                        <Link href="/quiz">Take a Quiz <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </CardContent>
            </Card>

             <Card className="flex flex-col text-center items-center p-6 transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
                        <BookOpen className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle>Measurement Academy</CardTitle>
                    <CardDescription>Learn the history and real-world application of different units.</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                     <Button asChild>
                        <Link href="/learn">Start Learning <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </CardContent>
            </Card>

             <Card className="flex flex-col text-center items-center p-6 transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
                        <Palette className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle>Customize Your View</CardTitle>
                    <CardDescription>Switch themes and set your preferred default units in the settings.</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                     <Button asChild>
                        <Link href="/settings">Go to Settings <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}
