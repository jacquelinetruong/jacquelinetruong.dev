'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { useMediaQuery } from './components/media-query';
import { useLoading } from './components/loading-context';

import Loader from './components/loader/loader';
import Quickbar from './components/quickbar';
import NameStamp from './components/name-stamp';
import Hero from './components/sections/hero/hero';
import MoreLinks from './components/sections/more/more';
import Archive from './components/sections/archive/archive-desktop';
import Footer from './components/sections/footer/footer';
import Grid from './components/grid';

import type { Project } from '@/lib/projectTypes';
import Featured from './components/sections/featured/featured';
import ButtonOverlay from './components/button-overlay';


type HomeClientProps = {
	heroProjects: Project[];
	featuredProjects: Project[];
};

export default function HomeClient({
	heroProjects,
	featuredProjects,
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


	return (
		<>
			<Loader 
				isLoading={isLoading} 
				isDesktop={isDesktop}
			/>

			{!isLoading && (
				<>
					{isDesktop ? (
						<>
							<Quickbar/>
							<NameStamp />
						</>
					): (
						<ButtonOverlay />
					)}
					
					<section id='home-hero' className='section data-hero'>
						<Grid>
							<Hero
								isDesktop={isDesktop}
								isLoading={isLoading}
								projects={heroProjects}
								className='col-span-5 row-start-1 row-span-4'
							/>
						</Grid>
					</section>

					<>
						<section id='featured' className='section'>
							<Grid>
								<Featured 
									isLoading={isLoading}
									isDesktop={isDesktop}
									featuredProjects={featuredProjects}
								/>
							</Grid>
						</section>

						<section id='more' className='section'>
							<Grid>
								<MoreLinks
									isLoading={isLoading}
									isDesktop={isDesktop}
									className='col-span-5 row-start-1 row-span-4'
								/>
							</Grid>
						</section>
					</>
					
					<section id='contact' className='section relative'>
						<Footer className='col-span-5 row-start-1'/>
					</section>
				</>
			)}
		</>
	);
}