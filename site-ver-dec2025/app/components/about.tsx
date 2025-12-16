'use client';

import { Project } from '@/lib/projectTypes';
import { Experience } from '@/lib/experienceTypes';

import ProjectCard from './projectcard';
import Image from 'next/image';
import Grid from './grid';

import '../../public/me.jpg';
import '../../public/detail-arrow-black.svg';
import '../../public/coffee-icon-white.svg';
import '../../public/jt-grey.svg';
import '../../public/guide-arrow-black.svg';
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
        <Grid className={className}>
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
            
            {/* cta, intro section */}
            <div className='font-inter
                            col-start-4 col-span-2 row-start-1 row-span-1
                            flex flex-col justify-between items-end 
                            p-8'>
    
                {/* "say hi" button */}
                <a className='font-medium text-2xl text-white
                                flex flex-row gap-4 items-center
                                w-fit h-fit px-6 py-4 rounded-full
                                bg-(--black)'
                    target='_blank' 
                    href='mailto:hello@jacquelinetruong.dev'
                >
                    <Image 
                        src='/coffee-icon-white.svg'
                        alt='coffee icon'
                        width={32}
                        height={32}
                        draggable={false}
                    />
                    Say Hi!
                </a>
    
                {/* quick intro text */}
                <h1 className='font-semibold text-3xl text-right text-(--grey)'>
                    Product designer first, software engineer second. Focused on crafting digital experiences and turning everyday ideas into art.
                </h1>
            </div>

            {/* big name */}
            <div className='col-start-4 col-span-2 row-start-2 row-span-1
                            flex flex-col items-end
                            p-8'>
                <Image 
                    src='/jt-grey.svg'
                    alt='jacqueline truong'
                    width={736}
                    height={259.52}
                    className='size-full'
                    draggable={false}
                />
            </div>

            {/* jump to 'portfolio' button */}
            <div className='col-start-3 col-span-1 row-start-3 row-span-1
                            flex flex-col justify-end items-center'>
                <a className='font-inter font-medium
                                flex flex-col items-center gap-2
                                p-8
						        animate-jump'
                    href='#portfolio'			  
                >
                    See Portfolio
                    <Image
                        src='/guide-arrow-black.svg'
                        alt='arrow pointing down'
                        width={28}
                        height={28}
                        draggable={false}
                    />
                </a>
            </div>

            {/* city */}
            <div className='font-inter font-semibold text-3xl text-right text-(--grey)
                            col-start-5 col-span-1 row-start-3 row-span-1
                            flex flex-col justify-end 
                            p-8'>
                <h2>Based in Toronto, CA.</h2>

                {/* cat! */}
                <Image 
                    src='/cat.svg'
                    alt='hand-drawn cat'
                    width={250}
                    height={127.63}
                    className='size-full'
                    draggable={false}
                />
            </div>
            
        </Grid>
    )
}