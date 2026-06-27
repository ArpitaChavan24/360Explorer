import React from 'react';
import { Mountain, Shield, Users } from 'lucide-react';

const WhyChoose = () => {
  const reasons = [
    {
      icon: <Mountain className="w-6 h-6 text-[#D4A373]" />,
      title: "Expert Guides",
      desc: "Led by Everest veterans with decades of experience."
    },
    {
      icon: <Shield className="w-6 h-6 text-[#D4A373]" />,
      title: "Safety First",
      desc: "Top-tier safety protocols and global rescue networks."
    },
    {
      icon: <Users className="w-6 h-6 text-[#D4A373]" />,
      title: "Community",
      desc: "Join a thriving network of like-minded adventurers."
    }
  ];

  return (
    <section className="bg-gray-50 py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block bg-white text-[#1A2B3C] px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 border border-gray-100 shadow-sm">
            Why 360 Explorer
          </div>
          <h2 className="text-4xl md:text-6xl font-serif-luxury text-[#1A2B3C] mb-8 uppercase">Beyond the <span className="text-[#D4A373]">Ordinary.</span></h2>
          <p className="text-gray-500 text-lg leading-relaxed font-medium opacity-80">
            Led by an experienced Everest climber, our adventures are expertly guided to offer truly life-changing experiences. We prioritize top-tier safety standards to ensure every journey is both thrilling and secure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <div key={idx} className="bg-white p-10 border border-gray-100 hover:shadow-2xl hover:shadow-black/5 transition-all group">
              <div className="w-16 h-16 bg-[#1A2B3C]/5 rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#1A2B3C] transition-colors">
                {React.cloneElement(reason.icon as React.ReactElement<any>, { className: "w-6 h-6 text-[#D4A373] group-hover:text-white transition-colors" })}
              </div>
              <h4 className="text-[10px] font-black text-[#1A2B3C] mb-4 uppercase tracking-[0.2em]">{reason.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-medium opacity-80">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
