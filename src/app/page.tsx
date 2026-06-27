import React from "react";
import SearchHero from "@/components/SearchHero";
import AdventureCard from "@/components/AdventureCard";
import JourneyGallery from "@/components/JourneyGallery";
import Sponsorship from "@/components/Sponsorship";
import { adventures } from "@/data/adventures";
import { ArrowRight, Sparkles, MapPin, Users, Award, ShieldCheck, Compass, Utensils, Map } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const allAdventures = adventures.slice(0, 18);
  const bestAdventures = adventures.slice(0, 6); // Show top 6 as best expeditions

  const whyChooseUs = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Expert Guides",
      description: "Our experienced team of local guides have in-depth knowledge of every destination."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "100% Safe & Secure",
      description: "Your safety is our top priority with comprehensive safety measures and protocols."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Small Group Sizes",
      description: "Intimate groups ensure personalized attention and authentic experiences."
    },
    {
      icon: <Compass className="w-8 h-8" />,
      title: "Unique Destinations",
      description: "Explore off-the-beaten-path locations that most travelers never discover."
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Authentic Meals",
      description: "Enjoy local cuisine and dining experiences that showcase the culture."
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Customized Itineraries",
      description: "Tailor-made experiences designed to match your interests and preferences."
    }
  ];

  return (
    <div className="bg-white w-full overflow-x-hidden">
      <SearchHero />

      {/* All Expeditions Section */}
      <section className="py-16 bg-white">
        <div className="w-full px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-[#1A2B3C]/5 text-[#1A2B3C] px-6 py-2 rounded-full text-[8px] font-black tracking-[0.3em] uppercase border border-[#1A2B3C]/10">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                All Journeys
              </div>
              <h2 className="text-4xl md:text-7xl font-light text-[#1A2B3C] tracking-tight leading-none">
                Explore <br />
                <span className="text-[#D4A373] font-extralight">All Expeditions</span>
              </h2>
            </div>
            <Link 
              href="/expeditions"
              className="group flex items-center gap-4 text-[#1A2B3C] font-black text-[11px] uppercase tracking-[0.3em] hover:text-[#D4A373] transition-colors mb-2"
            >
              Explore All
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#D4A373] group-hover:text-white transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
            {allAdventures.map((adventure) => (
              <AdventureCard key={adventure.id} adventure={adventure} />
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center space-y-8">
         <h2 className="text-4xl md:text-6xl font-light text-[#1A2B3C] tracking-tight leading-none">
           Committed to <br />
           <span className="text-[#D4A373] font-extralight">Excellence</span>
         </h2>
         <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
           Our mission is to provide unparalleled luxury expeditions that respect the environment and empower local communities.
         </p>
         <Link 
            href="/about"
            className="inline-block text-[#1A2B3C] font-black text-[11px] uppercase tracking-[0.2em] border-b-2 border-[#D4A373] pb-2 hover:text-[#D4A373] transition-colors"
         >
           Read Our Story
         </Link>
      </section>

      <JourneyGallery />

      {/* Why Choose Explorer Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-light text-[#1A2B3C] tracking-tight mb-4">
              Why Choose <span className="text-[#D4A373] font-extralight">360 Explorers</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light">
              Discover what makes our expeditions extraordinary and unforgettable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="p-8 bg-[#FDFBF7] rounded-2xl border border-gray-100 hover:border-[#D4A373] transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 bg-[#D4A373]/10 rounded-full flex items-center justify-center text-[#D4A373] mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1A2B3C] mb-3">{item.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Best Expeditions Section */}
      <section className="py-16 bg-[#FDFBF7] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-[#1A2B3C]/5 text-[#1A2B3C] px-6 py-2 rounded-full text-[8px] font-black tracking-[0.3em] uppercase border border-[#1A2B3C]/10 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
              Top Rated
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-[#1A2B3C] tracking-tight mb-4">
              Our Past <span className="text-[#D4A373] font-extralight">Expeditions</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light">
              Handpicked adventures loved by thousands of travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {bestAdventures.map((adventure) => (
              <AdventureCard key={adventure.id} adventure={adventure} />
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/expeditions"
              className="inline-flex items-center gap-4 bg-[#1A2B3C] hover:bg-[#D4A373] text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300"
            >
              View All Expeditions
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Sponsorship />
    </div>
  );
}
