'use client';

import { useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';
import type { Theme } from './theme-context';


type SectionThemeMap = Record<string, Theme>;

// function that tracks the current active section
export function useActiveSection(
	setTheme?: (theme: Theme) => void,
	sectionThemes?: SectionThemeMap
) {
	const lenis = useLenis();
	const [activeSection, setActiveSection] = useState('home');

	useEffect(() => {
		const sections = Array.from(
			document.querySelectorAll<HTMLElement>('.section')
		);

		if (!sections.length) return;

		const getNavHeight = () =>
			parseFloat(
				getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
			) || 0;
		
		const updateActiveSection = (scrollY: number) => {
			const navHeight = getNavHeight();
			const viewportMiddle = scrollY + window.innerHeight / 2;

			let current = sections[0].id;

			for (let i = sections.length - 1; i >= 0; i--) {
				const section = sections[i];
				const sectionTop = section.offsetTop;
				if (viewportMiddle >= sectionTop) {
					current = section.id;
					break;
				}
			}

			setActiveSection(prev => {
				if (prev !== current) {
					const nextTheme = sectionThemes?.[current];
					if (setTheme && nextTheme) setTheme(nextTheme);
					return current;
				}
				return prev;
			});
		};

		// if using lenis scroll (desktop)
		if (lenis) {
			const onLenisScroll = () => {
				updateActiveSection(lenis.scroll)
			};

			lenis.on('scroll', onLenisScroll);
			updateActiveSection(lenis.scroll);

			return () => {
				lenis.off('scroll', onLenisScroll);
			};
		};

		// fallback if not (mobile scroll)
		const onScroll = () => updateActiveSection(window.scrollY);
		window.addEventListener('scroll', onScroll);
		updateActiveSection(window.scrollY);

		return() => window.removeEventListener('scroll', onScroll);
	}, [activeSection, setTheme, sectionThemes]);

	return activeSection;
}