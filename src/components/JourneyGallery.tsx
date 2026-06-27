import React from 'react';

const JourneyGallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop"
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 text-center md:text-left border-b border-gray-100 pb-12">
        <div className="max-w-2xl space-y-4">
          <div className="inline-block bg-gray-50 text-[#1A2B3C] px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border border-gray-100 shadow-sm">
            Visual Stories
          </div>
          <h2 className="text-4xl md:text-6xl font-serif-luxury text-[#1A2B3C] tracking-tight uppercase">Explore Our <br /><span className="text-[#D4A373]">Journey</span></h2>
          <p className="text-gray-400 text-lg font-medium opacity-80">Stunning photos & videos from past expeditions & transformational journeys.</p>
        </div>
        <button className="text-[#1A2B3C] font-black hover:text-[#D4A373] transition-colors text-[10px] uppercase tracking-[0.2em] border-b-2 border-[#1A2B3C] pb-1">View Gallery</button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {images.map((src, idx) => (
          <div key={idx} className="group relative aspect-video overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
            <img 
              src={src} 
              alt={`Journey image ${idx + 1}`} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B3C] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <div className="space-y-1">
                <p className="text-[#D4A373] font-black text-[8px] uppercase tracking-widest">Expedition</p>
                <p className="text-white font-serif-luxury text-lg tracking-wider">Year {2020 + idx}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JourneyGallery;
