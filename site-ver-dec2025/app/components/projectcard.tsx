// template component used for project card previews
'use client';

import { Project } from '@/lib/projectTypes';
import { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';

import LinkArrow from './icons/link-arrow';

import '@/public/caret-left-icon.svg';
import { useMediaQuery } from './media-query';


type ProjectCardProps = {
	project: Project;
	isNext?: boolean;
	className?: string;
	onClick?: () => void;
	featured?: boolean;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	action?: React.ReactNode;
};

export default function ProjectCard({
	project,
	isNext,
	className = '',
	onClick,
	featured = false,
	onMouseEnter,
	onMouseLeave,
	action,
 }: ProjectCardProps) { 

	// ------ VIEWPORT DISPLAY ------ //
	const isDesktop = useMediaQuery('(min-width: 1024px)');

	// tags for each project
	const allTags = useMemo(() => {
		return [...(project.languages ?? []), ...(project.programs ?? [])];
	}, [project.languages, project.programs]);

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

	const showIcon = !featured && project.section !== 'portfolio';
	
	// only open external link if NOT a non-featured portfolio card
	const handleClick = () => {
		if (showIcon && project.link) {
			window.open(project.link, '_blank', 'noopener, noreferrer');
			return;
		}
		onClick?.();
	};
	
	return isDesktop ? (
		<div onClick={handleClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={`relative w-full h-full ${className} group overflow-hidden cursor-pointer container-type-inline-size`}
		>
			{/* preview */}
			<Image
				src={project.images[0]}
				alt={project.title}
				width={1142}
				height={743}
				className='size-full object-cover
						   transition-transform duration-500 ease-out
						   group-hover:scale-115'
				draggable={false}
			/>	

			{/* gradient for text readability */}
			<div className={`absolute inset-0 bg-gradient-to-t from-black/95 from-10% via-black/70 via-30% to-transparent to-50% point-events-none
							${!featured && 'bg-[#13131B]/15 transition duration-300 group-hover:bg-transparent'}`}/>

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
							className='text-[10px] 2xl:text-xs
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
					{!featured && <h3 className='font-medium text-md truncate'>{project.title}</h3>}
				</div>

				{/* project link icon (non-portfolio section project) */}
				{showIcon && project.link && (
					<div className='text-nowrap
									flex flex-col gap-1 
									w-fit items-end
									opacity-0 translate-y-1
									group-hover:opacity-100 group-hover:translate-y-0
									transition-all duration-100'>	
						<p className='text-xs xl:text-sm'>View live site</p>
						<LinkArrow className='size-[40px] text-(--white) group-transition-colors group:duration-300'/>
					</div>
				)}
			</div>

			{/* hover: show hint message (only show IFF portfolio project card, and NOT next project in overlay) */}
			{!showIcon && !featured && !isNext && (
				<span className='font-inter font-medium text-white
									absolute inset-0 p-6
									opacity-0 translate-y-1
									group-hover:opacity-100 group-hover:translate-y-0
									transition-all duration-200
									whitespace-nowrap
									bg-gradient-to-t from-transparent via-black/15 via-70%  to-black/50 to-90% point-events-none'>
					
					<div className='flex flex-row gap-1'>
						<Image
							src='/caret-left-icon.svg'
							alt='caret left icon'
							width={14}
							height={14}
							draggable={false}
						/>
						<p className='text-xs xl:text-sm'>Focus project</p>
					</div>
				</span>
			)}

			{/* next project card in overlay */}
			{isNext && (
				<span className='font-inter font-medium text-white
									absolute inset-0 p-6
									opacity-100
									transition-all duration-200
									whitespace-nowrap
									bg-gradient-to-t from-transparent via-black/20 via-70%  to-black/60 to-90% point-events-none'>					
					<p className='text-xs xl:text-sm'>Next Project</p>
				</span>
			)}

			{/* render any actions if I want */}
			{featured && action && (
				<div className='absolute bottom-4 right-4 z-20'>
					{action}
				</div>
			)}
		</div>
	): (
		<div className='relative w-full h-full aspect-1/1'>
			{/* preview */}
			<Image
				src={project.images[0]}
				alt={project.title}
				fill
				className='object-cover'
				draggable={false}
			/>	
		</div>
	)
}