// get project + block data for project pages

import { getProjectBySlug } from '@/lib/getProjectsBySlug';
import { getBlocks } from '@/lib/getBlocks';
import type { Blocks } from '@/lib/blocksTypes';
import { notFound } from 'next/navigation';
import ProjectContent from './content';
import { getProjects } from '@/lib/getProjects';


type ProjectPageProps = {
	params: { slug: string } | Promise<{ slug: string }>;
};

// ISR: must match the Notion cache wrappers (`revalidate: 300`)
export const revalidate = 300;

export default async function ProjectPage(props: ProjectPageProps) {
	// ensure valid project slug
	const { slug } = 'then' in props.params ? await props.params : props.params;
	if (!slug) {
		notFound();
	}

	const selectedProject = await getProjectBySlug(slug);
	if (!selectedProject) notFound();

	const [blocks, projects] = await Promise.all([
		getBlocks(selectedProject.id) as Promise<Blocks[]>,
		getProjects(),
	]);

	return <ProjectContent selectedProject={selectedProject} blocks={blocks} projects={projects}/>
}
