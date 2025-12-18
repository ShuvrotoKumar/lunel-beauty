'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiShoppingBag, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import CartItem from './CartItem';
import { useCart } from '../context/CartContext';
import type { CartItem as CartItemType } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, itemCount } = useCart();
  
  // Calculate cart summary
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    shipping: 0,
    discount: 0,
    total: 0,
  });

  // Update cart summary when cart items change
  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 50 ? 0 : 10) : 0; // Free shipping over $50
    const discount = 0; // You can add discount logic here
    
    setCartSummary({
      subtotal,
      shipping,
      discount,
      total: subtotal + shipping - discount,
    });
  }, [cartItems]);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    // Remove all items one by one
    cartItems.forEach(item => removeFromCart(item.id));
  };

  return (
    <div className="flex-1">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      </div>

      <main className="container mx-auto px-4 py-8">
        {itemCount === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-800 inline-flex items-center justify-center w-20 h-20 rounded-full mb-4">
              <FiShoppingBag className="text-3xl text-gray-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">
              You haven't added any items to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-block bg-[#d4a674] text-black font-medium px-6 py-3 rounded-md hover:bg-[#c49560] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-[#171717] rounded-lg p-6">
                <div className="hidden md:flex pb-4 border-b border-gray-700 mb-6">
                  <div className="w-1/3 text-gray-400 font-medium">PRODUCT</div>
                  <div className="w-1/4 text-gray-400 font-medium">PRICE</div>
                  <div className="w-1/4 text-gray-400 font-medium">QUANTITY</div>
                  <div className="w-1/6 text-right text-gray-400 font-medium">TOTAL</div>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem 
                      key={item.id}
                      item={{
                        ...item,
                        color: item.color || 'Default',
                        size: item.size || 'One Size'
                      }}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <Link 
                    href="/products" 
                    className="flex items-center text-[#d4a674] hover:text-[#c49560] transition-colors"
                  >
                    <FiArrowLeft className="mr-2" /> Continue Shopping
                  </Link>
                  
                  <button 
                    className="px-6 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-6 bg-[#171717] rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Promo Code</h3>
                <p className="text-gray-400 text-sm mb-4">Enter your promo code if you have one</p>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Enter promo code"
                    className="flex-1 bg-[#2a2a2a] border border-gray-600 rounded-l-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#d4a674]"
                  />
                  <button className="bg-[#d4a674] text-black font-medium px-6 py-2 rounded-r-md hover:bg-[#c49560] transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-[#171717] rounded-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg font-medium mb-2">
                    <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                    <span>${cartSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-sm mb-2">
                    <span>Shipping</span>
                    <span>{cartSummary.shipping === 0 ? 'Free' : `$${cartSummary.shipping.toFixed(2)}`}</span>
                  </div>
                  {cartSummary.discount > 0 && (
                    <div className="flex justify-between text-gray-400 text-sm mb-2">
                      <span>Discount</span>
                      <span className="text-green-500">-${cartSummary.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-700 my-4"></div>
                  <div className="flex justify-between text-xl font-semibold mb-6">
                    <span>Total</span>
                    <span>${cartSummary.total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  className="w-full bg-[#d4a674] text-black font-medium py-3 rounded-md hover:bg-[#c49560] transition-colors mb-4"
                  onClick={() => {
                    // Checkout logic would go here
                    alert('Proceeding to checkout');
                  }}
                >
                  Proceed to Checkout
                </button>

                <div className="text-center text-sm text-gray-400">
                  or <Link href="/products" className="text-[#d4a674] hover:underline">Continue Shopping</Link>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start">
                    <FiTruck className="text-[#d4a674] mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Free Shipping</h4>
                      <p className="text-sm text-gray-400">Free shipping on all orders over $100</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiRefreshCw className="text-[#d4a674] mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Easy Returns</h4>
                      <p className="text-sm text-gray-400">30-day return policy</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiShield className="text-[#d4a674] mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Secure Checkout</h4>
                      <p className="text-sm text-gray-400">Your payment information is secure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}