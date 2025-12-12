// template component used for project card previews
'use client';

import { Project } from '@/lib/projectTypes';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import '../../public/link-arrow-white.svg';


type ProjectCardProps = {
	project: Project;
	className?: string;
	onClick?: () => void;
};

export default function ProjectCard({
	project,
	className = '',
	onClick,
 }: ProjectCardProps) { 

	// tags for each project
	const allTags = [...(project.languages ?? []), ...(project.programs ?? [])];

	// for tag collapsing
	const containerRef = useRef<HTMLDivElement>(null);
	const measurerRef = useRef<HTMLSpanElement>(null);

	const [visibleCount, setVisibleCount] = useState(allTags.length);

	// measure tag visibility
	useEffect(() => {
		if (!containerRef.current || !measurerRef.current) return;

		const containerWidth = containerRef.current.offsetWidth;
		let used = 0;
		let count = 0;
		const temp = measurerRef.current; 		// temp element for measuring tag lengths

		for (let tag of allTags) {
			temp.textContent = tag;
			const tagWidth = temp.offsetWidth + 24; 		// add padding offset to total width

			if (used + tagWidth > containerWidth) break;
			used += tagWidth;
			count++;
		}
		setVisibleCount(count);
	}, [allTags]);

	const hiddenCount = allTags.length - visibleCount;
	
	return (
		<div className={`relative w-full h-full ${className} cursor-pointer`}
			onClick={onClick}
		>
			{/* preview */}
			<Image
				src={project.image}
				alt={project.title}
				width={1142}
				height={743}
				className='size-full object-cover'
			/>	

			{/* gradient for text readability */}
			<div className='absolute inset-0 bg-gradient-to-t from-black/95 from-10% via-black/70 via-30% to-transparent to-50% point-events-none' />

			{/* project details section */}
			<div className='font-inter text-white
							flex flex-row justify-between items-end
							absolute bottom-0 left-0 w-full p-6'>

				{/* content */}
				<div className='flex flex-col gap-1 w-full pr-6'>

					{/* tags */}
					{allTags.length > 0 && (
						<div 
							ref={containerRef}
							className='text-xs 
							  		   flex flex-nowrap gap-2 justify-start items-center
									   w-full'
						>
							{/* show tags that fit */}
							{allTags.slice(0, visibleCount).map(tag => (
								<span key={tag} className='text-nowrap
														   px-3 py-1 border border-white rounded-full'>
									{tag}
								</span>
							))}

							{/* show number of tags that don't fit */}
							{hiddenCount > 0 && (
								<span className='text-nowrap
												 px-3 p-1 border border-white rounded-full'>
									+{hiddenCount}
								</span>		
							)}

							{/* hidden element span */}
							<span
								ref={measurerRef}
								className='absolute opacity-0 pointer-events-none px-3 py-1 border border-white rounded-full'>
							</span>
						</div>
					)}
					{/* project title */}
					<h3 className='font-medium text-lg'>{project.title}</h3>					
				</div>

				{/* project link icon */}
				<Image 
					src='/link-arrow-white.svg'
					alt='link'
					width={40}
					height={40}
					className='h-full'
				/>
			</div>
		</div>
	);
}