'use client';

import { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal, Grid, List, Star, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { ProductCard } from '@/app/components/ProductCard';
import { products, type Product } from '@/app/data/products';


type FilterState = {
  categories: string[];
  priceRange: [number, number];
  skinTypes: string[];
  ingredients: string[];
};

export default function ProductsPage() {
  // State for filters
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('best-selling');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    skinTypes: [],
    ingredients: [],
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Available filter options
  const categories = ['Skincare', 'Makeup', 'Haircare', 'Fragrances'];
  const skinTypes = ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal'];
  const ingredients = [
    'Hyaluronic Acid',
    'Vitamin C',
    'Retinol',
    'Niacinamide',
    'Peptides',
    'AHA',
    'BHA',
    'Ceramides',
    'Zinc',
  ];

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(product =>
        product.category.some(cat => filters.categories.includes(cat))
      );
    }

    // Apply price range filter
    result = result.filter(
      product =>
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Apply skin type filter
    if (filters.skinTypes.length > 0) {
      result = result.filter(product =>
        product.skinType.some(type => filters.skinTypes.includes(type))
      );
    }

    // Apply ingredients filter
    if (filters.ingredients.length > 0) {
      result = result.filter(product =>
        filters.ingredients.every(ingredient =>
          product.ingredients.includes(ingredient)
        )
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming newer products have higher IDs (for demo purposes)
        result.sort((a, b) => b.id - a.id);
        break;
      case 'best-selling':
      default:
        // Sort by best-selling (using review count as a proxy for best-selling)
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, sortBy]);

  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleSkinTypeChange = (skinType: string) => {
    setFilters(prev => ({
      ...prev,
      skinTypes: prev.skinTypes.includes(skinType)
        ? prev.skinTypes.filter(t => t !== skinType)
        : [...prev.skinTypes, skinType],
    }));
  };

  const handleIngredientChange = (ingredient: string) => {
    setFilters(prev => ({
      ...prev,
      ingredients: prev.ingredients.includes(ingredient)
        ? prev.ingredients.filter(i => i !== ingredient)
        : [...prev.ingredients, ingredient],
    }));
  };

  const handlePriceRangeChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: value as [number, number],
    }));
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Render filter section
  const renderFilterSection = (title: string, items: string[], onChange: (item: string) => void, selectedItems: string[]) => (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-white mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map(item => (
          <label key={item} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => onChange(item)}
              className="rounded border-gray-600 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-gray-300">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      {/* Header */}
      <div className="bg-[#171717] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">All Products</h1>
          <p className="text-gray-300">Discover our complete collection of premium beauty products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile filter button */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700"
            >
              <Filter size={16} />
              <span>{showMobileFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Sidebar - Filters */}
          <div
            className={`${showMobileFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0 bg-[#292929] p-6 rounded-lg h-fit`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button className="text-sm text-[#d4a574] hover:text-[#d4a574]">
                Reset All
              </button>
            </div>

            <div className="space-y-6">
              {/* Sort By */}
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full bg-white border border-gray-600 rounded-md py-2 px-3 text-[#d4a674] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="best-selling">Best Selling</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {/* Categories */}
              {renderFilterSection('Categories', categories, handleCategoryChange, filters.categories)}

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-3">Price Range</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={filters.priceRange[1]}
                    onChange={e =>
                      handlePriceRangeChange([filters.priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-[#d4a674]"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Skin Type */}
              {renderFilterSection('Skin Type', skinTypes, handleSkinTypeChange, filters.skinTypes)}

              {/* Key Ingredients */}
              {renderFilterSection(
                'Key Ingredients',
                ingredients,
                handleIngredientChange,
                filters.ingredients
              )}

              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-   indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors md:hidden"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Desktop sort and view */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <p className="text-gray-400">
                Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of{' '}
                {filteredProducts.length} products
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="mr-2 text-gray-400">View:</span>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-l ${viewMode === 'grid' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                    aria-label="Grid view"
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-r ${viewMode === 'list' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                    aria-label="List view"
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <div
                className={`${viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-4'}`}
              >
                {currentProducts.map(product => (
                  viewMode === 'grid' ? (
                    <ProductCard key={product.id} product={product} />
                  ) : (
                    <div key={product.id} className="bg-[#383838] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row h-64 w-full border border-gray-700">
                      {/* Image - Left side */}
                      <div className="relative h-48 sm:h-full w-full sm:w-64 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 25vw"
                        />
                        {product.isBestSeller && (
                          <div className="absolute top-3 right-3 bg-yellow-500 text-white text-[10px] font-medium px-2 py-1 rounded-full uppercase tracking-wider">
                            Best Seller
                          </div>
                        )}
                      </div>
                      
                      {/* Details - Right side */}
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="text-xs text-gray-300 mb-2">{product.category[0] || 'Skincare'}</div>
                        <h3 className="font-medium text-gray-100 text-xl mb-2">{product.name}</h3>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
                        
                        <div className="flex items-center mb-4">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`w-4 h-4 ${star <= 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
                        </div>
                        
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-baseline">
                            <span className="text-xl font-bold text-gray-100">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                              <span className="ml-2 text-sm text-gray-400 line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <button className="bg-[#d4a674] text-white text-sm px-4 py-2 rounded-full hover:bg-[#c29566] transition-colors flex items-center">
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-300">No products found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <nav className="flex items-center space-x-1">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md text-gray-400 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &laquo;
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show first page, last page, current page, and pages around current page
                    if (totalPages <= 5) {
                      // Show all pages if 5 or fewer
                      return i + 1;
                    } else if (currentPage <= 3) {
                      // Show first 4 pages and "..."
                      if (i < 4) return i + 1;
                      if (i === 4) return '...';
                      if (i === 5) return totalPages;
                    } else if (currentPage >= totalPages - 2) {
                      // Show last 4 pages and "..."
                      if (i === 0) return 1;
                      if (i === 1) return '...';
                      return totalPages - 4 + i;
                    } else {
                      // Show pages around current page
                      if (i === 0) return 1;
                      if (i === 1) return '...';
                      if (i === 3) return '...';
                      if (i === 4) return totalPages;
                      return currentPage - 2 + i;
                    }
                  }).map((page, i) =>
                    page === '...' ? (
                      <span key={i} className="px-3 py-1 text-gray-500">
                        {page}
                      </span>
                    ) : (
                      <button
                        key={i}
                        onClick={() => paginate(Number(page))}
                        className={`w-10 h-10 rounded-md flex items-center justify-center ${
                          currentPage === page
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-400 hover:bg-gray-800'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md text-gray-400 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &raquo;
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
