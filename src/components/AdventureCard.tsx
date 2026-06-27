'use client';

import React from 'react';
import { Star, MapPin, Clock, ArrowRight, Mountain } from 'lucide-react';
import { Adventure } from '../data/adventures';
import Link from 'next/link';
import { useSearch } from './SearchContext';

interface AdventureCardProps {
  adventure: Adventure;
}

const AdventureCard: React.FC<AdventureCardProps> = ({ adventure }) => {
  const { currency } = useSearch();
  const price = currency === 'INR' 
    ? (adventure.priceInr || adventure.price) 
    : (adventure.priceUsd || adventure.price);

  return (
    <Link 
      href={`/adventures/${adventure.id}`} 
      className="block group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 border border-gray-100/50"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={adventure.image}
          alt={adventure.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B3C]/80 via-[#1A2B3C]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
        
        <div className="absolute top-6 left-6">
          <span className="bg-[#D4A373] text-white px-5 py-2 rounded-full text-[8px] font-black uppercase tracking-[0.3em] shadow-2xl backdrop-blur-md">
            Featured
          </span>
        </div>
        
        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md text-[#1A2B3C] px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-xl border border-white/20">
          <Star className="w-3.5 h-3.5 fill-[#D4A373] text-[#D4A373]" />
          <span className="text-[11px] font-black">{adventure.rating.toFixed(1)}</span>
        </div>

        <div className="absolute bottom-8 left-8 right-8 space-y-4">
           <div className="flex items-center gap-2.5 text-white/90 bg-white/10 backdrop-blur-md w-fit px-4 py-1.5 rounded-full border border-white/20">
            <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">{adventure.location.split(',')[1]?.trim() || adventure.location}</span>
          </div>
        </div>
      </div>
      
      <div className="p-10 space-y-10">
        <h3 className="font-serif-luxury text-[#1A2B3C] text-xl leading-[1.3] tracking-tight group-hover:text-[#D4A373] transition-colors duration-500 min-h-[3.5rem]">
          {adventure.title}
        </h3>
        <div className="grid grid-cols-2 gap-6 border-b border-gray-100 pb-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-[#1A2B3C]/5 transition-colors">
              <Clock className="w-4 h-4 text-[#D4A373]" />
            </div>
            <div>
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Duration</p>
              <p className="text-[10px] font-black text-[#1A2B3C] uppercase tracking-[0.1em]">{adventure.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-[#1A2B3C]/5 transition-colors">
              <Mountain className="w-4 h-4 text-[#D4A373]" />
            </div>
            <div>
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Type</p>
              <p className="text-[10px] font-black text-[#1A2B3C] uppercase tracking-[0.1em]">Expedition</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Starting From</p>
            <span className="text-3xl font-serif-luxury text-[#1A2B3C] tracking-tighter">{price}</span>
          </div>
          <div className="w-16 h-16 bg-[#1A2B3C] rounded-2xl flex items-center justify-center text-white hover:bg-[#D4A373] transition-all duration-500 group-hover:scale-105 shadow-2xl shadow-[#1A2B3C]/20 group-hover:shadow-[#D4A373]/30 relative overflow-hidden">
            <ArrowRight className="w-7 h-7 relative z-10" />
            <div className="absolute inset-0 bg-[#D4A373] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AdventureCard;
