'use client';

import { Project } from '@/lib/projectTypes';

import HeroDesktop from './hero-desktop';
import HeroMobile from './hero-mobile';


export default function Hero({
	className = '',
	isDesktop,
	isLoading,
	projects,
}: { 
	className?: string; 
	isDesktop: boolean;
	isLoading: boolean;
	projects: Project[];
}) {

	return isDesktop ? (       
		<HeroDesktop
			isLoading={isLoading}
			projects={projects}
		/>
	) : (
		<HeroMobile
			isLoading={isLoading}
		/>
	)
};