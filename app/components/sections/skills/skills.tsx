'use client';

import { useMediaQuery } from '../../media-query';
import SkillsDesktop from './skills-desktop';
import SkillsMobile from './skills-mobile';

import type { Experience } from '@/lib/experienceTypes';

export default function Skills({
	className = '',
	skills,
}: {
	className?: string;
	skills: Experience[];
}) {
	const isDesktop = useMediaQuery('(min-width: 1024px)');

	return isDesktop ? (
		<SkillsDesktop
			className={className}
			skills={skills}
		/>
	) : (
		<SkillsMobile
			className={className}
			skills={skills}
		/>
	);
}
