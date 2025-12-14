'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Project } from '@/lib/projectTypes';
import { Experience } from '@/lib/experienceTypes';

import ProjectCard from './projectcard';
import Grid from './grid';

import '../../public/detail-arrow-black.svg';
import '../../public/detail-arrow-grey.svg';
import '../../public/experience.svg';

export default function ExperienceSection({
    className = '',
    projects,
    experience,
 }: { 
    className?: string; 
    projects: Project[];
    experience: Experience[];
 }) {

    // filter by experience category
    const xpCategorized = {
        work: experience.filter(e => e.category === 'work'),
        clients: experience.filter(e => e.category === 'clients'),
        proficiencies: experience.filter(e => e.category === 'proficiencies'),
    }

    // active experience
    const [activeExperience, setActiveExperience] = useState<Experience | null>(null);

    // set default active experience
    useEffect(() => {
        setActiveExperience(xpCategorized.work[0] ?? null);
    }, []);

    return (
        <Grid className={className}>
            {/* relevant projects */}
            {/* project display #1 */}
            <div className='col-start-5 col-span-1 row-start-1 row-span-1'>
                {projects
                    .filter(p => p.section === 'hero' && p.sectionId === '1')
                    .map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))}            
            </div>
            {/* project display #2 */}
            <div className='col-start-4 col-span-1 row-start-2 row-span-1'>
                {projects
                    .filter(p => p.section === 'hero' && p.sectionId === '2')
                    .map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))} 
            </div>
            {/* project display #2 */}
            <div className='col-start-2 col-span-1 row-start-3 row-span-1'>
                {projects
                    .filter(p => p.section === 'hero' && p.sectionId === '3')
                    .map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))} 
            </div>

            {/* experience menu */}
            <div className='font-inter text-xl
                            col-start-1 col-span-1 row-start-1 row-span-2
                            flex flex-col gap-8
                            p-8'
            >
                {Object.entries(xpCategorized).map(([category, items]) => (
                    <div key={category} className='flex flex-col gap-1'>

                        {/* category heading */}
                        <h4 className='font-medium text-[#888888] capitalize'>
                            {category}
                        </h4>

                        {/* category items */}
                        {items.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveExperience(item)}
                                className={`
                                    font-medium
                                    flex flex-row gap-2 items-center
                                    w-fit h-fit
                                    ${activeExperience?.id === item.id
                                        ? 'font-semibold'
                                        : 'text-[#888888] hover:text-[#4D4D4D]'}
                                `}
                            >
                                <Image 
                                    src={`${activeExperience?.id === item.id
                                        ? '/detail-arrow-black.svg'
                                        : '/detail-arrow-grey.svg'}`}
                                    alt='arrow'
                                    width={24}
                                    height={24}
                                />
                                {item.menuTitle}
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            {/* experience details */}
            <div className='font-inter
                            col-start-2 col-span-2 row-start-1 row-span-2
                            flex flex-col gap-6
                            p-8'>
                {/* header */}
                {activeExperience && (
                    <div className='flex flex-col gap-2'>
                        {/* position title */}
                        <h1 className='font-semibold text-3xl text-nowrap'>
                            {activeExperience.position} @ {activeExperience.menuTitle}     {/* future: link to company site */}
                        </h1>

                        {/* date range */}
                        <h2 className='font-medium text-xl text-[#888888]
                                       flex flex-row gap-2'>
                            <Image 
                                src='/detail-arrow-grey.svg'
                                alt='arrow'
                                width={24}
                                height={24}
                            />
                            {formatDateRange(activeExperience)}
                        </h2>
                    </div>
                )}
                
                {/* experience description */}
                {activeExperience?.points.map((point, i) => (
                    <li key={i} className='text-xl ml-6'>
                        {point}
                    </li>
                ))} 
            </div>

            {/* big title */}
            <div className='col-start-3 col-span-3 row-start-3 row-span-1
                            flex flex-col justify-end
                            p-8'>
                <Image 
                    src='/experience.svg'
                    alt='experience'
                    width={856}
                    height={216}
                    className='w-full'
                />
            </div>
        </Grid>
    )
}

// helper function for sorting experiences by date
function formatDateRange(xp: Experience) {
    if (!xp.startDate) return '';

    const start = new Date(xp.startDate).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    });

    if (xp.current || !xp.endDate) {
        return `${start} — Present`;
    }

    const end = new Date(xp.endDate).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    });

    return `${start} — ${end}`;
}