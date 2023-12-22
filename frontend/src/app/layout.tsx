import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { roboto } from './fonts';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Front-end Challenge',
  description: 'Front-end Challenge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={roboto.className}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
