import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { Analytics } from '@vercel/analytics/react';
import { connectDB } from '@/lib/mongodb';
import { ProductModel } from '@/lib/models/Product';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Ananya Boutique — Elegance in Every Thread',
  description:
    'Discover premium ethnic wear — sarees, suits, gowns & more. Curated collections for the modern Indian woman.',
  keywords: ['sarees', 'ethnic wear', 'boutique', 'Indian fashion', 'gowns'],
  metadataBase: new URL('https://ananyashopping.site'),
  openGraph: {
    title: 'Ananya Boutique — Elegance in Every Thread',
    description: 'Premium ethnic wear — sarees, suits, gowns & more.',
    url: 'https://ananyashopping.site',
    siteName: 'Ananya Boutique',
    images: [{ url: '/hero.webp', width: 1536, height: 1024 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ananya Boutique — Elegance in Every Thread',
    description: 'Premium ethnic wear — sarees, suits, gowns & more.',
    images: ['/hero.webp'],
  },
};

// Viewport is now a separate export in Next.js 14+
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#064e3b',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ─── Server-side product fetch ────────────────────────────────────────────
  // Products are fetched HERE on the server once per request, injected as
  // initialProducts into ShopProvider. This means:
  //   1. No client-side /api/products fetch on first load (saves edge requests)
  //   2. Products are available immediately — no loading flash
  //   3. The /api/products route is only hit by direct API callers or ISR
  let initialProducts: any[] = [];
  try {
    await connectDB();
    const products = await ProductModel.find().sort({ createdAt: -1 }).lean();
    initialProducts = JSON.parse(JSON.stringify(products)).map((p: any) => ({
      ...p,
      id: p._id.toString(),
      _id: undefined,
      __v: undefined,
      createdAt: p.createdAt || null,
      updatedAt: p.updatedAt || null,
    }));
  } catch (error) {
    console.error('[RootLayout] Failed to fetch initial products:', error);
  }

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <ShopProvider initialProducts={initialProducts}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <BottomNav />
            <Analytics />
          </div>
        </ShopProvider>
      </body>
    </html>
  );
}
