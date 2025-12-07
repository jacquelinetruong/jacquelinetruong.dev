'use client';

import Image from 'next/image';
import Grid from './grid';

import '../../public/coffee-icon-white.svg';
import '../../public/jt-black.svg';
import '../../public/guide-arrow-black.svg';


export default function Hero({ className = '' }: { className?: string }) {
  return (
	<Grid className={className}>
		{/* integrate project.tsx later */}
		{/* project display #1 */}
		<div className='font-inter
						col-start-2 col-span-1 row-start-1 row-span-1
						border-2 border-[#FF0000]
					'>
			{/* add later: project component */}
		</div>

		{/* cta, intro section */}
		<div className='font-inter
						col-start-4 col-span-2 row-start-1 row-span-1
						flex flex-col justify-between items-end 
						p-8'>

			{/* "say hi" button */}
			<a className='font-medium text-2xl text-white
						  flex flex-row gap-4 items-center
						  w-fit h-fit px-6 py-4 rounded-full
						  bg-[#292A2D]'
				target='_blank' 
				href='mailto:hello@jacquelinetruong.dev'
			>
				<Image 
					src='/coffee-icon-white.svg'
					alt='coffee icon'
					width={32}
					height={32}
				/>
				Say Hi!
			</a>

			{/* quick intro text */}
			<p className='font-semibold text-3xl text-right'>
				Product designer first, software engineer second. Focused on crafting digital experiences and turning everyday ideas into art.
			</p>
		</div>

		{/* project display #2 (featured) */}
		<div className='font-inter
						col-start-1 col-span-2 row-start-2 row-span-2
						border-2 border-[#FF0000]'>
			{/* add later: project component */}
		</div>

		{/* big name */}
		<div className='col-start-4 col-span-2 row-start-2 row-span-1
						flex flex-col items-end
						p-8'>
			<Image 
				src='/jt-black.svg'
				alt='jacqueline truong'
				width={736}
				height={259.52}
				className='size-full'
			/>
		</div>

		{/* jump to 'about' button */}
		<div className='col-start-3 col-span-1 row-start-3 row-span-1
						flex flex-col justify-end items-center'>
			<a className='font-inter font-medium
						  flex flex-col items-center gap-2
						  p-8'
				href='#about'			  
			>
				More About Me
				<Image
					src='/guide-arrow-black.svg'
					alt='arrow pointing down'
					width={28}
					height={28}
				/>
			</a>
		</div>

		{/* project display #3 */}
		<div className='font-inter
						col-start-4 col-span-1 row-start-3 row-span-1
						border-2 border-[#FF0000]'>
			{/* add later: project component */}
		</div>

		{/* city */}
		<div className='font-inter font-semibold text-3xl text-right
						col-start-5 col-span-1 row-start-3 row-span-1
						p-8'>
			<p>Based in Toronto, CA.</p>
		</div>
	</Grid>
  );
};