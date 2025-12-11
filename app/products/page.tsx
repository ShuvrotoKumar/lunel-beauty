'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaFilter, FaTh, FaThList } from 'react-icons/fa';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

const products = [
  {
    id: 1,
    name: 'Hydrating Face Serum',
    description: 'With Hyaluronic Acid',
    price: 68.00,
    rating: 5,
    reviews: 120,
    image: '/images/d1.png'
  },
  {
    id: 2,
    name: 'Velvet Matte Lipstick',
    description: 'Long-lasting color',
    price: 24.99,
    rating: 4.5,
    reviews: 89,
    image: '/images/d2.png'
  },
  {
    id: 3,
    name: 'Radiance Night Cream',
    description: 'With Retinol',
    price: 42.50,
    rating: 4.8,
    reviews: 156,
    image: '/images/d3.png'
  },
  {
    id: 4,
    name: 'Nude Eyeshadow Palette',
    description: '12 matte & shimmer shades',
    price: 38.00,
    rating: 4.7,
    reviews: 203,
    image: '/images/d4.png'
  },
  {
    id: 5,
    name: 'Nourishing Hair Oil',
    description: 'With Argan Oil',
    price: 29.99,
    rating: 4.6,
    reviews: 98,
    image: '/images/d5.png'
  },
  {
    id: 6,
    name: 'Floral Essence Perfume',
    description: 'Eau de Parfum',
    price: 78.00,
    rating: 4.9,
    reviews: 167,
    image: '/images/d1.png'
  },
  {
    id: 7,
    name: 'Floral Essence Perfume',
    description: 'Eau de Parfum',
    price: 78.00,
    rating: 4.9,
    reviews: 167,
    image: '/images/d2.png'
  },
  {
    id: 8,
    name: 'Floral Essence Perfume',
    description: 'Eau de Parfum',
    price: 78.00,
    rating: 4.9,
    reviews: 167,
    image: '/images/d3.png'
  },
];

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  const router = useRouter();
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

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="relative h-64">
        <Image 
          src={product.image} 
          alt={product.name} 
          layout="fill"
          objectFit="cover"
          className="hover:opacity-90 transition-opacity"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{product.description}</p>
        <div className="flex items-center mb-2">
          <div className="flex mr-1">
            {renderStars()}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button 
            className="bg-[#ff9494] text-gray-700 border border-gray-300 px-3 py-1 rounded-full text-sm flex items-center hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/products/${product.id}`);
            }}
          >
            <FaShoppingCart className="mr-1" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProductsPage() {
  // Filter options
  const categories = ['Skincare', 'Makeup', 'Haircare', 'Fragrances'];
  const skinTypes = ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal'];
  const ingredients = ['Hyaluronic Acid', 'Vitamin C', 'Retinol', 'Niacinamide', 'Peptides'];

  // State for filters
  const [sortBy, setSortBy] = useState('Best Selling');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(500);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Toggle skin type selection
  const toggleSkinType = (type: string) => {
    setSelectedSkinTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Toggle ingredient selection
  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category (if any selected)
    if (selectedCategories.length > 0) {
      // This is a simplified filter - in a real app, products should have a category property
      result = result.filter(product => 
        selectedCategories.some(category => 
          product.name.toLowerCase().includes(category.toLowerCase()) ||
          product.description.toLowerCase().includes(category.toLowerCase())
        )
      );
    }

    // Filter by price
    result = result.filter(product => product.price <= priceRange);

    // Filter by skin type (if any selected)
    if (selectedSkinTypes.length > 0) {
      // This is a simplified filter - in a real app, products should have a skinType property
      result = result.filter(product => 
        selectedSkinTypes.some(type => 
          product.description.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    // Filter by ingredients (if any selected)
    if (selectedIngredients.length > 0) {
      result = result.filter(product => 
        selectedIngredients.some(ingredient => 
          product.description.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
    }

    // Sort products
    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Newest':
        // Assuming newer products have higher IDs (for demo purposes)
        result.sort((a, b) => b.id - a.id);
        break;
      case 'Top Rated':
        result.sort((a, b) => b.rating - a.rating);
        break;
      // 'Best Selling' is the default sort (original order)
      default:
        break;
    }

    return result;
  }, [sortBy, selectedCategories, priceRange, selectedSkinTypes, selectedIngredients]);

  // Reset all filters
  const resetFilters = () => {
    setSortBy('Best Selling');
    setSelectedCategories([]);
    setPriceRange(500);
    setSelectedSkinTypes([]);
    setSelectedIngredients([]);
  };

  return (
    <div className="w-full">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Discover our complete collection of premium beauty products.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-sm sticky top-4">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option>Best Selling</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                  <option>Top Rated</option>
                </select>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={category} 
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                      />
                      <label htmlFor={category} className="ml-2 text-sm text-gray-700 cursor-pointer">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>$0</span>
                  <span>${priceRange}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="500" 
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-pink-500"
                />
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Skin Type</h3>
                <div className="space-y-2">
                  {skinTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={type} 
                        checked={selectedSkinTypes.includes(type)}
                        onChange={() => toggleSkinType(type)}
                        className="h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                      />
                      <label htmlFor={type} className="ml-2 text-sm text-gray-700 cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Key Ingredients</h3>
                <div className="space-y-2">
                  {ingredients.map((ingredient) => (
                    <div key={ingredient} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={ingredient} 
                        checked={selectedIngredients.includes(ingredient)}
                        onChange={() => toggleIngredient(ingredient)}
                        className="h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                      />
                      <label htmlFor={ingredient} className="ml-2 text-sm text-gray-700 cursor-pointer">
                        {ingredient}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={resetFilters}
                  className="w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Reset Filters
                </button>
                <button 
                  className="w-full bg-[#ff9494] text-gray-700 border border-gray-300 py-2 px-4 rounded-md flex items-center justify-center hover:bg-[#ff7a7a] transition-colors"
                >
                  <FaFilter className="mr-2" /> Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                {selectedCategories.length > 0 || selectedSkinTypes.length > 0 || selectedIngredients.length > 0 || priceRange < 500 ? ' (filtered)' : ''}
              </p>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'text-gray-700 bg-gray-100' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                  <FaTh />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'text-gray-700 bg-gray-100' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                  <FaThList />
                </button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No products match your filters.</p>
                <button 
                  onClick={resetFilters}
                  className="text-pink-500 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg overflow-hidden flex flex-col md:flex-row">
                    <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="hover:opacity-90 transition-opacity"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <h3 className="font-medium text-lg text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-gray-600 mb-3">{product.description}</p>
                      <div className="flex items-center mb-3">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            i < Math.floor(product.rating) ? (
                              <FaStar key={i} className="text-yellow-400" />
                            ) : i < product.rating ? (
                              <FaStarHalfAlt key={i} className="text-yellow-400" />
                            ) : (
                              <FaRegStar key={i} className="text-yellow-400" />
                            )
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews})</span>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        <button className="bg-[#ff9494] text-gray-700 border border-gray-300 px-4 py-2 rounded-full text-sm flex items-center hover:bg-[#ff7a7a] transition-colors">
                          <FaShoppingCart className="mr-2" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}