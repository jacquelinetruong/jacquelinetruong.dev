import HomeClient from './components/home-client';
import { getProjects } from '@/lib/getProjects';
import { getExperience } from '@/lib/getExperience';

import type { Project } from '@/lib/projectTypes';
import type { Experience } from '@/lib/experienceTypes';

export default async function Page() {
	
	// get projects for each section
	const projects = await getProjects();
	const heroProjects = projects.filter(p => p.section === 'hero');
	const aboutProjects = projects.filter(p => p.section === 'about');
	const portfolioProjects = projects.filter(p => p.section === 'portfolio');
	const experienceProjects = projects.filter(p => p.section === 'experience');

	// get experience data
	const experience = await getExperience();
	const currentXP = experience.filter(e => e.category === 'work' && e.current === true);

	return (
		// give each section appropriate data
		<HomeClient 
			heroProjects={heroProjects}
			aboutProjects={aboutProjects}
			portfolioProjects={portfolioProjects}
			experienceProjects={experienceProjects}
			currentXP={currentXP}
			experience={experience}
		/>
	);
}