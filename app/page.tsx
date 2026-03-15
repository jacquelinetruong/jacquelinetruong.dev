import HomeClient from './home-client';
import { getProjects } from '@/lib/getProjects';
import { notionImage } from '@/lib/notionImage';

// disable RSC caching; force fresh notion query 
// export const dynamic = 'force-dynamic';

// cache for 5 min
export const revalidate = 300;

export default async function Page() {
	
	// get projects for each section
	const projects = await getProjects();
	const heroProjects = projects.filter(p => p.hero === true);
	const featuredProjects = projects.filter(p => p.sectionId !== 'x');

	// preload LCP image (first hero project)
	const lcpProject = projects.find(p => p.sectionId === '1');
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
					featuredProjects={featuredProjects}
				/>
			</div>
		</>
	);
}