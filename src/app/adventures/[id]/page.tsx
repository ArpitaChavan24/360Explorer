'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Star, ChevronLeft, MapPin, Wifi, Car, Utensils, Check, Award, Users } from 'lucide-react';
import { Adventure } from '@/data/adventures';
import { useSearch } from '@/components/SearchContext';

const AdventureDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { currency } = useSearch();
  
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdventure = async () => {
      try {
        setLoading(true);
        import('@/data/adventures').then(mod => {
          const found = mod.adventures.find(a => a.id === id);
          if (found) setAdventure(found);
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAdventure();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white space-y-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-[#1A2B3C] rounded-full animate-spin" />
        <p className="text-gray-400 font-medium animate-pulse">Loading adventure details...</p>
      </div>
    );
  }

  if (!adventure) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
        <h1 className="text-2xl font-bold mb-4 text-[#1A2B3C]">Adventure Not Found</h1>
        <button 
          onClick={() => router.push('/')}
          className="bg-[#1A2B3C] text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-black/10"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const price = currency === 'INR' 
    ? (adventure.priceInr || adventure.price) 
    : (adventure.priceUsd || adventure.price);

  const amenities = [
    { icon: <MapPin className="w-5 h-5" />, label: "Mountain view" },
    { icon: <Wifi className="w-5 h-5" />, label: "Wifi" },
    { icon: <Car className="w-5 h-5" />, label: "Free parking on premises" },
    { icon: <Utensils className="w-5 h-5" />, label: "Free meals" },
    { icon: <Award className="w-5 h-5" />, label: "Expert guide" },
    { icon: <Users className="w-5 h-5" />, label: "Group friendly" },
    { icon: <Check className="w-5 h-5" />, label: "First aid kit" },
    { icon: <Check className="w-5 h-5" />, label: "Camping equipment" },
    { icon: <Check className="w-5 h-5" />, label: "Hot showers" },
    { icon: <Check className="w-5 h-5" />, label: "Breakfast included" },
    { icon: <Check className="w-5 h-5" />, label: "Lunch included" },
    { icon: <Check className="w-5 h-5" />, label: "Dinner included" },
  ];

  const reviews = [
    { name: "Samarth", avatar: "S", date: "3 months ago", rating: 5, text: "The villa is located in a peaceful area with a very nice environment and no disturbance, which made our stay more relaxing..." },
    { name: "Jason Dylan", avatar: "JD", date: "4 years ago", rating: 5, text: "Overall great place for the price range, host and caretaker are super helpful and friendly. The host also gifted a cake as our group was celebrating a birthday..." },
    { name: "Ankur", avatar: "A", date: "6 years ago", rating: 5, text: "Amazing experience! The location is perfect and the views are breathtaking." },
    { name: "Bhoj", avatar: "B", date: "1 month ago", rating: 5, text: "It was a great experience! The house keeping and the host everyone was very welcoming and nice. The rooms were great and everything went smooth. It's very close to..." },
    { name: "Ravindra", avatar: "R", date: "10 months ago", rating: 5, text: "Absolutely stunning adventure! The guides were professional and the scenery was out of this world." },
  ];



  return (
    <div className="bg-white min-h-screen w-full">
      {/* Header Navigation */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Title Section */}
        <div className="mb-4">
          <h1 className="text-2xl font-light text-gray-900 mb-2">{adventure.title}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current text-gray-900" />
              <span className="font-semibold">{adventure.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-400">·</span>
            <span className="underline decoration-gray-400 decoration-1 underline-offset-2 cursor-pointer">{reviews.length} reviews</span>
            <span className="text-gray-400">·</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="underline decoration-gray-400 decoration-1 underline-offset-2 cursor-pointer">{adventure.location}</span>
            </div>
          </div>
        </div>

        {/* Single Large Image */}
        <div className="rounded-2xl overflow-hidden mb-8 h-[500px]">
          <img 
            src={adventure.image} 
            alt={adventure.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host Info */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-bold">Guest favourite</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold">36</div>
                  <div>
                    <p className="font-semibold">Hosted by 360 Explorer</p>
                    <p className="text-sm text-gray-500">Expert guide · 5+ years hosting</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights */}
    {adventure.highlights && adventure.highlights.length > 0 && (
      <div className="space-y-4 border-b border-gray-200 pb-6">
        {adventure.highlights.slice(0, 3).map((highlight, index) => (
          <div key={index} className="flex items-start gap-3">
            <Check className="w-6 h-6 mt-0.5" />
            <div>
              <p className="font-semibold">{highlight}</p>
              <p className="text-sm text-gray-500">Experience the best of {adventure.title}.</p>
            </div>
          </div>
        ))}
      </div>
    )}

            {/* Description */}
            <div className="border-b border-gray-200 pb-6">
              <p className="text-gray-700 leading-relaxed">
                {adventure.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-light mb-6">What this place offers</h2>
              <div className="grid grid-cols-2 gap-y-4">
                {amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 flex items-center justify-center">{amenity.icon}</div>
                    <span className="text-gray-700">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            {adventure.highlights && adventure.highlights.length > 0 && (
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-xl font-light mb-6">Highlights</h2>
                <div className="grid grid-cols-2 gap-4">
                  {adventure.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-gray-900" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Day-by-Day Itinerary */}
            {adventure.itinerary && adventure.itinerary.length > 0 && (
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-xl font-light mb-6">Day-by-Day Itinerary</h2>
                <div className="space-y-6">
                  {adventure.itinerary.map((day, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-900">
                        {day.day}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{day.title}</h3>
                        <p className="text-gray-700">{day.description}</p>
                        {day.details && (
                          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
                            {day.details.elevation && <div>Elevation: {day.details.elevation}</div>}
                            {day.details.distance && <div>Distance: {day.details.distance}</div>}
                            {day.details.hikingTime && <div>Hiking Time: {day.details.hikingTime}</div>}
                            {day.details.habitat && <div>Habitat: {day.details.habitat}</div>}
                            {day.details.meals && <div>Meals: {day.details.meals}</div>}
                            {day.details.lodging && <div>Lodging: {day.details.lodging}</div>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            {(adventure.inclusions && adventure.inclusions.length > 0) || (adventure.exclusions && adventure.exclusions.length > 0) ? (
              <div className="border-b border-gray-200 pb-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {adventure.inclusions && adventure.inclusions.length > 0 && (
                  <div>
                    <h2 className="text-xl font-light mb-6">Included</h2>
                    <div className="space-y-3">
                      {adventure.inclusions.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {adventure.exclusions && adventure.exclusions.length > 0 && (
                  <div>
                    <h2 className="text-xl font-light mb-6">Not Included</h2>
                    <div className="space-y-3">
                      {adventure.exclusions.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-red-400 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Big Rating */}
            <div className="border-b border-gray-200 pb-6 pt-4">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="w-12 h-12 text-gray-700" />
                  <span className="text-6xl font-light">{adventure.rating.toFixed(1)}</span>
                  <Award className="w-12 h-12 text-gray-700" />
                </div>
                <p className="text-lg font-medium">Guest favourite</p>
                <p className="text-sm text-gray-500 max-w-sm mx-auto mt-1">
                  This home is a guest favourite based on ratings, reviews and reliability.
                </p>
                <button className="text-sm underline decoration-gray-400 underline-offset-2 mt-2">
                  How reviews work
                </button>
              </div>

              {/* Rating Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 mb-8">
                {[
                  { label: "Overall rating", value: "5.0" },
                  { label: "Cleanliness", value: "4.8" },
                  { label: "Accuracy", value: "4.9" },
                  { label: "Check-in", value: "5.0" },
                  { label: "Communication", value: "5.0" },
                  { label: "Location", value: "4.9" },
                  { label: "Value", value: "4.9" },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-sm text-gray-600">{item.label}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-gray-200 rounded-full">
                        <div className="h-1 bg-gray-900 rounded-full" style={{ width: `${parseFloat(item.value) * 20}%` }} />
                      </div>
                      <span className="text-sm font-semibold">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Pool', 'Hospitality', 'Cleanliness', 'Condition', 'Comfort', 'Family', 'Indoor spaces', 'Location'].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-sm flex items-center gap-2">
                    {tag} <span className="text-gray-400">29</span>
                  </span>
                ))}
              </div>

              {/* Reviews */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((review, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-current text-gray-900" />
                      ))}
                    </div>
                    <p className="text-gray-700">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <div className="border border-gray-200 rounded-2xl p-6 shadow-xl space-y-6">
                {/* Price */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-2xl font-semibold">{price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">{adventure.rating.toFixed(1)}</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-600 underline decoration-gray-400 decoration-1 underline-offset-2">{reviews.length} reviews</span>
                  </div>
                </div>

                {/* Book Button */}
                <button 
                  onClick={() => router.push(`/adventures/${adventure.id}/book`)}
                  className="w-full bg-gradient-to-r from-[#FF385C] to-[#E31C5F] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
                >
                  Book Now
                </button>

                <p className="text-center text-sm text-gray-500">You won't be charged yet</p>

                {/* Price Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between underline decoration-gray-300 decoration-1 underline-offset-4">
                    <span>Price</span>
                    <span>{price}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>{price}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <div className="w-4 h-4 border border-gray-300 rounded" />
                  Report this listing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventureDetailPage;
