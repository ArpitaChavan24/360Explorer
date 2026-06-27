'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, Camera, Send, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#081120] text-[#F8FAFC] w-full border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Top Destinations */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#14B8A6]">Top Destinations</h4>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {['Asia', 'Antartica', 'Europe', 'North America', 'Africa', 'South America', 'Australia'].map((item) => (
                <Link key={item} href="#" className="text-gray-400 text-sm hover:text-[#14B8A6] transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#14B8A6]">Company</h4>
            <div className="flex flex-col gap-4">
              {['About Us', 'Contact Us', 'Admin Panel', 'Terms and Conditions', 'Policy'].map((item) => (
                <Link key={item} href={item === 'About Us' ? '/about' : item === 'Admin Panel' ? '/admin/bookings' : '#'} className="text-gray-400 text-sm hover:text-[#14B8A6] transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Community */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#14B8A6]">Community</h4>
            <div className="flex flex-col gap-4">
              {['360 Phoenix', 'Corporate 360', 'UN SDG'].map((item) => (
                <Link key={item} href="#" className="text-gray-400 text-sm hover:text-[#14B8A6] transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:border-l border-white/10 lg:pl-12 space-y-6 text-right">
            <div className="flex flex-col items-end gap-1">
              <span className="text-white font-bold text-lg">360 Explorer Inc</span>
              <span className="text-gray-500 text-xs tracking-widest uppercase">USA | India | Canada</span>
            </div>
            
            <div className="flex flex-col items-end gap-2 pt-4">
              <a href="tel:+917770000206" className="text-xl md:text-2xl font-black text-white hover:text-[#14B8A6] transition-colors">
                +91-7770000206
              </a>
              <a href="tel:+917770000205" className="text-xl md:text-2xl font-black text-white hover:text-[#14B8A6] transition-colors">
                +91-7770000205
              </a>
              <a href="mailto:contact@example.com" className="text-gray-400 text-sm hover:text-[#14B8A6] transition-colors mt-2">
                contact@example.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-gray-500 text-sm">
            © 2022 360explorers. All rights reserved.
          </p>

          <div className="flex gap-8">
            {['Terms & Conditions', 'Cookies', 'Privacy Policy'].map((item) => (
              <Link key={item} href="#" className="text-gray-500 text-sm hover:text-[#14B8A6] transition-colors underline underline-offset-4 decoration-white/10">
                {item}
              </Link>
            ))}
          </div>

          <div className="flex gap-4">
            {[Globe, Camera, Send, Mail].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#14B8A6] hover:text-white hover:border-[#14B8A6] transition-all">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
