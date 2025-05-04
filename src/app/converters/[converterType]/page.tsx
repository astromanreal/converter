
import type { Metadata } from 'next';
import { CurrencyConverter } from '@/components/converters/currency-converter';
import { DistanceConverter } from '@/components/converters/distance-converter';
import { WeightConverter } from '@/components/converters/weight-converter';
import { TemperatureConverter } from '@/components/converters/temperature-converter';
import { TimeConverter } from '@/components/converters/time-converter';
import { VolumeConverter } from '@/components/converters/volume-converter';
import { SpeedConverter } from '@/components/converters/speed-converter';
import { AreaConverter } from '@/components/converters/area-converter';
import { DataStorageConverter } from '@/components/converters/data-storage-converter';
import { EnergyConverter } from '@/components/converters/energy-converter';
import { PressureConverter } from '@/components/converters/pressure-converter';
import { PowerConverter } from '@/components/converters/power-converter';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ConverterPageProps {
  params: {
    converterType: string;
  };
}

// Define a mapping from converterType to its component, title, and description
const converterComponents: { [key: string]: { Component: React.ComponentType<any>; title: string; description: string } } = {
  currency: { Component: CurrencyConverter, title: 'Currency Converter', description: 'Convert between different world currencies like USD, EUR, INR, etc.' },
  distance: { Component: DistanceConverter, title: 'Distance Converter', description: 'Convert units of length like kilometers, miles, meters, feet, etc.' },
  weight: { Component: WeightConverter, title: 'Weight/Mass Converter', description: 'Convert units of weight and mass like kilograms, pounds, ounces, stones, etc.' },
  temperature: { Component: TemperatureConverter, title: 'Temperature Converter', description: 'Convert between Celsius (°C), Fahrenheit (°F), and Kelvin (K).' },
  time: { Component: TimeConverter, title: 'Time Converter', description: 'Convert units of time like seconds, minutes, hours, days, weeks, etc.' },
  volume: { Component: VolumeConverter, title: 'Volume Converter', description: 'Convert units of volume like liters, gallons, cubic meters, pints, etc.' },
  speed: { Component: SpeedConverter, title: 'Speed Converter', description: 'Convert units of speed like km/h, mph, m/s, knots, etc.' },
  area: { Component: AreaConverter, title: 'Area Converter', description: 'Convert units of area like square meters (m²), square feet (ft²), acres (ac), hectares (ha), etc.' },
  'data-storage': { Component: DataStorageConverter, title: 'Data Storage Converter', description: 'Convert units of digital information like bytes (B), kilobytes (KB), megabytes (MB), gigabytes (GB), etc.' },
  energy: { Component: EnergyConverter, title: 'Energy Converter', description: 'Convert units of energy like joules (J), calories (cal), kilowatt-hours (kWh), BTU, etc.' },
  pressure: { Component: PressureConverter, title: 'Pressure Converter', description: 'Convert units of pressure like pascals (Pa), psi, atmospheres (atm), bar, etc.' },
  power: { Component: PowerConverter, title: 'Power Converter', description: 'Convert units of power like watts (W), horsepower (hp), etc.' },
};

export async function generateStaticParams() {
  return Object.keys(converterComponents).map((key) => ({
    converterType: key,
  }));
}

export default function ConverterPage({ params }: ConverterPageProps) {
  const converterType = params.converterType;
  const converterInfo = converterComponents[converterType];

  if (!converterInfo) {
    notFound();
  }

  const { Component, title, description } = converterInfo;

  return (
    <div className="container mx-auto px-4 py-8">
        <Button asChild variant="outline" className="mb-6">
            <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
        </Button>
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Render the specific converter component */}
          <Component />

          {/* Ad Placeholder Section */}
          <Separator className="my-8" />
          <div className="mt-8 p-4 border border-dashed rounded-lg text-center text-muted-foreground bg-muted/20">
            <p className="text-sm">Advertisement Placeholder</p>
            {/* You can add more styling or a placeholder image here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Generate specific metadata for each converter page
export async function generateMetadata({ params }: ConverterPageProps): Promise<Metadata> {
  const converterType = params.converterType;
  const converterInfo = converterComponents[converterType];

  if (!converterInfo) {
    return {
      title: 'Converter Not Found',
      description: 'The requested converter could not be found.',
    };
  }

  const { title, description } = converterInfo;

  return {
    title: `${title}`, // Template in RootLayout adds "| SmartConvert"
    description: description,
    alternates: {
        canonical: `/converters/${converterType}`, // Add canonical URL
    },
  };
}
