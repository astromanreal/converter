import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ConverterCardProps {
  name: string;
  icon: LucideIcon;
  path: string;
  description: string;
}

export function ConverterCard({ name, icon: Icon, path, description }: ConverterCardProps) {
  return (
    <Card className="flex flex-col justify-between transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
          <CardTitle className="text-xl">{name}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant="outline" className="w-full group bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          <Link href={path}>
            Go to Converter
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
