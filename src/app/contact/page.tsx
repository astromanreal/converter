
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';

// Inline SVG for Instagram as it's not in Lucide
const InstagramIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with SmartConvert. Find our contact details including social media, phone, and email.',
   alternates: {
    canonical: '/contact', // Add canonical URL
  },
};


export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <Button asChild variant="outline" className="mb-6">
            <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
        </Button>
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Contact Us</CardTitle>
          <CardDescription>Get in touch with us via the following channels.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Twitter className="h-5 w-5 text-muted-foreground" />
            <a
              href="https://x.com/Sathyamsarthak"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-primary transition-colors"
              aria-label="SmartConvert on Twitter"
            >
              x.com/Sathyamsarthak
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <InstagramIcon />
            <a
              href="https://www.instagram.com/srishikharji/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-primary transition-colors"
               aria-label="SmartConvert on Instagram"
            >
              instagram.com/srishikharji
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">+91 8102116569</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
             <a href="mailto:Astroman6569@gmail.com" className="text-sm hover:text-primary transition-colors">
                Astroman6569@gmail.com
             </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
