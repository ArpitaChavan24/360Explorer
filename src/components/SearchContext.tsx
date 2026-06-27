'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  currency: 'INR' | 'USD';
  setCurrency: (currency: 'INR' | 'USD') => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  return (
    <SearchContext.Provider value={{ 
      searchQuery, 
      setSearchQuery, 
      selectedCategory, 
      setSelectedCategory, 
      currency, 
      setCurrency 
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
