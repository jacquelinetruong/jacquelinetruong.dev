// dynamically generated project page content

'use client';

import { useEffect, useMemo, useState, Fragment } from 'react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import Image from 'next/image';
import GalleryImage from '@/app/components/gallery-image';
import RenderBlock from '@/app/components/render-block';
import { Reveal } from '../components/reveal';
import Grid from '@/app/components/grid';
import { useTheme } from '@/app/components/theme-context';
import type { Blocks } from '@/lib/blocksTypes';
import type { Project } from '@/lib/projectTypes';

import { useMediaQuery } from '../components/media-query';
import Quickbar from '../components/quickbar';
import Footer from '../components/sections/footer/footer';
import Link from 'next/link';
import LinkArrow from '../components/icons/link-arrow';
import { routerServerGlobal } from 'next/dist/server/lib/router-utils/router-server-context';


type ProjectContentProps = {
	currentProject: Project;
	blocks: Blocks[];
	projects: Project[];
};

export default function ProjectContent({ currentProject, blocks, projects }: ProjectContentProps) {
	// ------ VIEWPORT DISPLAY ------ //
    const isDesktop = useMediaQuery('(min-width: 1024px)');
	
	// ensure always light mode
	const { setTheme } = useTheme();
	useEffect(() => {
		setTheme('light');
	}, [setTheme]);

	// ------ FILTERS ------ //
	const [type, setType] = useState<'all' | 'design' | 'development'>('all');
	const [caseStudyOnly, setCaseStudyOnly] = useState(false);

	// ------ MENU GROUPING ------
	const menuGroups = useMemo(() => {
		let filtered = [...projects];

		// apply type filter first (Design / Development)
		if (type !== 'all') {
			filtered = filtered.filter(p => p.type?.includes(type));
		}

		// apply case study filter
		if (caseStudyOnly) {
			filtered = filtered.filter(p => p.casestudy);
		}

		// determine group name
		let groupName = 'All Projects';
		if (caseStudyOnly) groupName = 'Case Studies';
		else if (type !== 'all') groupName = type.charAt(0).toUpperCase() + type.slice(1);

		return [
			{
			name: groupName,
			projects: filtered,
			},
		];
	}, [projects, type, caseStudyOnly]);

	// for filter reset button
	const hasFilters = type !== 'all' || caseStudyOnly;

	// active project
	const [activeProject, setActiveProject] = useState<Project | null>(null);

	// set default active project
	useEffect(() => {
		setActiveProject(currentProject);
	}, [currentProject]);


	// ------ NEXT PROJECT ------ //
	const nextProject = useMemo(() => {
		if (!projects || !currentProject) return null;

		const currentIndex = projects.findIndex(
			p => p.id === currentProject.id
		);

		if (currentIndex === -1) return null;

		return projects[(currentIndex + 1) % projects.length];
	}, [projects, currentProject]);


	return isDesktop ? (
		<section id='top' className='relative pt-(--nav-height) text-(--text-colour)'>
			<Quickbar />

				<section id='project-hero' className='section data-hero'>
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
										<h1 className='font-semibold lg:text-3xl 2xl:text-4xl'>{currentProject.title}</h1>
									</div>
								</Reveal>

								{/* case study label */}
								{currentProject.casestudy && (
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
							<div className='flex flex-row w-full h-fit'>
								{/* role */}
								<div className='w-(--cell-width) h-full px-4 pb-4 2xl:px-8 2xl:pb-8 ultrawide:px-20 ultrawide:pb-20'>
									<Reveal delay={0.5} className='flex flex-col gap-1'>
									<h4 className='text-[10px] 2xl:text-xs text-(--light-mode-grey) font-medium'>
										ROLE
									</h4>
									<p className='capitalize text-sm 2xl:text-base 3xl:text-lg font-medium w-full'>{[...(currentProject.type ?? [])].join(' & ')}</p>
									</Reveal>
								</div>

								{/* tools */}
								<div className='w-(--cell-width) h-full px-4 pb-4 2xl:px-8 2xl:pb-8 ultrawide:px-20 ultrawide:pb-20'>
									<Reveal delay={0.7} className='flex flex-col gap-1'>
									<h4 className='text-[10px] 2xl:text-xs text-(--light-mode-grey) font-medium'>
										TOOLS & FRAMEWORKS
									</h4>
									<p className='capitalize text-sm 2xl:text-base 3xl:text-lg font-medium w-full'>{[...(currentProject.programs ?? [])].join(', ')}</p>
									</Reveal>
								</div>

								{/* languages */}
								{currentProject.languages.length > 0 && (
									<div className='w-(--cell-width) h-full px-4 pb-4 2xl:px-8 2xl:pb-8 ultrawide:px-20 ultrawide:pb-20'>
										<Reveal delay={0.8} className='flex flex-col gap-1'>
										<h4 className='text-[10px] 2xl:text-xs text-(--light-mode-grey) font-medium'>
											LANGUAGES
										</h4>
										<p className='capitalize text-sm 2xl:text-base 3xl:text-lg font-medium w-full'>{[...(currentProject.languages ?? [])].join(', ')}</p>
										</Reveal>
								</div>
								)}
							</div>
						</div>

						{/* project preview image */}
						<div className='col-start-2 col-span-3 row-start-2 row-span-3 w-(--three-cell-width) h-(--three-cell-height)'>
							<Reveal delay={0.25}>
								<GalleryImage
									src={currentProject.images[0]}
									alt={`${currentProject.title} Preview`}
									className='object-cover object-center'
								/>
							</Reveal>
						</div>

						{/* project links */}
						<div className='col-start-5 col-span-1 row-start-2 row-span-1
											flex flex-col gap-2 p-4 ultrawide:p-8'>
							{currentProject?.link && (
								<a 
									target='_blank'
									href={currentProject?.link}
									rel='noopener noreferrer'
									className='w-fit h-fit'
								>
									<Reveal delay={1.8} className='flex flex-row gap-2 items-center cursor-pointer group
																	px-3 py-2.5 2xl:px-4 2xl:py-3.5 rounded-full 
																	bg-(--black) hover:bg-(--light-black)
																	transition-colours duration-300'
									>    
										<Image
											src='/popup-icon-white.svg'
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
							{currentProject?.github && (
								<a 
									target='_blank'
									href={currentProject?.link}
									rel='noopener noreferrer'
									className='w-fit h-fit'
								>
									<Reveal delay={2.2} className='flex flex-row gap-2 items-center cursor-pointer group
																	px-3 py-2.5 2xl:px-4 2xl:py-3.5 rounded-full 
																	bg-(--nice-grey) hover:bg-(--grey)
																	transition-colours duration-300'
									>    
										<Image
											src='/github-logo-black.svg'
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
							{currentProject?.dribbble && (
								<a 
									target='_blank'
									href={currentProject?.link}
									rel='noopener noreferrer'
									className='w-fit h-fit'
								>
									<Reveal delay={2.4} className='flex flex-row gap-2 items-center cursor-pointer group
																	px-3 py-2.5 2xl:px-4 2xl:py-3.5 rounded-full 
																	bg-(--nice-grey) hover:bg-(--grey)
																	transition-colours duration-300'
									>    
										<Image
											src='/dribbble-logo-black.svg'
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

						{/* menu */}
						<div className='col-start-1 col-span-1 row-start-1 row-span-2 p-8 | ultrawide:px-20'>
							<div className='sm:text-xs 2xl:text-sm 3xl:text-base
											flex flex-col gap-8 px-6 py-8
											border border-(--nice-grey)/60 bg-(--white)/60 rounded-xl'>
								<div className='flex flex-col gap-4'>
									<div className='flex flex-row justify-between relative'>
										<p className='w-fit h-fit ml-1 text-[10px] 2xl:text-xs text-(--alt-text-colour) font-medium'>FILTERS</p>
										{/* clear filters button */}
										<button
											type='button'
											disabled={!hasFilters}
											onClick={() => {
												setType('all');
												setCaseStudyOnly(false);
											}}
											className={`absolute right-0 top-0 w-fit h-fit
														transition-all duration-300
														text-xs text-nowrap
														${hasFilters ? 'text-(--text-colour) hover:text-(--dark-grey) font-semibold cursor-pointer' : 'text-(--grey) font-medium'}`}
											>
											Clear filters
										</button>
									</div>
									{/* filter controls */}
									<div className='flex flex-col gap-3 ultrawide:px-20'>
										<div className='flex flex-row gap-2'>
											{/* project type filter */}
											<Listbox value={type} onChange={setType}>
												<div className='relative w-4/6 h-fit flex flex-col'>
													<Label className='ml-1 text-xs ultrawide:text-sm text-(--alt-text-colour) font-medium'>Project Type</Label>
													<ListboxButton className='relative mt-1 py-2 pl-4 pr-10 cursor-pointer 
																				rounded-2xl border border-(--dark-mode-grey) bg-(--white) hover:bg-(--white)/25
																				text-xs text-left text-(--text-colour) font-medium
																				shadow-xs transition-colors duration-300'
													>
														<span className='block truncate'>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
														<span className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
														<Image 
															src='/caret-down.svg'
															alt=''
															width={12}
															height={12}
														/>
														</span>
													</ListboxButton>

													<ListboxOptions 
														transition
														className='absolute top-full mt-2 py-1 w-full h-fit overflow-auto shadow-md z-10
																	bg-(--white) text-(--text-colour) rounded-xl
																	ring-1 ring-(--nice-grey) ring-opacity-5 focus:outline-none'>
														{['all', 'design', 'development'].map((option) => (
															<ListboxOption
																key={option}
																className={({ active }) =>
																	`relative cursor-pointer select-none py-2 px-4 text-xs ${
																	active ? 'bg-(--nice-grey)/35 text-(--text-colour)' : ''
																	} transition-colors duration-300`
																}
																value={option as 'all' | 'design' | 'development'}
																>
																{({ selected }) => (
																	<>
																	<span className={`transition-colors duration-300 block truncate ${selected ? 'font-semibold' : 'font-[450] text-(--dark-mode-grey) hover:text-(--text-colour)'}`}>
																		{option === 'all' ? 'All Types' : option.charAt(0).toUpperCase() + option.slice(1)}
																	</span>
																	</>
																)}
															</ListboxOption>
														))}
													</ListboxOptions>
												</div>
											</Listbox>
										</div>

										{/* case study filter */}
										<button
											type='button'
											onClick={() => setCaseStudyOnly(prev => !prev)}
											className={`w-fit h-fit px-2.5 py-1.5 rounded-full cursor-pointer
														flex flex-row gap-2 items-center
														text-xs border transition-colors duration-300
														${caseStudyOnly
															? 'font-semibold text-(--dark-grey) bg-(--white)/75 border-(--grey)'
															: 'font-medium text-(--light-mode-grey) hover:text-(--dark-grey) hover:bg-(--white)/50 border-(--grey)'}
											`}
										>
											<Image 
												src={caseStudyOnly ? 'check.svg' : 'plus.svg'}
												alt=''
												width={10}
												height={10}
											/>
											Case Studies
										</button>	
									</div>
								</div>

								{/* filtered projects */}
								{menuGroups.map((group) => (
									<div key={group.name} className='flex flex-col gap-1 2xl:gap-1.5'>
										<h4 className='mb-1 text-xs ultrawide:text-sm text-(--alt-text-colour) font-medium transition-all duration-300'>
											PROJECTS
										</h4>

										{group.projects.map((project, i) => (
											<Reveal key={project.id} delay={i * 0.15}>
												<Link
													href={`/${project.slug}`}
													className={`flex flex-row gap-1 2xl:gap-2 items-start min-w-0
																text-left transition-all duration-300
																${currentProject?.id === project.id
																? 'cursor-default font-semibold'
																: 'cursor-pointer text-(--alt-text-colour) hover:font-semibold hover:text-(--dark-mode-grey)'}
													`}
												>
													<Image
														src={currentProject?.id === project.id ? '/detail-arrow-black.svg' : '/detail-arrow-grey.svg'}
														alt=''
														width={16}
														height={16}
													/>
													<span
														className='relative block whitespace-normal break-words before:content-[attr(data-text)] before:font-semibold before:invisible before:block before:h-0'
														data-text={project.title}
														>
														{project.title}
													</span>
												</Link>
											</Reveal>
										))}
									</div>
								))}
							</div>
						</div>
					</Grid>
				</section>

				{/* page content */}
				<section className='relative'>
					<div className='grid grid-cols-5 auto-rows-max'>
						{blocks.map((block) => (
							<div
								key={`assigned-${block.section}`}
								className='col-start-2 col-span-3 px-8 3xl:px-32'
							>
								<Reveal delay={0.2} className='3xl:place-self-center 3xl:w-5/6 ultrawide:w-4/6'>
									<RenderBlock block={block}/>
								</Reveal>
							</div>
						))}
					</div>
				</section>

				{/* sign off */}
				<div className='flex flex-col gap-2 translate-x-(--cell-width) w-(--three-cell-width) h-fit px-8 py-(--nav-height) 3xl:px-32'>
					<p className='3xl:place-self-center 3xl:w-5/6 ultrawide:w-4/6 text-base font-semibold'>Have any questions? Let's talk!</p>
					<a
						href='mailto:hello@jacquelinetruong.dev'
						target='_blank' 
						className='w-fit h-fit text-base font-[450] hover:text-indigo-400 transition-colors duration-300'
					>
						💌 hello@jacquelinetruong.dev
					</a>
				</div>
				
				{/* next project */}
				{nextProject && (
					<section className='relative translate-x-(--cell-width) w-(--three-cell-width) h-fit pb-12 3xl:px-32'>
							<div className=''>
								<Reveal delay={0}>
									<Link
										href={`/${nextProject.slug}`}
										className='group block p-8 transition-all duration-500
													bg-(--white)/40 hover:bg-(--white)/80
													border border-(--nice-grey)/60 rounded-xl'
									>
										<p className='text-xs 2xl:text-sm text-(--light-mode-grey) font-medium mb-2'>
											NEXT PROJECT
										</p>

										<div className='w-full flex flex-row justify-between gap-8'>
											<div className='relative w-1/3 aspect-4/3 overflow-hidden'>
												<GalleryImage
													src={nextProject.images[0]}
													alt={`${nextProject.title} preview`}
													className='object-cover group-hover:scale-105 transition-transform duration-500'
												/>
											</div>
											<div className='w-2/3 flex flex-col justify-between py-2'>
												<div className='flex flex-col gap-2'>
													<h3 className='text-lg 2xl:text-xl font-semibold'>
														{nextProject.title}
													</h3>

													<p className='text-sm 2xl:text-base text-wrap truncate text-(--alt-text-colour)'>
														{nextProject.description}
													</p>
												</div>

												<div className='text-(--bg-colour) text-sm
																flex flex-row gap-2 items-center
																w-fit h-fit px-4 py-2.5 rounded-full 2xl:px-6 2xl:py-3.5 3xl:px-8 3xl:py-4
																bg-(--text-colour) hover:bg-(--text-colour)/85
																transition-colors duration-300'
												>    
													View Project
													<LinkArrow className='size-[16px] 2xl:size-[20px] text-(--bg-colour) group-transition-colors group:duration-300'/>
												</div>
											</div>

											
										</div>
									</Link>
								</Reveal>
							</div>
					</section>
				)}

				{/* footer */}
				<section id='contact' className='section'>
					<Footer 
						className='col-span-5 row-start-1' 
					/>
				</section>
		</section>
	) : (
		<Grid>
			<></>
		</Grid>
	);
}
