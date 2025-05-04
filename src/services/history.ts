
'use client'; // This service interacts with localStorage, so it must be client-side

export interface HistoryEntry {
  id: string; // Unique ID for the entry
  converterType: string; // e.g., 'currency', 'distance'
  fromUnit: string;
  toUnit: string;
  fromValue: string;
  toValue: string;
  timestamp: number; // Unix timestamp
}

const HISTORY_STORAGE_KEY = 'smartconvert-conversion-history';
const MAX_HISTORY_ENTRIES = 50; // Limit the number of stored entries

/**
 * Retrieves conversion history from localStorage.
 * Returns an empty array if no history is found or if localStorage is unavailable.
 */
export function getHistoryEntries(): HistoryEntry[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    return []; // Cannot access localStorage on server or if disabled
  }
  try {
    const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (storedHistory) {
      const parsedHistory: HistoryEntry[] = JSON.parse(storedHistory);
      // Sort by timestamp descending (most recent first)
      return parsedHistory.sort((a, b) => b.timestamp - a.timestamp);
    }
  } catch (error) {
    console.error("Failed to retrieve conversion history:", error);
  }
  return [];
}

/**
 * Adds a new entry to the conversion history in localStorage.
 * Ensures the history does not exceed MAX_HISTORY_ENTRIES.
 */
export function addHistoryEntry(entryData: Omit<HistoryEntry, 'id' | 'timestamp'>): void {
   if (typeof window === 'undefined' || !window.localStorage) {
     console.warn("localStorage unavailable, history entry not saved.");
     return;
   }

  try {
    const history = getHistoryEntries(); // Get current history (already sorted)

    const newEntry: HistoryEntry = {
      ...entryData,
      id: crypto.randomUUID(), // Generate a unique ID
      timestamp: Date.now(), // Record the current time
    };

    // Add the new entry to the beginning
    const updatedHistory = [newEntry, ...history];

    // Limit the number of entries
    if (updatedHistory.length > MAX_HISTORY_ENTRIES) {
      updatedHistory.length = MAX_HISTORY_ENTRIES; // Trim older entries
    }

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Failed to add conversion history entry:", error);
  }
}

/**
 * Clears all conversion history from localStorage.
 */
export function clearHistoryEntries(): void {
   if (typeof window === 'undefined' || !window.localStorage) {
     console.warn("localStorage unavailable, history not cleared.");
     return;
   }

  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear conversion history:", error);
  }
}
