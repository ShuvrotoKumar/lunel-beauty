'use client';

import { FiSend } from 'react-icons/fi';

const Newsletter = () => {
  return (
    <section className="py-16 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-[#0a0a0a] rounded-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-white max-w-2xl mx-auto">
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
              <button className="bg-[#4a4a3a] text-white px-6 py-3 rounded-r hover: transition-colors">
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