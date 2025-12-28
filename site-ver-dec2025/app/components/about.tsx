'use client';

import { Project } from '@/lib/projectTypes';
import { Experience } from '@/lib/experienceTypes';

import ProjectCard from './projectcard';
import Image from 'next/image';
import Grid from './grid';

import { SectionReveal } from './section-reveal';
import { Reveal } from './reveal';
import GuideButton from './guide-button';

import '../../public/me.jpg';
import '../../public/detail-arrow-black.svg';
import '../../public/jt-grey.svg';
import '../../public/cat.svg';


export default function About({
    className = '',
    isLoading,
    projects,
    experience,
 }: { 
    className?: string; 
    isLoading: boolean;
    projects: Project[];
    experience: Experience[];
 }) {

    // current work (already filtered) sorted by recency
    const currentWork = [...experience]
        .filter(e => e.startDate)
        .sort(
            (a, b) => new Date(b.startDate!).getTime() - new Date(a.startDate!).getTime()
        );

    return(
        <SectionReveal
            fadeDistance={0}
            fadeStart={0.4}
            fadeEnd={0.7}
        >
            <Grid >
                {/* projects display */}
                {/* project display #1 */}
                <div className='col-start-2 col-span-1 row-start-3 row-span-1'>
                    {projects
                        .filter(p => p.sectionId === '1')
                        .map(project => (
                            <Reveal delay={1.2}>
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            </Reveal>
                        ))}
                </div>
                {/* project display #2 */}
                <div className='col-start-4 col-span-1 row-start-3 row-span-1'>
                    {projects
                        .filter(p => p.sectionId === '2')
                        .map(project => (
                            <Reveal delay={1.4}>
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            </Reveal>
                        ))}
                </div>

                {/* pic of me! */}
                <div className='col-start-1 col-span-1 row-start-1 row-span-2'>
                    <Image 
                        src='/me.jpg'
                        alt='pic of me'
                        width={2000}
                        height={2508}
                        className='h-full object-cover pointer-events-none'
                        draggable={false}
                    />
                </div>

                {/* about me content */}
                <div className='font-inter
                                col-start-2 col-span-2 row-start-1 row-span-2
                                flex flex-col justify-between
                                p-8'>
                    {/* message */}
                    <div className='flex flex-col gap-4'>
                        <Reveal delay={0.15}>
                            <h2 className='font-semibold sm:text-xl md:text-2xl'>
                                Hey! Welcome to my portfolio site.
                            </h2>
                        </Reveal>

                        <Reveal delay={0.25}>
                            <p className='sm:text-sm md:text-base 2xl:text-lg
                                            sm:w-full 2xl:w-4/5'>
                                I'm a newgrad designer who loves bringing ideas to life through clean, functional, high-impact products. Since I also code, I'm drawn to 
                                creating designs that aren't just beautiful, but realistic, buildable, and considerate of engineering workflows. By speaking in both "design"
                                and "dev" languages, I bridge the gap, crafting intuitive interactions, scalable UI, and shipping things that make a real difference.
                            </p>
                        </Reveal>

                        <Reveal delay={0.35}>
                            <p className='sm:text-sm md:text-base 2xl:text-lg
                                            sm:w-full 2xl:w-4/5'>
                                When I'm not designing or coding, I'm probably making my third iced coffee of the day, or playing video games!
                            </p>
                        </Reveal>
                    </div>

                    {/* quick info */}
                    <div className='flex flex-col gap-4'>
                        {/* current work */}
                        <div className='flex flex-col'>
                            <Reveal delay={0.45}>
                                <h4 className='font-medium text-(--alt-text-colour) sm:text-sm md:text-base 2xl:text-lg'>Currently</h4>
                            </Reveal>
                            
                            {/* if jobless :heartbreak: */}
                            {currentWork.length === 0 && (
                                <p className='font-semibold sm:text-sm md:text-base 2xl:text-lg'>Open to new opportunities</p>
                            )}

                            {currentWork.map((role, i) => (
                                <Reveal delay={(i + 2) * 0.25}>
                                    <p key={role.id}
                                        className='font-semibold sm:text-sm md:text-base 2xl:text-lg
                                                flex flex-row gap-2 items-center'
                                    >     
                                        <Image
                                            src='/detail-arrow-black.svg'
                                            alt='arrow'
                                            width={24}
                                            height={24}
                                            draggable={false}
                                        />
                                        {role.position} @ {role.menuTitle}
                                        {i < currentWork.length - 1 && ','}
                                    </p>
                                </Reveal>
                            ))}
                        </div>

                        {/* education */}
                        <div className='flex flex-col'>
                            <Reveal delay={(currentWork.length + 1) * 0.25}>
                                <h4 className='font-medium sm:text-sm md:text-base 2xl:text-lg text-(--alt-text-colour)'>Education</h4>
                            </Reveal>

                            <Reveal delay={(currentWork.length + 2) * 0.25}>
                            <p className='font-semibold sm:text-sm md:text-base 2xl:text-lg
                                            flex flex-row gap-2 items-start'>
                                <Image 
                                    src='/detail-arrow-black.svg'
                                    alt='arrow'
                                    width={24}
                                    height={24}
                                    draggable={false}
                                />
                                BSc Computer Science @ Wilfrid Laurier University, 2025
                            </p>
                            </Reveal>
                        </div>
                    </div>
                </div>
                
                {/* jump to 'portfolio' button */}
                <div className='col-start-3 col-span-1 row-start-3 row-span-1'>
                    <GuideButton href='#portfolio' text='See Portfolio'/>
                </div>
            </Grid>
        </SectionReveal>
    )
}