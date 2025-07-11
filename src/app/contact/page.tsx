
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Twitter, Github } from 'lucide-react';
import Link from 'next/link';

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
      className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );

const pageTitle = 'Contact Us - SmartConvert Support';
const pageDescription = 'Get in touch with the SmartConvert team. Find our contact details including social media links (Twitter, Instagram), phone number, and email address for support or inquiries.';
const canonicalUrl = '/contact';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ['contact SmartConvert', 'SmartConvert support', 'customer service', 'feedback', 'help', 'technical support', 'github'],
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


export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <Button asChild variant="outline" className="mb-6">
            <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
        </Button>
      <Card className="w-full max-w-lg mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Get In Touch</CardTitle>
          <CardDescription>We'd love to hear from you! Reach out with questions, feedback, or inquiries.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
           {/* Social and Code */}
           <div>
            <h3 className="text-lg font-medium mb-4 text-center text-foreground">Connect & Collaborate</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <a href="https://x.com/Sathyamsarthak" target="_blank" rel="noopener noreferrer" className="p-4 rounded-lg bg-muted hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-2 group" aria-label="SmartConvert on Twitter">
                <Twitter className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium">Twitter</span>
              </a>
              <a href="https://www.instagram.com/srishikharji/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-lg bg-muted hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-2 group" aria-label="SmartConvert on Instagram">
                <InstagramIcon />
                <span className="text-sm font-medium">Instagram</span>
              </a>
              <a href="https://github.com/astromanreal" target="_blank" rel="noopener noreferrer" className="p-4 rounded-lg bg-muted hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-2 group" aria-label="astromanreal on GitHub">
                <Github className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
            </div>
          </div>
          
           <div className="relative">
             <div className="absolute inset-0 flex items-center">
                 <span className="w-full border-t"></span>
             </div>
             <div className="relative flex justify-center text-xs uppercase">
                 <span className="bg-card px-2 text-muted-foreground">Or</span>
             </div>
          </div>

          {/* Direct Contact */}
           <div>
            <h3 className="text-lg font-medium mb-4 text-center text-foreground">Contact Directly</h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 rounded-lg border bg-muted/20">
                <Mail className="h-6 w-6 mr-4 text-muted-foreground" />
                <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:Astroman6569@gmail.com" className="font-medium text-foreground hover:text-primary transition-colors break-all">
                        Astroman6569@gmail.com
                    </a>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-lg border bg-muted/20">
                <Phone className="h-6 w-6 mr-4 text-muted-foreground" />
                <div>
                     <p className="text-sm text-muted-foreground">Phone</p>
                     <span className="font-medium text-foreground">+91 8102116569</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
