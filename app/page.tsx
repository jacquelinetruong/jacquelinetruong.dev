import HomeClient from './components/home-client';
import { getProjects } from '@/lib/getProjects';
import { getExperience } from '@/lib/getExperience';

// disable RSC caching; force fresh notion query 
export const dynamic = 'force-dynamic';

export default async function Page() {
	
	// get projects for each section
	const projects = await getProjects();
	const heroProjects = projects.filter(p => p.hero === true);
	const portfolioProjects = projects;
	
	// get experience data
	const experience = await getExperience();
	const currentXP = experience.filter(e => e.category === 'work' && e.current === true);

	return (
		<div className='pt-(--nav-height)'>
			{/* give each section appropriate data */}
			<HomeClient 
				heroProjects={heroProjects}
				portfolioProjects={portfolioProjects}
				currentXP={currentXP}
				experience={experience}
			/>
		</div>
	);
}