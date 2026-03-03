'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { useMediaQuery } from './media-query';
import { useLoading } from './loading-context';

import Loader from './loader/loader';
import Quickbar from './quickbar';
import NameStamp from './name-stamp';
import Hero from './sections/hero/hero';
import MoreLinks from './sections/more-desktop';
import Archive from './sections/archive-desktop';
import About from './sections/about/about';
import Portfolio from './sections/portfolio/portfolio';
import ExperienceSection from './sections/experience/experience';
import Footer from './sections/footer/footer';
import Grid from './grid';

import type { Project } from '@/lib/projectTypes';
import type { Experience } from '@/lib/experienceTypes';


type HomeClientProps = {
	heroProjects: Project[];
	portfolioProjects: Project[];
};

export default function HomeClient({
	heroProjects,
	portfolioProjects,
}: HomeClientProps) {

	// ------ VIEWPORT DISPLAY ------ //
    const isDesktop = useMediaQuery('(min-width: 1024px)');
	
	// loader
	const { isLoading, setIsLoading } = useLoading();

	useEffect(() => {
		const timeout = setTimeout(() => setIsLoading(false), 1600);
		return () => clearTimeout(timeout);
	}, []);

	// mobile scroll resizing (when ui collapses)
	useLayoutEffect(() => {
		const setVh = () => {
			document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
		};
		setVh();
		const timeout = setTimeout(setVh, 50);

		window.addEventListener('resize', setVh);
		return () => {
			window.removeEventListener('resize', setVh);
			clearTimeout(timeout);
		};
	}, []);

	// hero--portfolio project card interaction
	const [featuredProject, setFeaturedProject] = useState<Project | null>(null);

	// hero project card click -> set as featured in portfolio
	const handleHeroClick = (project: Project) => {
		setFeaturedProject(project);

		const portfolio = document.getElementById('portfolio');
		portfolio?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<>
			<Loader 
				isLoading={isLoading} 
				isDesktop={isDesktop}
			/>

			{!isLoading && (
				<>
					{isDesktop && (
						<>
							<Quickbar isLoading={isLoading}/>
							<NameStamp />
						</>
					)}
					
					<section id='work' className='section'>
						<Grid>
							<Hero
								isDesktop={isDesktop}
								isLoading={isLoading}
								projects={heroProjects}
								className='col-span-5 row-start-1 row-span-4'
								onProjectClick={handleHeroClick}
							/>
						</Grid>
					</section>

					<section id='archive' className='section'>
						<Grid>
							<Archive
								isLoading={isLoading}
								className='col-span-5 row-start-1 row-span-4'
							/>
						</Grid>
					</section>

					<section id='more' className='section'>
						<Grid>
							<MoreLinks
								isLoading={isLoading}
								className='col-span-5 row-start-1 row-span-4'
							/>
						</Grid>
					</section>

					<section id='contact' className='section relative'>
						<Grid>
							<Footer 
								isDesktop={isDesktop}
								className='col-span-5 row-start-1' 
							/>
						</Grid>
					</section>
				</>
			)}
		</>
	);
}