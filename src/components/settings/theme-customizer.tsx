'use client';

import * as React from 'react';
import { Check, Palette } from 'lucide-react';
import { useThemeCustomizer } from '@/context/theme-customizer-context';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';

const themes = [
  { name: 'Default', value: 'theme-default' },
  { name: 'Ocean', value: 'theme-ocean' },
  { name: 'Forest', value: 'theme-forest' },
  { name: 'Sunset', value: 'theme-sunset' },
];

export function ThemeCustomizer() {
  const { theme, setTheme } = useThemeCustomizer();

  return (
    <div className="flex items-center space-x-4">
      <Label htmlFor="theme-selector" className="text-sm font-medium">
        Theme
      </Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            id="theme-selector"
            variant="outline"
            className="w-[150px] justify-start"
          >
            <Palette className="mr-2 h-4 w-4" />
            {themes.find((t) => t.value === theme)?.name || 'Default'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {themes.map((t) => (
            <DropdownMenuItem
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={cn(
                'flex items-center justify-between',
                theme === t.value && 'bg-accent text-accent-foreground'
              )}
            >
              <span>{t.name}</span>
              {theme === t.value && <Check className="ml-2 h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
