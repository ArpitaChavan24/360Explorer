'use client';

import React from 'react';
import { motion } from 'framer-motion';
import WhatsAppButton from './WhatsAppButton';
import { useSearch } from './SearchContext';
import { adventures } from '@/data/adventures';
import { useRouter } from 'next/navigation';

const SearchHero = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useSearch();
  const router = useRouter();

  const categories = Array.from(new Set(adventures.map(a => a.category)));

  const handleExplore = () => {
    // Navigate to expeditions page with search/filter state
    router.push('/expeditions');
  };

  return (
    <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop" 
          alt="Scenic Landscape" 
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto space-y-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="space-y-8"
        >
          <div className="flex flex-col items-center gap-3 mb-10">
            <span className="text-white text-[9px] font-bold tracking-[0.8em] uppercase opacity-90">360 Explorer</span>
            <div className="w-12 h-[1px] bg-[#D4A373]" />
            <span className="text-[#D4A373] text-[8px] font-bold tracking-[0.5em] uppercase">Bespoke Luxury Expeditions</span>
          </div>

          <h1 className="text-4xl md:text-7xl text-white font-light leading-[0.9] tracking-[-0.02em] font-serif">
            TO THE ENDS <br /> 
            <span className="font-extralight">OF THE EARTH</span>
          </h1>
          
          <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            Experience the world's most remote landscapes through curated luxury journeys and expert-led expeditions designed for the true explorer.
          </p>

          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 md:p-2 shadow-2xl max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              {/* Search Input */}
              <div className="flex-1 relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <input 
                  type="text"
                  placeholder="Where to?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-gray-800 bg-transparent border-r-0 md:border-r border-gray-200 focus:outline-none"
                />
              </div>

              {/* Category Select */}
              <div className="flex items-center gap-3 px-4 py-2 border-t md:border-t-0 border-gray-200 w-full md:w-auto justify-between md:justify-start">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <select 
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="bg-transparent text-gray-800 text-sm focus:outline-none cursor-pointer flex-1 md:flex-none"
                >
                  <option value="">All Types</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Explore Button */}
              <button 
                onClick={handleExplore}
                className="bg-[#1A2B3C] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#D4A373] transition-all w-full md:w-auto"
              >
                EXPLORE
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Chat */}
      <div className="fixed bottom-4 right-4 md:bottom-10 md:right-10 z-50">
        <WhatsAppButton 
          className="bg-[#1A2B3C]/90 backdrop-blur-md text-white px-4 py-3 md:px-6 md:py-4 rounded-xl flex items-center gap-2 md:gap-3 shadow-2xl hover:bg-[#1A2B3C] transition-all"
        >
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Chat with us</span>
        </WhatsAppButton>
      </div>
    </section>
  );
};

export default SearchHero;
