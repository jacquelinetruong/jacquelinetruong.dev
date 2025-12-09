'use client';

import { Project } from '@/lib/projectTypes';
import ProjectCard from './projectcard';
import Grid from './grid';
import Image from 'next/image';

import '../../public/portfolio.svg';
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

    const featured = projects.find(p => p.sectionId === '1');

    return (
        <Grid className={className}>
            {/* big featured project */}
                {/* preview */}
                <div className='col-start-1 col-span-2 row-start-1 row-span-2'>
                    {featured && (
                        <ProjectCard
                            key={featured.id}
                            project={featured}
                        />
                    )}
                </div>
                {/* description */}
                <div className='font-inter
                                col-start-1 col-span-2 row-start-3 row-span-1
                                flex flex-col gap-6 p-8
                                bg-[#1B1C1D]'>
                    <p className='font-semibold text-3xl text-white'>{featured?.title}</p>
                    <p className='text-xl text-white'>
                        {featured?.description}
                    </p>
                    <a className='font-medium text-xl text-[#1B1C1D]
                                  flex flex-row gap-2 items-center
                                  w-fit h-fit px-5 py-3 rounded-full
                                  bg-white'
                        target='_blank'
                        href={featured?.link}
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

            {/* project display #2 */}
            <div className='col-start-5 col-span-1 row-start-2 row-span-1'>
                {projects
                    .filter(p => p.sectionId === '2')
                    .map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))}
            </div>

            {/* project display #3 */}

            <div className='col-start-4 col-span-1 row-start-3 row-span-1'>
                {projects
                    .filter(p => p.sectionId === '3')
                    .map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))}
            </div>

            {/* project display #4 */}
            <div className='col-start-5 col-span-1 row-start-3 row-span-1'>
                {projects
                    .filter(p => p.sectionId === '4')
                    .map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))}
            </div>
            
            {/* filters, title */}
            <div className='font-inter
                            col-start-4 col-span-2 row-start-1 row-span-1
                            flex flex-col items-end justify-between p-8
                            bg-[#1B1C1D]'>

                {/* filter buttons */}
                <div className='flex flex-row gap-4'>
                    <a className='font-medium text-xl text-white
                                flex flex-row gap-2 items-center
                                w-fit h-fit px-5 py-3 rounded-full
                                border-1'
                        href=''
                    >
                        <Image 
                            src='/palette-icon.svg'
                            alt='palette icon'
                            width={32}
                            height={32}
                        />
                        UX/UI Designer Focus
                    </a>
                    <a className='font-medium text-xl text-[#666666]
                                flex flex-row gap-2 items-center
                                w-fit h-fit px-5 py-3 rounded-full
                                border-1'
                        href=''
                    >
                        <Image 
                            src='/code-icon-grey.svg'
                            alt='code icon'
                            width={32}
                            height={32}
                        />
                        Programmer Focus
                    </a>
                </div>

                {/* title */}
                <Image 
                    src='/portfolio.svg'
                    alt='portfolio title'
                    width={632}
                    height={216}
                    className='size-full bottom-0'
                />
            </div>
            
            {/* jump to experience button */}
            <div className='col-start-3 col-span-1 row-start-3 row-span-1
                            flex flex-col justify-end items-center
                            bg-[#1B1C1D]'>
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

            {/* colour in bg lol */}
            <div className='col-start-3 col-span-1 row-start-1 row-span-1 bg-[#1B1C1D]'></div>
            <div className='col-start-3 col-span-1 row-start-2 row-span-1 bg-[#1B1C1D]'></div>
            <div className='col-start-4 col-span-1 row-start-2 row-span-1 bg-[#1B1C1D]'></div>
        </Grid>
    )
}