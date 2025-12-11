'use client';

import Image from 'next/image';

const newProducts = [
  {
    id: 1,
    name: 'Gold Eye Cream',
    price: 75.00,
    image: '/images/n1.png'
  },
  {
    id: 2,
    name: 'Anti-Aging Serum',
    price: 89.99,
    image: '/images/n2.png'
  },
  {
    id: 3,
    name: 'Hydrating Face Mask',
    price: 29.99,
    image: '/images/n3.png'
  },
  {
    id: 4,
    name: 'Vitamin C Serum',
    price: 49.99,
    image: '/images/n4.png'
  },
  {
    id: 5,
    name: 'Nourishing Night Cream',
    price: 65.00,
    image: '/images/n5.png'
  },
  {
    id: 6,
    name: 'Brightening Toner',
    price: 34.99,
    image: '/images/n6.png'
  },
  {
    id: 7,
    name: 'Sunscreen SPF 50+',
    price: 39.99,
    image: '/images/n7.png'
  },
  {
    id: 8,
    name: 'Detox Clay Mask',
    price: 42.99,
    image: '/images/n8.png'
  }
];

const NewArrivals = () => {
  return (
    <section className="py-16 bg-[#4f4f4f]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">New Arrivals</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-[#474747] rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="relative h-60 bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover h-full w-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-medium text-white mb-1">{product.name}</h3>
                <span className="text-[#FF9494] font-bold">${product.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;