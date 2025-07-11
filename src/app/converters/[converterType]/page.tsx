
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
import { FuelEconomyConverter } from '@/components/converters/fuel-economy-converter';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Container, Droplets, Flag, GaugeCircle, Plane, Rabbit, Rocket, Ruler as RulerIcon, Scale, Ship, Thermometer, Timer, AreaChart, LandPlot, Database, FileText, Server, Smartphone, HardDrive, Bolt, Flame, Heart, Wrench, Gauge, Wind, HeartPulse, FlaskConical, Fuel, Car, Lightbulb, Landmark, Globe } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
  'fuel-economy': {
    Component: FuelEconomyConverter,
    title: 'Fuel Economy Converter',
    description: 'Convert fuel efficiency units: Miles per Gallon (US MPG, UK MPG), Liters per 100 kilometers (L/100km), and Kilometers per Liter (km/L).',
    keywords: ['fuel economy converter', 'mpg converter', 'l/100km converter', 'km/l converter', 'gas mileage calculator', 'fuel efficiency', 'vehicle consumption']
  },
};

const converterCategoryMap: { [key: string]: string } = {
  currency: 'Currency',
  distance: 'Length',
  weight: 'Weight',
  temperature: 'Temperature',
  time: 'Time',
  volume: 'Volume',
  speed: 'Speed',
  area: 'Area',
  'data-storage': 'Data Storage',
  energy: 'Energy',
  pressure: 'Pressure',
  power: 'Power',
  'fuel-economy': 'Fuel Economy',
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
  const academyCategory = converterCategoryMap[converterType] || '';
  const learnLink = `/learn?category=${encodeURIComponent(academyCategory)}`;

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
        </CardContent>

        {converterType === 'currency' && (
          <>
            <Separator className="my-4" />
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="learn-currency">
                  <AccordionTrigger className="text-lg font-semibold text-primary/90 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Learn About Currency & Exchange
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
                    <p>Currency exchange rates determine how much one currency is worth in relation to another. These rates fluctuate constantly based on economic factors like inflation, interest rates, and trade balances.</p>
                    
                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Landmark className="h-4 w-4" /> Major World Currencies</h4>
                      <p><strong className="text-foreground">US Dollar (USD):</strong> The world's primary reserve currency, used in most international transactions.</p>
                      <p><strong className="text-foreground">Euro (EUR):</strong> The official currency of the Eurozone, used by 20 of the 27 EU member states.</p>
                      <p><strong className="text-foreground">Japanese Yen (JPY):</strong> A key currency in global financial markets, known for its "safe-haven" status during economic uncertainty.</p>
                    </div>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Globe className="h-4 w-4" /> Fun Facts</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>The word "dollar" comes from "Joachimsthaler," a silver coin from a region in what is now the Czech Republic.</li>
                        <li>The British Pound Sterling (£) is the world's oldest currency still in use.</li>
                        <li>Before paper money, items like salt, shells, and cocoa beans were used as currency.</li>
                      </ul>
                    </div>
                    
                     <div className="text-center pt-2">
                       <Button asChild variant="link">
                         <Link href={learnLink}>
                           Explore More in Measurement Academy <ArrowRight className="ml-2 h-4 w-4" />
                         </Link>
                       </Button>
                     </div>

                     <Card className="mt-4 bg-secondary/40">
                       <CardHeader className="flex-row items-center justify-between p-4">
                         <div className="space-y-1">
                           <CardTitle className="text-base">Test Your Knowledge</CardTitle>
                           <CardDescription className="text-xs">Think you know your exchange rates?</CardDescription>
                         </div>
                         <Button asChild size="sm">
                           <Link href="/quiz">Take Currency Quiz</Link>
                         </Button>
                       </CardHeader>
                     </Card>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </>
        )}

        {converterType === 'distance' && (
          <>
            <Separator className="my-4" />
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="learn-distance">
                  <AccordionTrigger className="text-lg font-semibold text-primary/90 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Learn About Distance Units
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
                    <p>Understanding different units of distance is key to navigating the world, whether you're on a road trip or measuring a room.</p>
                    
                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Flag className="h-4 w-4" /> Systems Overview</h4>
                      <p><strong className="text-foreground">Metric System (m, km):</strong> Used by most of the world for its simplicity and base-10 structure.</p>
                      <p><strong className="text-foreground">Imperial System (in, ft, mi):</strong> Primarily used in the United States, with historical roots in Roman and British measurements.</p>
                    </div>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><RulerIcon className="h-4 w-4" /> Real-World Examples</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>A standard school bus is about 11 meters long.</li>
                        <li>Mount Everest is approximately 8,849 meters high.</li>
                        <li>The length of a marathon is 26.2 miles, which is about 42.195 kilometers.</li>
                      </ul>
                    </div>
                    
                     <div className="text-center pt-2">
                       <Button asChild variant="link">
                         <Link href={learnLink}>
                           Explore More in Measurement Academy <ArrowRight className="ml-2 h-4 w-4" />
                         </Link>
                       </Button>
                     </div>

                     <Card className="mt-4 bg-secondary/40">
                       <CardHeader className="flex-row items-center justify-between p-4">
                         <div className="space-y-1">
                           <CardTitle className="text-base">Test Your Knowledge</CardTitle>
                           <CardDescription className="text-xs">Ready to challenge yourself?</CardDescription>
                         </div>
                         <Button asChild size="sm">
                           <Link href="/quiz">Take Distance Quiz</Link>
                         </Button>
                       </CardHeader>
                     </Card>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </>
        )}

        {converterType === 'weight' && (
          <>
            <Separator className="my-4" />
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="learn-weight">
                  <AccordionTrigger className="text-lg font-semibold text-primary/90 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Learn About Weight & Mass Units
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
                    <p>Weight is the force of gravity on an object, while mass is the amount of matter in it. On Earth, we often use them interchangeably.</p>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Scale className="h-4 w-4" /> Systems Overview</h4>
                      <p><strong className="text-foreground">Metric System (kg, g):</strong> The global standard for scientific and most commercial purposes.</p>
                      <p><strong className="text-foreground">Imperial/US System (lb, oz):</strong> Used for everyday measurements in the United States.</p>
                      <p><strong className="text-foreground">Avoirdupois Weight:</strong> The system pounds and ounces belong to. The 'Stone' (14 lbs) is still commonly used for body weight in the UK.</p>
                    </div>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2">Real-World Examples</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>A standard can of soda weighs about 390 grams.</li>
                        <li>An average adult male weighs about 80 kilograms (or 176 pounds).</li>
                        <li>One US nickel coin has a mass of exactly 5 grams.</li>
                      </ul>
                    </div>

                     <div className="text-center pt-2">
                       <Button asChild variant="link">
                         <Link href={learnLink}>
                           Explore More in Measurement Academy <ArrowRight className="ml-2 h-4 w-4" />
                         </Link>
                       </Button>
                     </div>

                     <Card className="mt-4 bg-secondary/40">
                       <CardHeader className="flex-row items-center justify-between p-4">
                         <div className="space-y-1">
                           <CardTitle className="text-base">Test Your Knowledge</CardTitle>
                           <CardDescription className="text-xs">Ready to challenge yourself?</CardDescription>
                         </div>
                         <Button asChild size="sm">
                           <Link href="/quiz">Take Weight Quiz</Link>
                         </Button>
                       </CardHeader>
                     </Card>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </>
        )}

        {converterType === 'temperature' && (
          <>
            <Separator className="my-4" />
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="learn-temperature">
                  <AccordionTrigger className="text-lg font-semibold text-primary/90 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Learn About Temperature Scales
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
                    <p>Temperature measures how hot or cold something is. The three main scales—Celsius, Fahrenheit, and Kelvin—offer different ways to quantify this.</p>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Thermometer className="h-4 w-4" /> Scales Overview</h4>
                      <p><strong className="text-foreground">Celsius (°C):</strong> Part of the metric system, used globally for most everyday purposes. It's based on water's freezing (0°C) and boiling (100°C) points.</p>
                      <p><strong className="text-foreground">Fahrenheit (°F):</strong> Used primarily in the United States. Water freezes at 32°F and boils at 212°F.</p>
                      <p><strong className="text-foreground">Kelvin (K):</strong> The SI base unit for temperature, used in scientific contexts. It starts from absolute zero (0 K), the coldest possible temperature.</p>
                    </div>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2">Real-World Benchmarks</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Human body temperature is around 37°C or 98.6°F.</li>
                        <li>A comfortable room temperature is about 20-22°C (68-72°F).</li>
                        <li>Absolute zero is 0 K, which is -273.15°C or -459.67°F.</li>
                      </ul>
                    </div>

                     <div className="text-center pt-2">
                       <Button asChild variant="link">
                         <Link href={learnLink}>
                           Explore More in Measurement Academy <ArrowRight className="ml-2 h-4 w-4" />
                         </Link>
                       </Button>
                     </div>

                     <Card className="mt-4 bg-secondary/40">
                       <CardHeader className="flex-row items-center justify-between p-4">
                         <div className="space-y-1">
                           <CardTitle className="text-base">Test Your Knowledge</CardTitle>
                           <CardDescription className="text-xs">Ready to test your skills?</CardDescription>
                         </div>
                         <Button asChild size="sm">
                           <Link href="/quiz">Take Temperature Quiz</Link>
                         </Button>
                       </CardHeader>
                     </Card>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </>
        )}

        {converterType === 'time' && (
          <>
            <Separator className="my-4" />
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="learn-time">
                  <AccordionTrigger className="text-lg font-semibold text-primary/90 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Learn About Time Units
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
                    <p>Time is a fundamental concept measured universally, from fleeting milliseconds to vast millennia. Understanding its units is essential for daily life and science.</p>
                    
                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Clock className="h-4 w-4" /> Units Hierarchy</h4>
                      <p><strong className="text-foreground">Base Unit (SI):</strong> The second (s) is the scientific standard, historically defined as 1/86400 of a day.</p>
                      <p><strong className="text-foreground">Common Usage:</strong> We group seconds into minutes (60s), hours (60min), days (24h), and weeks (7d).</p>
                      <p><strong className="text-foreground">Calendars:</strong> Months and years are calendar-based and have variable lengths (e.g., February's 28/29 days, leap years).</p>
                    </div>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Timer className="h-4 w-4" /> Real-World Examples</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>A typical movie is about 2 hours long (7,200 seconds).</li>
                        <li>There are 86,400 seconds in one day.</li>
                        <li>One year contains approximately 31.5 million seconds.</li>
                      </ul>
                    </div>
                    
                     <div className="text-center pt-2">
                       <Button asChild variant="link">
                         <Link href={learnLink}>
                           Explore More in Measurement Academy <ArrowRight className="ml-2 h-4 w-4" />
                         </Link>
                       </Button>
                     </div>

                     <Card className="mt-4 bg-secondary/40">
                       <CardHeader className="flex-row items-center justify-between p-4">
                         <div className="space-y-1">
                           <CardTitle className="text-base">Test Your Knowledge</CardTitle>
                           <CardDescription className="text-xs">Think you're a master of time?</CardDescription>
                         </div>
                         <Button asChild size="sm">
                           <Link href="/quiz">Take Time Quiz</Link>
                         </Button>
                       </CardHeader>
                     </Card>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </>
        )}

        {converterType === 'volume' && (
          <>
            <Separator className="my-4" />
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="learn-volume">
                  <AccordionTrigger className="text-lg font-semibold text-primary/90 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Learn About Volume Units
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
                    <p>Volume measures the three-dimensional space an object occupies. Units vary significantly between metric and imperial systems, and even within the imperial system (US vs. UK).</p>
                    
                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Container className="h-4 w-4" /> Systems Overview</h4>
                      <p><strong className="text-foreground">Metric System (L, mL, m³):</strong> A logical, base-10 system used worldwide for science and most commerce.</p>
                      <p><strong className="text-foreground">US Customary (gal, qt, cup):</strong> Used for liquid measures in the United States.</p>
                      <p><strong className="text-foreground">UK Imperial (gal, pint):</strong> Similar to the US system but with different unit sizes. For example, a UK pint is ~20% larger than a US pint.</p>
                    </div>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Droplets className="h-4 w-4" /> Real-World Examples</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>A standard large soda bottle is 2 liters.</li>
                        <li>A typical can of soda is 355 milliliters (12 US fl oz).</li>
                        <li>An Olympic swimming pool holds about 2.5 million liters of water.</li>
                      </ul>
                    </div>
                    
                     <div className="text-center pt-2">
                       <Button asChild variant="link">
                         <Link href={learnLink}>
                           Explore More in Measurement Academy <ArrowRight className="ml-2 h-4 w-4" />
                         </Link>
                       </Button>
                     </div>

                     <Card className="mt-4 bg-secondary/40">
                       <CardHeader className="flex-row items-center justify-between p-4">
                         <div className="space-y-1">
                           <CardTitle className="text-base">Test Your Knowledge</CardTitle>
                           <CardDescription className="text-xs">Know your cups and gallons?</CardDescription>
                         </div>
                         <Button asChild size="sm">
                           <Link href="/quiz">Take Volume Quiz</Link>
                         </Button>
                       </CardHeader>
                     </Card>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </>
        )}

        {converterType === 'speed' && (
          <>
            <Separator className="my-4" />
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="learn-speed">
                  <AccordionTrigger className="text-lg font-semibold text-primary/90 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Learn About Speed Units
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
                    <p>Speed is the rate at which an object covers distance. Different units are used depending on the context, such as for roads, air travel, or maritime navigation.</p>
                    
                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><GaugeCircle className="h-4 w-4" /> Common Units</h4>
                      <p><strong className="text-foreground">km/h and mph:</strong> Used for vehicle speed in most parts of the world (km/h) and in countries like the US & UK (mph).</p>
                      <p><strong className="text-foreground">m/s:</strong> The standard SI unit for speed, often used in physics and scientific calculations.</p>
                      <p><strong className="text-foreground">Knots:</strong> Used in maritime and aviation. One knot is one nautical mile per hour.</p>
                    </div>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">Real-World Speed Examples</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li><span className="font-semibold">Cheetah:</span> The fastest land animal can run at ~112 km/h (~70 mph). <Rabbit className="inline h-4 w-4" /></li>
                        <li><span className="font-semibold">Commercial Jet:</span> Flies at a cruising speed of about 900 km/h (~560 mph). <Plane className="inline h-4 w-4" /></li>
                         <li><span className="font-semibold">ISS:</span> The International Space Station orbits Earth at a staggering ~28,000 km/h (~17,500 mph). <Rocket className="inline h-4 w-4" /></li>
                      </ul>
                    </div>
                    
                     <div className="text-center pt-2">
                       <Button asChild variant="link">
                         <Link href={learnLink}>
                           Explore More in Measurement Academy <ArrowRight className="ml-2 h-4 w-4" />
                         </Link>
                       </Button>
                     </div>

                     <Card className="mt-4 bg-secondary/40">
                       <CardHeader className="flex-row items-center justify-between p-4">
                         <div className="space-y-1">
                           <CardTitle className="text-base">Test Your Knowledge</CardTitle>
                           <CardDescription className="text-xs">How fast do you think light travels?</CardDescription>
                         </div>
                         <Button asChild size="sm">
                           <Link href="/quiz">Take Speed Quiz</Link>
                         </Button>
                       </CardHeader>
                     </Card>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </>
        )}

        {converterType === 'area' && (
          <>
            <Separator className="my-4" />
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="learn-area">
                  <AccordionTrigger className="text-lg font-semibold text-primary/90 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Learn About Area Units
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
                    <p>Area measures a two-dimensional surface. Units vary greatly from those used for a room's floor plan to those used for vast plots of land.</p>
                    
                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><LandPlot className="h-4 w-4" /> Systems Overview</h4>
                      <p><strong className="text-foreground">Metric System (m², ha):</strong> Square meters are the standard, while hectares (10,000 m²) are common for land.</p>
                      <p><strong className="text-foreground">Imperial/US System (ft², acre):</strong> Square feet are used for housing and interior spaces, while acres are used for land.</p>
                    </div>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><AreaChart className="h-4 w-4" /> Real-World Examples</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>An NFL football field is about 1.32 acres (or ~5,350 m²).</li>
                        <li>A standard tennis court is approximately 260 square meters.</li>
                        <li>Central Park in New York City covers about 3.41 square kilometers (843 acres).</li>
                      </ul>
                    </div>
                    
                     <div className="text-center pt-2">
                       <Button asChild variant="link">
                         <Link href={learnLink}>
                           Explore More in Measurement Academy <ArrowRight className="ml-2 h-4 w-4" />
                         </Link>
                       </Button>
                     </div>

                     <Card className="mt-4 bg-secondary/40">
                       <CardHeader className="flex-row items-center justify-between p-4">
                         <div className="space-y-1">
                           <CardTitle className="text-base">Test Your Knowledge</CardTitle>
                           <CardDescription className="text-xs">Know your hectares from acres?</CardDescription>
                         </div>
                         <Button asChild size="sm">
                           <Link href="/quiz">Take Area Quiz</Link>
                         </Button>
                       </CardHeader>
                     </Card>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </>
        )}

        {converterType === 'data-storage' && (
          <>
            <Separator className="my-4" />
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="learn-data-storage">
                  <AccordionTrigger className="text-lg font-semibold text-primary/90 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Learn About Data Units
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
                    <p>Digital information is measured in bits (the smallest unit) and bytes. Understanding the difference between decimal (powers of 1000) and binary (powers of 1024) prefixes is key.</p>
                    
                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><FileText className="h-4 w-4" /> Binary vs. Decimal</h4>
                      <p><strong className="text-foreground">Decimal (KB, MB, GB):</strong> Used by manufacturers to market storage capacity. 1 Kilobyte (KB) = 1000 Bytes.</p>
                      <p><strong className="text-foreground">Binary (KiB, MiB, GiB):</strong> Used by operating systems to report storage, reflecting how computers actually process data. 1 Kibibyte (KiB) = 1024 Bytes.</p>
                      <p className="text-xs italic">This is why a 1TB hard drive often shows up as about 931GiB in your system!</p>
                    </div>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><HardDrive className="h-4 w-4" /> Real-World Examples</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>A high-quality photo: ~2-5 Megabytes (MB)</li>
                        <li>An MP3 song: ~3-5 Megabytes (MB)</li>
                        <li>A standard HD movie: ~2-4 Gigabytes (GB)</li>
                        <li>A typical smartphone: 128-512 Gigabytes (GB) of storage</li>
                      </ul>
                    </div>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Server className="h-4 w-4" /> Fun Fact</h4>
                      <p>The first hard disk drive, the IBM 350 Disk File from 1956, could store about 3.75 MB of data and weighed over a ton!</p>
                    </div>
                    
                     <div className="text-center pt-2">
                       <Button asChild variant="link">
                         <Link href={learnLink}>
                           Explore More in Measurement Academy <ArrowRight className="ml-2 h-4 w-4" />
                         </Link>
                       </Button>
                     </div>

                     <Card className="mt-4 bg-secondary/40">
                       <CardHeader className="flex-row items-center justify-between p-4">
                         <div className="space-y-1">
                           <CardTitle className="text-base">Test Your Knowledge</CardTitle>
                           <CardDescription className="text-xs">Know your bits from your bytes?</CardDescription>
                         </div>
                         <Button asChild size="sm">
                           <Link href="/quiz">Take Data Units Quiz</Link>
                         </Button>
                       </CardHeader>
                     </Card>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </>
        )}

        {converterType === 'energy' && (
          <>
            <Separator className="my-4" />
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="learn-energy">
                  <AccordionTrigger className="text-lg font-semibold text-primary/90 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Learn About Energy Units
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
                    <p>Energy is the capacity to do work. It comes in many forms and is measured in various units depending on the context, from the food we eat to the electricity that powers our homes.</p>
                    
                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2">Use Cases</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2"><Bolt className="h-4 w-4 mt-0.5 text-yellow-500" /><div><strong className="text-foreground">Electrical:</strong> Watt-hours (Wh) and kilowatt-hours (kWh) measure electrical energy consumption. Your utility bill is typically in kWh.</div></li>
                        <li className="flex items-start gap-2"><Flame className="h-4 w-4 mt-0.5 text-red-500" /><div><strong className="text-foreground">Thermal:</strong> British Thermal Units (BTU) are often used for heating and cooling systems.</div></li>
                        <li className="flex items-start gap-2"><Heart className="h-4 w-4 mt-0.5 text-pink-500" /><div><strong className="text-foreground">Food:</strong> Calories (cal) and kilocalories (kcal) measure the energy content in food. Note: 1 food "Calorie" is actually 1 kilocalorie.</div></li>
                        <li className="flex items-start gap-2"><Wrench className="h-4 w-4 mt-0.5" /><div><strong className="text-foreground">Mechanical/Scientific:</strong> The Joule (J) is the standard SI unit for energy, used in physics and engineering.</div></li>
                      </ul>
                    </div>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2">Real-World Examples</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Lifting a small apple (102g) one meter high takes about 1 Joule of energy.</li>
                        <li>A slice of bread contains roughly 300 kilojoules (kJ) or 70 kilocalories (food Calories).</li>
                        <li>Burning a standard wooden matchstick releases about 1 BTU of heat.</li>
                      </ul>
                    </div>
                    
                     <div className="text-center pt-2">
                       <Button asChild variant="link">
                         <Link href={learnLink}>
                           Explore More in Measurement Academy <ArrowRight className="ml-2 h-4 w-4" />
                         </Link>
                       </Button>
                     </div>

                     <Card className="mt-4 bg-secondary/40">
                       <CardHeader className="flex-row items-center justify-between p-4">
                         <div className="space-y-1">
                           <CardTitle className="text-base">Test Your Knowledge</CardTitle>
                           <CardDescription className="text-xs">Think you know your Joules from your calories?</CardDescription>
                         </div>
                         <Button asChild size="sm">
                           <Link href="/quiz">Take Energy Quiz</Link>
                         </Button>
                       </CardHeader>
                     </Card>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </>
        )}

        {converterType === 'pressure' && (
          <>
            <Separator className="my-4" />
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="learn-pressure">
                  <AccordionTrigger className="text-lg font-semibold text-primary/90 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Learn About Pressure Units
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
                    <p>Pressure is the force applied perpendicular to the surface of an object per unit area. Different units are used in various fields like meteorology, engineering, and medicine.</p>
                    
                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2">Use Cases</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2"><Wind className="h-4 w-4 mt-0.5 text-blue-500" /><div><strong className="text-foreground">Atmosphere (atm) / Bar:</strong> Used in meteorology to measure atmospheric pressure. 1 atm is the average pressure at sea level.</div></li>
                        <li className="flex items-start gap-2"><Gauge className="h-4 w-4 mt-0.5 text-orange-500" /><div><strong className="text-foreground">Pounds per square inch (psi):</strong> Common in the US for measuring tire pressure, hydraulic systems, and gas cylinders.</div></li>
                        <li className="flex items-start gap-2"><HeartPulse className="h-4 w-4 mt-0.5 text-red-500" /><div><strong className="text-foreground">Torr / mmHg:</strong> Millimeters of mercury are used in medicine to measure blood pressure and in vacuum systems.</div></li>
                         <li className="flex items-start gap-2"><FlaskConical className="h-4 w-4 mt-0.5 text-purple-500" /><div><strong className="text-foreground">Pascal (Pa):</strong> The SI unit for pressure, used in scientific and engineering contexts. It represents one newton per square meter.</div></li>
                      </ul>
                    </div>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2">Real-World Examples</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Standard car tire pressure is around 32-35 psi.</li>
                        <li>A person's systolic blood pressure is typically around 120 mmHg.</li>
                        <li>The pressure at the bottom of the Mariana Trench is over 1000 atmospheres!</li>
                      </ul>
                    </div>
                    
                     <div className="text-center pt-2">
                       <Button asChild variant="link">
                         <Link href={learnLink}>
                           Explore More in Measurement Academy <ArrowRight className="ml-2 h-4 w-4" />
                         </Link>
                       </Button>
                     </div>

                     <Card className="mt-4 bg-secondary/40">
                       <CardHeader className="flex-row items-center justify-between p-4">
                         <div className="space-y-1">
                           <CardTitle className="text-base">Test Your Knowledge</CardTitle>
                           <CardDescription className="text-xs">Know your psi from your Pa?</CardDescription>
                         </div>
                         <Button asChild size="sm">
                           <Link href="/quiz">Take Pressure Quiz</Link>
                         </Button>
                       </CardHeader>
                     </Card>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </>
        )}

        {converterType === 'power' && (
          <>
            <Separator className="my-4" />
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="learn-power">
                  <AccordionTrigger className="text-lg font-semibold text-primary/90 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Learn About Power Units
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
                    <p>Power is the rate at which energy is transferred or work is done. It's measured in units that describe energy per unit of time, like Joules per second (which is a Watt).</p>
                    
                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2">Common Power Units</h4>
                       <ul className="space-y-2">
                        <li className="flex items-start gap-2"><Bolt className="h-4 w-4 mt-0.5 text-yellow-500" /><div><strong className="text-foreground">Watt (W):</strong> The standard SI unit of power. Commonly used for electrical appliances.</div></li>
                        <li className="flex items-start gap-2"><Wrench className="h-4 w-4 mt-0.5" /><div><strong className="text-foreground">Horsepower (hp):</strong> Traditionally used to measure the power of engines. 1 mechanical horsepower is about 746 Watts.</div></li>
                        <li className="flex items-start gap-2"><Flame className="h-4 w-4 mt-0.5 text-red-500" /><div><strong className="text-foreground">BTU per hour (BTU/h):</strong> Often used for heating and cooling systems like air conditioners.</div></li>
                      </ul>
                    </div>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2">Real-World Examples</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>A typical LED light bulb might use about 10 Watts.</li>
                        <li>A standard car engine can produce around 120-200 horsepower.</li>
                        <li>A microwave oven uses around 800-1200 Watts of power.</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2">Fun Fact</h4>
                      <p>The term 'horsepower' was coined by Scottish engineer James Watt to compare the output of steam engines with the power of draft horses.</p>
                    </div>

                     <div className="text-center pt-2">
                       <Button asChild variant="link">
                         <Link href={learnLink}>
                           Explore More in Measurement Academy <ArrowRight className="ml-2 h-4 w-4" />
                         </Link>
                       </Button>
                     </div>

                     <Card className="mt-4 bg-secondary/40">
                       <CardHeader className="flex-row items-center justify-between p-4">
                         <div className="space-y-1">
                           <CardTitle className="text-base">Test Your Knowledge</CardTitle>
                           <CardDescription className="text-xs">Know your Watts from your horsepower?</CardDescription>
                         </div>
                         <Button asChild size="sm">
                           <Link href="/quiz">Take Power Quiz</Link>
                         </Button>
                       </CardHeader>
                     </Card>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </>
        )}

        {converterType === 'fuel-economy' && (
          <>
            <Separator className="my-4" />
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="learn-fuel-economy">
                  <AccordionTrigger className="text-lg font-semibold text-primary/90 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Learn About Fuel Economy
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
                    <p>Fuel economy measures how efficiently a vehicle uses fuel. Higher MPG or km/L means better efficiency, while lower L/100km is better.</p>
                    
                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Fuel className="h-4 w-4" /> Unit Systems</h4>
                      <p><strong className="text-foreground">Distance per Volume (MPG, km/L):</strong> Common in the US, UK, and parts of Asia. Measures how far you can go on one unit of fuel.</p>
                      <p><strong className="text-foreground">Volume per Distance (L/100km):</strong> The standard in Europe and many other parts of the world. Measures how much fuel is needed to travel a set distance.</p>
                      <p className="text-xs italic mt-1"><strong className="text-foreground">Important:</strong> A US Gallon (≈3.785L) is smaller than a UK Imperial Gallon (≈4.546L), so US MPG and UK MPG are not the same!</p>
                    </div>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Car className="h-4 w-4" /> Real-World Benchmarks</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong className="text-foreground">Hybrid Car:</strong> ~50 MPG US (~4.7 L/100km)</li>
                        <li><strong className="text-foreground">Average Sedan:</strong> ~30 MPG US (~7.8 L/100km)</li>
                        <li><strong className="text-foreground">Large SUV:</strong> ~18 MPG US (~13 L/100km)</li>
                      </ul>
                    </div>

                    <div className="p-3 rounded-md border bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Lightbulb className="h-4 w-4 text-yellow-500" /> Fuel Saving Tips</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Maintain proper tire pressure.</li>
                        <li>Avoid aggressive driving (rapid acceleration and braking).</li>
                        <li>Reduce excess weight in your vehicle.</li>
                      </ul>
                    </div>
                    
                     <div className="text-center pt-2">
                       <Button asChild variant="link">
                         <Link href={learnLink}>
                           Explore More in Measurement Academy <ArrowRight className="ml-2 h-4 w-4" />
                         </Link>
                       </Button>
                     </div>

                     <Card className="mt-4 bg-secondary/40">
                       <CardHeader className="flex-row items-center justify-between p-4">
                         <div className="space-y-1">
                           <CardTitle className="text-base">Test Your Knowledge</CardTitle>
                           <CardDescription className="text-xs">Know your MPG from your L/100km?</CardDescription>
                         </div>
                         <Button asChild size="sm">
                           <Link href="/quiz">Take Fuel Economy Quiz</Link>
                         </Button>
                       </CardHeader>
                     </Card>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </>
        )}
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
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | SmartConvert`,
      description: description,
    },
  };
}
