import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google';
import './globals.css';
// Note the relative path (../) for StackBlitz
import Header from '../components/Header';
import Footer from '../components/Footer';

const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-noto-sans',
});

const notoSerif = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-noto-serif',
});

export const metadata = {
  title: 'Art Portfolio Agency',
  description: 'Premium Art Portfolio Consulting',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="bg-slate-50 text-slate-800 antialiased">
        {/* Header must be HERE, outside main */}
        <Header />
        
        {/* Main content starts here */}
        <main className="min-h-screen pt-16">
          {children}
        </main>
        
        {/* Footer must be HERE, outside main */}
        <Footer />
      </body>
    </html>
  );
}