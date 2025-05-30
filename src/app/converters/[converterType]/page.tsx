
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
import { FuelEconomyConverter } from '@/components/converters/fuel-economy-converter'; // Added
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

const converterDetails: {
    [key: string]: {
        Component: React.ComponentType<any>;
        title: string;
        description: string;
        keywords: string[];
    }
} = {
  currency: {
    Component: CurrencyConverter,
    title: 'Online Currency Converter',
    description: 'Easily convert between major world currencies like USD, EUR, GBP, JPY, INR, AUD, CAD. Get quick and accurate exchange rate conversions for your financial needs.',
    keywords: ['currency converter', 'exchange rate calculator', 'money converter', 'USD to EUR', 'EUR to INR', 'foreign exchange', 'online currency tool']
  },
  distance: {
    Component: DistanceConverter,
    title: 'Accurate Distance & Length Converter',
    description: 'Convert various units of distance and length: kilometers (km), miles (mi), meters (m), feet (ft), inches (in), yards (yd), centimeters (cm), millimeters (mm).',
    keywords: ['distance converter', 'length converter', 'metric to imperial length', 'km to miles', 'meters to feet', 'measurement conversion', 'unit converter distance']
  },
  weight: {
    Component: WeightConverter,
    title: 'Weight & Mass Unit Converter',
    description: 'Convert units of weight and mass including kilograms (kg), pounds (lb), grams (g), ounces (oz), stones (st), and metric tons (t). Ideal for cooking, science, and general use.',
    keywords: ['weight converter', 'mass converter', 'kg to lbs', 'grams to ounces', 'pounds to kg', 'unit converter weight', 'metric imperial weight']
  },
  temperature: {
    Component: TemperatureConverter,
    title: 'Precise Temperature Converter',
    description: 'Convert temperatures between Celsius (°C), Fahrenheit (°F), and Kelvin (K). Quick and easy for weather, cooking, or scientific calculations.',
    keywords: ['temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius', 'kelvin converter', 'temp conversion', 'unit converter temperature']
  },
  time: {
    Component: TimeConverter,
    title: 'Comprehensive Time Unit Converter',
    description: 'Convert various units of time: seconds (s), minutes (min), hours (h), days (d), weeks (wk), months (mo), years (yr), and milliseconds (ms).',
    keywords: ['time converter', 'duration converter', 'seconds to minutes', 'hours to days', 'time calculation', 'unit converter time']
  },
  volume: {
    Component: VolumeConverter,
    title: 'Versatile Volume Converter',
    description: 'Convert units of volume such as liters (L), milliliters (mL), US/UK gallons (gal), quarts (qt), pints (pt), cups, fluid ounces (fl oz), and cubic meters (m³).',
    keywords: ['volume converter', 'capacity converter', 'liters to gallons', 'ml to oz', 'liquid measurement', 'unit converter volume']
  },
  speed: {
    Component: SpeedConverter,
    title: 'Speed Unit Converter Online',
    description: 'Convert units of speed including meters per second (m/s), kilometers per hour (km/h), miles per hour (mph), feet per second (ft/s), and knots (kn).',
    keywords: ['speed converter', 'velocity converter', 'km/h to mph', 'm/s to ft/s', 'unit converter speed']
  },
  area: {
    Component: AreaConverter,
    title: 'Area Measurement Converter',
    description: 'Convert units of area like square meters (m²), square kilometers (km²), hectares (ha), square feet (ft²), square yards (yd²), acres (ac), and square miles (mi²).',
    keywords: ['area converter', 'land measurement converter', 'square meter to square feet', 'acre to hectare', 'unit converter area']
  },
  'data-storage': {
    Component: DataStorageConverter,
    title: 'Data Storage Unit Converter',
    description: 'Convert digital information units: Bytes (B), Kilobytes (KB), Kibibytes (KiB), Megabytes (MB), Mebibytes (MiB), Gigabytes (GB), Gibibytes (GiB), Terabytes (TB), Tebibytes (TiB), and bits (b).',
    keywords: ['data storage converter', 'file size converter', 'bytes to GB', 'MB to KB', 'digital units', 'binary decimal prefix', 'unit converter data']
  },
  energy: {
    Component: EnergyConverter,
    title: 'Energy Unit Converter',
    description: 'Convert units of energy including joules (J), kilojoules (kJ), calories (cal), kilocalories (kcal), watt-hours (Wh), kilowatt-hours (kWh), BTU, and foot-pounds (ft⋅lb).',
    keywords: ['energy converter', 'joules to calories', 'kwh converter', 'btu calculator', 'unit converter energy']
  },
  pressure: {
    Component: PressureConverter,
    title: 'Pressure Unit Converter',
    description: 'Convert various units of pressure: pascals (Pa), kilopascals (kPa), bar, pounds per square inch (psi), atmospheres (atm), and torr (mmHg).',
    keywords: ['pressure converter', 'psi to pascals', 'bar to atm', 'unit converter pressure', 'force area']
  },
  power: {
    Component: PowerConverter,
    title: 'Power Unit Converter',
    description: 'Convert units of power like watts (W), kilowatts (kW), megawatts (MW), metric horsepower (hp(M)), mechanical horsepower (hp(I)), BTU/hour, and foot-pounds/second.',
    keywords: ['power converter', 'watts to horsepower', 'kw converter', 'unit converter power', 'energy rate']
  },
  'fuel-economy': { // Added Fuel Economy
    Component: FuelEconomyConverter,
    title: 'Fuel Economy Converter',
    description: 'Convert fuel efficiency units: Miles per Gallon (US MPG, UK MPG), Liters per 100 kilometers (L/100km), and Kilometers per Liter (km/L).',
    keywords: ['fuel economy converter', 'mpg converter', 'l/100km converter', 'km/l converter', 'gas mileage calculator', 'fuel efficiency', 'vehicle consumption']
  },
};

export async function generateStaticParams() {
  return Object.keys(converterDetails).map((key) => ({
    converterType: key,
  }));
}

export default function ConverterPage({ params }: ConverterPageProps) {
  const converterType = params.converterType;
  const converterInfo = converterDetails[converterType];

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
          <Component />
          <Separator className="my-8" />
          <div className="mt-8 p-4 border border-dashed rounded-lg text-center text-muted-foreground bg-muted/20">
            <p className="text-sm">Advertisement Placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateMetadata({ params }: ConverterPageProps): Promise<Metadata> {
  const converterType = params.converterType;
  const converterInfo = converterDetails[converterType];

  if (!converterInfo) {
    return {
      title: 'Converter Not Found',
      description: 'The requested converter could not be found.',
    };
  }

  const { title, description, keywords } = converterInfo;
  const canonicalUrl = `${siteUrl}/converters/${converterType}`;

  return {
    title: `${title} | SmartConvert`,
    description: description,
    keywords: [...keywords, 'SmartConvert', 'online converter', 'unit conversion', 'calculator tool'],
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | SmartConvert`,
      description: description,
      url: canonicalUrl,
      type: 'website',
      // Images will inherit from RootLayout's default OG image
      // To have specific images per converter, you'd add:
      // images: [{ url: `${siteUrl}/og-images/${converterType}.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | SmartConvert`,
      description: description,
      // Images will inherit from RootLayout's default Twitter image
      // images: [`${siteUrl}/twitter-images/${converterType}.png`],
    },
  };
}
