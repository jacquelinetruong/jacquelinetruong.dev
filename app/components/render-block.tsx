// file that renders content blocks assigned on notion db.
// auto-generates project pages based on notion blocks.

import { Blocks } from '@/lib/blocksTypes';
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
						<h4 className='text-sm text-(--light-mode-grey) font-medium'>{block.label}</h4>
						<h2 className='font-semibold text-xl 2xl:text-2xl'>{block.heading}</h2>
					</div>

					{block?.text.map((text, i) => (
						<p key={i} className='text-base'>{text}</p>
					))} 
				</section>
			);

		// ------ TEXT BLOCK ------ //
		case 'text':
			return (
				<section className='w-full h-fit flex flex-col gap-2 pt-4 2xl:pb-2'>
					<h3 className='font-semibold text-md 2xl:text-lg'>{block.heading}</h3>

					{block?.text.map((text, i) => (
						<p key={i} className='text-base'>{text}</p>
					))} 
				</section>
			);


		// ------ LIST BLOCK ------ //
		case 'list':
			return (
				<section className='w-full h-fit flex flex-col gap-4 pt-4 2xl:pt-4 2xl:pb-2'>
					<h3 className='font-semibold text-md 2xl:text-lg'>{block.heading}</h3>

					<div className='ml-6'>
						{block?.text.map((item, i) => (
							<li key={i} className='text-base'>{item}</li>
						))} 
					</div>
				</section>
			);


		// ------ (LEFT) TEXT + IMAGE BLOCK ------ //
		case 'left-text-image':
			return (
				<section className=' flex flex-col lg:flex-row items-center gap-8'>
					<div className='lg:w-1/2'>
						{block.heading && <h2 className='text-2xl font-bold mb-4'>{block.heading}</h2>}
						{block.text.map((p, i) => (
							<p key={i} className='mb-2'>{p}</p>
						))}
					</div>
					<div className='lg:w-1/2'>
						{block.images.map((src, i) => (
							<Image key={i} src={src} alt='' width={600} height={400} className='mb-4 object-contain' />
						))}
					</div>
				</section>
			);
		
		// ------ (RIGHT) TEXT + IMAGE BLOCK ------ //
		case 'right-text-image':
			return (
				<section className=' flex flex-col lg:flex-row-reverse items-center gap-8'>
					<div className='lg:w-1/2'>
						{block.heading && <h2 className='text-2xl font-bold mb-4'>{block.heading}</h2>}
						{block.text.map((p, i) => (
							<p key={i} className='mb-2'>{p}</p>
						))}
					</div>
					<div className='lg:w-1/2'>
						{block.images.map((src, i) => (
							<Image key={i} src={src} alt='' width={600} height={400} className='mb-4 object-contain' />
						))}
					</div>
				</section>
			);

		// ------ IMAGE(S) BLOCK ------ //	
		case 'image-1':
		case 'image-2':
		case 'image-3':
			return (
				<section className=' grid grid-cols-1 md:grid-cols-3 gap-4'>
					{block.images.map((src, i) => (
						<Image key={i} src={src} alt='' width={600} height={400} className='object-contain' />
					))}
				</section>
			);

		// ------ 2 COLUMN BLOCK ------ //	
		case '2-col':
			return (
				<section className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
					{block.text.map((p, i) => (
						<p key={i}>{p}</p>
					))}
				</section>
			);


		// ------ SPACER BLOCK ------ //	
		case 'space':
			return <div className='' />;

		// ------ DIVIDER BLOCK ------ //
		case 'divider':
			return (
				<div className='pt-8 border border-x-0 border-t-0 border-b-(--nice-grey)'>
					
				</div>
			)

		// ------ NO BLOCK ------ //
		default:
			return null;
	}
}
