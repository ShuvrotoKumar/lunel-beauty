'use client';

import { FiStar } from 'react-icons/fi';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Beauty Blogger',
    image: '/images/p1.png',
    rating: 5,
    comment: 'I\'ve been using these products for months and my skin has never looked better! The natural ingredients make all the difference.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Makeup Artist',
    image: '/images/p2.png',
    rating: 5,
    comment: 'As a professional makeup artist, I only recommend the best to my clients. LUNEL products are now a staple in my kit!'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Skincare Enthusiast',
    image: '/images/p3.png',
    rating: 4,
    comment: 'I love that LUNEL is committed to clean beauty. My sensitive skin has improved so much since I switched to their products.'
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#4a4a3a]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-[#59594a] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-white">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-white italic">"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;