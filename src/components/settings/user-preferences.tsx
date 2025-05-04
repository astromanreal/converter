
'use client';

import React, { useState, useEffect } from 'react';
import { useUserPreferences, UserPreferences } from '@/hooks/use-user-preferences';
import { currencyUnits, distanceUnits, weightUnits } from '@/lib/units'; // Import shared units
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export function UserPreferencesForm() {
  const { preferences, savePreferences, isLoaded, defaultPreferences } = useUserPreferences();
  const [localPreferences, setLocalPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isLoaded) {
        setLocalPreferences(preferences);
    }
  }, [isLoaded, preferences]);

  const handlePreferenceChange = (key: keyof UserPreferences, value: string) => {
    setLocalPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    const success = await savePreferences(localPreferences);
    setIsSaving(false);

    if (success) {
      toast({
        title: "Success",
        description: "Your preferences have been saved.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
       // Optionally revert local state if save fails
       setLocalPreferences(preferences);
    }
  };

  // Check if local state differs from saved state
  const hasChanges = JSON.stringify(localPreferences) !== JSON.stringify(preferences);

  if (!isLoaded) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
        </div>
         <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
        </div>
         <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-24" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-foreground">Default Units</h3>
      <p className="text-sm text-muted-foreground">
        Set your preferred default units for conversions. These will be pre-selected when you open a converter.
      </p>

      {/* Preferred Currency */}
      <div className="space-y-2">
        <Label htmlFor="preferred-currency" className="text-sm font-medium">Preferred Currency</Label>
        <Select
          value={localPreferences.preferredCurrency}
          onValueChange={(value) => handlePreferenceChange('preferredCurrency', value)}
          disabled={isSaving}
        >
          <SelectTrigger id="preferred-currency">
            <SelectValue placeholder="Select default currency" />
          </SelectTrigger>
          <SelectContent>
            {currencyUnits.map((unit) => (
              <SelectItem key={unit.value} value={unit.value}>
                {unit.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Preferred Distance Unit */}
      <div className="space-y-2">
        <Label htmlFor="preferred-distance" className="text-sm font-medium">Preferred Distance Unit</Label>
        <Select
          value={localPreferences.preferredDistanceUnit}
          onValueChange={(value) => handlePreferenceChange('preferredDistanceUnit', value)}
          disabled={isSaving}
        >
          <SelectTrigger id="preferred-distance">
            <SelectValue placeholder="Select default distance unit" />
          </SelectTrigger>
          <SelectContent>
            {distanceUnits.map((unit) => (
              <SelectItem key={unit.value} value={unit.value}>
                {unit.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Preferred Weight Unit */}
      <div className="space-y-2">
        <Label htmlFor="preferred-weight" className="text-sm font-medium">Preferred Weight/Mass Unit</Label>
        <Select
          value={localPreferences.preferredWeightUnit}
          onValueChange={(value) => handlePreferenceChange('preferredWeightUnit', value)}
          disabled={isSaving}
        >
          <SelectTrigger id="preferred-weight">
            <SelectValue placeholder="Select default weight unit" />
          </SelectTrigger>
          <SelectContent>
            {weightUnits.map((unit) => (
              <SelectItem key={unit.value} value={unit.value}>
                {unit.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Add more preference selectors here (e.g., temperature, volume) */}

      <Button onClick={handleSaveChanges} disabled={isSaving || !hasChanges}>
        {isSaving ? 'Saving...' : 'Save Preferences'}
      </Button>
    </div>
  );
}
