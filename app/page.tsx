import HomeClient from './home-client';
import { getProjects } from '@/lib/getProjects';
import { notionProjectImage } from '@/lib/notionImage';

// ISR: must match `PROJECTS_REVALIDATE_SECONDS` in `@/lib/getProjects`
export const revalidate = 300;

export default async function Page() {
	
	// get projects for each section
	const projects = await getProjects();
	const heroProjects = projects.filter(p => p.hero === true);
	const featuredProjects = projects.filter(p => p.sectionId !== 'x');

	// preload LCP image (first hero project)
	const lcpProject = projects.find(p => p.sectionId === '1');
	const lcpImageUrl = lcpProject?.images?.[0] ? notionProjectImage(lcpProject.id, 0) : null;

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
					featuredProjects={featuredProjects}
				/>
			</div>
		</>
	);
}