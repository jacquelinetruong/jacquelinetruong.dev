'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export type ThemeContextValue = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>('light');

	useEffect(() => {
		document.body.classList.remove('theme-light', 'theme-dark');
		document.body.classList.add(`theme-${theme}`);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme(): ThemeContextValue {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}

	return context;
}
