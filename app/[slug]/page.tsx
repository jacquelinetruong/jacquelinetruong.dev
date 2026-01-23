// get project + block data for project pages

import { getProjectBySlug } from '@/lib/getProjectsBySlug';
import { getBlocks } from '@/lib/getBlocks';
import type { Blocks } from '@/lib/blocksTypes';
import { notFound } from 'next/navigation';
import ProjectContent from './content';


type ProjectPageProps = {
	params: { slug: string } | Promise<{ slug: string }>;
};

export default async function ProjectPage(props: ProjectPageProps) {
	// ensure valid project slug
	const { slug } = 'then' in props.params ? await props.params : props.params;
	if (!slug) {
		notFound();
	}

	// get project data from slug
	const project = await getProjectBySlug(slug);
	if (!project) {
		notFound();
	}

	const blocks: Blocks[] = await getBlocks(project.id);

	return <ProjectContent project={project} blocks={blocks}/>;
}
