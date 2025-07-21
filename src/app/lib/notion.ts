import { Client } from "@notionhq/client"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

const notion = new Client({ auth: process.env.NOTION_TOKEN })

export async function getProjects() {
    const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID!,
    })

    return response.results
        .filter((page): page is PageObjectResponse => 'properties' in page)
        .map((page) => {
            const props = page.properties as any
            const media = props.preview?.files || []

            return {
                id: page.id,
                title: props.title?.title[0]?.text?.content  || '',
                description: props.description?.rich_text[0]?.text?.content || '',
                previewUrl: media[0]?.file?.url || media[0]?.external?.url || '',
                previewType: media[0]?.type || 'file',
                url: props.url?.url || '',
                languages: props.languages?.multi_select.map((tag: any) => tag.name) || [],
                tools: props.tools?.multi_select.map((tag: any) => tag.name) || [],
            }
        })
}