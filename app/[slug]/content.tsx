// dynamically generated project page content

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import GalleryImage from '@/app/components/gallery-image';
import RenderBlock from '@/app/components/render-block';
import { Reveal } from '../components/reveal';
import Grid from '@/app/components/grid';
import { useTheme } from '@/app/components/theme-context';
import { useActiveSection } from '../components/active-section';
import type { Blocks } from '@/lib/blocksTypes';
import type { Project } from '@/lib/projectTypes';

import { useMediaQuery } from '../components/media-query';
import Quickbar from '../components/quickbar';
import Footer from '../components/sections/footer/footer';
import Coffee from '../components/icons/coffee';


type ProjectContentProps = {
	project: Project;
	blocks: Blocks[];
};

export default function ProjectContent({ project, blocks }: ProjectContentProps) {
	// ------ VIEWPORT DISPLAY ------ //
    const isDesktop = useMediaQuery('(min-width: 1024px)');
	
	// ensure always light mode
	const { setTheme } = useTheme();
	useEffect(() => {
		setTheme('light');
	}, [setTheme]);

	return isDesktop ? (
		<section id='top' className='relative pt-(--nav-height) text-(--text-colour)'>
			<Quickbar isLoading={false} isProjectPage/>

			
				<section id='project-hero' className='section'>
					<Grid>
						{/* project hero */}
						<div className='col-start-2 col-span-3 row-start-1 row-span-1
										flex flex-col justify-between'>
							{/* title */}
							<div className='flex flex-col gap-2 2xl:gap-4 ultrawide:gap-6 px-4 pt-8 2xl:px-8 2xl:pt-10 ultrawide:px-20 ultrawide:pt-20'>
								<Reveal delay={0}>
									<div className='flex flex-row gap-4 items-center'>
										<Image 
											src='/chrome-ball.png' 
											alt='' 
											width={28} 
											height={28} 
											draggable={false}
										/>
										<h1 className='font-semibold lg:text-3xl 2xl:text-4xl'>{project.title}</h1>
									</div>
								</Reveal>

								{/* case study label */}
								{project.casestudy && (
									<Reveal delay={0}>
									<span className='w-fit h-fit pointer-events-none px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 3xl:py-2
														border border-(--text-colour) rounded-full 
														text-nowrap font-semibold text-[10px] 2xl:text-[11px] 3xl:text-xs'>
										CASE STUDY
									</span>
									</Reveal>
								)}
							</div>

							{/* tags */}
							<div className='flex flex-row justify-between w-full h-fit'>
								{/* role */}
								<div className='w-(--cell-width) h-full px-4 pb-4 2xl:px-8 2xl:pb-8 ultrawide:px-20 ultrawide:pb-20'>
									<Reveal delay={0.5} className='flex flex-col gap-1'>
									<h4 className='text-[10px] 2xl:text-xs text-(--light-mode-grey) font-medium'>
										ROLE
									</h4>
									<p className='capitalize text-sm 2xl:text-base 3xl:text-lg font-medium w-full'>{[...(project.type ?? [])].join(' & ')}</p>
									</Reveal>
								</div>

								{/* tools */}
								<div className='w-(--cell-width) h-full px-4 pb-4 2xl:px-8 2xl:pb-8 ultrawide:px-20 ultrawide:pb-20'>
									<Reveal delay={0.7} className='flex flex-col gap-1'>
									<h4 className='text-[10px] 2xl:text-xs text-(--light-mode-grey) font-medium'>
										TOOLS & FRAMEWORKS
									</h4>
									<p className='capitalize text-sm 2xl:text-base 3xl:text-lg font-medium w-full'>{[...(project.programs ?? [])].join(', ')}</p>
									</Reveal>
								</div>

								{/* languages */}
								{project.languages.length > 0 && (
									<div className='w-(--cell-width) h-full px-4 pb-4 2xl:px-8 2xl:pb-8 ultrawide:px-20 ultrawide:pb-20'>
										<Reveal delay={0.8} className='flex flex-col gap-1'>
										<h4 className='text-[10px] 2xl:text-xs text-(--light-mode-grey) font-medium'>
											LANGUAGES
										</h4>
										<p className='capitalize text-sm 2xl:text-base 3xl:text-lg font-medium w-full'>{[...(project.languages ?? [])].join(', ')}</p>
										</Reveal>
								</div>
								)}
							</div>
						</div>

						{/* project preview image */}
						<div className='col-start-2 col-span-3 row-start-2 row-span-3 w-(--three-cell-width) h-(--three-cell-height)'>
							<Reveal delay={0.25}>
								<GalleryImage
									src={project.images[0]}
									alt={`${project.title} Preview`}
									className='object-cover object-center'
								/>
							</Reveal>
						</div>

						{/* project links */}
						<div className='col-start-5 col-span-1 row-start-2 row-span-1
											flex flex-col gap-2 p-4 ultrawide:p-8'>
							{project?.link && (
								<a 
									target='_blank'
									href={project?.link}
									rel='noopener noreferrer'
									className='w-fit h-fit'
								>
									<Reveal delay={1.8} className='flex flex-row gap-2 items-center cursor-pointer group
																	px-3 py-2.5 2xl:px-4 2xl:py-3.5 rounded-full 
																	bg-(--black) hover:bg-(--light-black)
																	transition-colours duration-300'
									>    
										<Image
											src='/popup-icon.svg'
											alt='See Live Site'
											width={20}
											height={20}
										/>
										{/* tooltip */}
										<span className='absolute translate-x-12
															w-fit h-fit rounded-xl px-3 py-2
															shadow-sm bg-(--light-black)
															hidden group-hover:block'>
											<p className='font-medium text-xs text-(--bg-colour) whitespace-nowrap'>View Live Site</p>
										</span>
									</Reveal>
								</a>
							)}
							{project?.github && (
								<a 
									target='_blank'
									href={project?.link}
									rel='noopener noreferrer'
									className='w-fit h-fit'
								>
									<Reveal delay={2.2} className='flex flex-row gap-2 items-center cursor-pointer group
																	px-3 py-2.5 2xl:px-4 2xl:py-3.5 rounded-full 
																	bg-(--nice-grey) hover:bg-(--grey)
																	transition-colours duration-300'
									>    
										<Image
											src='/github-logo.svg'
											alt='See GitHub Repo'
											width={20}
											height={20}
										/>
										{/* tooltip */}
										<span className='absolute translate-x-12
															w-fit h-fit rounded-xl px-3 py-2
															shadow-sm bg-(--light-black)
															hidden group-hover:block'>
											<p className='font-medium text-xs text-(--bg-colour) whitespace-nowrap'>See GitHub Repo</p>
										</span>
									</Reveal>
								</a>
							)}
							{project?.dribbble && (
								<a 
									target='_blank'
									href={project?.link}
									rel='noopener noreferrer'
									className='w-fit h-fit'
								>
									<Reveal delay={2.4} className='flex flex-row gap-2 items-center cursor-pointer group
																	px-3 py-2.5 2xl:px-4 2xl:py-3.5 rounded-full 
																	bg-(--nice-grey) hover:bg-(--grey)
																	transition-colours duration-300'
									>    
										<Image
											src='/dribbble-logo.svg'
											alt='See Dribbble Post'
											width={20}
											height={20}
										/>
										{/* tooltip */}
										<span className='absolute translate-x-12
															w-fit h-fit rounded-xl px-3 py-2
															shadow-sm bg-(--light-black)
															hidden group-hover:block'>
											<p className='font-medium text-xs text-(--bg-colour) whitespace-nowrap'>See Dribbble Post</p>
										</span>
									</Reveal>
								</a>
							)}	
							<a 
								href='mailto:hello@jacquelinetruong.dev'
								target='_blank'
								className='w-fit h-fit'
							>
								<Reveal delay={2.6} className='flex flex-row gap-2 items-center cursor-pointer group
																px-3 py-2.5 2xl:px-4 2xl:py-3.5 rounded-full 
																bg-(--nice-grey) hover:bg-(--grey)
																transition-colours duration-300'
								>    
									<Image
										src='/coffee-bold.svg'
										alt='Grab Coffee'
										width={20}
										height={20}
									/>
									{/* tooltip */}
									<span className='absolute translate-x-12
														w-fit h-fit rounded-xl px-3 py-2
														shadow-sm bg-(--light-black)
														hidden group-hover:block'>
										<p className='font-medium text-xs text-(--bg-colour) whitespace-nowrap'>Let's chat!</p>
									</span>
								</Reveal>
							</a>
						</div>
					</Grid>
				</section>

				{/* page content */}
				<section className='relative'>
					<div className='grid grid-cols-5 auto-rows-max'>
						{blocks.map((block) => (
							<div
								key={block.section}
								className='col-start-2 col-span-3 px-8 3xl:px-32'
							>
								<Reveal delay={0.2} className='3xl:place-self-center 3xl:w-5/6 ultrawide:w-4/6'>
									<RenderBlock block={block}/>
								</Reveal>
							</div>
						))}
					</div>
				</section>

				<div className='flex flex-col gap-2 translate-x-(--cell-width) w-(--three-cell-width) h-fit px-8 py-(--nav-height) 3xl:px-32'>
					<p className='3xl:place-self-center 3xl:w-5/6 ultrawide:w-4/6 text-base font-semibold'>Have questions? Let's talk!</p>
					<p className='3xl:place-self-center 3xl:w-5/6 ultrawide:w-4/6 text-base font-[450]'>💌 hello@jacquelinetruong.dev</p>
				</div>
			
				<section id='contact' className='section'>
					<Footer isDesktop={isDesktop}/>
				</section>
		</section>
	) : (
		<Grid>
			<></>
		</Grid>
	);
}
