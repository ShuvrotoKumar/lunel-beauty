'use client';

import { ReactNode } from 'react';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <WishlistProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </WishlistProvider>
  );
}
