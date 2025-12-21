'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Reveal } from './reveal';
import { Project } from '@/lib/projectTypes';
import ProjectCard from './projectcard';
import Grid from './grid';

import GuideButton from './guide-button';
import { SectionReveal } from './section-reveal';

import '../../public/coffee-icon-white.svg';
import '../../public/jt-black.svg';


export default function Hero({
	className = '',
	projects,
 }: { 
	className?: string; 
	projects: Project[];
 }) {
  return (       
	<SectionReveal
		fadeDistance={0}
		fadeStart={0}
		fadeEnd={0.7}
	>
		<Grid >
			{/* best projects :o */}
			{/* project display #1 */}
			<div className='col-start-2 col-span-1 row-start-1 row-span-1'>
				<Reveal delay={0.4}>
					{projects
						.filter(p => p.sectionId === '1')
						.map(project => (
							<ProjectCard
								key={project.id}
								project={project}
							/>
						))}
				</Reveal>
			</div>
		
			{/* project display #2 */}
			<div className='col-start-1 col-span-2 row-start-2 row-span-2'>
				<Reveal delay={0.6}>
					{projects
						.filter(p => p.sectionId === '2')
						.map(project => (
							<ProjectCard
								key={project.id}
								project={project}
							/>
						))}
				</Reveal>
			</div>
		
			{/* project display #3 */}
			<div className='col-start-4 col-span-1 row-start-3 row-span-1'>
				<Reveal delay={0.8}>
					{projects
						.filter(p => p.sectionId === '3')
						.map(project => (
							<ProjectCard
								key={project.id}
								project={project}
							/>
						))}
				</Reveal>
			</div>

			{/* jump to 'about' button */}
			<div className='col-start-3 col-span-1 row-start-3 row-span-1
							flex flex-col justify-end items-center'>
				<GuideButton href='#about' text='More About Me'/>
			</div>
		</Grid>
	</SectionReveal>
  );
};