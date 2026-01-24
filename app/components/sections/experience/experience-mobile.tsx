'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { formatDateRange } from './experience';

import type { Experience } from '@/lib/experienceTypes';

import { Reveal } from '@/app/components/reveal';
import Grid from '@/app/components/grid';
import { renderRichText } from '@/lib/richText';


export default function ExperienceMobile({
    className = '',
    isLoading,
    experience,
}: {
    className?: string;
    isLoading: boolean;
    experience: Experience[];
}) {
    // ------ EXPERIENCE BY DATE ------ //
    const orderedExperience = [...experience]
        .filter(e => e.startDate)
        .sort((a, b) => {
            const startDiff = new Date(b.startDate!).getTime() - new Date(a.startDate!).getTime();
            if (startDiff !== 0) return startDiff;

            const aEnd = a.endDate ? new Date(a.endDate).getTime() : Date.now();
            const bEnd = b.endDate ? new Date(b.endDate).getTime() : Date.now();
            return bEnd - aEnd;
        });
        
    // ------ EXPERIENCE BY CATEGORY ------ //
    const xpCategorized = {
        work: orderedExperience.filter(e => e.category === 'work'),
        clients: orderedExperience.filter(e => e.category === 'clients'),
        proficiencies: orderedExperience.filter(e => e.category === 'proficiencies'),
    }

    // ------ FILTER BUTTONS ------ //
        // experience filters for buttons
        const [filter, setFilter] = useState<'work' | 'clients' | 'proficiencies'>('work');

        // items shown per selected filter
        const visibleItems = xpCategorized[filter];

    // ------ ACTIVE ITEM ------ //
        const [activeExperience, setActiveExperience] = useState<Experience | null>(visibleItems[0] ?? null);

        // set default active experience
        useEffect(() => {
            setActiveExperience(visibleItems[0] ?? null);
        }, [filter]);

    return (
        <section className='relative'>
            <Grid className=''>
                {/* title and filters */}
                <div className='col-start-1 col-span-3 row-start-1 row-span-1 
                                w-full h-full px-5 py-6
                                flex flex-col justify-between items-end'>
                    {/* title */}
                    <div className='w-full aspect-4/1 relative'>
                        <Image
                            src='/experience.svg'
                            alt='my namestamp'
                            fill
                            className='object-contain object-left pb-2'
                        />
                    </div>

                    {/* filter buttons */}
                    <div className='text-xs | xs:text-sm 
                                    flex flex-row gap-2 w-full h-fit'>
                        {/* work button */}
                        <button 
                            onClick={() => setFilter('work')}
                            className={`flex flex-row gap-2 items-center cursor-pointer
                                        w-fit h-fit rounded-full border
                                        px-6 py-3 | sm:px-7 sm:py-4
                                        transition-colors duration-400
                                        ${filter === 'work' ? 'text-white border-(--black) bg-(--black)' : 'text-(--text-colour) border-(--grey) bg-(--off-white)'}`}
                        >
                            Work
                        </button>

                        {/* clients button */}
                        <button 
                            onClick={() => setFilter('clients')}
                            className={`flex flex-row gap-1 items-center cursor-pointer
                                        w-fit h-fit px-6 py-3 sm:px-7 sm:py-4 rounded-full border
                                        transition-colors duration-400
                                        ${filter === 'clients' ? 'text-white border-(--black) bg-(--black)' : 'text-(--text-colour) border-(--grey) bg-(--off-white)'}`}
                        >
                            Clients
                        </button>

                        {/* proficiencies button */}
                        <button 
                            onClick={() => setFilter('proficiencies')}
                            className={`flex flex-row gap-1 items-center cursor-pointer
                                        w-fit h-fit px-6 py-3 sm:px-7 sm:py-4 rounded-full border
                                        transition-colors duration-400
                                        ${filter === 'proficiencies' ? 'text-white border-(--black) bg-(--black)' : 'text-(--text-colour) border-(--grey) bg-(--off-white)'}`}
                        >
                            Proficiencies
                        </button>
                    </div>
                </div>

                {/* category items */}
                <div className='col-start-1 col-span-2 row-start-2 row-span-1 p-5
                                flex flex-col gap-1'>
                    {visibleItems.map((item, i) => (
                        <div key={item.id} className='w-fit h-fit'>
                            <Reveal delay={i * 0.15}>
                                <button
                                    onClick={() => setActiveExperience(item)}
                                    className={`
                                        flex flex-row gap-1 items-center 
                                        w-fit h-fit text-sm xs:text-base
                                        transition-all duration-300 cursor-pointer
                                        ${activeExperience?.id === item.id
                                            ? 'font-medium text-(--black)'
                                            : 'text-(--light-mode-grey)'}
                                    `}
                                >
                                    <Image 
                                        src={`${activeExperience?.id === item.id
                                            ? '/detail-arrow-black.svg'
                                            : '/detail-arrow-grey.svg'}`}
                                        alt=''
                                        width={16}
                                        height={16}
                                        className='sm:size-5'
                                    />
                                    {item.menuTitle}
                                </button>
                            </Reveal>
                        </div>
                    ))}
                </div>

                {/* active item details */}
                <div className='col-start-1 col-span-3 row-start-3 row-span-4 flex flex-col gap-12 p-5 bottom-0'>
                    {activeExperience && filter !== 'proficiencies' ? (
                        <div className='flex flex-col xs:gap-1'>
                            {/* experience date */}
                            <h3 className='flex flex-row gap-1 text-sm xs:text-base text-(--light-mode-grey)'>
                                {formatDateRange(activeExperience)}
                            </h3>
                            
                            {/* experience title */}
                            <h2 className='text-2xl text-(--black)'>{activeExperience?.position} <b className='font-semibold '>@{activeExperience?.menuTitle}</b></h2>
                        </div>
                    ) : (
                        <></>
                    )}

                    {/* points */}
                    <div
                        key={activeExperience?.id} 
                        className={`bottom-0 flex flex-col w-full sm:w-5/6
                                    ${filter === 'proficiencies' ? 'gap-2' : 'gap-4'}`}>
                        {activeExperience?.points?.map((point, i) => (
                            <Reveal delay={i * 0.2} key={i}>
                                <li className='ml-4 text-sm xs:text-base text-(--black)'>
                                    {point ? renderRichText(point) : null}
                                </li>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Grid>
        </section>
    )
}