'use client';

import { FaLeaf, FaHeart, FaShieldAlt } from 'react-icons/fa';

const BeautyThatCares = () => {
  const features = [
    {
      icon: <FaLeaf className="w-12 h-12 text-[#FF9494] mb-4" />,
      title: "Natural Ingredients",
      description: "Made with 100% natural and organic ingredients"
    },
    {
      icon: <FaHeart className="w-12 h-12 text-[#FF9494] mb-4" />,
      title: "Cruelty Free",
      description: "Never tested on animals, always cruelty-free"
    },
    {
      icon: <FaShieldAlt className="w-12 h-12 text-[#FF9494] mb-4" />,
      title: "Dermatologist Tested",
      description: "Safe for all skin types, even sensitive skin"
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Beauty That Cares</h2>
          <p className="text-gray-600 text-lg">
            We believe in beauty products that not only make you look good but also care for your skin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeautyThatCares;