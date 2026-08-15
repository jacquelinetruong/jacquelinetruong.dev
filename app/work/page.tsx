import WorkClient from '../work-client';
import { getProjects } from '@/lib/getProjects';

// ISR: must match `PROJECTS_REVALIDATE_SECONDS` in `@/lib/getProjects`
export const revalidate = 300;

export default async function Page() {
	const allProjects = await getProjects();
	const projects = allProjects.slice(0, 8);

	return (
		<div className='pt-(--nav-height)'>
			<WorkClient 
				projects={projects} 
			/>
		</div>
	);
}
