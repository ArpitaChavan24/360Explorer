import React from 'react';
import WhatsAppButton from './WhatsAppButton';

const Sponsorship = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-[#FDFBF7] p-10 md:p-20 relative overflow-hidden border border-gray-100 shadow-sm rounded-[2.5rem]">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A373]/5 rounded-full -mr-48 -mt-48 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1A2B3C]/5 rounded-full -ml-40 -mb-40 blur-[80px]" />
          
          <div className="relative z-10 text-center space-y-10">
            <div className="space-y-4">
              <div className="inline-block bg-white text-[#1A2B3C] px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border border-gray-100 shadow-sm">
                Opportunities
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1A2B3C] tracking-tight">Adventure Sponsorship</h2>
              <p className="text-gray-900 font-bold text-sm tracking-widest uppercase">Make Your Dream Expedition a Reality!</p>
            </div>
            
            <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
              Do you dream of climbing <span className="text-[#1A2B3C] font-bold">Mount Everest, Kilimanjaro</span>, or <span className="text-[#1A2B3C] font-bold">trekking to Everest Base Camp</span>, but financial constraints are holding you back? <span className="text-[#1A2B3C] font-bold">360 Explorer</span> helps adventurers like you secure sponsorships and funding for your dream expeditions!
            </p>
            
            <div className="pt-4">
              <WhatsAppButton 
                message="Hello! I have a few questions about the tour plan."
                className="bg-[#FF6B00] text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#e65a00] transition-all flex items-center gap-3 mx-auto group"
                icon={null}
              >
                Chat on Whatsapp →
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsorship;
