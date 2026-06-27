'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { CheckCircle2, ShieldCheck, MapPin, Calendar, Users, Mountain } from 'lucide-react';

const VerifyContent = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const bookingId = params.id as string;

  // Extracting details from search params for demo purposes
  const name = searchParams.get('name') || 'Valued Passenger';
  const adventure = searchParams.get('adventure') || 'Mountain Expedition';
  const date = searchParams.get('date') || 'TBD';
  const people = searchParams.get('people') || '1';

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white shadow-2xl border border-gray-100 overflow-hidden">
        {/* Verification Status Header */}
        <div className="bg-[#1A2B3C] p-12 text-white text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <CheckCircle2 className="w-8 h-8 text-[#1A2B3C]" />
          </div>
          <h1 className="text-3xl font-serif-luxury tracking-wider uppercase">Booking Verified</h1>
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 text-[9px] font-black tracking-widest uppercase border border-white/20">
            <ShieldCheck className="w-3 h-3 text-[#D4A373]" /> Authentic Reservation
          </div>
        </div>

        {/* Verified Details */}
        <div className="p-12 space-y-12 bg-[#FDFBF7]">
          <div className="text-center space-y-1">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Booking Reference</p>
            <p className="text-2xl font-serif-luxury text-[#1A2B3C]">#{bookingId}</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center gap-5 p-6 bg-white border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-gray-50 flex items-center justify-center">
                <Mountain className="w-6 h-6 text-[#D4A373]" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Adventure</p>
                <p className="font-serif-luxury text-[#1A2B3C] uppercase tracking-wider">{adventure}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 shadow-sm">
                <Calendar className="w-4 h-4 text-[#D4A373]" />
                <div className="space-y-0.5">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Date</p>
                  <p className="text-xs font-black text-[#1A2B3C]">{date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 shadow-sm">
                <Users className="w-4 h-4 text-[#D4A373]" />
                <div className="space-y-0.5">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Travelers</p>
                  <p className="text-xs font-black text-[#1A2B3C]">{people} Members</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#1A2B3C] text-white space-y-4">
              <p className="text-[9px] font-black text-white/40 uppercase tracking-widest text-center">Passenger Information</p>
              <div className="flex flex-col items-center gap-1">
                <p className="text-xl font-serif-luxury uppercase tracking-widest">{name}</p>
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/60">
                  <MapPin className="w-3 h-3 text-[#D4A373]" /> Registered Traveler
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed max-w-[250px] mx-auto italic">
              This booking is active and confirmed in our global reservation system.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 text-center border-t border-gray-100">
           <div className="flex flex-col items-center justify-center opacity-30 grayscale">
            <span className="text-lg font-serif-luxury tracking-[0.3em] text-[#1A2B3C]">360 Explorer</span>
            <span className="text-[7px] font-black tracking-[0.5em] text-gray-400 uppercase -mt-1 ml-1">Expeditions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const VerifyPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold">Verifying...</div>}>
      <VerifyContent />
    </Suspense>
  );
};

export default VerifyPage;
