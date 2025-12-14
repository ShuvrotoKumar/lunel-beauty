import React from 'react';
import Image from 'next/image';
import { Button } from '@/app/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.png"
            alt="Lunel Beauty Hero"
            fill
            className="object-cover w-full"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">Elevate Your Beauty, Naturally</h1>
          <p className="text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover the pure essence of beauty with our organic skincare collection, crafted with love and nature's finest ingredients.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button className="bg-[#d4a574] !text-black hover:bg-gray-100 px-8 py-4 text-xl font-medium rounded-none">
              Explore Products
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-10 py-4 text-xl font-medium rounded-none">
              Shop Now
            </Button>
          </div>
          <div className="mt-10 flex items-center justify-center space-x-3">
            <span className="text-white text-base font-medium">Dermatology Partner</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;