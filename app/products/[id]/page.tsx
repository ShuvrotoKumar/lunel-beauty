'use client';

import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaShare } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Mock data for the product
const product = {
  id: 1,
  name: 'Advanced Vitamin C Brightening Serum',
  subtitle: 'Radiance-boosting serum with 20% Vitamin C',
  description: 'Our Advanced Vitamin C Brightening Serum is formulated with 20% pure L-Ascorbic Acid to help reduce the appearance of dark spots, fine lines, and uneven skin tone. This powerful antioxidant serum helps protect against environmental stressors while promoting a more radiant, even complexion.',
  price: 89.00,
  originalPrice: 110.00,
  rating: 4.8,
  reviewCount: 2847,
  images: [
    '/images/d1.png',
    '/images/d2.png',
    '/images/d3.png',
    '/images/d4.png',
  ],
  ingredients: [
    { name: 'L-Ascorbic Acid (Vitamin C)', percentage: '20%' },
    { name: 'Hyaluronic Acid', percentage: '2%' },
    { name: 'Vitamin E', percentage: '1%' },
    { name: 'Ferulic Acid', percentage: '0.5%' },
  ],
  features: [
    { icon: 'cruelty-free', text: 'Never tested on animals' },
    { icon: 'organic', text: 'Natural Ingredients' },
    { icon: 'derma', text: 'Clinically proven' },
    { icon: 'hypoallergenic', text: 'Gentle on sensitive skin' },
  ],
  reviews: [
    {
      id: 1,
      name: 'Scott Greenwood',
      rating: 5,
      date: '3 days ago',
      comment: 'Great product! Noticed improvement in dark spots. The packaging is also very elegant and professional.',
      helpful: 18,
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 5,
      date: '1 week ago',
      comment: 'Great product! Noticed improvement in dark spots. The packaging is also very elegant and professional.',
      helpful: 24,
    },
  ],
  relatedProducts: [
    {
      id: 2,
      name: 'Retinol Night Serum',
      price: 78.00,
      image: '/images/d5.png',
    },
    {
      id: 3,
      name: 'Hyaluronic Acid Serum',
      price: 65.00,
      image: '/images/d1.png',
    },
    {
      id: 4,
      name: 'Niacinamide Serum',
      price: 55.00,
      image: '/images/d3.png',
    },
    {
      id: 5,
      name: 'Peptide Recovery Cream',
      price: 95.00,
      image: '/images/d4.png',
    },
  ],
};

const ProductDetailsPage = () => {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [ratingFilter, setRatingFilter] = useState(0);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

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

  const handleQuantityChange = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const ratingDistribution = [
    { stars: 5, percentage: 75, count: 2135 },
    { stars: 4, percentage: 20, count: 569 },
    { stars: 3, percentage: 3, count: 85 },
    { stars: 2, percentage: 1, count: 28 },
    { stars: 1, percentage: 1, count: 30 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
              <li className="text-gray-400">/</li>
              <li><Link href="/products" className="text-gray-500 hover:text-gray-700">Skincare</Link></li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-700 font-medium">Vitamin C Serum</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden mb-4">
              <div className="relative h-96 w-full">
                <Image
                  src='/images/d1.png'
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`relative h-20 rounded-md overflow-hidden border-2 ${mainImage === image ? 'border-pink-500' : 'border-transparent'}`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-4">{product.subtitle}</p>

            <div className="flex items-center mb-6">
              <div className="flex mr-2 text-yellow-400">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Full Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Key Ingredients</h3>
              <ul className="space-y-2">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex justify-between text-gray-700">
                    <span className="font-medium">{ingredient.name}</span>
                    <span>{ingredient.percentage}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="ml-2 text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    <span className="ml-2 bg-red-100 text-red-700 text-sm font-medium px-2 py-0.5 rounded">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-green-600">In Stock</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 text-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border-x border-gray-200 py-2 focus:outline-none"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 text-lg"
                >
                  +
                </button>
              </div>
              <button className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-8 rounded-md transition-colors">
                Add to Cart
              </button>
              <button className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-8 rounded-md transition-colors">
                Buy Now
              </button>
            </div>

            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                      {feature.icon === 'cruelty-free' && <span className="text-pink-500">🐇</span>}
                      {feature.icon === 'organic' && <span className="text-green-500">🌿</span>}
                      {feature.icon === 'derma' && <span className="text-blue-500">🔬</span>}
                      {feature.icon === 'hypoallergenic' && <span className="text-purple-500">🌸</span>}
                    </div>
                    <span className="text-xs text-gray-600">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <FaHeart className="mr-2" /> Add to Wishlist
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Share:</span>
                <a href="#" className="text-gray-500 hover:text-blue-500"><FaFacebookF /></a>
                <a href="#" className="text-gray-500 hover:text-blue-400"><FaTwitter /></a>
                <a href="#" className="text-gray-500 hover:text-pink-600"><FaInstagram /></a>
                <a href="#" className="text-gray-500 hover:text-red-600"><FaPinterest /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Product Features */}
        <div className="mt-12 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Product Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Cruelty Free */}
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <span className="text-2xl">🌱</span>
              </div>
              <span className="font-medium text-gray-900">Cruelty Free</span>
              <span className="text-sm text-gray-500 text-center">Never tested on animals</span>
            </div>
            
            {/* Organic */}
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <span className="text-2xl">🌿</span>
              </div>
              <span className="font-medium text-gray-900">Organic</span>
              <span className="text-sm text-gray-500 text-center">Natural ingredients</span>
            </div>
            
            {/* Derma Tested */}
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                <span className="text-2xl">🔬</span>
              </div>
              <span className="font-medium text-gray-900">Derma Tested</span>
              <span className="text-sm text-gray-500 text-center">Clinically proven</span>
            </div>
            
            {/* Hypoallergenic */}
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-3">
                <span className="text-2xl">💖</span>
              </div>
              <span className="font-medium text-gray-900">Hypoallergenic</span>
              <span className="text-sm text-gray-500 text-center">Gentle on sensitive skin</span>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-12 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row">
              {/* Overall Rating */}
              <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 pr-6 pb-6 md:pb-0">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900">4.8</div>
                  <div className="flex justify-center my-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Based on {product.reviewCount.toLocaleString()} reviews</p>
                </div>

                {/* Rating Distribution */}
                <div className="mt-6 space-y-3">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center">
                      <span className="w-8 text-sm text-gray-500">{item.stars} star</span>
                      <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="w-8 text-sm text-gray-500 text-right">{item.percentage}%</span>
                    </div>
                  ))}
                </div>

                <button className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
                  Write a Review
                </button>
              </div>

              {/* Reviews List */}
              <div className="md:w-2/3 md:pl-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium mr-3">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{review.name}</h4>
                        <div className="flex items-center">
                          <div className="flex text-yellow-400 mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar key={star} className="w-4 h-4" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                    <button className="mt-2 text-sm text-pink-500 hover:text-pink-600 flex items-center">
                      <span>Helpful ({review.helpful})</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        {/* <div className="mt-12 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'ingredients' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Ingredients
            </button>
            <button
              onClick={() => setActiveTab('how-to-use')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'how-to-use' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              How to Use
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Reviews ({product.reviewCount})
            </button>
          </nav>
        </div> */}

        {/* Related Products */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <button className="absolute top-2 right-2 bg-white rounded-full p-2 text-gray-700 hover:text-pink-500">
                    <FaHeart />
                  </button>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-gray-900">${item.price.toFixed(2)}</span>
                    <button className="text-pink-500 hover:text-pink-600">
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
