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
            points: 
                page.properties.points.rich_text
                    .map((t: any) => t.plain_text)
                    .join('')
                    .split('\n')
                    .map((p: string) => p.replace(/^-\s*/, '').trim())
                    .filter(Boolean) ?? [],

            languages: page.properties.languages.multi_select?.map((l: any) => l.name) ?? [],
            programs: page.properties.programs.multi_select?.map((p: any) => p.name) ?? [],

            link: page.properties.link?.url ?? '',
            github: page.properties.github?.url ?? '',
            dribbble: page.properties.dribbble?.url ?? '',

            images:
                page.properties.images.files?.map((file: any) => {
                    if (file.type === 'file') return file.file.url;
                    if (file.type === 'external') return file.external.url;
                    return '';
                }).filter(Boolean) ?? [],

            section: page.properties.section.select?.name ?? 'designer',
            sectionId: page.properties.sectionId.select?.name ?? '1',
            type: page.properties.type.select?.name ?? 'designer',
        }));
}