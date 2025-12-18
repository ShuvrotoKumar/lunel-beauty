'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Eye, Star } from 'lucide-react';
// Using a simple button since the UI button component already exists
const Button = ({ 
  children, 
  className = '', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  size?: 'sm' | 'md' | 'lg' 
}) => {
  return (
    <button 
      className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string[];
  skinType: string[];
  ingredients: string[];
  image: string;
  isNew?: boolean;
  isBestSeller?: boolean;
};

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-gray-600" />
        );
      }
    }
    
    return (
      <div className="flex items-center">
        <div className="flex">{stars}</div>
        <span className="text-sm text-gray-400 ml-1">({product.reviewCount})</span>
      </div>
    );
  };

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <div className="bg-[#383838] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col w-full max-w-sm mx-auto border border-gray-700">
        {/* Product Image */}
        <div className="relative h-72 bg-gray-100 group">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:opacity-90 transition-opacity duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
              NEW
            </div>
          )}
          {product.isBestSeller && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-white text-[10px] font-medium px-2 py-1 rounded-full uppercase tracking-wider">
              Best Seller
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-200 transition-colors">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="text-xs text-gray-300 mb-2">{product.category[0] || 'Skincare'}</div>
          <h3 className="font-medium text-gray-100 text-lg mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-gray-100 text-sm mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-4 h-4 ${star <= 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-xs text-gray-100 ml-1">({product.reviewCount})</span>
          </div>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-baseline">
              <span className="text-lg font-bold text-gray-100">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <button className="bg-[#d4a674] text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800 transition-colors flex items-center">
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
