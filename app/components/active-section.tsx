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

		const updateActiveSection = (scrollY: number) => {
			const viewportMiddle = scrollY + window.innerHeight / 2;

			let current = sections[0].id;

			for (let i = sections.length - 1; i >= 0; i--) {
				const section = sections[i];
				if (viewportMiddle > section.offsetTop) {
					current = section.id;
					break;
				}
			}

			setActiveSection(prev => {
				if (prev === current) return prev;

				const nextTheme = sectionThemes?.[current];

				if (setTheme && nextTheme) {
					queueMicrotask(() => setTheme(nextTheme));
				}

				return current;
			});
		};

		const scrollHandler = () => {
			const scrollPos = lenis ? lenis.scroll : window.scrollY;
			updateActiveSection(scrollPos);
		};

		if (lenis) {
			lenis.on('scroll', scrollHandler);
			updateActiveSection(lenis.scroll);

			return () => lenis.off('scroll', scrollHandler);
		}

		window.addEventListener('scroll', scrollHandler);
		updateActiveSection(window.scrollY);

		return () => window.removeEventListener('scroll', scrollHandler);
	}, [lenis, setTheme, sectionThemes]);

	return activeSection;
}