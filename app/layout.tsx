import { Cormorant_Garamond } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import Header from './components/Header';
import Footer from './components/Footer';

const cormorant = Cormorant_Garamond({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'LUNEL Beauty',
  description: 'Discover our natural beauty products',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cormorant.variable}>
      <body className="font-sans bg-[#0a0a0a] text-white">
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}