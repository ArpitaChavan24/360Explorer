'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Headphones, 
  Users, 
  Star, 
  ArrowRight, 
  ChevronDown,
  Globe,
  Award,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

// --- Components ---

const StatCounter = ({ target, label, suffix = "" }: { target: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="flex flex-col items-center p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 group">
      <span className="text-3xl md:text-4xl font-bold text-[#1A2B3C] mb-2 group-hover:text-[#14B8A6] transition-colors">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-gray-400 text-xs font-black uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
  >
    <div className="w-16 h-16 rounded-2xl bg-[#14B8A6]/10 flex items-center justify-center mb-8 group-hover:bg-[#14B8A6] group-hover:text-white transition-all duration-500 text-[#14B8A6]">
      <Icon size={32} strokeWidth={1.5} />
    </div>
    <h3 className="text-2xl font-bold text-[#1A2B3C] mb-4">{title}</h3>
    <p className="text-gray-500 leading-relaxed font-light">{desc}</p>
  </motion.div>
);

const TimelineItem = ({ year, title, desc, align = "left" }: { year: string, title: string, desc: string, align?: "left" | "right" }) => (
  <div className={`flex flex-col md:flex-row items-center gap-8 mb-24 relative ${align === "right" ? "md:flex-row-reverse" : ""}`}>
    <div className="flex-1 text-center md:text-left">
      <div className={`space-y-4 ${align === "right" ? "md:text-right" : ""}`}>
        <span className="text-[#F59E0B] font-black tracking-[0.3em] text-sm uppercase">{year}</span>
        <h3 className="text-3xl font-bold text-[#1A2B3C]">{title}</h3>
        <p className="text-gray-500 font-light leading-relaxed max-w-md mx-auto md:mx-0">{desc}</p>
      </div>
    </div>
    <div className="relative z-10 flex items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-[#14B8A6] shadow-[0_0_20px_rgba(20,184,166,0.4)] relative">
        <div className="absolute inset-0 rounded-full bg-[#14B8A6] animate-ping opacity-40" />
      </div>
    </div>
    <div className="flex-1 hidden md:block" />
  </div>
);

const TeamMember = ({ name, role, img, bio }: { name: string, role: string, img: string, bio: string }) => (
  <div className="group text-center">
    <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-2 border-gray-100 p-2 group-hover:border-[#14B8A6] transition-all duration-700 shadow-sm">
      <div className="w-full h-full rounded-full overflow-hidden relative">
        <img src={img} alt={name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700" />
      </div>
      {/* Removed social options as requested */}
    </div>
    <h3 className="text-2xl font-bold text-[#1A2B3C] mb-1 group-hover:text-[#14B8A6] transition-colors">{name}</h3>
    <p className="text-[#F59E0B] text-[10px] font-black uppercase tracking-widest mb-4">{role}</p>
    <p className="text-gray-500 text-sm font-light leading-relaxed max-w-xs mx-auto">{bio}</p>
  </div>
);

// --- Main Page ---

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="bg-white text-[#1A2B3C] selection:bg-[#14B8A6]/20 overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=2000&auto=format&fit=crop" 
            alt="Satellite View Greenery" 
            className="w-full h-full object-cover brightness-[0.8] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 bg-black/20 border border-white/20 px-6 py-2 rounded-full backdrop-blur-md shadow-2xl">
              <Sparkles className="text-[#14B8A6] w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Est. 2018 — The Pinnacle of Discovery</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1] text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              We Don’t Just Plan Trips <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#F59E0B] italic font-light">We Create Adventures</span>
            </h1>
            
            <p className="text-white text-base md:text-xl max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg">
              Crafting world-class luxury expeditions for the bold, the curious, and those who seek the extraordinary in every corner of the earth.
            </p>

            <div className="pt-10 flex flex-col items-center gap-6">
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Scroll to Explore</span>
                <ChevronDown className="text-[#14B8A6] w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Company Introduction */}
      <section className="py-16 relative bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative flex justify-center lg:justify-start"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden border border-gray-100 aspect-square max-w-sm md:max-w-md shadow-2xl">
                <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop" alt="Luxury Mountain Expedition" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 z-20 bg-white/90 backdrop-blur-xl border border-gray-100 p-6 rounded-2xl hidden md:block animate-float shadow-xl">
                <Globe className="text-[#14B8A6] mb-3" size={24} />
                <p className="text-[#1A2B3C] font-black text-sm uppercase tracking-tight">120+ Countries</p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Global Expeditions</p>
              </div>
              <div className="absolute -bottom-6 -left-6 z-20 bg-white/90 backdrop-blur-xl border border-gray-100 p-6 rounded-2xl hidden md:block animate-float-delayed shadow-xl">
                <Award className="text-[#F59E0B] mb-3" size={24} />
                <p className="text-[#1A2B3C] font-black text-sm uppercase tracking-tight">Certified Guides</p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Expert Safety</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <span className="text-[#14B8A6] font-black tracking-[0.4em] text-sm uppercase">Who We Are</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1A2B3C] leading-tight">Discovering the <br /> Untamed World.</h2>
              <p className="text-gray-500 text-lg font-light leading-relaxed">
                At 360 Explorer, we believe that travel should be more than just a visit—it should be a transformation. Since our inception, we have been dedicated to bridging the gap between luxury and the raw, untamed beauty of nature.
              </p>
              <p className="text-gray-500 text-lg font-light leading-relaxed">
                Whether it’s a high-altitude trek in the Himalayas, a serene camping experience under the desert stars, or a deep-jungle expedition, our journeys are curated for those who demand excellence and authenticity.
              </p>
              <div className="pt-6">
                <button className="bg-[#1A2B3C] text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#14B8A6] transition-all flex items-center gap-4 group shadow-xl">
                  Our Mission
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Statistics Section */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter target={15000} label="Happy Explorers" suffix="+" />
            <StatCounter target={120} label="Destinations" suffix="+" />
            <StatCounter target={500} label="Adventures Completed" suffix="+" />
            <StatCounter target={4.9} label="Average Rating" />
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 space-y-6">
            <span className="text-[#F59E0B] font-black tracking-[0.4em] text-sm uppercase">Our Excellence</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1A2B3C] tracking-tight">The 360 Standard</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={Users} 
              title="Expert Guides" 
              desc="Our team consists of certified alpinists and local experts with decades of experience." 
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Secure Booking" 
              desc="Premium end-to-end encrypted booking with flexible cancellation policies." 
            />
            <FeatureCard 
              icon={Sparkles} 
              title="Curated Trips" 
              desc="Every itinerary is hand-crafted to provide a perfect balance of challenge and luxury." 
            />
            <FeatureCard 
              icon={Headphones} 
              title="24/7 Support" 
              desc="Satellite-linked global support team always available during your expeditions." 
            />
          </div>
        </div>
      </section>

      {/* 5. Adventure Story Timeline */}
      <section className="py-16 relative bg-white">
        {/* Background decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#14B8A6]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-6">
            <span className="text-[#14B8A6] font-black tracking-[0.4em] text-sm uppercase">Our Evolution</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1A2B3C] tracking-tight">The Journey So Far</h2>
          </div>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gray-200 to-transparent hidden md:block" />
            
            <TimelineItem 
              year="2018" 
              title="The First Spark" 
              desc="Founded by a group of passionate explorers in a small mountain cabin, 360 Explorer began with a single mission: to make true expeditions accessible."
              align="left"
            />
            <TimelineItem 
              year="2019" 
              title="Everest conquered" 
              desc="We successfully led our first major expedition to Everest Base Camp, setting a new standard for luxury in the Himalayas."
              align="right"
            />
            <TimelineItem 
              year="2021" 
              title="Global Expansion" 
              desc="Expanding to 5 continents, we introduced desert crossings and polar expeditions to our curated collection."
              align="left"
            />
            <TimelineItem 
              year="2024" 
              title="The Digital Frontier" 
              desc="Launching our AI-driven planning platform to help explorers customize their journeys with precision and ease."
              align="right"
            />
          </div>
        </div>
      </section>

      {/* 6. Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
            <div className="space-y-6">
              <span className="text-[#F59E0B] font-black tracking-[0.4em] text-sm uppercase">The Visionaries</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1A2B3C] tracking-tight">Meet the Team</h2>
            </div>
            <p className="text-gray-500 max-w-md font-light leading-relaxed">
              A diverse collective of mountaineers, strategists, and storytellers united by a single love for the unknown.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <TeamMember 
              name="Marcus Vane" 
              role="Founder & Chief Alpinist" 
              img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" 
              bio="20 years of Himalayan experience. Has summitted 6 of the 14 eight-thousanders."
            />
            <TeamMember 
              name="Elena Rossi" 
              role="Head of Operations" 
              img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop" 
              bio="Logistics expert specializing in remote expedition safety and satellite comms."
            />
            <TeamMember 
              name="David Chen" 
              role="Expedition Lead" 
              img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" 
              bio="Former special forces survival instructor. Leads our Arctic and Desert treks."
            />
            <TeamMember 
              name="Sarah Jenkins" 
              role="Experience Designer" 
              img="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop" 
              bio="Passionate about sustainability. Curates our eco-luxury camping experiences."
            />
          </div>
        </div>
      </section>

      {/* 7. Testimonials Section */}
      <section className="py-16 bg-gray-50 overflow-hidden relative border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <div className="space-y-6">
            <span className="text-[#14B8A6] font-black tracking-[0.4em] text-sm uppercase">Explorers Voice</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1A2B3C] tracking-tight">What They Say</h2>
          </div>
        </div>

        {/* Marquee effect for testimonials */}
        <div className="flex gap-8 relative overflow-hidden group">
          <motion.div 
            animate={{ x: [0, -1920] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...Array(2)].map((_, outerIndex) => (
              <React.Fragment key={outerIndex}>
                {[
                  { name: "James Wilson", loc: "London, UK", text: "The EBC trek with 360 Explorer was life-changing. The level of luxury in such a remote place was mind-blowing." },
                  { name: "Aria Nakamura", loc: "Tokyo, JP", text: "Never felt safer. The guides were professional and the small group size made the experience very intimate." },
                  { name: "Robert Moore", loc: "Sydney, AU", text: "From booking to the final base camp, everything was seamless. Truly a world-class adventure platform." },
                  { name: "Elena Schmidt", loc: "Berlin, DE", text: "Exceptional service and breathtaking routes. Highly recommend for any serious explorer." },
                  { name: "Carlos Ruiz", loc: "Madrid, ES", text: "A perfect blend of adrenaline and comfort. Can't wait for my next trip with them." }
                ].map((t, i) => (
                  <div 
                    key={i}
                    className="w-[450px] p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-md space-y-6 inline-block whitespace-normal shrink-0"
                  >
                    <div className="flex gap-1 text-[#F59E0B]">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" />)}
                    </div>
                    <p className="text-gray-600 italic font-light leading-relaxed">"{t.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#14B8A6] to-[#F59E0B] flex items-center justify-center font-bold text-white uppercase">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-[#1A2B3C] font-bold">{t.name}</h4>
                        <p className="text-gray-400 text-xs tracking-widest uppercase">{t.loc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
          
          {/* Faders for marquee edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* 8. Call-To-Action Section */}
      <section className="py-16 px-6 relative overflow-hidden bg-white">
        {/* Animated Background Aura */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#14B8A6]/10 to-[#F59E0B]/10 rounded-full blur-[150px] pointer-events-none" 
        />

        <div className="max-w-7xl mx-auto relative rounded-[4rem] overflow-hidden group border border-gray-100 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop" 
            alt="Adventure CTA" 
            className="absolute inset-0 w-full h-full object-cover brightness-[0.5] group-hover:scale-105 transition-transform duration-[3s]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          
          <div className="relative z-10 p-12 md:p-32 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 max-w-2xl"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1] tracking-tight">
                Your Next Adventure <br />
                <span className="text-[#14B8A6] italic font-light">Starts Here</span>
              </h2>
              <p className="text-white/90 text-base md:text-lg font-light leading-relaxed">
                Join our community of elite explorers. Whether you’re a seasoned alpinist or a first-time trekker, we have the perfect journey for you.
              </p>
              
              <div className="flex flex-wrap gap-6 pt-6">
                <Link 
                  href="/expeditions"
                  className="bg-[#14B8A6] text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-[#081120] transition-all shadow-[0_0_30px_rgba(20,184,166,0.3)] flex items-center gap-4 group relative overflow-hidden"
                >
                  <span className="relative z-10">Explore Adventures</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Link>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-[#081120] transition-all">
                  Book Your Journey
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
