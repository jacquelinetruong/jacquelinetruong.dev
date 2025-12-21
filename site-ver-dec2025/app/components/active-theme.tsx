'use client';

import { useEffect, useState } from 'react';
import type { Theme } from './theme-context';

type SectionThemeMap = Record<string, Theme>;

// function that tracks the current active section
export function useActiveSection(
	setTheme?: (theme: Theme) => void,
	sectionThemes?: SectionThemeMap
) {
	const [activeSection, setActiveSection] = useState('home');

	useEffect(() => {
		const sections = Array.from(
			document.querySelectorAll<HTMLElement>('.section')
		);

		const onScroll = () => {
			let current = activeSection;

			for (const section of sections) {
				if (window.scrollY >= section.offsetTop - (section.clientHeight / 3)) {
					current = section.id;
				}
			}

			if (current !== activeSection) {
				setActiveSection(current);

				const nextTheme = sectionThemes?.[current];

				if (setTheme && nextTheme) {
					setTheme(nextTheme);
				}
			}
		};

		window.addEventListener('scroll', onScroll);
		onScroll();

		return() => window.removeEventListener('scroll', onScroll);
	}, [activeSection, setTheme, sectionThemes]);

	return activeSection;
}