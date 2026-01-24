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

	// get current project data from slug
	const currentProject = await getProjectBySlug(slug);
	if (!currentProject) {
		notFound();
	}

	// get current project blocks
	const blocks: Blocks[] = await getBlocks(currentProject.id);

	// get other projects
	const projects = await getProjects();

	return <ProjectContent currentProject={currentProject} blocks={blocks} projects={projects}/>;
}
