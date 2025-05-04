
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ThemeCustomizer } from '@/components/settings/theme-customizer';
import { UserPreferencesForm } from '@/components/settings/user-preferences'; // Import the new component
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Configure your SmartConvert application settings, customize the theme, and set default unit preferences.',
   alternates: {
    canonical: '/settings', // Add canonical URL
  },
  robots: { // Prevent indexing of settings page
    index: false,
    follow: false,
  }
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <Button asChild variant="outline" className="mb-6">
            <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
        </Button>
      <Card className="w-full max-w-lg mx-auto shadow-lg"> {/* Increased max-width */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Settings</CardTitle>
          <CardDescription>Configure your application settings and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8"> {/* Increased spacing */}
            {/* Appearance Section */}
            <div>
                <h3 className="text-lg font-medium mb-2 text-foreground">Appearance</h3>
                <p className="text-sm text-muted-foreground mb-4">Customize the look and feel of the application.</p>
                <ThemeCustomizer />
            </div>

            <Separator />

            {/* User Preferences Section */}
            <div>
                 {/* Title and description moved inside UserPreferencesForm for better grouping */}
                 <UserPreferencesForm />
            </div>

            <Separator />

             {/* Account Section (Placeholder) */}
             <div>
                <h3 className="text-lg font-medium mb-2 text-foreground">Account</h3>
                <p className="text-sm text-muted-foreground">Manage your account settings (placeholder for future features like authentication).</p>
                {/* Add other settings components/options later */}
             </div>
        </CardContent>
      </Card>
    </div>
  );
}
