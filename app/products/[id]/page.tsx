'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Linkedin, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/app/data/products';
import { useWishlist } from '@/app/context/WishlistContext';
import { useCart } from '@/app/context/CartContext';


export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<typeof products[0] | null>(null);
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Check if product is in wishlist when product changes
  useEffect(() => {
    if (product) {
      setIsInWishlistState(isInWishlist(product.id.toString()));
    }
  }, [product, isInWishlist]);

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isInWishlistState) {
      removeFromWishlist(product.id.toString());
    } else {
      addToWishlist({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image
      });
    }
    setIsInWishlistState(!isInWishlistState);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image
    });
    
    // Reset the button state after a short delay
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(params.id));
    if (!foundProduct) {
      router.push('/products');
      return;
    }
    setProduct(foundProduct);
  }, [params.id, router]);

  if (!product) {
    return <div className="min-h-screen bg-gray-100">Loading...</div>;
  }

  const productImages = [
    product.image,
    "/images/f2.png",
    "/images/f3.png",
    "/images/f4.png"
  ];

  const features = [
    { name: 'Cruelty Free', icon: '🐇' },
    { name: 'Organic', icon: '🌱' },
    { name: 'Vegan', icon: '🌿' }
  ];

  const skinTypes = [
    { name: 'Dry Skin', icon: '💧' },
    { name: 'Sensitive Skin', icon: '🍃' },
    { name: 'Combination Skin', icon: '⚪' }
  ];

  const reviews = [
    {
      name: 'Sarah M.',
      rating: 5,
      text: 'This serum has completely transformed my skincare routine. My skin has never looked better!',
      date: '2 days ago'
    },
    {
      name: 'Alex K.',
      rating: 4,
      text: 'Great product, but takes a few weeks to see noticeable results.',
      date: '1 week ago'
    }
  ];

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200">
     
      
      <main className="container mx-auto px-4 py-8">
        {/* Back button */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-gray-100 hover:text-amber-400 mb-6 transition-colors"
        >
          <ChevronLeft size={20} className="mr-1" /> Back to Products
        </button>

        {/* Product Section */}
        <div className="bg-[#1a1a1a] rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="relative w-full max-w-md mx-auto aspect-square bg-white rounded-lg mb-4 overflow-hidden">
                <Image
                  src={productImages[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-gray-800 rounded-md overflow-hidden border transition-colors ${
                      selectedImage === index ? 'border-2 border-amber-600' : 'border border-gray-700 hover:border-amber-500'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      width={105}
                      height={80}
                      className="object-cover"
                      sizes="(max-width: 768px) 20vw, 80px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-100 mb-2">{product.name}</h1>
              <p className="text-gray-100 mb-4">{product.description}</p>
              
              <div className="flex items-center mb-6">
                <div className="flex text-amber-500 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} className="w-5 h-5" />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">4.8 (2,047 reviews)</span>
              </div>

              <p className="text-2xl font-bold text-gray-100 mb-6">${product.price.toFixed(2)}</p>
              
              <div className="mb-6">
                <label className="block text-gray-100 mb-2">Quantity</label>
                <div className="flex items-center">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-l-md transition-colors"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center bg-gray-800 text-white border-t border-b border-gray-700 py-1"
                  />
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-r-md transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`flex-1 ${isAddingToCart ? 'bg-green-600' : 'bg-amber-800 hover:bg-amber-900'} text-white py-3 px-6 rounded-md flex items-center justify-center transition-colors`}
                >
                  {isAddingToCart ? (
                    <>
                      <Check size={20} className="mr-2" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} className="mr-2" />
                      Add to Cart
                    </>
                  )}
                </button>
                <button 
                  onClick={handleWishlistToggle}
                  className={`flex-1 border ${isInWishlistState ? 'bg-amber-600 border-amber-600 text-white' : 'border-amber-600 text-amber-400 hover:bg-amber-900/30'} py-3 px-6 rounded-md flex items-center justify-center transition-colors`}
                >
                  {isInWishlistState ? (
                    <>
                      <Check size={20} className="mr-2" />
                      Added to Wishlist
                    </>
                  ) : (
                    <>
                      <Heart size={20} className="mr-2" />
                      Add to Wishlist
                    </>
                  )}
                </button>
              </div>

              {/* Product Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-100 mb-3">Product Features</h3>
                <div className="grid grid-cols-3 gap-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center p-2 bg-gray-800 rounded">
                      <span className="text-2xl mb-1">{feature.icon}</span>
                      <span className="text-sm text-gray-300">{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skin Type */}
              <div>
                <h3 className="font-semibold text-gray-100 mb-3">Skin Type Compatibility</h3>
                <div className="grid grid-cols-3 gap-2">
                  {skinTypes.map((type, index) => (
                    <div key={index} className="flex flex-col items-center p-2 bg-gray-800 rounded">
                      <span className="text-2xl mb-1">{type.icon}</span>
                      <span className="text-sm text-gray-100">{type.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-[#1a1a1a] rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Customer Reviews</h2>
          
          <div className="md:flex gap-8">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <span className="text-4xl font-bold mr-2">4.8</span>
                <div className="ml-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill="currentColor" className="w-5 h-5" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Based on 2,047 reviews</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center">
                    <span className="w-10 text-sm text-gray-600">{stars} star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2 overflow-hidden">
                      <div 
                        className="h-full bg-amber-500" 
                        style={{ width: `${(stars === 5 ? 85 : stars === 4 ? 10 : stars === 3 ? 3 : 1)}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-8 text-right">
                      {stars === 5 ? '85%' : stars === 4 ? '10%' : stars === 3 ? '3%' : '1%'}
                    </span>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 w-full bg-amber-800 hover:bg-amber-900 text-white py-2 px-4 rounded-md">
                Write a Review
              </button>
            </div>
            
            <div className="md:w-2/3">
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              fill={i < review.rating ? 'currentColor' : 'none'} 
                              className="w-4 h-4" 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-gray-300">{review.text}</p>
                  </div>
                ))}
                
                <button className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  View all reviews
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="bg-[#1a1a1a] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:scale-105">
                <div className="relative w-full aspect-square bg-white">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain w-full h-full p-4"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-100 mb-1">{product.name}</h3>
                  <p className="text-amber-800 font-bold">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
     
    </div>
  );
}
