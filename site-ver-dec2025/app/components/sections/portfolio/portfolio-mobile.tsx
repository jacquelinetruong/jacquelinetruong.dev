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
                <div className='col-start-1 col-span-3 row-start-1 row-span-1 w-full h-full
                                flex flex-col justify-between px-4 py-6'>
                    {/* title */}
                    <div className=''>                                        
                        <Image 
                            src='/portfolio-light.svg'
                            alt='section title: my works'
                            width={205.98}
                            height={52.35}
                            className={`size-full`}
                            draggable={false}
                        />
                    </div>

                    {/* filter buttons */}
                    <div className='font-inter text-xs
                                    flex flex-row gap-2 w-full h-fit'>
                        {/* all button */}
                        <button 
                            onClick={() => setFilter('all')}
                            className={`flex flex-row gap-2 items-center cursor-pointer
                                        w-fit h-fit px-6 py-3 rounded-full border
                                        transition-colors duration-400
                                        ${filter === 'all' ? 'text-white border-(--black) bg-(--black)' : 'text-(--text-colour) border-(--grey) bg-(--off-white)'}`}
                        >
                            All
                        </button>

                        {/* designer button */}
                        <button 
                            onClick={() => setFilter('design')}
                            className={`flex flex-row gap-1 items-center cursor-pointer
                                        w-fit h-fit px-6 py-3 rounded-full border
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
                                        w-fit h-fit px-6 py-3 rounded-full border
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
                        <Reveal delay={i * 0.1} key={project.id}>
                            {/* preview */}
                            <div className='col-start-1 col-span-3 row-start-1 row-span-2 overflow-hidden'>
                                <ProjectCard
                                    project={project}
                                />
                            </div>

                            {/* content */}
                            <div className='col-start-1 col-span-3 row-start-3 row-span-2
                                            font-inter flex flex-col gap-6 px-4 py-6
                                            w-full h-full'
                            >

                                {/* text content */}
                                    {/* title */}
                                    <div className='flex flex-col gap-1 w-full'>
                                        {/* project type tag */}
                                        <p className='text-sm text-(--light-mode-grey) capitalize'>
                                            {[...(project.type ?? [])].join(' & ')}
                                        </p>


                                        {/* project title */}
                                        <h2 className='text-2xl text-(--black)'>{project.title}</h2>
                                    </div>

                                    {/* description */}
                                    <p className='text-(--black)'>{project.description}</p>

                                    {/* languages, programs, tools, etc. used */}
                                    <p className='text-sm text-(--black) font-medium'>
                                        {[...(project.programs ?? []), ...(project.languages ?? [])].join(', ')}
                                    </p>

                                    {/* external links */}
                                    <div className='text-sm flex flex-row gap-2'>
                                        {project?.link && (
                                            <a className='text-white bg-(--black)
                                                        flex flex-row gap-2 items-center
                                                        w-fit h-fit px-6 py-3 rounded-full'
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
                                                            w-fit h-fit px-4 py-3 rounded-full
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
                                                />
                                            </a>
                                        )}
                                        {project?.dribbble && (
                                            <a className='flex flex-row gap-2 items-center
                                                            w-fit h-fit px-4 py-3 rounded-full
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