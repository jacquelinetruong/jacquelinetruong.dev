'use client';


import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Grid from '@/app/components/grid';
import { SectionReveal } from '../../section-reveal';
import { Reveal } from '../../reveal';
import { Project } from '@/lib/projectTypes';

import LinkArrow from '../../icons/link-arrow';


type PortfolioNewProps = {
    isLoading: boolean;
    projects: Project[];
    filter: 'all' | 'design' | 'development';
    setFilter: (f: 'all' | 'design' | 'development') => void;
    counts: {
        design: number;
        development: number;
    }
}

export default function PortfolioNew({
    isLoading,
    projects,
    filter,
    setFilter,
    counts,
}: PortfolioNewProps) {

    // ------ FILTERED PROJECTS ------ //
    const filteredProjects = useMemo(() => {
        if (filter === 'all') return projects;

        return projects.filter(project => project.type?.includes(filter));
    }, [projects, filter]);
        
    // ------ PROJECT HOVER STATE ------ //
    const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
    
    const router = useRouter();

    return (
        <SectionReveal
            fadeDistance={0}
            fadeStart={0.4}
            fadeEnd={0.7}
        >
            <section className='relative'>
                <Grid>
                    {/* project list */}
                    <div className='col-start-2 col-span-2 row-start-1 row-span-3 
                                    bg-(--bg-colour)/25'>
                        <ul className='flex flex-col'>
                            {filteredProjects.map((project, i) => {
                                const isHovered = hoveredProject && hoveredProject.id === project.id;

                                return (
                                    <Reveal key={`${project.id}-${i}`} delay={0.2 + i * 0.15}>
                                        <li
                                            onClick={() => {
                                                router.push(`/${project.slug}`);
                                            }}
                                            onMouseEnter={() => setHoveredProject(project)}
                                            onMouseLeave={() => setHoveredProject(null)}
                                            className='relative p-8 cursor-pointer 
                                                        border border-x-0 border-t-0 border-b-(--grey)/25
                                                        bg-(--bg-colour)/15 hover:bg-(--grid-line-colour) transition-colours duration-500'
                                        >
                                            {/* hover preview */}
                                            {isHovered && (
                                            <div className='absolute top-1/2 -translate-y-1/2
                                                            right-full
                                                            w-(--cell-width) aspect-[4/3]
                                                            pointer-events-none
                                                            z-10'
                                            >
                                                <Image
                                                    src={project.images[0]}
                                                    alt={`${project.title} Preview`}
                                                    fill
                                                    className={`${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500
                                                                object-contain object-center shadow-lg w-(--cell-width h-(--cell-height)`}
                                                />
                                            </div>
                                            )}

                                            {/* project content */}
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-row justify-between'>
                                                    <h3 className='text-lg transition-opacity group-hover:opacity-70'>{project.title}</h3>
                                                    <LinkArrow className={`${isHovered ? 'opacity-100' : 'opacity-0'} size-[32px] transition-opacity duration-500`}/>
                                                </div>
                                                <span className='text-sm text-(--grey)'>{project.description}</span>
                                            </div>
                                        </li>
                                    </Reveal>
                                );
                            })}
                        </ul>
                    </div>

                    {/* filters, title */}
                    <div className='text-nowrap text-sm
                                    col-start-4 col-span-2 row-start-1 row-span-1 w-(--two-cell-width) h-(--cell-height)
                                    flex flex-col items-end justify-between relative'>

                        {/* filter buttons */}
                        <div className='flex flex-row gap-2 px-8 pt-8 | ultrawide:px-20'>
                            {/* all button */}
                            <button 
                                onClick={() => setFilter('all')}
                                className={`flex flex-row gap-2 items-center cursor-pointer
                                            w-fit h-fit rounded-full px-6 py-3 | 2xl:px-8 2xl:py-4
                                            border-1 bg-(--bg-colour)
                                            transition-colors duration-400
                                            ${filter === 'all' ? 'text-black bg-white hover:text-black' : 'hover:border-(--light-mode-grey) text-(--text-colour) hover:bg-(--grid-line-colour)'}`}
                            >
                                All
                            </button>

                            {/* designer button */}
                            <button 
                                onClick={() => setFilter('design')}
                                className={`flex flex-row gap-1 items-center cursor-pointer
                                            w-fit h-fit rounded-full px-6 py-3 | 2xl:px-8 2xl:py-4
                                            border-1 bg-(--bg-colour)
                                            transition-colors duration-400
                                            ${filter === 'design' ? 'text-black bg-white hover:text-black' : 'hover:border-(--light-mode-grey) text-(--text-colour) hover:bg-(--grid-line-colour)'}`}
                            >
                                Design
                                <sup className={`transition-colors duration-400 ${filter === 'design' ? 'text-(--light-mode-grey)' : 'text-(--grey)'}`}>{counts.design}</sup>
                            </button>

                            {/* developer button */}
                            <button 
                                onClick={() => setFilter('development')}
                                className={`flex flex-row gap-1 items-center cursor-pointer
                                            w-fit h-fit rounded-full px-6 py-3 | 2xl:px-8 2xl:py-4
                                            border-1 bg-(--bg-colour)
                                            transition-colors duration-400
                                            ${filter === 'development' ? 'text-black bg-white hover:text-black' : 'hover:border-(--light-mode-grey) text-(--text-colour) hover:bg-(--grid-line-colour)'}`}
                            >
                                Development
                                <sup className={`transition-colors duration-400 ${filter === 'development' ? 'text-(--light-mode-grey)' : 'text-(--grey)'}`}>{counts.development}</sup>
                            </button>
                        </div>

                        {/* title */}
                        <div className='w-full h-full relative'>
                            <Image 
                                src='/works.svg'
                                alt='section title: design and development works'
                                fill
                                className={`pr-8 | ultrawide:pr-20
                                            object-contain object-right transition-all 
                                            ${filter === 'all' ? 'opacity-100 duration-800 ' : 'opacity-0 translate-x-100 duration-300'}`}
                                draggable={false}
                            />
                            <Image 
                                src='/portfolio.svg'
                                alt='section title: design portfolio'
                                fill
                                className={`pr-8 | ultrawide:pr-20
                                            object-contain object-right transition-all 
                                            ${filter === 'design' ? 'opacity-100 duration-800 ' : 'opacity-0 translate-x-100 duration-300'}`}                                        draggable={false}
                            />
                            <Image 
                                src='/projects.svg'
                                alt='section title: development projects'
                                fill
                                className={`pr-8 | ultrawide:pr-20
                                            object-contain object-right transition-all 
                                            ${filter === 'development' ? 'opacity-100 duration-800 ' : 'opacity-0 translate-x-100 duration-300'}`}                                        draggable={false}
                            />
                        </div>
                    </div>

                    {/* handwritten note */}
                    <div className='col-start-5 col-span-1 row-start-2 row-span-1 w-full h-full relative'>
                        <Image
                            src='/my-faves.svg'
                            alt='my faves'
                            fill
                            className='object-contain object-center lg:p-12 ultrawide:p-20'
                            draggable={false}
                        />
                    </div>
                </Grid>
            </section>
        </SectionReveal>
    )
}