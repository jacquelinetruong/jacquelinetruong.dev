import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import ThemeProvider from './components/theme-provider';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "jacqueline truong's portfolio",
  description: "jacqueline truong's portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang='en'>
      <body className={`${interSans.variable} antialiased`}>
        <ThemeProvider>
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
