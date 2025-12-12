'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/lib/projectTypes';
import ProjectCard from './projectcard';
import Grid from './grid';
import Image from 'next/image';

import '../../public/portfolio.svg';
import '../../public/projects.svg';
import '../../public/palette-icon.svg';
import '../../public/palette-icon-grey.svg';
import '../../public/code-icon.svg';
import '../../public/code-icon-grey.svg';
import '../../public/link-arrow-white.svg';
import '../../public/link-arrow-black.svg';
import '../../public/guide-arrow-white.svg';


export default function Portfolio({
    className = '',
    projects,
 }: { 
    className?: string; 
    projects: Project[];
 }) {

    // filter state
    const [filter, setFilter] = useState<'designer' | 'developer'>('designer');

    // projects filtered by type
    const filteredProjects = projects.filter(p => p.type === filter);

    // carousel state: order of filtered projects
    const [carouselProjects, setCarouselProjects] = useState<Project[]>(filteredProjects);

    // first element is featured project
    const featuredProject = carouselProjects[0];

    // rotate carousel every 10s
    useEffect(() => {
        if (carouselProjects.length <= 1) return;

        const interval = setInterval(() => {
            setCarouselProjects(prev => {
                const [first, ...rest] = prev;
                return [...rest, first];
            });
        }, 10000);

        return () => clearInterval(interval);
    }, [carouselProjects]);

    // update featured project if clicked
    const newFeaturedProject = (clickedProject: Project) => {
        setCarouselProjects(prev => {
            const i = prev.findIndex(p => p.id === clickedProject.id);
            if (i === -1) return prev;

            // rotate array to make clicked project = first element
            return [...prev.slice(i), ...prev.slice(0, i)];
        });
    };

    return (
        <Grid className=''>
            {/* featured project */}
                {/* preview */}
                <div className='col-start-1 col-span-2 row-start-1 row-span-2'>
                    {featuredProject && (
                        <ProjectCard
                            key={featuredProject.id}
                            project={featuredProject}
                        />
                    )}
                </div>
                {/* description */}
                <div className='font-inter
                                col-start-1 col-span-2 row-start-3 row-span-1
                                flex flex-col gap-6 p-8'>
                    <h1 className='font-semibold text-3xl text-white'>{featuredProject?.title}</h1>
                    <p className='text-xl text-white'>
                        {featuredProject?.description}
                    </p>
                    <a className='font-medium text-xl text-[#1B1C1D]
                                  flex flex-row gap-2 items-center
                                  w-fit h-fit px-5 py-3 rounded-full
                                  bg-white'
                        target='_blank'
                        href={featuredProject?.link}
                        rel='noopener noreferrer'
                    >    
                        Learn More
                        <Image
                            src='/link-arrow-black.svg'
                            alt='arrow'
                            width={28}
                            height={28}
                        />
                    </a>
                </div>

            {/* non-featured projects */}
            {carouselProjects
                .slice(1) // not featured
                .map((project, i) => {
                    // slot into grid layout
                    const positions: {colStart: number; colSpan: number; rowStart: number; rowSpan: number}[] = [
                        { colStart: 1, colSpan: 2, rowStart: 1, rowSpan: 2 },
                        { colStart: 4, colSpan: 1, rowStart: 3, rowSpan: 1 },
                        { colStart: 5, colSpan: 1, rowStart: 3, rowSpan: 1 },
                        { colStart: 5, colSpan: 1, rowStart: 2, rowSpan: 1 },
                    ];

                    const pos = positions[i + 1];
                    if (!pos) return null;
                
                return (
                    <div
                        key={project.id}
                        className={`col-start-${pos.colStart} col-span-${pos.colSpan} row-start-${pos.rowStart} row-span-${pos.rowSpan}`}
                    >
                        <ProjectCard
                            project={project}
                            onClick={() => newFeaturedProject(project)}
                        />
                    </div>
                );
            })}
            
            {/* filters, title */}
            <div className='font-inter
                            col-start-4 col-span-2 row-start-1 row-span-1
                            flex flex-col items-end justify-between'>

                {/* filter buttons */}
                <div className='flex flex-row gap-4'>
                    {/* designer button */}
                    <button 
                        onClick={() => setFilter('designer')}
                        className={`font-medium text-xl
                                    flex flex-row gap-2 items-center
                                    w-fit h-fit px-5 py-3 rounded-full
                                    border-1
                                    ${filter === 'designer' ? 'text-white' : 'text-[#666666]'}`}
                    >
                        <Image 
                            src={filter === 'designer' ? '/palette-icon.svg' : '/palette-icon-grey.svg'}
                            alt='palette icon'
                            width={32}
                            height={32}
                        />
                        UX/UI Designer Focus
                    </button>

                    {/* developer button */}
                    <button 
                        onClick={() => setFilter('developer')}
                        className={`font-medium text-xl
                                    flex flex-row gap-2 items-center
                                    w-fit h-fit px-5 py-3 rounded-full
                                    border-1
                                    ${filter === 'developer' ? 'text-white' : 'text-[#666666]'}`}
                    >
                        <Image 
                            src={filter === 'developer' ? '/code-icon.svg' : '/code-icon-grey.svg'}
                            alt='code icon'
                            width={32}
                            height={32}
                        />
                        Programmer Focus
                    </button>
                </div>

                {/* title */}
                <Image 
                    src={filter === 'designer' ? '/portfolio.svg' : '/projects.svg'}
                    alt='section title'
                    width={632}
                    height={216}
                    className='size-full bottom-0'
                />
            </div>
            
            {/* jump to experience button */}
            <div className='col-start-3 col-span-1 row-start-3 row-span-1
                            flex flex-col justify-end items-cente'>
                <a className='font-inter font-medium text-white
                              flex flex-col items-center gap-2
                              p-8'
                    href='#about'			  
                >
                    My Experience
                    <Image
                        src='/guide-arrow-white.svg'
                        alt='arrow pointing down'
                        width={28}
                        height={28}
                    />
                </a>
            </div>
        </Grid>
    )
}