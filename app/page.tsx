import Header from './components/Header';
import Hero from './components/Hero';
import BeautyThatCares from './components/BeautyThatCares';
import ShopByCategory from './components/ShopByCategory';
import BestSellers from './components/BestSellers';
import NewArrivals from './components/NewArrivals';
import IngredientSafety from './components/IngredientSafety';
import Testimonials from './components/Testmonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <BeautyThatCares />
        <ShopByCategory />
        <BestSellers />
        <NewArrivals />
        <IngredientSafety />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}