// get project by slug, for project pages

import { notion } from './notion';
import type { Project } from './projectTypes';
import { unstable_noStore } from 'next/cache';

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  unstable_noStore();

  const databaseId = process.env.NOTION_DB_PROJECTS_ID!;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'slug',
          rich_text: {
            equals: slug,
          },
        },
        {
          property: 'exclude',
          checkbox: {
            does_not_equal: true,
          },
        },
      ],
    },
  });

  const page = response.results.find(
    (p): p is any => 'properties' in p
  );

  if (!page) return null;

  return {
    id: page.id,

    current:
      page.properties.current?.type === 'checkbox'
        ? page.properties.current.checkbox
        : false,
        
    casestudy:
      page.properties.casestudy?.type === 'checkbox'
        ? page.properties.casestudy.checkbox
        : false,

    slug: page.properties.title.title[0]?.plain_text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '') ?? page.id,

    hero:
      page.properties.hero?.type === 'checkbox'
        ? page.properties.hero.checkbox
        : false,

    sectionId: page.properties.sectionId.select?.name ?? '1',

    title: page.properties.title.title[0]?.plain_text ?? '',

    type:
      page.properties.type.multi_select?.map((t: any) => t.name) ?? 'design',

    images:
      page.properties.images.files
        ?.map((file: any) => {
          if (file.type === 'file') return file.file.url;
          if (file.type === 'external') return file.external.url;
          return '';
        })
        .filter(Boolean) ?? [],

    description:
      page.properties.description.rich_text[0]?.plain_text ?? '',

    points:
      page.properties.points.rich_text
        .map((t: any) => t.plain_text)
        .join('')
        .split('\n')
        .map((p: string) => p.replace(/^-\s*/, '').trim())
        .filter(Boolean) ?? [],

    languages:
      page.properties.languages.multi_select?.map((l: any) => l.name) ?? [],

    programs:
      page.properties.programs.multi_select?.map((p: any) => p.name) ?? [],

    category:
      page.properties.category.multi_select?.map((c: any) => c.name) ?? [],

    link: page.properties.link?.url ?? '',
    github: page.properties.github?.url ?? '',
    dribbble: page.properties.dribbble?.url ?? '',
  };
}
