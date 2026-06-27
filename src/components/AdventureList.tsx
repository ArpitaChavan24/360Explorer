'use client';

import React, { useState, useEffect } from 'react';
import AdventureCard from './AdventureCard';
import { useSearch } from './SearchContext';
import { Sparkles, Loader2 } from 'lucide-react';
import { Adventure } from '../data/adventures';
import { adventures as allAdventuresData } from '../data/adventures';

const AdventureList = () => {
  const { searchQuery, selectedCategory } = useSearch();
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use static data directly
    setAdventures(allAdventuresData);
    setLoading(false);
  }, []);

  const filteredAdventures = adventures.filter((adventure) => {
    const matchesSearch = adventure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adventure.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || adventure.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="w-12 h-12 text-[#D4A373] animate-spin" />
        <p className="text-gray-400 font-medium animate-pulse">Curating your expeditions...</p>
      </div>
    );
  }

  return (
    <section id="adventure-list" className="w-full px-6 py-20 overflow-hidden bg-white">
      {/* Hero Section */}
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-7xl font-serif-luxury text-[#1A2B3C] tracking-tight leading-[0.9] mb-10">
          {searchQuery ? (
            <>Results for <span className="text-[#D4A373] italic">"{searchQuery}"</span></>
          ) : (
            <>All <br /><span className="text-[#D4A373] italic font-light">Expeditions</span></>
          )}
        </h2>
        <p className="text-gray-400 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
          {searchQuery 
            ? `Found ${filteredAdventures.length} extraordinary experiences matching your search` 
            : "Discover world-class expeditions designed for the modern explorer, where luxury meets the wild."}
        </p>
      </div>

      {filteredAdventures.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
          {filteredAdventures.map((adventure) => (
            <AdventureCard key={adventure.id} adventure={adventure} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-xl text-gray-400 font-medium">No adventures found matching your search.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 text-[#FF6B00] font-bold hover:underline"
          >
            Reset Search
          </button>
        </div>
      )}
    </section>
  );
};

export default AdventureList;
