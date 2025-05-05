
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider'; // Import ThemeProvider
import { ThemeCustomizerProvider } from '@/context/theme-customizer-context'; // Import ThemeCustomizerProvider
import { cn } from '@/lib/utils';

const siteName = 'SmartConvert';
const siteDescription = 'An intelligent all-in-one unit and currency converter platform. Convert distances, weights, temperatures, currencies, and more with ease. Access a wide range of converters and educational content to help you understand different measurement systems. ';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002'; // Replace with actual production URL

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`, // Ensures page titles are formatted nicely
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl), // Required for resolving relative Open Graph image URLs
  applicationName: siteName,
  keywords: [
    'converter', 'unit converter', 'currency converter', 'distance converter',
    'weight converter', 'temperature converter', 'volume converter', 'area converter',
    'data storage converter', 'energy converter', 'power converter', 'pressure converter',
    'speed converter', 'time converter', 'molar mass calculator', 'ohms law calculator',
    'pH calculator', 'online tool', 'calculator', 'measurement', 'conversion', 'units',
    'metric', 'imperial', 'science calculator', 'chemistry calculator', 'electrical calculator'
  ],  authors: [{ name: 'Sarthak', url: 'https://x.com/Sathyamsarthak' }], // Optional: Add author info
  creator: 'Sarthak', // Optional
  publisher: 'Sarthak', // Optional
  // Open Graph Metadata (for social sharing previews)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: siteName,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: '/og-image.png', // Placeholder - Create this image later
        width: 1200,
        height: 630,
        alt: `${siteName} Logo`,
      },
    ],
  },
  // Twitter Card Metadata (for Twitter sharing previews)
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    // Optional: Add Twitter site/creator handles if available
    // site: '@YourTwitterHandle',
    // creator: '@CreatorTwitterHandle',
    images: ['/twitter-image.png'], // Placeholder - Create this image later (can be same as og-image)
  },
  // Viewport configuration (important for responsiveness)
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  // Robots tag (controls search engine indexing)
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
  // Optional: Icons
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          GeistSans.className // Use className instead of variable for direct font application
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Set default to dark
          enableSystem={false} // Ensure system preference doesn't override default
          disableTransitionOnChange={false} // Allow transitions for theme changes
        >
          <ThemeCustomizerProvider> {/* Wrap with ThemeCustomizerProvider */}
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              {/* Add Footer here if needed later */}
            </div>
            <Toaster />
          </ThemeCustomizerProvider>
        </ThemeProvider>
      </body>
      <meta name="google-adsense-account" content="ca-pub-2658549797831211"></meta>
    </html>
  );
}

