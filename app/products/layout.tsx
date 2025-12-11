import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products | Beauty Store',
  description: 'Discover our complete collection of premium beauty products.',
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
