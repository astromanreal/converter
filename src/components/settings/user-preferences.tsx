
'use client';

import React, { useState, useEffect } from 'react';
import { useUserPreferences, UserPreferences } from '@/hooks/use-user-preferences';
import { currencyUnits, distanceUnits, weightUnits, temperatureUnits, volumeUnits, areaUnits } from '@/lib/units';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

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

  const handlePreferenceChange = (key: keyof UserPreferences, value: string | number | boolean) => {
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
       setLocalPreferences(preferences);
    }
  };

  const hasChanges = JSON.stringify(localPreferences) !== JSON.stringify(preferences);

  if (!isLoaded) {
    return (
      <div className="space-y-6">
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
    <div className="space-y-6">
       <div>
        <h3 className="text-lg font-medium text-foreground">Functionality</h3>
        <p className="text-sm text-muted-foreground mb-4">Control application behavior like history and precision.</p>
        <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                    <Label htmlFor="save-history" className="font-medium">Save Conversion History</Label>
                    <p className="text-xs text-muted-foreground">
                        Automatically save your conversions in your browser.
                    </p>
                </div>
                <Switch
                    id="save-history"
                    checked={localPreferences.saveHistory}
                    onCheckedChange={(checked) => handlePreferenceChange('saveHistory', checked)}
                    disabled={isSaving}
                    aria-label="Toggle conversion history saving"
                />
            </div>
             <div className="rounded-lg border p-3 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="result-precision" className="font-medium">Result Precision</Label>
                     <span className="text-sm text-muted-foreground font-medium">{localPreferences.resultPrecision} decimal places</span>
                </div>
                 <p className="text-xs text-muted-foreground">
                    Set the number of decimal places for conversion results.
                </p>
                <Slider
                    id="result-precision"
                    min={2}
                    max={8}
                    step={1}
                    value={[localPreferences.resultPrecision]}
                    onValueChange={(value) => handlePreferenceChange('resultPrecision', value[0])}
                    disabled={isSaving}
                    className="pt-2"
                />
            </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium text-foreground">Default Units</h3>
        <p className="text-sm text-muted-foreground mb-4">
            Set your preferred units. These will be pre-selected when you open a converter.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="preferred-currency">Currency</Label>
                <Select value={localPreferences.preferredCurrency} onValueChange={(v) => handlePreferenceChange('preferredCurrency', v)} disabled={isSaving}>
                <SelectTrigger id="preferred-currency"><SelectValue /></SelectTrigger>
                <SelectContent>{currencyUnits.map((u) => <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>)}</SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="preferred-distance">Distance</Label>
                <Select value={localPreferences.preferredDistanceUnit} onValueChange={(v) => handlePreferenceChange('preferredDistanceUnit', v)} disabled={isSaving}>
                <SelectTrigger id="preferred-distance"><SelectValue /></SelectTrigger>
                <SelectContent>{distanceUnits.map((u) => <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>)}</SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="preferred-weight">Weight/Mass</Label>
                <Select value={localPreferences.preferredWeightUnit} onValueChange={(v) => handlePreferenceChange('preferredWeightUnit', v)} disabled={isSaving}>
                <SelectTrigger id="preferred-weight"><SelectValue /></SelectTrigger>
                <SelectContent>{weightUnits.map((u) => <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>)}</SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="preferred-temperature">Temperature</Label>
                <Select value={localPreferences.preferredTemperatureUnit} onValueChange={(v) => handlePreferenceChange('preferredTemperatureUnit', v)} disabled={isSaving}>
                <SelectTrigger id="preferred-temperature"><SelectValue /></SelectTrigger>
                <SelectContent>{temperatureUnits.map((u) => <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>)}</SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="preferred-volume">Volume</Label>
                <Select value={localPreferences.preferredVolumeUnit} onValueChange={(v) => handlePreferenceChange('preferredVolumeUnit', v)} disabled={isSaving}>
                <SelectTrigger id="preferred-volume"><SelectValue /></SelectTrigger>
                <SelectContent>{volumeUnits.map((u) => <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>)}</SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="preferred-area">Area</Label>
                <Select value={localPreferences.preferredAreaUnit} onValueChange={(v) => handlePreferenceChange('preferredAreaUnit', v)} disabled={isSaving}>
                <SelectTrigger id="preferred-area"><SelectValue /></SelectTrigger>
                <SelectContent>{areaUnits.map((u) => <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>)}</SelectContent>
                </Select>
            </div>
        </div>
      </div>

      <div className="pt-4">
        <Button onClick={handleSaveChanges} disabled={isSaving || !hasChanges}>
            {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
