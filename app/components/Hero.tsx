// app/components/Hero.tsx
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative h-[800px] ">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png" // You'll need to add this image to your public folder
          alt="Beauty Products"
          layout="fill"
          objectFit="cover"
          className="opacity-100"
        />
        <div className="absolute inset-0  bg-opacity-20"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Elevate Your<span className="text-orange-500"> Natural </span>Beauty
          </h1>
          <p className="text-lg text-white mb-8">
            Discover our dermatologically-tested cosmetics that enhance your natural beauty 
            without compromising on quality or safety.
          </p>
          <div className="flex space-x-4">
            <button className="bg-[#FF9494] text-white px-8 py-3 rounded-full hover:bg-gradient-to-r from-pink-500 to-orange-500 transition">
              Shop Now
            </button>
            <button className="bg-white text-[#FF9494] px-8 py-3 rounded-full hover:bg-gray-100 transition">
              Explore Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;