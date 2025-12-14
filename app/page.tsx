import dynamic from 'next/dynamic';

// Import components with dynamic imports for better performance
const Header = dynamic(() => import('./components/Header'), { ssr: true });
const HeroSection = dynamic(() => import('./components/HeroSection'), { ssr: true });
const ArtOfPureBeauty = dynamic(() => import('./components/ArtOfPureBeauty'), { ssr: true });
const FeaturedCollection = dynamic(() => import('./components/FeaturedCollection'), { ssr: true });
const LunelPromise = dynamic(() => import('./components/LunelPromise'), { ssr: true });
const Footer = dynamic(() => import('./components/Footer'), { ssr: true });

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ArtOfPureBeauty />
        <FeaturedCollection />
        <LunelPromise />
      </main>
      <Footer />
    </div>
  );
}