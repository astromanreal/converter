
'use client';

// import type { Metadata } from 'next'; // Client component, metadata better in layout
import { SearchConverters } from '@/components/search-converters';
import { ConverterCard } from '@/components/converter-card';
import { Separator } from '@/components/ui/separator';
import {
  AreaChart,
  Thermometer,
  Clock,
  Scale,
  Ruler,
  GaugeCircle, // Used for Speed
  DollarSign,
  Container, // Used for Volume
  Database,
  Bolt, // Used for Energy
  Gauge, // Used for Pressure
  Power,
  FlaskConical, // Molar Mass
  Beaker, // pH Calculator
  CircuitBoard, // Ohm's Law
  Fuel, // Added for Fuel Economy
} from 'lucide-react';

// Note: Metadata for client components should be defined in parent or page.tsx if it's a server component
// For the homepage, it's often good to have specific ones.
// We'll rely on the layout's metadata for the homepage for now.

export const converterCategories = [
  { name: 'Currency Converter', icon: DollarSign, path: '/converters/currency', description: 'Convert between different currencies.' },
  { name: 'Distance Converter', icon: Ruler, path: '/converters/distance', description: 'Convert units of length.' },
  { name: 'Weight/Mass Converter', icon: Scale, path: '/converters/weight', description: 'Convert units of weight and mass.' },
  { name: 'Temperature Converter', icon: Thermometer, path: '/converters/temperature', description: 'Convert temperature scales.' },
  { name: 'Time Converter', icon: Clock, path: '/converters/time', description: 'Convert units of time.' },
  { name: 'Volume Converter', icon: Container, path: '/converters/volume', description: 'Convert units of volume.' },
  { name: 'Speed Converter', icon: GaugeCircle, path: '/converters/speed', description: 'Convert units of speed.' },
  { name: 'Area Converter', icon: AreaChart, path: '/converters/area', description: 'Convert units of area.' },
  { name: 'Data Storage Converter', icon: Database, path: '/converters/data-storage', description: 'Convert units of digital information.' },
  { name: 'Energy Converter', icon: Bolt, path: '/converters/energy', description: 'Convert units of energy.' },
  { name: 'Pressure Converter', icon: Gauge, path: '/converters/pressure', description: 'Convert units of pressure.' },
  { name: 'Power Converter', icon: Power, path: '/converters/power', description: 'Convert units of power.' },
  { name: 'Fuel Economy Converter', icon: Fuel, path: '/converters/fuel-economy', description: 'Convert fuel efficiency units.' },
  { name: 'Molar Mass Calculator', icon: FlaskConical, path: '/converters/molar-mass', description: 'Calculate molar mass of formulas.' },
  { name: 'pH Calculator', icon: Beaker, path: '/converters/ph-calculator', description: 'Calculate pH, pOH, [H+], or [OH-].' },
  { name: 'Ohm\'s Law Calculator', icon: CircuitBoard, path: '/converters/ohms-law', description: 'Calculate V, I, or R (Ohm\'s Law).' },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16 text-center relative rounded-lg bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-inner border border-border/50">
         <div className="absolute inset-0 opacity-5 pattern-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCcgdmlld0JveD0nMCAwIDEwIDEwJz48cGF0aCBkPSdNMCAwIEwxMCAxMCBNMTAgMCBMMCAxMCcgc3Ryb2tlLWxpbmVjYXA9J3NxdWFyZScgc3Ryb2tlPSdoZWxsbwo0NTAlJyBzdHJva2Utd2lkdGg9JzAuNScvPjwvc3ZnPg==')]"></div>

        <h1 className="text-5xl font-extrabold tracking-tight text-primary mb-4 relative z-10">
          Welcome to SmartConvert
        </h1>
        <p className="text-xl text-muted-foreground mb-8 relative z-10">
          Your intelligent all-in-one converter. Search for a converter below or browse the categories.
        </p>
        <div className="relative z-10 max-w-2xl mx-auto">
            <SearchConverters categories={converterCategories.map(({ icon, ...rest }) => rest)} />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold tracking-tight text-center mb-10 text-foreground">
          Explore Converters
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {converterCategories.map((category) => (
            <ConverterCard
              key={category.name}
              name={category.name}
              icon={category.icon}
              path={category.path}
              description={category.description}
            />
          ))}
        </div>
      </section>

       <Separator className="my-12" />
        <section className="mt-12">
             <div className="mt-8 p-4 border border-dashed rounded-lg text-center text-muted-foreground bg-muted/20 max-w-4xl mx-auto">
                 <p className="text-sm font-medium">Advertisement</p>
                 <p className="text-xs mt-1">Ad placeholder - relevant ad content would be displayed here.</p>
             </div>
        </section>

    </div>
  );
}
