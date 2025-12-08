// app/components/Header.tsx
import Link from 'next/link';
import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-sm h-45">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaLeaf className="text-2xl text-[#FF9494]" />
            <span className="text-2xl font-bold text-[#FF9494]">LUNÉL</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#FF9494]">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-[#FF9494]">About Us</Link>
            <Link href="/products" className="text-gray-700 hover:text-[#FF9494]">Products</Link>
            <Link href="/shop" className="text-gray-700 hover:text-[#FF9494]">Shop</Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#FF9494]">Contact</Link>
            <Link href="/help" className="text-gray-700 hover:text-[#FF9494]">Help</Link>
          </nav>
          
          <div className="flex items-center space-x-6">
            <button className="text-gray-700 hover:text-[#FF9494]">
              <FiSearch className="h-5 w-5" />
            </button>
            <button className="text-gray-700 hover:text-[#FF9494]">
              <FiUser className="h-5 w-5" />
            </button>
            <button className="text-gray-700 hover:text-[#FF9494] relative">
              <FiShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-[#FF9494] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;