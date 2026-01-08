import { useState } from 'react';

interface FilterState {
  dateRange: [string, string];
  repositories: string[];
  types: string[];
}

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: ['', ''],
    repositories: [],
    types: [],
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      dateRange: ['', ''],
      repositories: [],
      types: [],
    });
  };

  return { filters, updateFilters, resetFilters };
}
