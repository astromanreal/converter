
'use client';

import React, { useState, useEffect } from 'react';
import { getHistoryEntries, clearHistoryEntries, type HistoryEntry } from '@/services/history';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function HistoryList() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isMounted, setIsMounted] = useState(false); // Avoid hydration issues

  useEffect(() => {
    setIsMounted(true);
    setHistory(getHistoryEntries());
  }, []);

  const handleClearHistory = () => {
    clearHistoryEntries();
    setHistory([]); // Update state immediately
  };

  if (!isMounted) {
    // Render nothing or a loading state on the server/during initial hydration
    return <div className="text-center p-4 text-muted-foreground">Loading history...</div>;
  }

  if (history.length === 0) {
    return <p className="text-muted-foreground text-center py-4">No conversion history yet.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={handleClearHistory}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear History
        </Button>
      </div>
      <ScrollArea className="h-[400px] border rounded-md p-4">
        <ul className="space-y-3">
          {history.map((entry) => (
            <li key={entry.id} className="border-b pb-3 last:border-b-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium capitalize text-primary">
                  {entry.converterType.replace('-', ' ')} Conversion
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm space-x-2">
                <span className="truncate">
                  {entry.fromValue} {entry.fromUnit}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="font-semibold truncate text-right">
                  {entry.toValue} {entry.toUnit}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
