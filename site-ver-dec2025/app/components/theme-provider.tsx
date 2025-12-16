'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ThemeContext, Theme } from './theme-context';

export default function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>('light');

	useEffect(() => {
		const handleScroll = () => {
			const portfolio = document.getElementById('portfolio');
			if (!portfolio) return;

			const screen = portfolio.getBoundingClientRect();
			const viewportHeight = window.innerHeight;

			const topVisible = Math.max(screen.top, 0);
			const bottomVisible = Math.min(screen.bottom, viewportHeight);
			const visibleHeight = bottomVisible - topVisible;
			const visibleFraction = visibleHeight / screen.height;

			const isActive = visibleFraction > 0.0001;

			setTheme(isActive ? 'dark' : 'light');
		};

		handleScroll();

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<ThemeContext.Provider value={theme}>
			<div className={`theme-${theme} transition-colors duration-500`}>
				{children}
			</div>
		</ThemeContext.Provider>
	);
}