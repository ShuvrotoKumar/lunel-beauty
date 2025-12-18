import dynamic from 'next/dynamic';

// Import components with dynamic imports for better performance
const HeroSection = dynamic(() => import('./components/HeroSection'), { ssr: true });
const ArtOfPureBeauty = dynamic(() => import('./components/ArtOfPureBeauty'), { ssr: true });
const FeaturedCollection = dynamic(() => import('./components/FeaturedCollection'), { ssr: true });
const LunelPromise = dynamic(() => import('./components/LunelPromise'), { ssr: true });

export default function Home() {
  return (
    <>
      <HeroSection />
      <ArtOfPureBeauty />
      <FeaturedCollection />
      <LunelPromise />
    </>
  );
}