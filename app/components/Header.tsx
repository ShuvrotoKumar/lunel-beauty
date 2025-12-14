// app/components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiSearch, FiUser, FiShoppingCart, FiX, FiMenu, FiShoppingBag, FiHeart } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const cartItemCount = 0; // This would typically come from a cart context or state management
  const router = useRouter();

  // Check if the screen is mobile size on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Clean up the event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleAccountModal = () => {
    setIsAccountModalOpen(!isAccountModalOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavigation = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1a1a1a] backdrop-blur-md shadow-sm min-h-12 transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col items-center py-4 bg-[#1a1a1a] text-gray-200">
          {/* Logo with leaf icon */}
          <div className="flex flex-col items-center pt-2 pb-4 bg-[#1a1a1a] text-gray-200">
            {/* Logo with leaf icon */}
            <Link href="/" className="flex items-center -mt-2" onClick={handleNavigation}>
              <div className="relative w-40 h-14 md:w-48 md:h-16 transition-all duration-300 hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Lunel Beauty"
                  fill
                  sizes="(max-width: 768px) 10rem, 12rem"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            {/* Rest of the header content */}
          </div>

          {/* Desktop Navigation */}
          <div className="w-full flex justify-between items-center px-4">
            <nav className="flex-1 flex justify-center space-x-6 lg:space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors" onClick={handleNavigation}>Home</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors" onClick={handleNavigation}>About Us</Link>
              <Link href="/products" className="text-gray-300 hover:text-white transition-colors" onClick={handleNavigation}>Products</Link>
              <Link href="/shop" className="text-gray-300 hover:text-white transition-colors" onClick={handleNavigation}>Shop</Link>
              <Link href="/blog" className="text-gray-300 hover:text-white transition-colors" onClick={handleNavigation}>Blog</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors" onClick={handleNavigation}>Contact</Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition-colors" onClick={handleNavigation}>FAQ</Link>
            </nav>

            <div className="flex items-center space-x-6">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label={isSearchOpen ? 'Close search' : 'Open search'}
              >
                <FiSearch className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Wishlist"
                onClick={handleNavigation}
              >
                <FiHeart className="h-5 w-5" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="text-gray-300 hover:text-white relative transition-colors"
                aria-label="Shopping cart"
                onClick={handleNavigation}
              >
                <FiShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-300 text-gray-800 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="User account"
                onClick={handleNavigation}
              >
                <FiUser className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Only shows when search is open on mobile */}
        {(isSearchOpen && isMobile) && (
          <div className="mt-3 md:hidden">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 text-base border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FF9494]"
                autoFocus
              />
              <button
                type="submit"
                className="bg-[#FF9494] text-white px-4 py-2 rounded-r-lg hover:bg-[#ff7a7a] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-[#FF9494] py-2 transition-colors"
                onClick={handleNavigation}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-[#FF9494] py-2 transition-colors"
                onClick={handleNavigation}
              >
                About Us
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-[#FF9494] py-2 transition-colors"
                onClick={handleNavigation}
              >
                Products
              </Link>
              <Link
                href="/shop"
                className="text-gray-700 hover:text-[#FF9494] py-2 transition-colors"
                onClick={handleNavigation}
              >
                Shop
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-[#FF9494] py-2 transition-colors"
                onClick={handleNavigation}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-[#FF9494] py-2 transition-colors"
                onClick={handleNavigation}
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className="text-gray-700 hover:text-[#FF9494] py-2 transition-colors"
                onClick={handleNavigation}
              >
                FAQ
              </Link>
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center text-gray-700 hover:text-[#FF9494] py-2 transition-colors w-full text-left"
              >
                <FiSearch className="mr-2 h-5 w-5" />
                Search
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;