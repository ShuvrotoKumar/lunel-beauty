'use client';

import Image from 'next/image';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import type { CartItem as CartItemType } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType & {
    color?: string;
    size?: string;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center py-6 border-b border-gray-700">
      <div className="w-full md:w-1/3 flex items-start">
        <div className="w-24 h-24 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h3 className="text-gray-100 font-medium">{item.name}</h3>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-400">Color: {item.color}</span>
            <span className="mx-2 text-gray-600">|</span>
            <span className="text-sm text-gray-400">Size: {item.size}</span>
          </div>
          <button 
            onClick={() => onRemove(item.id)}
            className="mt-2 text-red-400 hover:text-red-300 text-sm flex items-center"
          >
            <FiTrash2 className="mr-1" /> Remove
          </button>
        </div>
      </div>
      
      <div className="w-full md:w-1/4 mt-4 md:mt-0">
        <span className="text-gray-300">${item.price.toFixed(2)}</span>
        {item.originalPrice !== undefined && item.originalPrice > item.price && (
          <span className="line-through text-gray-500 text-sm ml-2">
            ${item.originalPrice.toFixed(2)}
          </span>
        )}
      </div>
      
      <div className="w-full md:w-1/4 mt-4 md:mt-0">
        <div className="flex items-center border border-gray-600 rounded-md w-28">
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="px-3 py-1 text-gray-300 hover:bg-gray-700 rounded-l"
          >
            <FiMinus size={16} />
          </button>
          <span className="flex-1 text-center text-gray-100">{item.quantity}</span>
          <button 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="px-3 py-1 text-gray-300 hover:bg-gray-700 rounded-r"
          >
            <FiPlus size={16} />
          </button>
        </div>
      </div>
      
      <div className="w-full md:w-1/6 mt-4 md:mt-0 text-right">
        <span className="text-gray-100 font-medium">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
