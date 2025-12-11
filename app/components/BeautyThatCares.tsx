'use client';

import { FaLeaf, FaHeart, FaShieldAlt } from 'react-icons/fa';

const BeautyThatCares = () => {
  const features = [
    {
      icon: <FaLeaf className="w-6 h-6 text-green-600" />,
      title: "100% Natural"
    },
    {
      icon: <FaHeart className="w-6 h-6 text-pink-500" />,
      title: "Cruelty-Free"
    },
    {
      icon: <FaShieldAlt className="w-6 h-6 text-blue-500" />,
      title: "Dermatology Safe"
    }
  ];

  return (
    <section className="py-24 bg-[#3b3b3b]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 font-playfair">Beauty That Cares</h2>
          <p className="text-white text-lg">
            At BeautyGlow, we believe in beauty that goes beyond skin deep. Our products are crafted with love, care, and respect for both you and the planet.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              {feature.icon}
              <h3 className="text-sm font-medium text-white">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeautyThatCares;