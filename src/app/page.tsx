
'use client'; // Add 'use client' because SearchConverters is a Client Component and receives non-serializable props (icons)

import { SearchConverters } from '@/components/search-converters'; // Import the new search component
import { ConverterCard } from '@/components/converter-card';
import { Separator } from '@/components/ui/separator';
import {
  AreaChart,
  Thermometer,
  Clock,
  Scale,
  Ruler,
  GaugeCircle, // Corrected: Using GaugeCircle instead of Speedometer
  DollarSign,
  Container,
  Database,
  Bolt, // Used for Energy
  Gauge, // Used for Pressure
  Power,
  FlaskConical, // For Molar Mass
  Beaker, // For pH
  CircuitBoard // For Ohm's Law
} from 'lucide-react';

// Keep converterCategories data for search and card display
export const converterCategories = [
  { name: 'Currency Converter', icon: DollarSign, path: '/converters/currency', description: 'Convert between different currencies.' },
  { name: 'Distance Converter', icon: Ruler, path: '/converters/distance', description: 'Convert units of length.' },
  { name: 'Weight/Mass Converter', icon: Scale, path: '/converters/weight', description: 'Convert units of weight and mass.' },
  { name: 'Temperature Converter', icon: Thermometer, path: '/converters/temperature', description: 'Convert temperature scales.' },
  { name: 'Time Converter', icon: Clock, path: '/converters/time', description: 'Convert units of time.' },
  { name: 'Volume Converter', icon: Container, path: '/converters/volume', description: 'Convert units of volume.' },
  { name: 'Speed Converter', icon: GaugeCircle, path: '/converters/speed', description: 'Convert units of speed.' }, // Use GaugeCircle
  { name: 'Area Converter', icon: AreaChart, path: '/converters/area', description: 'Convert units of area.' },
  { name: 'Data Storage Converter', icon: Database, path: '/converters/data-storage', description: 'Convert units of digital information.' },
  { name: 'Energy Converter', icon: Bolt, path: '/converters/energy', description: 'Convert units of energy.' },
  { name: 'Pressure Converter', icon: Gauge, path: '/converters/pressure', description: 'Convert units of pressure.' },
  { name: 'Power Converter', icon: Power, path: '/converters/power', description: 'Convert units of power.' },
  { name: 'Molar Mass Calculator', icon: FlaskConical, path: '/converters/molar-mass', description: 'Calculate molar mass of formulas.' },
  { name: 'pH Calculator', icon: Beaker, path: '/converters/ph-calculator', description: 'Calculate pH, pOH, [H+], or [OH-].' },
  { name: 'Ohm\'s Law Calculator', icon: CircuitBoard, path: '/converters/ohms-law', description: 'Calculate V, I, or R (Ohm\'s Law).' },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12"> {/* Increased py padding */}
      {/* Enhanced Hero Section */}
      {/* Removed overflow-hidden to allow search dropdown visibility */}
      <section className="mb-16 text-center relative rounded-lg bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-inner border border-border/50">
         {/* Subtle background pattern (optional) */}
         <div className="absolute inset-0 opacity-5 pattern-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCcgdmlld0JveD0nMCAwIDEwIDEwJz48cGF0aCBkPSdNMCAwIEwxMCAxMCBNMTAgMCBMMCAxMCcgc3Ryb2tlLWxpbmVjYXA9J3NxdWFyZScgc3Ryb2tlPSdoZWxsbwo0NTAlJyBzdHJva2Utd2lkdGg9JzAuNScvPjwvc3ZnPg==')]"></div>

        <h1 className="text-5xl font-extrabold tracking-tight text-primary mb-4 relative z-10">
          Welcome to SmartConvert
        </h1>
        <p className="text-xl text-muted-foreground mb-8 relative z-10">
          Your intelligent all-in-one converter. Search for a converter below or browse the categories.
        </p>
        {/* Ensure this div has relative positioning and sufficient z-index */}
        <div className="relative z-10 max-w-2xl mx-auto">
            {/* Pass categories without icons to SearchConverters */}
            <SearchConverters categories={converterCategories.map(({ icon, ...rest }) => rest)} />
        </div>
      </section>

      {/* Separator (Optional) */}
      {/* <Separator className="my-12 bg-gradient-to-r from-transparent via-border to-transparent" /> */}

      <section>
        <h2 className="text-3xl font-semibold tracking-tight text-center mb-10 text-foreground">
          Explore Converters
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {converterCategories.map((category) => (
            <ConverterCard
              key={category.name}
              name={category.name}
              icon={category.icon} // Pass the icon component itself
              path={category.path}
              description={category.description}
            />
          ))}
        </div>
      </section>

       {/* Ad Placeholder Section */}
        <Separator className="my-12" />
        <section className="mt-12">
             <div className="mt-8 p-4 border border-dashed rounded-lg text-center text-muted-foreground bg-muted/20 max-w-4xl mx-auto">
                 <p className="text-sm font-medium">Advertisement</p>
                 <p className="text-xs mt-1">Ad placeholder - relevant ad content would be displayed here.</p>
                 {/* Example: You could place an ad script or image here */}
                 {/* <img src="/path/to/ad-image.jpg" alt="Advertisement" className="mx-auto mt-2 max-h-40"/> */}
             </div>
        </section>

    </div>
  );
}

