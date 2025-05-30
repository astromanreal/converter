
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider'; // Import ThemeProvider
import { ThemeCustomizerProvider } from '@/context/theme-customizer-context'; // Import ThemeCustomizerProvider
import { cn } from '@/lib/utils';

const siteName = 'SmartConvert';
const siteDescription = 'SmartConvert is your intelligent all-in-one unit and currency converter. Effortlessly convert distance, weight, temperature, currency, scientific units like molar mass, pH, Ohms, and many more. Features educational content and a fun quiz mode.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

export const metadata: Metadata = {
  title: {
    default: `${siteName} - Fast & Accurate All-in-One Conversions`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  keywords: [
    'smartconvert', 'unit converter', 'currency converter', 'online converter', 'free converter',
    'measurement converter', 'metric conversion', 'imperial conversion',
    'distance converter', 'length converter', 'km to miles', 'meters to feet',
    'weight converter', 'mass converter', 'kg to lbs', 'grams to ounces',
    'temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius', 'kelvin converter',
    'volume converter', 'liters to gallons', 'ml to oz',
    'area converter', 'square meter to square feet', 'acre to hectare',
    'data storage converter', 'bytes to gigabytes', 'mb to gb',
    'energy converter', 'joules to calories', 'kwh converter',
    'power converter', 'watts to horsepower',
    'pressure converter', 'psi to pascals', 'bar to atm',
    'speed converter', 'kmh to mph', 'mps to fps',
    'time converter', 'seconds to minutes', 'hours to days',
    'molar mass calculator', 'chemistry calculator', 'molecular weight',
    'ohms law calculator', 'electrical calculator', 'voltage current resistance',
    'pH calculator', 'acidity alkalinity', 'hydrogen ion concentration',
    'calculator', 'online tool', 'conversion tool', 'education', 'quiz',
    'USD converter', 'EUR converter', 'JPY converter', 'GBP converter', 'INR converter',
  ],
  authors: [{ name: 'Sarthak', url: 'https://x.com/Sathyamsarthak' }],
  creator: 'Sarthak',
  publisher: 'Sarthak',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: {
        default: `${siteName} - Your Ultimate Conversion Tool`,
        template: `%s | ${siteName}`,
    },
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: '/og-image.png', // Ensure this image exists in /public
        width: 1200,
        height: 630,
        alt: `${siteName} - All-in-One Converter`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
        default: `${siteName} - Fast & Accurate All-in-One Conversions`,
        template: `%s | ${siteName}`,
    },
    description: siteDescription,
    // site: '@YourTwitterHandle', // Optional: Add Twitter site handle
    // creator: '@CreatorTwitterHandle', // Optional: Add creator Twitter handle
    images: [`${siteUrl}/twitter-image.png`], // Ensure this image exists in /public
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // icons: { // Optional: Add favicon details if you have them
  //   icon: '/favicon.ico',
  //   shortcut: '/favicon-16x16.png',
  //   apple: '/apple-touch-icon.png',
  // },
  // verification: { // Removed google verification from here as it's added directly in head
  //   // yandex: 'YOUR_YANDEX_SITE_VERIFICATION_CODE',
  //   // other: {
  //   //   me: ['my-email@example.com', 'my-link'],
  //   // },
  // },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-2658549797831211"></meta>
        <meta name="google-site-verification" content="mac7aLjz9hgBPOeatEJp8fZ6RL2GRi8PeWQfgcITzFU" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          GeistSans.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <ThemeCustomizerProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              {/* Add Footer here if needed later */}
            </div>
            <Toaster />
          </ThemeCustomizerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
