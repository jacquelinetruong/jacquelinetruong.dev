// file that renders content blocks assigned on notion db.
// auto-generates project pages based on notion blocks.
'use client';

import { useState } from 'react';
import { Blocks } from '@/lib/blocksTypes';
import { renderRichText } from '@/lib/richText';
import Image from 'next/image';
import GalleryImage from './gallery-image';


type RenderBlockProps = {
	block: Blocks;
};

export default function RenderBlock({ block }: RenderBlockProps) {
	switch (block.block) {
		// ------ BIG TEXT BLOCK ------ //
		case 'big':
			return (
				<section className='w-full h-fit flex flex-col gap-4 pt-12 pb-4 2xl:pt-16'>
					<div className='w-full h-fit flex flex-col gap-1'>
						{block.label && block.label.length > 0 && <h4 className='text-sm text-(--light-mode-grey) font-medium'>{renderRichText(block.label)}</h4>}
						{block.heading && block.heading.length > 0 && <h1 className='font-semibold text-2xl 2xl:text-3xl'>{renderRichText(block.heading)}</h1>}
					</div>
				</section>
			);


		// ------ SECTION TITLE BLOCK ------ //
		case 'section-title':
			return (
				<section className='w-full h-fit flex flex-col gap-4 pt-12 pb-1 2xl:pt-16'>
					<div className='w-full h-fit flex flex-col gap-1'>
						{block.label && block.label.length > 0 && <h4 className='text-sm text-(--light-mode-grey) font-medium'>{renderRichText(block.label)}</h4>}
						{block.heading && block.heading.length > 0 && <h1 className='font-semibold text-xl 2xl:text-2xl'>{renderRichText(block.heading)}</h1>}
					</div>
				</section>
			);


		// ------ HEADING BLOCK ------ //
		case 'heading':
			return (
				<section className='w-full h-fit pt-6'>
					{block.heading && block.heading.length > 0 && <h2 className='font-semibold text-lg 2xl:text-xl'>{renderRichText(block.heading)}</h2>}
				</section>
			);


		// ------ SUBHEADING BLOCK ------ //
		case 'subheading':
			return (
				<section className='w-full h-fit gap-2 pt-4 text-(--light-black) italic'>
					{block.heading && block.heading.length > 0 && <h3 className='font-semibold text-md 2xl:text-lg'>{renderRichText(block.heading)}</h3>}
				</section>
			);


		// ------ TEXT BLOCK ------ //
		case 'text':
			return (
				<section className='w-full h-fit flex flex-col gap-4 pt-2 pb-2'>
					{block?.text.map((text, i) => (
						<p key={i} className='text-base'>{renderRichText(text)}</p>
					))} 
				</section>
			);


		// ------ LIST BLOCK ------ //
		case 'list':
			const headings = block.heading?.[0]?.plain_text?.split('\n') ?? [];
			const hasHeadings = headings.length > 0 && headings[0].trim() !== '';

			return (
				<section className='w-full h-fit pt-4 pb-2'>
					<ul className='ml-12 ultrawide:ml-16 list-disc flex flex-col gap-4'>
						{hasHeadings
							? headings.map((heading, i) => (
								<li key={i}>
									<div className='flex flex-col gap-1'>
										<h3 className='font-semibold text-lg 2xl:text-xl'>{heading}</h3>

										{block.text?.[i] && (
											<p className='text-base'>{renderRichText(block.text[i])}</p>
										)}
									</div>
								</li>
								))

							: block.text?.map((item, i) => (
								<li key={i} className='text-base'>{renderRichText(item)}</li>
							))
						}
					</ul>
				</section>
			);


		// ------ (LEFT) TEXT + IMAGE BLOCK ------ //
		case 'left-text-image':
			return (
				<section className='w-full h-full flex flex-row justify-between pt-2 pb-2'>
					<div className='w-1/2 h-fit flex flex-col gap-4'>
						{block.text.map((p, i) => (
							<p key={i} className='text-base mr-8'>{renderRichText(p)}</p>
						))}
					</div>
					<div className='w-1/2 h-full relative -translate-y-8'>
						{block.images.length > 0 && (
							<>
								<div className='aspect-4/3 relative bg-(--nice-grey)/40'>
									<GalleryImage 
										src={block.images[0]} 
										alt={block.alt[0]} 
										className='object-contain object-center' 
									/>
								</div>
								<p className='p-1 text-wrap italic text-sm text-(--text-colour) w-full h-full'>{block.caption[0]}</p>
							</>
						)}
					</div>
				</section>
			);


		// ------ IMAGE(S) BLOCK ------ //	
		case 'image-1':
		case 'image-2':
		case 'image-3':			
			return (
				<section className='w-full h-full flex flex-row justify-between justify-center gap-6 pt-6 2xl:pt-10 2xl:pb-2'>
					{block.images.map((image, i) => (
						<div className='flex flex-col w-full -translate-y-4'>
							<div className='w-full aspect-4/3 relative bg-(--nice-grey)/40'>
								{block.images.length > 0 && (
									<GalleryImage 
										key={i}
										src={image} 
										alt={block.alt[i]} 
										className='object-cover object-center' 
									/>
								)}
							</div>
							<p className='p-1 text-wrap italic text-sm text-(--text-colour) w-full h-full'>{block.caption[i]}</p>
						</div>
					))}
				</section>
			);
		
			
		// ------ STAT(S) BLOCK ------ //	
		case 'stat-1':
		case 'stat-2':
		case 'stat-3':
			const stats = block.heading?.[0]?.plain_text?.split('\n') ?? [];
			const labels = block.label?.[0]?.plain_text?.split('\n') ?? [];

			return (
				<section className='w-full h-full flex flex-col gap-1 pt-10 2xl:pt-12 2xl:pb-2'>
					<div className='flex gap-28'>
						{stats.map((stat, i) => (
							<span key={i} className='flex flex-col gap-2'>
							<h1 className='font-medium text-4xl 2xl:text-5xl'>
								{stat}
							</h1>

							{labels[i] && (
								<h4 className='text-base text-(--dark-grey) font-medium'>
								{labels[i]}
								</h4>
							)}
							</span>
						))}
					</div>
				</section>
			);
			
		
		// ------ CAROUSEL BLOCK ------ //
		case 'carousel': {
			const [current, setCurrent] = useState(0);

			const images = block.images;
			const total = images.length;

			if (total === 0) return null;

			const visibleThumbs = 4;
			const start = current < visibleThumbs
					? 0
					: Math.min(current - 1, total - visibleThumbs);

			return (
				<section className='w-full py-6 2xl:pt-10'>
					<div className='flex flex-row gap-4'>
						{/* carousel images */}
						<div className='flex flex-col gap-3 w-1/5'>
							{images
								.slice(start, start + visibleThumbs)
								.map((img, i) => {
									const index = start + i;
									const isActive = index === current;

									return (
										<button
											key={index}
											onClick={() => setCurrent(index)}
											className={`relative aspect-4/3 transition-all duration-500
												${isActive ? 'ring-2 ring-black' : 'opacity-70 hover:opacity-100'}`}
										>
											<GalleryImage
												src={img}
												alt={block.alt?.[index] || ''}
												className='object-cover object-center
															transition-transform duration-500 ease-out
															group-hover:scale-115'
											/>
										</button>
									);
								})}
						</div>

						{/* featured image */}
						<div className='relative w-4/5 aspect-4/3'>
							<GalleryImage
								src={images[current]}
								alt={block.alt?.[current] || ''}
								className='object-cover object-center'
							/>
						</div>
					</div>

					{/* caption */}
					{block.caption?.[current] && (
						<p className='w-4/5 place-self-end text-wrap italic text-sm text-(--text-colour) px-6 pt-2'>
							{block.caption[current]}
						</p>
					)}
				</section>
			);
		}


		// ------ DIVIDER BLOCK ------ //
		case 'divider':
			return (
				<div className='pt-8 border border-x-0 border-t-0 border-b-(--nice-grey)'/>
			)


		// ------ DEFAULT NO BLOCK ------ //
		default:
			return null;
	}
}
