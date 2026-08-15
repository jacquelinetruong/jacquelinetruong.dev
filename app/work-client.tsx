'use client';

import { useEffect, useLayoutEffect } from 'react';
import { useMediaQuery } from './components/media-query';
import { useLoading } from './components/loading-context';

import Loader from './components/loader/loader';
import Quickbar from './components/quickbar';
import Work from './components/sections/work home/work';
import Archive from './components/sections/archive/archive';
import Footer from './components/sections/footer/footer';
import Grid from './components/grid';
import ButtonOverlay from './components/button-overlay';

import type { Project } from '@/lib/projectTypes';

type WorkClientProps = {
	projects: Project[];
};

export default function WorkClient({ projects }: WorkClientProps) {
	const isDesktop = useMediaQuery('(min-width: 1024px)');
	const { isLoading, setIsLoading } = useLoading();

	useEffect(() => {
		const timeout = setTimeout(() => setIsLoading(false), 1600);
		return () => clearTimeout(timeout);
	}, [setIsLoading]);

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
						<Quickbar />
					) : (
						<ButtonOverlay />
					)}

					<section id='work' className='section data-hero'>
						<Grid>
							<Work
								isLoading={isLoading}
								projects={projects}
							/>
						</Grid>
					</section>

					<section id='archive' className='section'>
						<Grid>
							<Archive />
						</Grid>
					</section>

					<section id='contact' className='section'>
						<Footer />
					</section>
				</>
			)}
		</>
	);
}
