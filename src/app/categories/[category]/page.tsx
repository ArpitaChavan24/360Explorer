'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { adventures } from '@/data/adventures';
import AdventureCard from '@/components/AdventureCard';
import { motion } from 'framer-motion';
import { Compass, Sparkles, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  const filteredAdventures = adventures.filter(
    (adventure) => adventure.category.toLowerCase() === category.toLowerCase()
  );

  const getCategoryDetails = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'himalayan':
        return { 
          title: 'Himalayan', 
          subtitle: 'The Roof of the World', 
          color: '#3B82F6', 
          desc: 'Explore the majestic peaks and sacred valleys of the worlds highest mountain range.' 
        };
      case 'desert':
        return { 
          title: 'Desert', 
          subtitle: 'Golden Sands', 
          color: '#F59E0B', 
          desc: 'Venture into the endless dunes and ancient oases where time stands still.' 
        };
      case 'snow':
        return { 
          title: 'Snow', 
          subtitle: 'Frozen Wilderness', 
          color: '#06B6D4', 
          desc: 'Brave the arctic landscapes and crystalline glaciers in the ultimate test of spirit.' 
        };
      case 'jungle':
        return { 
          title: 'Jungle', 
          subtitle: 'Emerald Canopy', 
          color: '#10B981', 
          desc: 'Immerse yourself in the vibrant heart of the worlds most diverse ecosystems.' 
        };
      case 'camping':
        return { 
          title: 'Camping', 
          subtitle: 'Under the Stars', 
          color: '#F43F5E', 
          desc: 'Reconnect with nature in its purest form, from mountain meadows to beachside retreats.' 
        };
      default:
        return { 
          title: cat, 
          subtitle: 'Discovery', 
          color: '#14B8A6', 
          desc: 'Discover extraordinary places designed for the modern explorer.' 
        };
    }
  };

  const details = getCategoryDetails(category);

  return (
    <div className="bg-white min-h-screen">
      {/* Category Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#0A1A2F]">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A1A2F]" />
          <div 
            className="absolute inset-0 opacity-20 blur-[100px]"
            style={{ backgroundColor: details.color }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <Link 
              href="/destinations"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Destinations</span>
            </Link>

            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-2.5 bg-white/5 text-white/80 px-5 py-2 rounded-full text-[10px] font-black tracking-[0.4em] uppercase border border-white/10 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                {details.subtitle}
              </div>
              <h1 className="text-6xl md:text-8xl font-serif-luxury text-white tracking-tight leading-none">
                {details.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-transparent italic font-light">
                  Expeditions
                </span>
              </h1>
            </div>

            <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              {details.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Adventure Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-[#1A2B3C] tracking-tight">Available Packages</h2>
            <p className="text-gray-400 text-sm">{filteredAdventures.length} extraordinary experiences found</p>
          </div>
          <div className="h-[1px] flex-grow mx-12 bg-gray-100 hidden md:block" />
          <div className="flex gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sort By:</span>
            <select className="text-[10px] font-black uppercase tracking-widest text-[#1A2B3C] bg-transparent outline-none cursor-pointer">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        {filteredAdventures.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {filteredAdventures.map((adventure) => (
              <AdventureCard key={adventure.id} adventure={adventure} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 rounded-[3rem] bg-gray-50 border-2 border-dashed border-gray-200">
            <Compass className="w-12 h-12 text-gray-300 mx-auto mb-6 animate-pulse" />
            <h3 className="text-xl font-bold text-[#1A2B3C] mb-2">No expeditions found</h3>
            <p className="text-gray-400 max-w-xs mx-auto">We are currently scouting new locations for this category. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  );
}
