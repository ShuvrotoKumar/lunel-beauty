'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';

interface WishlistItemType {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color?: string;
  size?: string;
}

export default function WishlistItem({ item }: { item: WishlistItemType }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const removeFromWishlist = (id: string) => {
    if (typeof window === 'undefined') return;
    
    setIsRemoving(true);
    
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        const wishlist = JSON.parse(savedWishlist);
        const updatedWishlist = wishlist.filter((item: WishlistItemType) => item.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        
        // Dispatch both storage and custom events
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
          detail: { action: 'remove', itemId: id }
        }));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-[#171717] rounded-lg mb-4">
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover rounded"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white truncate">{item.name}</h3>
          {item.color && (
            <p className="text-sm text-gray-400">Color: {item.color}</p>
          )}
          {item.size && (
            <p className="text-sm text-gray-400">Size: {item.size}</p>
          )}
          <div className="mt-2">
            <span className="text-lg font-semibold text-[#d4a674]">
              ${item.price.toFixed(2)}
            </span>
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                ${item.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
        <button 
          onClick={() => removeFromWishlist(item.id)}
          className="flex items-center text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove from wishlist"
        >
          <FiTrash2 className="mr-1" />
          <span className="text-sm">Remove</span>
        </button>
        
        <button 
          className="flex items-center bg-[#d4a674] text-black px-4 py-2 rounded-md hover:bg-[#c49560] transition-colors"
          aria-label="Add to cart"
        >
          <FiShoppingCart className="mr-2" />
          <span className="text-sm font-medium">Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
