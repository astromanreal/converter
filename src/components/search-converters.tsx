
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, ArrowRight } from 'lucide-react'; // Import Search icon for placeholder

interface ConverterCategoryInfo {
  name: string;
  path: string;
  description: string;
}

interface SearchConvertersProps {
  categories: ConverterCategoryInfo[]; // Accept only serializable data
}

export function SearchConverters({ categories }: SearchConvertersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return [];
    const lowerCaseSearch = searchTerm.toLowerCase();
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(lowerCaseSearch) ||
        category.description.toLowerCase().includes(lowerCaseSearch)
    );
  }, [searchTerm, categories]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if the click is outside the search input and results card
      if (
        !target.closest('[data-search-input]') &&
        !target.closest('[data-search-results]')
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative"> {/* Wrap input and icon */}
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> {/* Add search icon */}
        <Input
          data-search-input // Add data attribute for click outside logic
          type="search"
          placeholder="Search converters (e.g., currency, distance, pH)..." // Updated placeholder
          value={searchTerm}
          onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowResults(!!e.target.value); // Show results only if there's input
          }}
          onFocus={() => setShowResults(!!searchTerm)} // Show results on focus if there's already a term
          className="w-full text-base shadow-sm pl-10" // Add padding for icon
          aria-label="Search converters"
        />
      </div>
      {showResults && filteredCategories.length > 0 && (
        <Card
          data-search-results // Add data attribute for click outside logic
          className="absolute z-10 w-full mt-2 max-h-60 overflow-hidden border shadow-lg animate-in fade-in duration-150"
        >
          <ScrollArea className="h-full">
            <CardContent className="p-2">
              <ul className="space-y-1">
                {filteredCategories.map((category) => (
                  <li key={category.path}>
                    <Link
                      href={category.path}
                      onClick={() => setShowResults(false)} // Close on selection
                      className="flex items-center justify-between p-2 rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none transition-colors"
                    >
                      {/* Removed icon display here as it's not passed */}
                      <div className="flex items-center space-x-3">
                        {/* Placeholder or leave empty */}
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                      </div>
                       <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </ScrollArea>
        </Card>
      )}
       {showResults && searchTerm && filteredCategories.length === 0 && (
         <Card
           data-search-results
           className="absolute z-10 w-full mt-2 border shadow-lg animate-in fade-in duration-150"
         >
           <CardContent className="p-4 text-center text-muted-foreground">
             No converters found matching "{searchTerm}".
           </CardContent>
         </Card>
       )}
    </div>
  );
}
