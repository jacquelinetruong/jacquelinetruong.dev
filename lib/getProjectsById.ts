import { notion } from './notion';
import type { Project } from './projectTypes';
import { unstable_noStore } from 'next/cache';


// get project data
export async function getProjects(): Promise<Project[]> {
	unstable_noStore();

	const databaseId = process.env.NOTION_DB_PROJECTS_ID!;

	const response = await notion.databases.query({
		database_id: databaseId,
		filter: {
			property: 'exclude',
			checkbox: { does_not_equal: true },
		},
	});

	return response.results
		.filter((page): page is any => 'properties' in page)
		.map(mapProject);
}

// get project by id
export async function getProjectById(id: string): Promise<Project> {
	unstable_noStore();

	const page = await notion.pages.retrieve({ page_id: id });

	if (!('properties' in page)) {
		throw new Error('Invalid project page');
	}

	return mapProject(page);
}

// shared mapper
function mapProject(page: any): Project {
	return {
		id: page.id,

		current: page.properties.current?.checkbox ?? false,
		casestudy: page.properties.casestudy?.checkbox ?? false,
		slug: page.properties.slug.title[0]?.plain_text ?? '',
		
		hero: page.properties.hero?.checkbox ?? false,
		sectionId: page.properties.sectionId.select?.name ?? '1',

		title: page.properties.title.title[0]?.plain_text ?? '',
		type: page.properties.type.multi_select?.map((t: any) => t.name) ?? 'design',
		role: page.properties.role.multi_select?.map((r: any) => r.name) ?? [],
        tags: page.properties.tags.multi_select?.map((g: any) => g.name) ?? [],
		
		images:
			page.properties.images.files
				?.map((file: any) =>
					file.type === 'file'
						? file.file.url
						: file.type === 'external'
						? file.external.url
						: ''
				)
				.filter(Boolean) ?? [],

		description: page.properties.description.rich_text
			.map((t: any) => t.plain_text)
			.join(''),

		languages: page.properties.languages.multi_select?.map((l: any) => l.name) ?? [],
		programs: page.properties.programs.multi_select?.map((p: any) => p.name) ?? [],
		category: page.properties.category.multi_select?.map((c: any) => c.name) ?? [],

		link: page.properties.link?.url ?? '',
		github: page.properties.github?.url ?? '',
	};
}
