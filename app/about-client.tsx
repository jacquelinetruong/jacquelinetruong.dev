'use client';

import { useEffect, useLayoutEffect } from 'react';
import { useMediaQuery } from './components/media-query';
import { useLoading } from './components/loading-context';

import Loader from './components/loader/loader';
import Quickbar from './components/quickbar';
import About from './components/sections/about/about';
import Skills from './components/sections/skills/skills';
import ExperienceSection from './components/sections/experience/experience';
import Footer from './components/sections/footer/footer';
import Grid from './components/grid';
import ButtonOverlay from './components/button-overlay';

import type { Experience } from '@/lib/experienceTypes';

type AboutClientProps = {
	experience: Experience[];
	currentXP: Experience[];
	skills: Experience[];
};

export default function AboutClient({
	experience,
	currentXP,
	skills,
}: AboutClientProps) {
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

					<section id='about' className='section data-hero'>
						<Grid>
							<About
								isLoading={isLoading}
								experience={currentXP}
							/>
						</Grid>
					</section>

					<section id='experience' className='section'>
						<Grid>
							<ExperienceSection
								isLoading={isLoading}
								experience={experience}
							/>
						</Grid>
					</section>

					{isDesktop && (
						<section id='skills' className='section'>
							<Grid>
								<Skills skills={skills} />
							</Grid>
						</section>
					)}

					<section id='contact' className='section'>
						<Footer />
					</section>
				</>
			)}
		</>
	);
}
