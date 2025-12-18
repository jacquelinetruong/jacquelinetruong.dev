'use client';

import { Project } from '@/lib/projectTypes';
import { Experience } from '@/lib/experienceTypes';

import ProjectCard from './projectcard';
import Image from 'next/image';
import Grid from './grid';

import { Reveal } from './reveal';
import GuideButton from './guide-button';

import '../../public/me.jpg';
import '../../public/detail-arrow-black.svg';
import '../../public/coffee-icon-white.svg';
import '../../public/jt-grey.svg';
import '../../public/cat.svg';


export default function About({
    className = '',
    projects,
    experience,
 }: { 
    className?: string; 
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
        <Reveal delay={0.25}>
            <Grid >
                {/* projects display */}
                {/* project display #1 */}
                <div className='col-start-2 col-span-1 row-start-3 row-span-1'>
                    {projects
                        .filter(p => p.sectionId === '1')
                        .map(project => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                            />
                        ))}
                </div>
                {/* project display #2 */}
                <div className='col-start-4 col-span-1 row-start-3 row-span-1'>
                    {projects
                        .filter(p => p.sectionId === '2')
                        .map(project => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                            />
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
                    <div className='flex flex-col gap-6'>
                        <h2 className='font-semibold text-3xl'>
                            Hey! Welcome to my portfolio site.
                        </h2>
                        <p className='text-xl'>
                            I'm a newgrad designer who loves bringing ideas to life through clean, functional, high-impact products. Since I also code, I'm drawn to 
                            creating designs that aren't just beautiful, but realistic, buildable, and considerate of engineering workflows. By speaking in both "design"
                            and "dev" languages, I bridge the gap, crafting intuitive interactions, scalable UI, and shipping things that make a real difference.
                        </p>
                        <p className='text-xl'>
                            When I'm not designing or coding, I'm probably making my third iced coffee of the day, or playing video games!
                        </p>
                    </div>

                    {/* quick info */}
                    <div className='flex flex-col gap-8'>
                        {/* current work */}
                        <div className='flex flex-col gap-1'>
                            <h4 className='font-medium text-xl text-(--alt-text-colour)'>Currently</h4>
                            
                            {/* if jobless :heartbreak: */}
                            {currentWork.length === 0 && (
                                <p className='text-xl'>Open to new opportunities</p>
                            )}

                            {currentWork.map((role, i) => (
                                <p key={role.id}
                                    className='font-semibold text-xl
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
                            ))}
                        </div>

                        {/* education */}
                        <div className='flex flex-col gap-1'>
                            <h4 className='font-medium text-xl text-(--alt-text-colour)'>Education</h4>
                            <p className='font-semibold text-xl
                                            flex flex-row gap-2 items-center'>
                                <Image 
                                    src='/detail-arrow-black.svg'
                                    alt='arrow'
                                    width={24}
                                    height={24}
                                    draggable={false}
                                />
                                BSc Computer Science @ Wilfrid Laurier University, 2025
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* jump to 'portfolio' button */}
                <div className='col-start-3 col-span-1 row-start-3 row-span-1
                                flex flex-col justify-end items-center'>
                    <GuideButton href='#portfolio' text='See Portfolio'/>
                </div>
            </Grid>
        </Reveal>
    )
}