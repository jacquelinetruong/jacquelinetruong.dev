// file that renders content blocks assigned on notion db.
// auto-generates project pages based on notion blocks.

import { Blocks } from '@/lib/blocksTypes';
import { renderRichText } from '@/lib/richText';
import Image from 'next/image';


type RenderBlockProps = {
	block: Blocks;
};

export default function RenderBlock({ block }: RenderBlockProps) {
	switch (block.block) {
		// ------ SECTION TITLE BLOCK ------ //
		case 'section-header':
			return (
				<section className='w-full h-fit flex flex-col gap-6 pt-12 2xl:pt-16'>
					<div className='flex flex-col gap-1'>
						{block.label && block.label.length > 0 && <h4 className='text-sm text-(--light-mode-grey) font-medium'>{renderRichText(block.label)}</h4>}
						{block.heading && block.heading.length > 0 && <h2 className='font-semibold text-xl 2xl:text-2xl'>{renderRichText(block.heading)}</h2>}
					</div>

					{block?.text.map((text, i) => (
						<p key={i} className='text-base'>{renderRichText(text)}</p>
					))} 
				</section>
			);


		// ------ TEXT BLOCK ------ //
		case 'text':
			return (
				<section className='w-full h-fit flex flex-col gap-2 pt-4 2xl:pb-2'>
					{block.heading && block.heading.length > 0 && <h3 className='font-semibold text-md 2xl:text-lg'>{renderRichText(block.heading)}</h3>}

					{block?.text.map((text, i) => (
						<p key={i} className='text-base'>{renderRichText(text)}</p>
					))} 
				</section>
			);


		// ------ LIST BLOCK ------ //
		case 'list':
			return (
				<section className='w-full h-fit flex flex-col gap-2 pt-4 2xl:pb-2'>
					{block.heading && block.heading.length > 0 && <h3 className='font-semibold text-md 2xl:text-lg'>{renderRichText(block.heading)}</h3>}

					<div className='ml-6'>
						{block?.text.map((item, i) => (
							<li key={i} className='text-base'>{renderRichText(item)}</li>
						))} 
					</div>
				</section>
			);


		// ------ (LEFT) TEXT + IMAGE BLOCK ------ //
		case 'left-text-image':
			return (
				<section className='w-full h-fit flex flex-row justify-between pt-8 2xl:pt-12 2xl:pb-2'>
					<div className='w-1/2 h-fit flex flex-col gap-2'>
						{block.heading && block.heading.length > 0 && <h3 className='font-semibold text-md 2xl:text-lg mr-8'>{renderRichText(block.heading)}</h3>}
						{block.text.map((p, i) => (
							<p key={i} className='text-base mr-8'>{renderRichText(p)}</p>
						))}
					</div>
					<div className='w-1/2 aspect-4/3 relative'>
						<Image 
							src={block.images[0]} 
							alt={block.alt[0]} 
							fill
							draggable={false}
							unoptimized
							className='object-contain object-center' 
						/>
					</div>
				</section>
			);
		

		// ------ (RIGHT) TEXT + IMAGE BLOCK ------ //
		case 'right-text-image':
			return (
				<section className='w-full h-fit flex flex-row justify-between pt-8 2xl:pt-12 2xl:pb-2'>
					<div className='w-1/2 aspect-4/3 relative'>
						<Image 
							src={block.images[0]} 
							alt={block.alt[0]} 
							fill
							draggable={false}
							unoptimized
							className='object-contain object-center' 
						/>
					</div>
					<div className='w-1/2 h-fit flex flex-col gap-2'>
						{block.heading && block.heading.length > 0 && <h3 className='font-semibold text-md 2xl:text-lg ml-8'>{renderRichText(block.heading)}</h3>}
						{block.text.map((p, i) => (
							<p key={i} className='text-base ml-8'>{renderRichText(p)}</p>
						))}
					</div>
				</section>
			);


		// ------ IMAGE(S) BLOCK ------ //	
		case 'image-1':
		case 'image-2':
		case 'image-3':
			return (
				<section className='w-full h-full flex flex-row justify-between justify-center pt-8 2xl:pt-12 2xl:pb-2'>
					{block.images.map((image, i) => (
						<div className='w-full aspect-4/3 relative mx-2'>
							<Image 
								key={i} 
								src={image} 
								alt={block.alt[i]} 
								fill
								draggable={false}
								unoptimized
								className='object-cover object-center' 
							/>
						</div>
					))}
				</section>
			);
			

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
