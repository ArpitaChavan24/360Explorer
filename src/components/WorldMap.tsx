'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import('react-globe.gl'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-[#0A1A2F] rounded-[2.5rem]">
      <div className="text-white font-black tracking-widest animate-pulse">LOADING 3D WORLD...</div>
    </div>
  )
});

const destinations = [
  { name: "Everest Base Camp", lat: 27.9881, lng: 86.9250, explorers: "4.2K", color: "#F59E0B" },
  { name: "Annapurna Circuit", lat: 28.5983, lng: 83.9450, explorers: "2.8K", color: "#F59E0B" },
  { name: "Kilimanjaro", lat: -3.0674, lng: 37.3556, explorers: "1.5K", color: "#F59E0B" },
  { name: "Inca Trail", lat: -13.1633, lng: -72.5450, explorers: "3.1K", color: "#F59E0B" },
  { name: "Mont Blanc", lat: 45.8326, lng: 6.8651, explorers: "1.9K", color: "#F59E0B" },
  { name: "Patagonia", lat: -50.4960, lng: -72.8890, explorers: "2.1K", color: "#F59E0B" },
  { name: "Ladakh", lat: 34.1526, lng: 77.5771, explorers: "5.4K", color: "#F59E0B" },
];

const WorldMap = () => {
  const globeRef = useRef<any>(null);
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);
  const [containerSize, setContainerSize] = useState({ width: 1200, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  const [countries, setCountries] = useState<any>({ features: [] });
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [statesData, setStatesData] = useState<any>(null);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      setContainerSize({ width: clientWidth, height: 600 });
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerSize({ width: containerRef.current.clientWidth, height: 600 });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Load country polygons
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);

    // Load major populated places (Cities)
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_populated_places_simple.geojson')
      .then(res => res.json())
      .then(data => setCities(data.features));
  }, []);

  const handlePolygonClick = (polygon: any) => {
    const countryName = polygon.properties.NAME || polygon.properties.ADMIN;
    
    if (selectedCountry === countryName) {
      // If already selected, reset
      resetView();
      return;
    }

    setSelectedCountry(countryName);
    setIsZooming(true);

    // If India is clicked, load states
    if (countryName === 'India') {
      fetch('https://raw.githubusercontent.com/HindustanTimesLabs/shapefiles/master/india/states/india_states.json')
        .then(res => res.json())
        .then(data => {
          setStatesData(data);
          // Zoom to India
          if (globeRef.current) {
            globeRef.current.pointOfView({ lat: 20.5937, lng: 78.9629, altitude: 0.8 }, 2000);
          }
        });
    } else {
      const lat = polygon.properties.LABEL_Y || 0;
      const lng = polygon.properties.LABEL_X || 0;
      if (globeRef.current) {
        globeRef.current.pointOfView({ lat, lng, altitude: 1.2 }, 2000);
      }
      setStatesData(null);
    }
  };

  const resetView = () => {
    setSelectedCountry(null);
    setStatesData(null);
    setIsZooming(false);
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.2 }, 2000);
    }
  };

  useEffect(() => {
    if (globeRef.current) {
      // Auto-rotate the globe
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.8;
      
      // Allow manual rotation but disable zooming to fix the earth's size
      globeRef.current.controls().enableRotate = true;
      globeRef.current.controls().enableZoom = false;
      
      if (!selectedCountry) {
        globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.2 });
      }
    }
  }, [selectedCountry]);

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6" ref={containerRef}>
        <div className="relative bg-[#0A1A2F] border border-white/10 shadow-2xl overflow-hidden group rounded-[3rem] h-[600px]">
          
          {/* 3D Globe Container */}
          <div className="absolute inset-0 z-0">
            <Globe
              ref={globeRef}
              width={containerSize.width}
              height={containerSize.height}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              atmosphereColor="#14B8A6"
              atmosphereAltitude={0.15}
              
              // Polygons: Switch between Global Countries and States when a country is selected
              polygonsData={statesData ? statesData.features : countries.features}
              polygonCapColor={(d: any) => {
                if (statesData) return 'rgba(245, 158, 11, 0.2)'; // Amber for states
                return d.properties.NAME === selectedCountry ? 'rgba(20, 184, 166, 0.4)' : 'rgba(20, 184, 166, 0.1)';
              }}
              polygonSideColor={() => 'rgba(255, 255, 255, 0.05)'}
              polygonStrokeColor={(d: any) => statesData ? '#F59E0B' : '#14B8A6'}
              polygonLabel={({ properties: d }: any) => `
                <div class="bg-[#0A1A2F]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-2xl">
                  <b class="text-[#14B8A6] uppercase tracking-widest text-[10px]">${d.ST_NM || d.NAME || d.ADMIN}</b>
                  ${statesData ? '<p class="text-white/60 text-[8px] mt-1 font-bold">STATE VIEW</p>' : ''}
                </div>
              `}
              onPolygonClick={handlePolygonClick}

              // Labels
              labelsData={statesData ? statesData.features : countries.features}
              labelLat={(d: any) => d.properties.LABEL_Y || (d.geometry.type === 'Polygon' ? d.geometry.coordinates[0][0][1] : d.geometry.coordinates[0][0][0][1])}
              labelLng={(d: any) => d.properties.LABEL_X || (d.geometry.type === 'Polygon' ? d.geometry.coordinates[0][0][0] : d.geometry.coordinates[0][0][0][0])}
              labelText={(d: any) => d.properties.ST_NM || d.properties.NAME}
              labelSize={(d: any) => statesData ? 0.4 : 0.6}
              labelDotRadius={0}
              labelColor={() => 'rgba(255, 255, 255, 0.7)'}
              labelResolution={2}

              // City Markers/Labels (Only show if not in state view)
              htmlElementsData={selectedCountry ? [] : cities}
              htmlElement={(d: any) => {
                const el = document.createElement('div');
                el.innerHTML = `
                  <div class="group flex flex-col items-center">
                    <div class="w-1 h-1 bg-[#F59E0B] rounded-full shadow-[0_0_5px_#F59E0B]"></div>
                    <span class="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-[6px] text-white px-1 rounded mt-1 pointer-events-none whitespace-nowrap">
                      ${d.properties.name}
                    </span>
                  </div>
                `;
                return el;
              }}
              
              // Expedition Points
              pointsData={destinations}
              pointLat="lat"
              pointLng="lng"
              pointColor="color"
              pointAltitude={0.12}
              pointRadius={0.8}
              pointsMerge={false}
              onPointHover={setHoveredPoint}
            />
          </div>

          {/* Floating UI Overlays */}
          <div className="absolute inset-0 pointer-events-none z-10 p-10 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.3em] text-[#14B8A6]">
                  <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
                  Live Expedition Network
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {selectedCountry ? selectedCountry : 'The World,'} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#F59E0B]">
                    {selectedCountry ? 'Regional Discovery' : 'In 360 Degrees'}
                  </span>
                </h2>
                
                {selectedCountry && (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={resetView}
                    className="pointer-events-auto flex items-center gap-2 px-6 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#14B8A6] transition-all group"
                  >
                    <svg className="w-3 h-3 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Global
                  </motion.button>
                )}
              </div>
              
              <div className="hidden md:block text-right">
                <p className="text-sm font-light text-white/40 max-w-[200px]">
                  Explore our global footprint in real-time. Drag to rotate, scroll to zoom.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex gap-12">
                <div>
                  <p className="text-4xl font-bold text-white tracking-tighter">120+</p>
                  <p className="text-[10px] font-black text-[#14B8A6] uppercase tracking-[0.2em] mt-1">Countries</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white tracking-tighter">15K</p>
                  <p className="text-[10px] font-black text-[#14B8A6] uppercase tracking-[0.2em] mt-1">Explorers</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl hidden lg:block max-w-xs">
                <AnimatePresence mode="wait">
                  {hoveredPoint ? (
                    <motion.div
                      key={hoveredPoint.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-2"
                    >
                      <p className="text-[#F59E0B] text-[10px] font-black uppercase tracking-widest">{hoveredPoint.explorers} ACTIVE NOW</p>
                      <p className="text-lg font-bold text-white">{hoveredPoint.name}</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-2"
                    >
                      <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Global Status</p>
                      <p className="text-lg font-bold text-white/60">Hover over a point to see details</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Scanline Effect Overlay */}
          <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%]" />
        </div>
      </div>
    </section>
  );
};

export default WorldMap;
