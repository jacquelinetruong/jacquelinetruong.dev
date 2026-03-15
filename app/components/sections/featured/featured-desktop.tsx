// REQUIRES MANUAL CONTENT MANAGEMENT; not connected to Notion CMS
'use client';

import Image from 'next/image';

import ProjectCard from '../../projectcard';
import type { Project } from '@/lib/projectTypes';
import Grid from '../../grid';
import { Reveal } from '../../reveal';
import { SectionReveal } from '../../section-reveal';


export default function Featured({
    className = '',
    featuredProjects,
 }: { 
    className?: string; 
    featuredProjects: Project[];
 }) {

    

    return (
        <SectionReveal
            fadeDistance={0}
            fadeStart={0}
            fadeEnd={0.7}
        >
            <Grid>
                {/* big title */}
                <div className='col-start-1 col-span-2 row-start-1
                                flex flex-col justify-end
                                p-8 | ultrawide:pr-20'>
                    <div className='w-full h-full relative'>
                        <Reveal delay={0.25}>
                            <Image 
                                src='/featured.svg'
                                alt=''
                                fill
                                className='object-contain object-left-bottom'
                                draggable={false}
                            />
                        </Reveal>
                    </div>
                </div>

                {/* "all work" button */}
                <Reveal delay={2.75} className='col-start-3 row-start-1
                                                flex justify-end items-end
                                                p-8 | ultrawide:pr-20'>
                    <a
                        className='font-normal text-xs 3xl:text-lg text-(--white) group
                                    flex flex-row gap-2 items-center
                                    w-fit h-fit px-5 py-4 rounded-full 2xl:px-6 2xl:py-4
                                    bg-(--text-colour) hover:bg-(--light-black)
                                    transition-colors duration-300'
                        href='/work'
                    >	
                        View all work →
                    </a>
                </Reveal>

                {/* --- PROJECT CARDS --- */}
                {/* project display #1 */}
                <div className='col-start-1 row-start-2'>
                    <Reveal delay={1.2}>
                        {featuredProjects
                            .filter(p => p.sectionId === '1')
                            .map(project => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                    </Reveal>
                </div>

                {/* project display #2 */}
                <div className='col-start-2 row-start-2'>
                    <Reveal delay={1}>
                        {featuredProjects
                            .filter(p => p.sectionId === '2')
                            .map(project => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                    </Reveal>
                </div>
            
                {/* project display #3 */}
                <div className='col-start-3 row-start-2'>
                    <Reveal delay={1.4}>
                        {featuredProjects
                            .filter(p => p.sectionId === '3')
                            .map(project => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                    </Reveal>
                </div>

                {/* project display #4 */}
                <div className='col-start-1 row-start-3'>
                    <Reveal delay={1.4}>
                        {featuredProjects
                            .filter(p => p.sectionId === '4')
                            .map(project => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                    </Reveal>
                </div>

                {/* project display #5 */}
                <div className='col-start-2 row-start-3'>
                    <Reveal delay={1.4}>
                        {featuredProjects
                            .filter(p => p.sectionId === '5')
                            .map(project => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                    </Reveal>
                </div>

                {/* project display #6 */}
                <div className='col-start-3 row-start-3'>
                    <Reveal delay={1.4}>
                        {featuredProjects
                            .filter(p => p.sectionId === '6')
                            .map(project => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                    </Reveal>
                </div>
            </Grid>
        </SectionReveal>
    )
}