
'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UserPreferences {
  preferredCurrency: string;
  preferredDistanceUnit: string;
  preferredWeightUnit: string;
  // Add more preferences as needed
}

const PREFERENCES_STORAGE_KEY = 'smartconvert-user-preferences';

const defaultPreferences: UserPreferences = {
  preferredCurrency: 'USD',
  preferredDistanceUnit: 'km',
  preferredWeightUnit: 'kg',
};

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const storedPreferences = localStorage.getItem(PREFERENCES_STORAGE_KEY);
      if (storedPreferences) {
        const parsedPreferences = JSON.parse(storedPreferences);
        // Merge stored preferences with defaults to handle missing keys
        setPreferences({ ...defaultPreferences, ...parsedPreferences });
      } else {
        // Set default if nothing is stored
        setPreferences(defaultPreferences);
      }
    } catch (error) {
      console.error("Failed to load user preferences:", error);
      // Use defaults in case of error
      setPreferences(defaultPreferences);
    } finally {
        setIsLoaded(true);
    }
  }, []);

  // Save preferences to localStorage
  const savePreferences = useCallback((newPreferences: Partial<UserPreferences>) => {
    try {
        // Optimistically update the state
        const updatedPrefs = { ...preferences, ...newPreferences };
        setPreferences(updatedPrefs);
        localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(updatedPrefs));
        return true; // Indicate success
    } catch (error) {
      console.error("Failed to save user preferences:", error);
      return false; // Indicate failure
    }
  }, [preferences]); // Dependency on current preferences to ensure merge is correct


  return { preferences, savePreferences, isLoaded, defaultPreferences };
}
