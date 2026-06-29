'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useSearch } from './SearchContext';
import Link from 'next/link';

const Header = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 bg-white py-3 shadow-sm border-b border-gray-100 transition-all duration-300">
      {/* Main Navigation */}
      <div className="max-w-[1600px] mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex flex-col items-start cursor-pointer min-w-[150px] sm:min-w-[200px] -ml-4" 
          onClick={() => setSearchQuery('')}
        >
          <img 
            src="/image/logo.png" 
            alt="360 Explorer" 
            className="h-10 sm:h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10 flex-1 justify-center">
          {[
            { name: 'Home', href: '/', hasDropdown: false },
            { name: 'Destinations', href: '/destinations', hasDropdown: true },
            { name: 'Expeditions', href: '/expeditions', hasDropdown: true },
            { name: 'About', href: '/about', hasDropdown: true },
            { name: 'Contact', href: '/contact', hasDropdown: false }
          ].map((item) => (
            <Link key={item.name} href={item.href} className="relative group cursor-pointer">
              <span className="text-[14px] font-medium uppercase tracking-[0.15em] flex items-center gap-2 text-[#1A2B3C] hover:text-[#D4A373] transition-colors">
                {item.name}
                {item.hasDropdown && (
                  <svg className="w-2.5 h-2.5 transition-transform group-hover:rotate-180 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </span>
            </Link>
          ))}
        </nav>

        {/* Desktop Action Button */}
        <div className="hidden lg:flex items-center justify-end min-w-[180px] gap-3">
          <Link href="/expeditions" className="px-7 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-xl bg-[#1A2B3C] text-white hover:bg-[#D4A373] shadow-[#1A2B3C]/10">
            Plan A Trip
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <Link href="/expeditions" className="px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-[0.3em] bg-[#1A2B3C] text-white">
            Plan A Trip
          </Link>
          <button 
            className="p-2 text-[#1A2B3C]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col p-4 gap-4">
            {[
              { name: 'Home', href: '/' },
              { name: 'Destinations', href: '/destinations' },
              { name: 'Expeditions', href: '/expeditions' },
              { name: 'About', href: '/about' },
              { name: 'Contact', href: '/contact' }
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="text-[14px] font-medium uppercase tracking-[0.15em] text-[#1A2B3C] hover:text-[#D4A373] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
