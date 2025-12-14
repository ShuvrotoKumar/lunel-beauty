import Image from 'next/image';
import { Eye, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';

type ProductCardProps = {
  title: string;
  description: string;
  price: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
};

export function ProductCard({
  title,
  description,
  price,
  rating = 4, // Default to 4 stars as shown in the image
  reviewCount,
  imageUrl,
}: ProductCardProps) {
  return (
    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden w-full max-w-xs mx-auto">
      {/* Product Image */}
      <div className="relative h-64 bg-gray-800 flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={title}
          width={200}
          height={200}
          className="object-contain h-3/4"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-white text-lg font-medium mb-1">{title}</h3>
        <p className="text-gray-400 text-sm mb-2">{description}</p>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? 'fill-current' : 'fill-none stroke-current stroke-1'}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-400 text-xs ml-1">({reviewCount})</span>
        </div>

        {/* Price */}
        <p className="text-white text-xl font-bold mb-4">{price}</p>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button className="bg-[#F8B319] hover:bg-[#e6a30e] text-black flex-1">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button variant="outline" size="icon" className="border-gray-600 hover:bg-gray-800">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
