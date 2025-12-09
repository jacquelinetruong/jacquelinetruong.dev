// get projects from notion db

import { notion } from './notion';
import type { Project } from './projectTypes';


export async function getProjects(): Promise<Project[]> {
    const databaseId = process.env.NOTION_DB_PROJECTS_ID!;

    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: 'section',
            select: {
                does_not_equal: 'not used', // filter out projects not used on site
            }
        }
    });

    return response.results
        .filter((page): page is any => 'properties' in page)
        .map((page): Project => ({
            id: page.id,
            title: page.properties.title.title[0]?.plain_text ?? '',
            description: page.properties.description.rich_text[0]?.plain_text ?? '',
            languages: page.properties.languages.multi_select?.map((lang: any) => lang.name) ?? [],
            programs: page.properties.programs.multi_select?.map((p: any) => p.name) ?? [],
            link: page.properties.link.url ?? '',
            image:
                page.properties.image.files[0]?.file?.url ??
                page.properties.image.files[0]?.external?.url ?? '',
            section: page.properties.section.select?.name ?? 'designer',
            sectionId: page.properties.sectionId.select?.name ?? '1',
            type: page.properties.type.select?.name ?? 'designer',
        }));
}