import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'KiddoTube — Modern Video Discovery for Kids',
  description:
    'Discover videos, stories, music, and learning for every stage of childhood growth on KiddoTube.',
  keywords: ['Kids Videos', 'KiddoTube', 'Educational Videos', 'Nursery Rhymes', 'Safe Content Discovery'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="bg-[#F8FAFC] text-slate-900 font-sans min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 sm:px-8 lg:px-12 py-6 sm:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
