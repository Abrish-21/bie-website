// src/components/LocalAdCarousel.tsx

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Use Next.js Image component for optimization
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define a simple interface for our ad data
interface Ad {
  id: number;
  imageSrc: string;
  altText: string;
  linkHref: string;
}

// Dummy ad data for demonstration. Replace with actual ad data from your source.
const DUMMY_ADS: Ad[] = [
  { id: 1, imageSrc: 'https://placehold.co/300x250/FFD700/000000?text=Local+Ad+1', altText: 'Local Business Ad 1', linkHref: '/ads/ad1' },
  { id: 2, imageSrc: 'https://placehold.co/300x250/A6D1F7/000000?text=Local+Ad+2', altText: 'Local Business Ad 2', linkHref: '/ads/ad2' },
  { id: 3, imageSrc: 'https://placehold.co/300x250/FF6347/FFFFFF?text=Local+Ad+3', altText: 'Local Business Ad 3', linkHref: '/ads/ad3' },
  { id: 4, imageSrc: 'https://placehold.co/300x250/8A2BE2/FFFFFF?text=Local+Ad+4', altText: 'Local Business Ad 4', linkHref: '/ads/ad4' },
];

interface LocalAdCarouselProps {
  ads?: Ad[]; // Optional prop to pass custom ads
  interval?: number; // Time in ms for auto-advance (default 5000ms)
}

export const LocalAd: React.FC<LocalAdCarouselProps> = ({ ads = DUMMY_ADS, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic carousel advance
  useEffect(() => {
    if (ads.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, interval);

    return () => clearInterval(timer); // Clear interval on component unmount
  }, [ads.length, interval]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + ads.length) % ads.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
  };

  if (ads.length === 0) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-500">
        No local ads available.
      </div>
    );
  }

  const currentAd = ads[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-md bg-white">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {ads.map((ad, index) => (
          <div key={ad.id} className="w-full flex-shrink-0">
            <a href={ad.linkHref} target="_blank" rel="noopener noreferrer" className="block">
              <Image
                src={ad.imageSrc}
                alt={ad.altText}
                width={300} // Adjust based on your design, typically sidebar width
                height={250} // Standard MPU ad size
                layout="responsive" // Make image responsive within its container
                objectFit="cover"
                className="rounded-lg"
              />
            </a>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity z-10"
        aria-label="Previous Ad"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity z-10"
        aria-label="Next Ad"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots for navigation */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
