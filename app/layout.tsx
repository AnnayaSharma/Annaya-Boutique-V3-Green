import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { Analytics } from '@vercel/analytics/react';

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <ShopProvider>
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
