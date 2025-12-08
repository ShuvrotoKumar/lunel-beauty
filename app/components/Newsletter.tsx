'use client';

import { FiSend } from 'react-icons/fi';

const Newsletter = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive offers, beauty tips, and new product launches.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 border border-gray-200 rounded-l focus:outline-none focus:border-gray-300"
              />
              <button className="bg-[#FF9494] text-white px-6 py-3 rounded-r hover: transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;