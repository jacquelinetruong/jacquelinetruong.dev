'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Loader from './loader';
import Navbar from './navbar';
import NameStamp from './name-stamp';
import Hero from './hero';
import About from './about';
import Portfolio from './portfolio';
import ExperienceSection from './experience';
import Footer from './footer';
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
		
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => setIsLoading(false), 1600);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<>
			<Loader isLoading={isLoading} />

			{!isLoading && (
				<>
					<Navbar isLoading={isLoading}/>
					
					<NameStamp />
					
					<section id='home' className='section'>
						<Grid>
							<Hero
								isLoading={isLoading}
								projects={heroProjects}
								className='col-span-5 row-start-1 row-span-4'
							/>
						</Grid>
					</section>

					<section id='about' className='section'>
						<Grid>
							<About
								isLoading={isLoading}
								projects={aboutProjects}
								experience={currentXP}
								className='col-span-5 row-start-1 row-span-4'
							/>
						</Grid>
					</section>

					<section id='portfolio' className='section'>
						<Grid>
							<Portfolio
								isLoading={isLoading}
								projects={portfolioProjects}
								className='col-span-5 row-start-1 row-span-4'
							/>
						</Grid>
					</section>

					<section id='experience' className='section'>
						<Grid>
							<ExperienceSection
								isLoading={isLoading}
								projects={experienceProjects}
								experience={experience}
								className='col-span-5 row-start-2 row-span-4'
							/>
						</Grid>
					</section>

					<Grid>
						<Footer className='col-span-5 row-start-1' />
					</Grid>
				</>
			)}
		</>
	);
}