'use client';

import { FiExternalLink } from 'react-icons/fi';

const IngredientSafety = () => {
  return (
    <section className="py-16 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="bg-[#1f1f1f] rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-sm">
          <div className="flex justify-center mb-6">
            <div className=" p-4 rounded-full">
              <svg 
                className="w-12 h-12 text-red-600" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Ingredient Safety Check</h2>
          <p className="text-white mb-8 max-w-2xl mx-auto">
            Concerned about what's in your beauty products? Check the safety of any ingredient in our database.
          </p>
          <button className="bg-[#FF9494] text-white px-8 py-3 rounded-full font-medium hover:opacity-90 flex items-center mx-auto">
            Check Ingredient Safety
            <FiExternalLink className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default IngredientSafety;