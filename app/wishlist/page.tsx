'use client';

import { useState, useEffect } from 'react';
import WishlistItem from './WishlistItem';
import { FiHeart, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

interface WishlistItemType {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color?: string;
  size?: string;
}

// Custom hook to manage wishlist state
const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItemType[]>([]);
  
  // Load wishlist from localStorage on mount
  useEffect(() => {
    const loadWishlist = () => {
      if (typeof window !== 'undefined') {
        const savedWishlist = localStorage.getItem('wishlist');
        setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
      }
    };

    // Initial load
    loadWishlist();

    // Listen for storage events to sync between tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'wishlist') {
        loadWishlist();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for the custom event we dispatch
    const handleCustomEvent = () => loadWishlist();
    window.addEventListener('wishlistUpdated', handleCustomEvent as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleCustomEvent as EventListener);
    };
  }, []);

  // Function to update the wishlist
  const updateWishlist = (newWishlist: WishlistItemType[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      setWishlist(newWishlist);
      // Dispatch a custom event to notify other components
      window.dispatchEvent(new Event('wishlistUpdated'));
    }
  };

  return { wishlist, updateWishlist };
};

export default function WishlistPage() {
  const { wishlist, updateWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <Link 
            href="/products" 
            className="flex items-center text-[#d4a674] hover:text-[#c49560] transition-colors mb-6"
          >
            <FiArrowLeft className="mr-2" /> Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-gray-400">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-[#171717] inline-flex items-center justify-center w-20 h-20 rounded-full mb-4">
              <FiHeart className="text-3xl text-gray-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-6">
              You haven't added any items to your wishlist yet.
            </p>
            <Link
              href="/products"
              className="inline-block bg-[#d4a674] text-black font-medium px-6 py-3 rounded-md hover:bg-[#c49560] transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {wishlist.map((item) => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}