'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, MapPin, Calendar, Compass, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';
import { Adventure } from '@/data/adventures';

const AITripPlanner = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Adventure[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [allAdventures, setAllAdventures] = useState<Adventure[]>([]);

  useEffect(() => {
    fetch('/api/adventures')
      .then(res => res.json())
      .then(data => setAllAdventures(data))
      .catch(() => {
        import('@/data/adventures').then(mod => setAllAdventures(mod.adventures));
      });
  }, []);

  const handlePlan = () => {
    if (!query.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulated AI logic
    setTimeout(() => {
      const q = query.toLowerCase();
      const matched = allAdventures.filter(a => 
        q.includes(a.title.toLowerCase()) || 
        q.includes(a.location.toLowerCase()) ||
        (q.includes('snow') && a.title.toLowerCase().includes('snow')) ||
        (q.includes('trek') && a.title.toLowerCase().includes('trek')) ||
        (q.includes('cheap') || q.includes('budget') ? parseInt(a.price.replace(/[^\d]/g, '')) < 30000 : false) ||
        (q.includes('luxury') ? parseInt(a.price.replace(/[^\d]/g, '')) > 50000 : false)
      ).slice(0, 3);
      
      setSuggestions(matched.length > 0 ? matched : allAdventures.slice(0, 3));
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <section className="py-32 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-[#FDFBF7] border border-gray-100 p-8 md:p-20 overflow-hidden relative shadow-sm">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <Compass className="w-64 h-64 text-[#1A2B3C] animate-spin-slow" />
          </div>

          <div className="max-w-3xl space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-white text-[#1A2B3C] px-6 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase border border-gray-100 shadow-sm">
                <Sparkles className="w-4 h-4 text-[#D4A373]" />
                AI Expedition Planner
              </div>
              <h2 className="text-4xl md:text-6xl font-serif-luxury text-[#1A2B3C] tracking-tight leading-none italic uppercase">
                Describe your <br />
                <span className="text-[#D4A373]">dream discovery.</span>
              </h2>
              <p className="text-gray-500 text-lg font-medium max-w-xl leading-relaxed opacity-80">
                Tell us what you're looking for — "Snow trekking under ₹20,000" or "Luxury expeditions in Himachal" — and let our AI find your perfect route.
              </p>
            </div>

            <div className="relative group">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePlan()}
                placeholder="Where would you like to go?"
                className="w-full bg-white border border-gray-100 px-10 py-8 text-xl text-[#1A2B3C] font-bold placeholder:text-gray-300 focus:ring-4 focus:ring-[#D4A373]/5 focus:border-[#D4A373] outline-none transition-all shadow-sm"
              />
              <button 
                onClick={handlePlan}
                disabled={isAnalyzing}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#1A2B3C] text-white p-5 hover:bg-black transition-all disabled:opacity-50 group-hover:scale-105 shadow-xl"
              >
                {isAnalyzing ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="w-6 h-6" />
                )}
              </button>
            </div>

            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6 pt-10"
                >
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Recommended for you</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {suggestions.map((s, i) => (
                      <Link key={i} href={`/adventures/${s.id}`}>
                        <div className="bg-gray-50 border border-gray-100 p-6 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all group/item cursor-pointer">
                          <div className="aspect-square rounded-2xl overflow-hidden mb-4 border border-gray-100">
                            <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700" />
                          </div>
                          <h4 className="text-[#1F2937] font-black text-sm uppercase italic tracking-tight mb-2 line-clamp-1">{s.title}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-[#3B82F6] font-black text-xs">{s.price}</span>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover/item:translate-x-1 group-hover/item:text-[#3B82F6] transition-all" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITripPlanner;
