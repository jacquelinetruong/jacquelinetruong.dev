// UTILITY FUNCTION: preserves rich text formatting from Notion db

import React from 'react';

export type RichTextItem = {
	plain_text: string;
	href?: string | null;
	annotations: {
		bold?: boolean;
		italic?: boolean;
		strikethrough?: boolean;
		underline?: boolean;
		code?: boolean;
		color?: string;
	};
};

export function renderRichText(richText: RichTextItem[]): React.ReactNode {
	if (!richText || richText.length === 0) return null;

	return richText.map((item, index) => {
		let content: React.ReactNode = item.plain_text;

		// translate Notion rich text to html
		if (item.annotations?.bold) {
			content = <strong key={`bold-${index}`} className='font-semibold'>{content}</strong>;
		}
		if (item.annotations?.italic) {
			content = <em key={`italic-${index}`}>{content}</em>;
		}
		if (item.annotations?.code) {
			content = <code key={`code-${index}`} className='bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm'>{content}</code>;
		}
		if (item.annotations?.strikethrough) {
			content = <s key={`strike-${index}`}>{content}</s>;
		}
		if (item.annotations?.underline) {
			content = <u key={`underline-${index}`}>{content}</u>;
		}

		// add link if href exists
		if (item.href) {
			content = (
				<a
					key={`link-${index}`}
					href={item.href}
					target='_blank'
					rel='noopener noreferrer'
					className='text-indigo-400 font-semibold hover:text-indigo-500 hover:underline transition-all duration-200'
				>
					{content}
				</a>
			);
		}

		return <React.Fragment key={index}>{content}</React.Fragment>;
	});
}

