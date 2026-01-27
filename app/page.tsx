import HomeClient from './components/home-client';
import { getProjects } from '@/lib/getProjects';
import { getExperience } from '@/lib/getExperience';
import { notionImage } from '@/lib/notionImage';

// disable RSC caching; force fresh notion query 
// export const dynamic = 'force-dynamic';

// cache for 5 min
export const revalidate = 300;

export default async function Page() {
	
	// get projects for each section
	const projects = await getProjects();
	const heroProjects = projects.filter(p => p.hero === true);
	const portfolioProjects = projects;
	
	// get experience data
	const experience = await getExperience();
	const currentXP = experience.filter(e => e.category === 'work' && e.current === true);

	// preload LCP image (first hero project)
	const lcpProject = projects.find(p => p.sectionId === '2');
	const lcpImageUrl = lcpProject?.images?.[0] ? notionImage(lcpProject.images[0]) : null;

	return (
		<>
			{/* LCP image*/}
			{lcpImageUrl && (
				<link
					rel='preload'
					as='image'
					href={lcpImageUrl}
					// @ts-ignore
					fetchPriority='high'
				/>
			)}

			<div className='pt-(--nav-height)'>
				{/* give each section appropriate data */}
				<HomeClient 
					heroProjects={heroProjects}
					portfolioProjects={portfolioProjects}
					currentXP={currentXP}
					experience={experience}
				/>
			</div>
		</>
	);
}