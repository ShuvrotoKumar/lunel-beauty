// app/components/Header.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiSearch, FiUser, FiShoppingCart, FiX, FiMenu, FiShoppingBag, FiHeart, FiLogIn, FiLogOut, FiUserPlus, FiSettings } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cartItemCount = 0; // This would typically come from a cart context or state management
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle authentication state (for demo purposes)
  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsDropdownOpen(false);
    // In a real app, you would handle the login logic here
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsDropdownOpen(false);
    // In a real app, you would handle the logout logic here
  };

  // Toggle admin state (for demo purposes)
  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  // Sync wishlist count with localStorage
  useEffect(() => {
    const updateWishlistCount = () => {
      if (typeof window !== 'undefined') {
        const savedWishlist = localStorage.getItem('wishlist');
        const count = savedWishlist ? JSON.parse(savedWishlist).length : 0;
        setWishlistCount(count);
      }
    };

    // Initial update
    updateWishlistCount();

    // Listen for wishlist updates
    const handleWishlistUpdate = () => updateWishlistCount();
    window.addEventListener('storage', handleWishlistUpdate);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate as EventListener);

    return () => {
      window.removeEventListener('storage', handleWishlistUpdate);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate as EventListener);
    };
  }, []);

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
    <header className="sticky top-0 z-50 bg-[#000000] backdrop-blur-md shadow-sm min-h-12 transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center">
          <button 
            onClick={toggleMobileMenu} 
            className="text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <FiMenu className="h-6 w-6" />
          </button>
          
          <Link href="/" className="flex items-center" onClick={handleNavigation}>
            <div className="relative w-32 h-10 transition-all duration-300 hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Lunel Beauty"
                fill
                sizes="8rem"
                className="object-contain"
                priority
              />
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-300 hover:text-white transition-colors"
              aria-label={isSearchOpen ? 'Close search' : 'Open search'}
            >
              <FiSearch className="h-5 w-5" />
            </button>
            <Link href="/wishlist" className="text-gray-300 hover:text-white transition-colors" onClick={handleNavigation}>
              <FiHeart className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="text-gray-300 hover:text-white relative transition-colors" onClick={handleNavigation}>
              <FiShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Header - Hidden on mobile */}
        <div className="hidden md:flex flex-col items-center py-4 bg-[#000000] text-gray-200">
          <div className="flex flex-col items-center pt-2 pb-4 bg-[#000000] text-gray-200">
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
          </div>

          {/* Desktop Navigation */}
          <div className="w-full flex flex-col items-center px-4">
            <div className="flex justify-center items-center w-full max-w-4xl">
              <nav className="flex items-center space-x-6 lg:space-x-8">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors" onClick={handleNavigation}>Home</Link>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors" onClick={handleNavigation}>About Us</Link>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors" onClick={handleNavigation}>Products</Link>
                <Link href="/shop" className="text-gray-300 hover:text-white transition-colors" onClick={handleNavigation}>Shop</Link>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors" onClick={handleNavigation}>Blog</Link>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors" onClick={handleNavigation}>Contact</Link>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors" onClick={handleNavigation}>FAQ</Link>
              </nav>
              <div className="flex items-center space-x-4 ml-8">
                {/* Search */}
                <div className="relative">
                  <button
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                  >
                    <FiSearch className="h-5 w-5" />
                  </button>
                  {isSearchOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-[#171717] p-4 rounded-lg shadow-xl z-50 border border-gray-700">
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (searchQuery.trim()) {
                            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }
                        }}
                        className="relative"
                      >
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Search products..."
                          autoFocus
                        />
                      </form>
                    </div>
                  )}
                </div>

                {/* Wishlist */}
                <Link 
                  href="/wishlist" 
                  className="relative text-gray-300 hover:text-white transition-colors"
                  onClick={handleNavigation}
                >
                  <FiHeart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gray-300 text-gray-800 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount > 9 ? '9+' : wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <Link 
                  href="/cart" 
                  className="relative text-gray-300 hover:text-white transition-colors"
                  onClick={handleNavigation}
                >
                  <FiShoppingBag className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gray-300 text-gray-800 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </span>
                  )}
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label="User account"
                    aria-expanded={isDropdownOpen}
                  >
                    <FiUser className="h-5 w-5" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#171717] rounded-md shadow-lg py-1 z-50">
                      {!isAuthenticated ? (
                        <>
                          <Link
                            href="/signup"
                            className="flex items-center px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
                            onClick={() => {
                              handleNavigation();
                              setIsDropdownOpen(false);
                            }}
                          >
                            <FiUserPlus className="mr-2 h-4 w-4" />
                            Sign Up
                          </Link>
                          <Link
                            href="/login"
                            className="flex items-center px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
                            onClick={() => {
                              handleNavigation();
                              setIsDropdownOpen(false);
                            }}
                          >
                            <FiLogIn className="mr-2 h-4 w-4" />
                            Login
                          </Link>
                          {/* Demo admin toggle - remove in production */}
                          <button
                            onClick={() => {
                              toggleAdmin();
                              handleLogin();
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-700 flex items-center"
                          >
                            <FiUser className="mr-2 h-4 w-4" />
                            Login as {isAdmin ? 'User' : 'Admin'}
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/account"
                            className="flex items-center px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
                            onClick={() => {
                              handleNavigation();
                              setIsDropdownOpen(false);
                            }}
                          >
                            <FiUser className="mr-2 h-4 w-4" />
                            My Profile
                          </Link>
                          {isAdmin && (
                            <Link
                              href="/admin/dashboard"
                              className="flex items-center px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
                              onClick={() => {
                                handleNavigation();
                                setIsDropdownOpen(false);
                              }}
                            >
                              <FiSettings className="mr-2 h-4 w-4" />
                              Dashboard
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              handleLogout();
                              handleNavigation();
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-700 flex items-center"
                          >
                            <FiLogOut className="mr-2 h-4 w-4" />
                            Logout
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Only shows when search is open on mobile */}
        {(isSearchOpen && isMobile) && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-90 z-50 p-4 pt-20">
            <div className="relative">
              <form onSubmit={handleSearch} className="flex w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-4 py-3 text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9494] bg-gray-800 text-white"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-50 ${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-full max-w-md bg-white p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-center flex-1">Menu</h2>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-2"
                aria-label="Close menu"
              >
                <FiX className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-full text-center py-2.5 px-6 text-base font-medium hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => {
                    handleNavigation();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-1.5 px-2 flex items-center justify-center gap-0.5 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <FiSearch className="h-3.5 w-3.5" />
                <span>Search</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;