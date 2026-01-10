'use client';
import Image from 'next/image';
import { useMemo } from 'react';

import { Project } from '@/lib/projectTypes';
import ProjectCard from '@/app/components/projectcard';
import { Reveal } from '@/app/components/reveal';
import Grid from '@/app/components/grid';

import LinkArrow from '@/app/components/icons/link-arrow';

import '@/public/works.svg';
import '@/public/portfolio-light.svg';
import '@/public/projects.svg';
import '@/public/github-logo.svg';
import '@/public/dribbble-logo.svg';


type PortfolioMobileProps = {
    isLoading: boolean;
    projects: Project[];
    filter: 'all' | 'design' | 'development';
    setFilter: (f: 'all' | 'design' | 'development') => void;
    counts: {
        design: number;
        development: number;
    }
}

export default function PortfolioMobile({
    isLoading,
    projects,
    filter,
    setFilter,
    counts,
}: PortfolioMobileProps) {

    // ------ FILTERED PROJECTS ------ //
    const filteredProjects = useMemo(() => {
        if (filter === 'all') return projects;

        return projects.filter(project => 
            project.type?.includes(filter)
        );
    }, [projects, filter]);

    return (
        <section className='relative'>
            <Grid>
                {/* title, filter buttons */}
                <div className='col-start-1 col-span-3 row-start-2 row-span-1 w-full h-full
                                flex flex-col items-start justify-between px-4 py-6'>
                    {/* title */}
                    <div className='w-full h-full relative'>                                        
                        <Image 
                            src='/portfolio-light.svg'
                            alt='section title: my works'
                            fill
                            className={`object-contain object-left pb-4 sm:pb-8`}
                            draggable={false}
                        />
                    </div>

                    {/* filter buttons */}
                    <div className='text-xs | xs:text-sm
                                    flex flex-row gap-2 w-full h-fit'>
                        {/* all button */}
                        <button 
                            onClick={() => setFilter('all')}
                            className={`flex flex-row gap-2 items-center cursor-pointer
                                        w-fit h-fit px-6 py-3 sm:px-7 sm:py-4 rounded-full border
                                        transition-colors duration-400
                                        ${filter === 'all' ? 'text-white border-(--black) bg-(--black)' : 'text-(--text-colour) border-(--grey) bg-(--off-white)'}`}
                        >
                            All
                        </button>

                        {/* designer button */}
                        <button 
                            onClick={() => setFilter('design')}
                            className={`flex flex-row gap-1 items-center cursor-pointer
                                        w-fit h-fit px-6 py-3 sm:px-7 sm:py-4 rounded-full border
                                        transition-colors duration-400
                                        ${filter === 'design' ? 'text-white border-(--black) bg-(--black)' : 'text-(--text-colour) border-(--grey) bg-(--off-white)'}`}
                        >
                            Design
                            <sup className={`transition-colors duration-400 ${filter === 'design' ? 'text-(--grey)' : 'text-(--light-mode-grey)'}`}>{counts.design}</sup>
                        </button>

                        {/* developer button */}
                        <button 
                            onClick={() => setFilter('development')}
                            className={`flex flex-row gap-1 items-center cursor-pointer
                                        w-fit h-fit px-6 py-3 sm:px-7 sm:py-4 rounded-full border
                                        transition-colors duration-400
                                        ${filter === 'development' ? 'text-white border-(--black) bg-(--black)' : 'text-(--text-colour) border-(--grey) bg-(--off-white)'}`}
                        >
                            Development
                            <sup className={`transition-colors duration-400 ${filter === 'development' ? 'text-(--grey)' : 'text-(--light-mode-grey)'}`}>{counts.development}</sup>
                        </button>
                    </div>
                </div>


                {/* project cards */}
                {filteredProjects.map((project, i) => (
                    <div className='w-full h-full col-start-1 col-span-3 row-span-4'>
                        <Reveal delay={i * 0.1} key={`${project.id}-${filter}`}>
                            {/* preview */}
                            <div className='col-start-1 col-span-3 row-start-1 row-span-2 w-(--three-cell-width) h-(--two-cell-height)'>
                                <ProjectCard
                                    project={project}
                                />
                            </div>

                            {/* content */}
                            <div className='col-start-1 col-span-3 row-start-3 row-span-2
                                            flex flex-col gap-6 px-4 py-6
                                            w-full h-full'
                            >
                                {/* text content */}
                                    {/* title */}
                                    <div className='flex flex-col w-full xs:gap-1'>
                                        {/* project type tag */}
                                        <p className='text-sm | xs:text-base text-(--light-mode-grey) capitalize'>
                                            {[...(project.type ?? [])].join(' & ')}
                                        </p>

                                        {/* project title */}
                                        <h2 className='text-2xl font-medium sm:font-semibold text-(--black)'>{project.title}</h2>
                                    </div>

                                    {/* description */}
                                    <p className='text-sm | xs:text-base text-(--black) sm:w-7/8'>{project.description}</p>

                                    {/* languages, programs, tools, etc. used */}
                                    <p className='text-sm xs:text-base sm:font-[650] text-(--black) font-medium'>
                                        {[...(project.programs ?? []), ...(project.languages ?? [])].join(', ')}
                                    </p>

                                    {/* external links */}
                                    <div className='text-xs | xs:text-sm | sm:text-base flex flex-row gap-2'>
                                        {project?.link && (
                                            <a className='flex flex-row gap-2 items-center place-self-end
                                                            w-fit h-fit px-5 py-4 sm:px-6 rounded-full
                                                            bg-(--black) text-white text-xs sm:text-sm'
                                                target='_blank'
                                                href={project?.link}
                                                rel='noopener noreferrer'
                                            >    
                                                Live Site
                                                <LinkArrow className='size-[20px] text-white group-transition-colors group:duration-300'/>
                                            </a>
                                        )}
                                        {project?.github && (
                                            <a className='flex flex-row gap-2 items-center
                                                            w-fit h-fit sm:h-full px-4 sm:px-5 py-3 rounded-full
                                                            bg-(--nice-grey)'
                                                target='_blank'
                                                href={project?.link}
                                                rel='noopener noreferrer'
                                            >    
                                                <Image
                                                    src='/github-logo.svg'
                                                    alt='github logo'
                                                    width={20}
                                                    height={20}
                                                    className='sm:size-5.5'
                                                />
                                            </a>
                                        )}
                                        {project?.dribbble && (
                                            <a className='flex flex-row gap-2 items-center
                                                            w-fit h-fit sm:h-full px-4 sm:px-5 py-3 rounded-full
                                                            bg-(--nice-grey)'
                                                target='_blank'
                                                href={project?.link}
                                                rel='noopener noreferrer'
                                            >    
                                                <Image
                                                    src='/dribbble-logo.svg'
                                                    alt='dribbble logo'
                                                    width={20}
                                                    height={20}
                                                    className='sm:size-5.5'
                                                />
                                            </a>
                                        )}
                                    </div>
                            </div>
                        </Reveal>
                    </div>
                ))}
            </Grid>
        </section>
    )
}