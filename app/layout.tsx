import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './components/theme-context';
import ReactLenis from 'lenis/react';
import { LenisSnap } from './components/scroll-snap';

import Navbar from './components/navbar/navbar';
import { LoadingProvider } from './components/loading-context';

const font = Inter({
	variable: '--font',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: "jacqueline truong's portfolio",
	description: "jacqueline truong's portfolio website",
	icons: {
		icon: [
			{ url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png', },
			{ url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png', },
		],
		apple: [
			{ url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png', },
		],
		shortcut: '/favicon-192x192.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html lang='en'>
			<body 
				className={`${font.variable} antialiased select-none`}
				style = {{overflowX: 'hidden'}}
			>
				<ThemeProvider>
					<LoadingProvider>
						<Navbar />
						
						<ReactLenis 
							root 
							options={{ 
								lerp: 0.1, 
								wheelMultiplier: 1, 
								smoothWheel: true,
							}}
						>
								<LenisSnap/>
								{children}
						</ReactLenis>
					</LoadingProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
