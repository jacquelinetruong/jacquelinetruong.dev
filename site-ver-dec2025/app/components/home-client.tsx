'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from './media-query';

import Loader from './loader/loader';
import Navbar from './navbar/navbar';
import Quickbar from './quickbar';
import NameStamp from './name-stamp';
import Hero from './sections/hero/hero';
import About from './sections/about/about';
import Portfolio from './sections/portfolio/portfolio';
import ExperienceSection from './sections/experience/experience';
import Footer from './sections/footer/footer';
import Grid from './grid';

import type { Project } from '@/lib/projectTypes';
import type { Experience } from '@/lib/experienceTypes';


type HomeClientProps = {
	heroProjects: Project[];
	aboutProjects: Project[];
	portfolioProjects: Project[];
	experienceProjects: Project[];
	currentXP: Experience[];
	experience: Experience[];
};

export default function HomeClient({
	heroProjects,
	aboutProjects,
	portfolioProjects,
	experienceProjects,
	currentXP,
	experience,
}: HomeClientProps) {

	// ------ VIEWPORT DISPLAY ------ //
    const isDesktop = useMediaQuery('(min-width: 1920px)');
	
	// loader
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => setIsLoading(false), 1600);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<>
			<Loader 
				isLoading={isLoading} 
				isDesktop={isDesktop}
			/>

			{!isLoading && (
				<>
					<Navbar 
						isLoading={isLoading}
						isDesktop={isDesktop}
					/>
					
					{isDesktop && (
						<>
							<Quickbar isLoading={isLoading}/>
							<NameStamp />
						</>
					)}
					
					<section id='home' className='section'>
						<Grid>
							<Hero
								isDesktop={isDesktop}
								isLoading={isLoading}
								projects={heroProjects}
								className='col-span-5 row-start-1 row-span-4'
							/>
						</Grid>
					</section>

					<section id='about' className='section'>
						<Grid>
							<About
								isDesktop={isDesktop}
								isLoading={isLoading}
								projects={aboutProjects}
								experience={currentXP}
								className='col-span-5 row-start-1 row-span-4'
							/>
						</Grid>
					</section>

					{isDesktop ? (
						<>
							{/* desktop: render portfolio section first */}
							<section id='portfolio' className='section'>
								{isDesktop ? (
									<Grid>
										<Portfolio
											isDesktop={isDesktop}
											isLoading={isLoading}
											projects={portfolioProjects}
											className='col-span-5 row-start-1 row-span-4'
										/>
									</Grid>
								): (
									<Portfolio
										isDesktop={isDesktop}
										isLoading={isLoading}
										projects={portfolioProjects}
									/>
								)}
							</section>

							<section id='experience' className='section'>
								<Grid>
									<ExperienceSection
										isDesktop={isDesktop}
										isLoading={isLoading}
										projects={experienceProjects}
										experience={experience}
										className='col-span-5 row-start-2 row-span-4'
									/>
								</Grid>
							</section>
						</>
					) : (
						<>
							{/* mobile: render experience section first */}
							<section id='experience' className='section'>
								<Grid>
									<ExperienceSection
										isDesktop={isDesktop}
										isLoading={isLoading}
										projects={experienceProjects}
										experience={experience}
										className='col-span-5 row-start-2 row-span-4'
									/>
								</Grid>
							</section> 

							<section id='portfolio' className='section'>
								{isDesktop ? (
									<Grid>
										<Portfolio
											isDesktop={isDesktop}
											isLoading={isLoading}
											projects={portfolioProjects}
											className='col-span-5 row-start-1 row-span-4'
										/>
									</Grid>
								): (
									<Portfolio
										isDesktop={isDesktop}
										isLoading={isLoading}
										projects={portfolioProjects}
									/>
								)}
							</section>
						</>
					)}

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