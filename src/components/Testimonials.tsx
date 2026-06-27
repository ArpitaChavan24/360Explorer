'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Alpine Climber",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    text: "The Everest expedition was life-changing. The level of professionalism and luxury in such extreme conditions was mind-blowing.",
    rating: 5,
    country: "🇺🇸",
    trip: "Everest Base Camp"
  },
  {
    name: "Sarah Chen",
    role: "Adventure Blogger",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    text: "360 Explorer handles everything perfectly. From the vertical itinerary to the glass-walled tents, it's a premium experience throughout.",
    rating: 5,
    country: "🇨🇦",
    trip: "Annapurna Circuit"
  },
  {
    name: "Marcus Thorne",
    role: "Photography Enthusiast",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    text: "Capturing the sunrise at Mont Blanc with the support of the 360 team was a dream come true. Highly recommended for professionals.",
    rating: 4.9,
    country: "🇬🇧",
    trip: "Mont Blanc"
  },
  {
    name: "Elena Rossi",
    role: "Trekking Guide",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    text: "As a guide myself, I'm picky. 360 Explorer's safety standards and equipment quality are the best I've seen in the industry.",
    rating: 5,
    country: "🇮🇹",
    trip: "Patagonia"
  }
];

const Testimonials = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block bg-gray-50 text-[#1A2B3C] px-6 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase border border-gray-100 mb-6 shadow-sm">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-6xl font-serif-luxury text-[#1A2B3C] tracking-tight mb-6 uppercase">
            Voices of the <br />
            <span className="text-[#D4A373]">Summit.</span>
          </h2>
        </div>

        {/* Auto-scrolling container */}
        <div className="flex gap-8 overflow-hidden group">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear",
              repeatType: "loop"
            }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div 
                key={i} 
                className="w-[450px] bg-[#FDFBF7] border border-gray-100 p-10 relative group/card hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
              >
                <div className="absolute top-10 right-10 opacity-5 group-hover/card:opacity-10 transition-opacity">
                  <Quote className="w-16 h-16 text-[#1A2B3C] rotate-180" />
                </div>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-16 h-16 rounded-lg object-cover ring-1 ring-gray-100 group-hover/card:ring-[#D4A373] transition-all"
                    />
                    <div className="absolute -bottom-2 -right-2 text-xl">{t.country}</div>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#1A2B3C] uppercase tracking-wider mb-1">{t.name}</h4>
                    <p className="text-[10px] font-black text-[#D4A373] uppercase tracking-[0.2em]">{t.role}</p>
                  </div>
                </div>

                <p className="text-gray-500 text-base leading-relaxed whitespace-normal mb-8 font-medium opacity-90">
                  "{t.text}"
                </p>

                <div className="flex items-center justify-between border-t border-gray-100 pt-8 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="flex text-[#D4A373]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(t.rating) ? 'fill-[#D4A373]' : ''}`} />
                      ))}
                    </div>
                    <span className="text-[#1A2B3C] font-black text-[10px]">{t.rating}</span>
                  </div>
                  <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest bg-white px-3 py-1 border border-gray-100">
                    {t.trip}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
