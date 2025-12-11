'use client';

import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  return (
    <section className="py-16 bg-[#4f4f4f]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">Best Sellers</h2>
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
              className="group bg-[#2b2b2b] rounded-lg overflow-hidden border border-gray-700"
            >
              {/* Product image */}
              <div className="relative h-80 bg-gray-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* Product info */}
              <div className="p-5">
                <h3 className="text-lg font-medium text-white mb-2">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="h-4 w-4 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400 ml-2">(124 reviews)</span>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-400 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      className="p-2 border border-white rounded-full text-white hover:bg-white hover:bg-opacity-10 transition-colors"
                      aria-label="Quick view"
                    >
                      <FiEye className="h-5 w-5" />
                    </button>
                    <button
                      className="bg-[#8B7D6B] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#9E8F7D] transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
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