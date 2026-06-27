'use client';

import React, { useRef } from "react";
import Link from "next/link";
import { Compass, Mountain, Trees, Sun, Snowflake, Tent } from "lucide-react";
import WorldMap from "@/components/WorldMap";
import AdventureList from "@/components/AdventureList";

export default function DestinationsPage() {
  const adventureListRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white w-full">
      {/* Destinations Hero */}
      <section className="max-w-7xl mx-auto px-6 py-8 text-center">
        <div className="inline-flex items-center gap-3 bg-[#D4A373]/10 text-[#D4A373] px-8 py-3 rounded-full text-[10px] font-black tracking-[0.4em] uppercase border border-[#D4A373]/20 mb-4">
          <Compass className="w-3.5 h-3.5 animate-spin-slow" />
          Global Reach
        </div>
        <h1 className="text-5xl md:text-7xl font-serif-luxury text-[#1A2B3C] tracking-tight leading-[0.9] mb-6">
          The World <br />
          <span className="text-[#D4A373] italic font-light">Awaits</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
          From the frozen peaks of the Himalayas to the golden dunes of the Sahara, discover landscapes that redefine beauty.
        </p>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-10 bg-white">
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {[
              { 
                name: "Himalayan", 
                icon: <Mountain />, 
                color: "#3B82F6",
                image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop"
              },
              { 
                name: "Desert", 
                icon: <Sun />, 
                color: "#F59E0B",
                image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=800&auto=format&fit=crop"
              },
              { 
                name: "Snow", 
                icon: <Snowflake />, 
                color: "#06B6D4",
                image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop"
              },
              { 
                name: "Jungle", 
                icon: <Trees />, 
                color: "#10B981",
                image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop"
              },
              { 
                name: "Camping", 
                icon: <Tent />, 
                color: "#F43F5E",
                image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800&auto=format&fit=crop"
              }
            ].map((cat, i) => (
              <Link 
                key={i} 
                href={`/categories/${cat.name.toLowerCase()}`}
                className="group flex flex-col items-center text-center cursor-pointer"
              >
                <div className="relative mb-6">
                  <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-all duration-700 scale-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:scale-105 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden`}>
                    {/* Background Image */}
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="absolute inset-0 w-full h-full object-cover brightness-[0.8] group-hover:brightness-100 group-hover:scale-110 transition-all duration-700"
                    />
                    
                    {/* Color Overlay */}
                    <div 
                      className="absolute inset-0 opacity-30 group-hover:opacity-10 transition-opacity duration-700"
                      style={{ backgroundColor: cat.color }}
                    />
                    
                    {/* Icon Container */}
                    <div className="relative z-10 transition-all duration-700 scale-110 group-hover:scale-125 text-white flex items-center justify-center">
                      {React.cloneElement(cat.icon as React.ReactElement<any>, { strokeWidth: 1.5, size: 32 })}
                    </div>
                    
                    {/* Permanent Selection Border */}
                    <div className={`absolute inset-0 border-4 rounded-full transition-all duration-700 z-20 scale-100 opacity-0 group-hover:opacity-100 border-white/20`} />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.25em] transition-colors duration-500"
                      style={{ color: cat.color }}>
                    {cat.name}
                  </h3>
                  <div className="h-[2px] w-8 transition-all duration-500 rounded-full"
                       style={{ backgroundColor: cat.color }} />
                </div>
              </Link>
            ))}
         </div>
      </section>

      {/* Filtered Results */}
      <div ref={adventureListRef} className="border-t border-gray-50">
        <AdventureList />
      </div>

      <WorldMap />
    </div>
  );
}
