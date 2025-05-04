'use client';

import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

type Theme = 'theme-default' | 'theme-ocean' | 'theme-forest' | 'theme-sunset';

interface ThemeCustomizerContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeCustomizerContext = createContext<ThemeCustomizerContextProps | undefined>(undefined);

const THEME_STORAGE_KEY = 'smartconvert-theme';

export function ThemeCustomizerProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('theme-default'); // Default theme

  // Load theme from local storage on mount (client-side only)
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (storedTheme && ['theme-default', 'theme-ocean', 'theme-forest', 'theme-sunset'].includes(storedTheme)) {
      setThemeState(storedTheme);
    }
  }, []);

  // Update body class and local storage when theme changes
  useEffect(() => {
    const body = document.body;
    // Remove previous theme classes
    body.classList.remove('theme-default', 'theme-ocean', 'theme-forest', 'theme-sunset');
    // Add the new theme class if it's not the default
    if (theme !== 'theme-default') {
       body.classList.add(theme);
    }
    // Store the theme preference
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeCustomizerContext.Provider value={contextValue}>
      {children}
    </ThemeCustomizerContext.Provider>
  );
}

export function useThemeCustomizer(): ThemeCustomizerContextProps {
  const context = useContext(ThemeCustomizerContext);
  if (context === undefined) {
    throw new Error('useThemeCustomizer must be used within a ThemeCustomizerProvider');
  }
  return context;
}
