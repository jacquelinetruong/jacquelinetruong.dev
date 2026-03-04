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

export default async function ProjectPage(props: ProjectPageProps) {
	// ensure valid project slug
	const { slug } = 'then' in props.params ? await props.params : props.params;
	if (!slug) {
		notFound();
	}

	// get selected project data from slug
	const selectedProject = await getProjectBySlug(slug);
	if (!selectedProject) {
		notFound();
	} 

	// get active project blocks
	const blocks: Blocks[] = await getBlocks(selectedProject.id);

	// get other projects
	const projects = await getProjects();

	return <ProjectContent selectedProject={selectedProject} blocks={blocks} projects={projects}/>
}
