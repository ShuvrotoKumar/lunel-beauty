import React from 'react';
import Image from 'next/image';

const ArtOfPureBeauty = () => {
  return (
    <section className="py-16 bg-[#3b3b3b]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-serif text-gray-100 mb-6">The Art of Pure Beauty</h2>
          <p className="text-lg md:text-xl text-gray-300 font-serif mb-16 max-w-2xl mx-auto leading-relaxed">
            At Lunel, we believe in the power of nature to enhance your natural beauty. 
            Our products are crafted with pure, organic ingredients that nourish and revitalize your skin. 
            Experience the perfect blend of science and nature for radiant, healthy-looking skin.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-8">
            {[
              { 
                id: 1, 
                alt: 'Laum Seury Serum', 
                src: '/images/b1.png',
                name: 'Laum Seury',
                className: ''
              },
              { 
                id: 2, 
                alt: 'JEKNCLER Cream', 
                src: '/images/b2.png',
                name: 'JEKNCLER',
                className: 'mt-20' // Slightly adjust the top margin of the middle image
              },
              { 
                id: 3, 
                alt: 'Pure Serum', 
                src: '/images/b3.png',
                name: 'Pure Serum',
                className: ''
              },
            ].map((item) => (
              <div key={item.id} className={`relative h-80 group ${item.className}`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  layout="fill"
                  objectFit="contain"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                {/* <div className="absolute bottom-0 left-0 right-0 text-center">
                  <p className="text-gray-100 font-serif text-lg">{item.name}</p>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtOfPureBeauty;
