// template component used for project card previews
'use client';

import { Project } from '@/lib/projectTypes';
import Image from 'next/image';

import '../../public/link-arrow-white.svg';


type ProjectCardProps = {
	project: Project;
	className?: string;
};

export default function ProjectCard({ project, className = '' }: ProjectCardProps) {
	const allTags = [...(project.languages ?? []), ...(project.programs ?? [])];
	
	return (
		<a className={`relative w-full h-full ${className}`}
			target='_blank'
			href={project.link}
			rel="noopener noreferrer"
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
			<div className='absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 via-20% to-transparent to-50% point-events-none' />

			{/* project details section */}
			<div className='font-inter text-white
							flex flex-row justify-between items-end
							absolute bottom-0 left-0 w-full p-6'>

				{/* content */}
				<div className='flex flex-col gap-1'>
					{/* tags */}
					{allTags.length > 0 && (
						<div className='flex flex-nowrap gap-2 text-xs justify-start items-center'>
							{allTags.map(tag => (
								<span key={tag} className='px-3 py-1 border border-white rounded-full'>
									{tag}
								</span>
							))}
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
		</a>
	);
}