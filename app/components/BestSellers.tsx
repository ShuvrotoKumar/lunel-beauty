'use client';

import { FiShoppingCart, FiStar, FiEye, FiHeart } from 'react-icons/fi';
import { FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Vitamin C Serum',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 125,
    image: '/images/s1.png',
    category: 'Skincare',
    isNew: true,
    isSale: false
  },
  {
    id: 2,
    name: 'Hydrating Cream',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.6,
    reviews: 98,
    image: '/images/s2.png',
    category: 'Skincare',
    isNew: false,
    isSale: true
  },
  {
    id: 3,
    name: 'Mascara',
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.5,
    reviews: 76,
    image: '/images/s3.png',
    category: 'Makeup',
    isNew: true,
    isSale: false
  },
  {
    id: 4,
    name: 'Lipstick Set',
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.7,
    reviews: 143,
    image: '/images/s4.png',
    category: 'Makeup',
    isNew: false,
    isSale: true
  }
];

const BestSellers = () => {
  return (
    <section className="py-16 bg-[#ffebeb]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Best Sellers</h2>
          <Link 
            href="/shop/best-sellers" 
            className="flex items-center text-pink-600 hover:text-pink-700 transition-colors"
          >
            View all products
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 relative"
            >
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-2">
                {product.isNew && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    New
                  </span>
                )}
                {product.isSale && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Sale
                  </span>
                )}
              </div>

              {/* Wishlist button */}
              <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <FiHeart className="h-5 w-5 text-gray-600" />
              </button>

              {/* Product image */}
              <div className="relative h-60 bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* Quick view button */}
                <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-md flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiEye className="h-4 w-4" />
                  <span className="text-sm font-medium">Quick View</span>
                </button>
              </div>

              {/* Product info */}
              <div className="p-5">
                <div className="mb-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-[#FF9494]">${product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <button className="bg-[#FF9494] text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center">
                    <FiShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;