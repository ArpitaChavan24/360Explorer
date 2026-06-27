import React from 'react';
import { Zap, Heart, Users } from 'lucide-react';

const FitnessTraining = () => {
  const features = [
    {
      title: "Expert Guidance",
      description: "Receive personalized training plans tailored for high-altitude challenges.",
      icon: <Zap className="w-8 h-8 text-[#D4A373]" />
    },
    {
      title: "Nutrition Support",
      description: "Learn how to fuel your body for energy and recovery during climbs.",
      icon: <Heart className="w-8 h-8 text-[#D4A373]" />
    },
    {
      title: "Community Support",
      description: "Join fellow climbers and share your journey and experiences.",
      icon: <Users className="w-8 h-8 text-[#D4A373]" />
    }
  ];

  return (
    <section className="bg-white py-32 text-[#1A2B3C] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#1A2B3C]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="space-y-6 mb-24">
          <div className="inline-block bg-gray-50 text-[#1A2B3C] px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase border border-gray-100 shadow-sm">
            Peak Performance
          </div>
          <h2 className="text-4xl md:text-6xl font-serif-luxury mb-8 tracking-tight uppercase italic">
            FREE Fitness & <br />
            <span className="text-[#D4A373]">Diet Training.</span>
          </h2>
          
          <button className="bg-[#1A2B3C] text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all">
            Sign Up For FREE Today!
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-8 p-12 bg-[#FDFBF7] border border-gray-100 hover:shadow-2xl hover:shadow-black/5 transition-all group">
              <div className="w-20 h-20 bg-white border border-gray-50 rounded-xl flex items-center justify-center group-hover:bg-[#1A2B3C] transition-colors">
                {React.cloneElement(feature.icon as React.ReactElement<any>, { className: "w-8 h-8 text-[#D4A373] group-hover:text-white transition-colors" })}
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-[#1A2B3C] uppercase tracking-[0.2em]">{feature.title}</h4>
                <p className="text-gray-500 text-sm font-medium leading-relaxed opacity-80">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FitnessTraining;
