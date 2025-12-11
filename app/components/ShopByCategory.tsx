'use client';

import { FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'Skincare',
    image: '/images/c1.png',
    description: 'Nourish your skin with our natural skincare products',
    link: '/shop/skincare'
  },
  {
    id: 2,
    name: 'Makeup',
    image: '/images/c2.png',
    description: 'Enhance your natural beauty with our makeup collection',
    link: '/shop/makeup'
  },
  {
    id: 3,
    name: 'Haircare',
    image: '/images/c3.png',
    description: 'Transform your hair with our natural haircare solutions',
    link: '/shop/haircare'
  },
  {
    id: 4,
    name: 'Fragrances',
    image: '/images/c4.png',
    description: 'Discover your signature scent from our collection',
    link: '/shop/fragrances'
  }
];

const ShopByCategory = () => {
  return (
    <section className="py-16 bg-[#4f4f4f]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">Shop by Category</h2>
          <Link 
            href="/shop" 
            className="flex items-center text-white hover:text-pink-700 transition-colors"
          >
            View all categories
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="bg-[#474747] rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="relative h-60">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-white mb-3">{category.name}</h3>
                <Link 
                  href={category.link}
                  className="inline-block bg-[#5b5c4e] text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Shop Category
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;