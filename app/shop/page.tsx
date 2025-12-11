'use client';

import React, { useState, useMemo } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaTh, FaThList } from 'react-icons/fa';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Hydrating Face Serum',
    price: 68.00,
    rating: 5,
    reviews: 12,
    image: '/images/pr1.png',
    isNew: true,
    isOnSale: false
  },
  {
    id: 2,
    name: 'Velvet Matte Lipstick',
    price: 24.99,
    rating: 4.5,
    reviews: 24,
    image: '/images/pr2.png',
    isNew: false,
    isOnSale: true
  },
  {
    id: 3,
    name: 'Radiance Night Cream',
    price: 42.50,
    rating: 4.8,
    reviews: 36,
    image: '/images/pr3.png',
    isNew: true,
    isOnSale: false
  },
  {
    id: 4,
    name: 'Nude Eyeshadow Palette',
    price: 38.00,
    rating: 4.7,
    reviews: 18,
    image: '/images/p4.png',
    isNew: false,
    isOnSale: true
  },
  {
    id: 5,
    name: 'Nourishing Hair Oil',
    price: 29.99,
    rating: 4.6,
    reviews: 42,
    image: '/images/p5.png',
    isNew: false,
    isOnSale: false
  },
  {
    id: 6,
    name: 'Floral Essence Perfume',
    price: 78.00,
    rating: 4.9,
    reviews: 56,
    image: '/images/p6.png',
    isNew: true,
    isOnSale: false
  },
  {
    id: 7,
    name: 'Anti-Aging Eye Cream',
    price: 54.99,
    rating: 4.7,
    reviews: 31,
    image: '/images/p7.png',
    isNew: false,
    isOnSale: true
  },
  {
    id: 8,
    name: 'Vitamin C Brightening Serum',
    price: 45.00,
    rating: 4.9,
    reviews: 47,
    image: '/images/p8.png',
    isNew: true,
    isOnSale: false
  },
  {
    id: 9,
    name: 'Charcoal Face Wash',
    price: 22.50,
    rating: 4.5,
    reviews: 29,
    image: '/images/p7.png',
    isNew: false,
    isOnSale: false
  },
  {
    id: 10,
    name: 'Hyaluronic Acid Moisturizer',
    price: 35.00,
    rating: 4.8,
    reviews: 63,
    image: '/images/p5.png',
    isNew: true,
    isOnSale: false
  },
  {
    id: 11,
    name: 'Matte Foundation',
    price: 39.99,
    rating: 4.6,
    reviews: 51,
    image: '/images/pr2.png',
    isNew: false,
    isOnSale: true
  },
  {
    id: 12,
    name: 'Coconut Body Scrub',
    price: 28.50,
    rating: 4.7,
    reviews: 37,
    image: '/images/p4.png',
    isNew: false,
    isOnSale: false
  },
];

const ProductCard = ({ product, viewMode = 'grid' }: { product: typeof products[0], viewMode?: 'grid' | 'list' }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return stars;
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg overflow-hidden flex flex-col md:flex-row shadow-sm transition-transform duration-300 hover:scale-[1.02]">
        <div className="relative w-full md:w-48 h-48 flex-shrink-0">
          <Image 
            src={product.image} 
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-[#ff9494] text-white text-xs px-2 py-1 rounded">New</span>
          )}
          {product.isOnSale && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Sale</span>
          )}
        </div>
        <div className="p-4 flex-1">
          <h3 className="font-medium text-lg text-gray-900 mb-1">{product.name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              {renderStars()}
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
          <p className="text-[#ff9494] font-bold text-lg mb-3">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-4 line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="bg-[#ff9494] text-white/80 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center">
            <FaShoppingCart className="mr-2" /> Add to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        <Image 
          src={product.image} 
          alt={product.name} 
          width={300}
          height={200}
          className="w-full h-full object-cover"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-[#ff9494] text-white text-xs px-2 py-1 rounded">New</span>
        )}
        {product.isOnSale && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Sale</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex mr-1">
            {renderStars()}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-[#ff9494]">${product.price.toFixed(2)}</span>
          <button className="bg-[#ff9494] text-white/80 px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center">
            <FaShoppingCart className="mr-1" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ShopPage() {
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Sort products based on the selected option
  const sortedProducts = useMemo(() => {
    const productsCopy = [...products];
    
    switch (sortBy) {
      case 'price-low':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'price-high':
        return productsCopy.sort((a, b) => b.price - a.price);
      case 'newest':
        return productsCopy.sort((a, b) => b.id - a.id);
      case 'rating':
        return productsCopy.sort((a, b) => b.rating - a.rating);
      case 'popularity':
      default:
        return productsCopy.sort((a, b) => b.reviews - a.reviews);
    }
  }, [sortBy]);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">All Products</h1>
              <p className="text-sm text-gray-500">
                Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)} of {sortedProducts.length} results
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9494] focus:border-transparent"
                >
                  <option value="popularity">Sort by popularity</option>
                  <option value="newest">Sort by latest</option>
                  <option value="price-low">Sort by price: low to high</option>
                  <option value="price-high">Sort by price: high to low</option>
                  <option value="rating">Sort by average rating</option>
                </select>
              </div>
              
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
                  aria-label="Grid view"
                >
                  <FaTh className={viewMode === 'grid' ? 'text-[#ff9494]' : 'text-gray-500'} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
                  aria-label="List view"
                >
                  <FaThList className={viewMode === 'list' ? 'text-[#ff9494]' : 'text-gray-500'} />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode="list" />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-1">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &laquo;
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show first page, last page, current page, and pages around current page
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`w-10 h-10 rounded-full ${currentPage === pageNum ? 'bg-[#ff9494] text-white' : 'hover:bg-gray-100'}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &raquo;
                </button>
              </nav>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}