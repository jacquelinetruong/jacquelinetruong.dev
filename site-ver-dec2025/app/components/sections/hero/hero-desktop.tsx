'use client';

import { Reveal } from '../../reveal';
import { Project } from '@/lib/projectTypes';
import ProjectCard from '../../projectcard';
import Grid from '../../grid';

import GuideButton from '../../guide-button';
import { SectionReveal } from '../../section-reveal';

import '@/public/jt-black.svg';


export default function HeroDesktop({
    className = '',
	isLoading,
	projects,
 }: { 
	className?: string; 
	isLoading: boolean;
	projects: Project[];
 }) {

    return (
        <SectionReveal
		fadeDistance={0}
		fadeStart={0}
		fadeEnd={0.7}
	>
		<Grid>
			{/* best projects :o */}
			{/* project display #1 */}
			<div className='col-start-2 col-span-1 row-start-1 row-span-1'>
				<Reveal delay={1}>
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
				<Reveal delay={1.2}>
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
				<Reveal delay={1.4}>
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
			<div className='col-start-3 col-span-1 row-start-3 row-span-1'>
				<GuideButton href='#about' text='More About Me'/>
			</div>
		</Grid>
	</SectionReveal>
    )
}