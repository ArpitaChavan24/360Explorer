'use client';

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, Thermometer, Wind, Droplets } from 'lucide-react';

const WeatherWidget = ({ location }: { location: string }) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated weather data for demo purposes
    // In a real app, you'd call OpenWeather API here
    const timer = setTimeout(() => {
      setWeather({
        temp: Math.floor(Math.random() * 15) - 5, // -5 to 10
        condition: "Partly Cloudy",
        wind: "12 km/h",
        humidity: "45%",
        visibility: "10 km"
      });
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location]);

  if (loading) return (
    <div className="bg-white/5 animate-pulse h-32 rounded-3xl" />
  );

  return (
    <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#14B8A6]/10 rounded-xl flex items-center justify-center">
            <Cloud className="w-5 h-5 text-[#14B8A6]" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">Live Weather</p>
            <p className="text-sm font-bold text-white mt-1">{location}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-white">{weather.temp}°C</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-black/20 p-2 rounded-xl text-center">
          <Wind className="w-3 h-3 text-gray-500 mx-auto mb-1" />
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">{weather.wind}</p>
        </div>
        <div className="bg-black/20 p-2 rounded-xl text-center">
          <Droplets className="w-3 h-3 text-gray-500 mx-auto mb-1" />
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">{weather.humidity}</p>
        </div>
        <div className="bg-black/20 p-2 rounded-xl text-center">
          <Thermometer className="w-3 h-3 text-gray-500 mx-auto mb-1" />
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Visibility</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
