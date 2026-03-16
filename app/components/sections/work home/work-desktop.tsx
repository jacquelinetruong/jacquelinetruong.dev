// MANUAL CONTENT MANAGEMENT
'use client';

import Image from 'next/image';
import { Reveal } from '../../reveal';
import ProjectCard from '../../projectcard';
import Grid from '../../grid';
import { useActiveSection } from '../../active-section';
import { SectionReveal } from '../../section-reveal';
import type { Project } from '@/lib/projectTypes';
import Coffee from '../../icons/coffee';


export default function Work({
    className = '',
    projects,
 }: { 
    className?: string; 
    projects: Project[];
 }) {
    
    const activeSection = useActiveSection();
    const isActive = activeSection === 'work';

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
                                src='/portfolio.svg'
                                alt=''
                                fill
                                className='object-contain object-left-bottom'
                                draggable={false}
                            />
                        </Reveal>
                    </div>
                </div>

                {/* contact button */}
                <Reveal delay={2.75} className='col-start-5 row-start-1
                                                flex justify-end items-start
                                                p-8 | ultrawide:pr-20'>
                    <a
                        className='font-normal text-sm 3xl:text-lg text-(--white) group
                                    flex flex-row gap-2 items-center
                                    w-fit h-fit px-5 py-4 rounded-full 2xl:px-6 2xl:py-4
                                    bg-(--black) hover:bg-(--light-black)
                                    transition-colors duration-300'
                        target='_blank'
                        href='mailto:hello@jacquelinetruong.dev'
                    >	
                        <Coffee className={`size-[24px] transition-colors duration-300 text-(--white) group-hover:text-(--white)`}/>
                        Get in touch
                    </a>
                </Reveal>

                {/* --- PROJECT CARDS --- */}
                {projects.slice(0,8).map((project, i) => {
                    // slot into grid layout
                    const positions: { colStart: number; rowStart: number; }[] = [
                        { colStart: 1, rowStart: 2 },
                        { colStart: 2, rowStart: 2 },
                        { colStart: 3, rowStart: 2 },
                        { colStart: 4, rowStart: 2 },
                        { colStart: 1, rowStart: 3 },
                        { colStart: 2, rowStart: 3 },
                        { colStart: 3, rowStart: 3 },
                        { colStart: 4, rowStart: 3 },
                    ];

                    const pos = positions[i];
                    if (!pos) return null;

                    return (
                        <div
                            key={`${project.id}-${i}`}
                            className={`col-start-${pos.colStart} row-start-${pos.rowStart}`}
                        >
                            {isActive ? (
                                <Reveal delay={(i + 0.5) * 0.15}>
                                    <ProjectCard
                                        project={project}
                                    />
                                </Reveal>
                            ): (
                                <></>
                            )}
                            
                        </div>
                    );
                })}
            </Grid>
        </SectionReveal>
    )
}