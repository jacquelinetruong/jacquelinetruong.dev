'use client';

import { Project } from '@/lib/projectTypes';

import HeroDesktop from './hero-desktop';
import HeroMobile from './hero-mobile';


export default function Hero({
	className = '',
	isDesktop,
	isLoading,
	projects,
	onProjectClick,
}: { 
	className?: string; 
	isDesktop: boolean;
	isLoading: boolean;
	projects: Project[];
	onProjectClick?: (project: Project) => void;
}) {

	return isDesktop ? (       
		<HeroDesktop
			isLoading={isLoading}
			projects={projects}
			onProjectClick={onProjectClick}
		/>
	) : (
		<HeroMobile
			isLoading={isLoading}
		/>
	)
};