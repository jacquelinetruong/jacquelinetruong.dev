'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { formatDateRange } from './experience';

import { Experience } from '@/lib/experienceTypes';
import { renderRichText } from '@/lib/richText';

import { SectionReveal } from '@/app/components/section-reveal';
import { Reveal } from '@/app/components/reveal';
import Grid from '@/app/components/grid';

import Cat from '@/app/components/icons/cat-icon';


export default function ExperienceDesktop({
    className = '',
    isLoading,
    experience,
 }: { 
    className?: string; 
    isLoading: boolean;
    experience: Experience[];
 }) {

    // sort experience by date
    const orderedExperience = [...experience]
        .filter(e => e.startDate)
        .sort((a, b) => {
            const startDiff = new Date(b.startDate!).getTime() - new Date(a.startDate!).getTime();
            if (startDiff !== 0) return startDiff;

            const aEnd = a.endDate ? new Date(a.endDate).getTime() : Date.now();
            const bEnd = b.endDate ? new Date(b.endDate).getTime() : Date.now();
            return bEnd - aEnd;
        });
        
    // filter by experience category
    const xpCategorized = {
        work: orderedExperience.filter(e => e.category === 'work'),
        clients: orderedExperience.filter(e => e.category === 'clients'),
        proficiencies: orderedExperience.filter(e => e.category === 'proficiencies'),
    }

    // active experience
    const [activeExperience, setActiveExperience] = useState<Experience | null>(null);

    // set default active experience
    useEffect(() => {
        setActiveExperience(xpCategorized.work[0] ?? null);
    }, []);

    return (
        <SectionReveal
            fadeDistance={0}
            fadeStart={0.4}
            fadeEnd={0.7}
        >
            <Grid>
                {/* experience menu */}
                <div className='sm:text-xs 2xl:text-sm 3xl:text-base
                                col-start-1 col-span-1 row-start-1 row-span-2
                                flex flex-col gap-8
                                p-8 | ultrawide:px-20'
                >
                    {Object.entries(xpCategorized).map(([category, items], i) => (

                        <div key={category} className='flex flex-col gap-0.5'>

                            {/* category heading */}
                            <Reveal key={`${category}-heading`} delay={i * 0.35}>
                                <h4 className={`capitalize transition-all duration-300
                                                ${category === activeExperience?.category ? 'text-(--dark-mode-grey) font-semibold' : 'text-(--alt-text-colour) font-medium'}`}>
                                    {category}
                                </h4>
                            </Reveal>

                            {/* category items */}
                            {items.map((item, j) => (
                                <Reveal key={item.id} delay={i * 0.35 + j * 0.15}>
                                    <button
                                        onClick={() => setActiveExperience(item)}
                                        className={`
                                            flex flex-row gap-1 2xl:gap-2 items-start
                                            w-fit h-fit text-left
                                            transition-all duration-300 cursor-pointer
                                            ${activeExperience?.id === item.id
                                                ? 'font-semibold'
                                                : 'text-(--alt-text-colour) hover:font-semibold hover:text-(--dark-mode-grey)'}
                                        `}
                                    >
                                        <Image 
                                            src={`${activeExperience?.id === item.id
                                                ? '/detail-arrow-black.svg'
                                                : '/detail-arrow-grey.svg'}`}
                                            alt='arrow'
                                            width={16}
                                            height={16}
                                        />
                                        {item.menuTitle}
                                    </button>
                                </Reveal>
                            ))}
                        </div>
                    ))}
                </div>

                {/* experience details */}
                <div className='col-start-2 col-span-2 row-start-1 row-span-2
                                flex flex-col gap-8 bg-(--bg-colour)/50
                                p-8 | ultrawide:p-12
                                border border-r-0 border-b-0 border-l-(--grid-line-colour) border-t-(--grid-line-colour)'>
                    {/* header */}
                    {activeExperience && activeExperience.category !== 'proficiencies' ? (
                        <>
                            {/* work and client experience */}
                            <div className='flex flex-col gap-2'>
                                {/* position title */}
                                <Reveal delay={0.1}>
                                    <h2 className='font-semibold text-nowrap sm:text-lg md:text-xl xl:text-2xl'>
                                        {activeExperience.position} @ {activeExperience.menuTitle}     {/* future: link to company site */}
                                    </h2>
                                </Reveal>

                                {/* date range */}
                                <Reveal delay={0.1}>
                                    <h3 className='font-medium text-(--alt-text-colour) sm:text-md
                                                flex flex-row gap-2'>
                                        <Image 
                                            src='/detail-arrow-grey.svg'
                                            alt='arrow'
                                            width={24}
                                            height={24}
                                        />
                                        {formatDateRange(activeExperience)}
                                    </h3>
                                </Reveal>
                            </div>

                            {/* experience description */}
                            <div
                                key={activeExperience?.id} 
                                className='flex flex-col gap-4'>
                                {activeExperience?.points?.map((point, i) => (
                                    <Reveal key={`${activeExperience.id}-point-${i}`} delay={0.2 + i * 0.2}>
                                        <li className='ml-6 sm:text-[10px] md:text-sm 2xl:text-base 3xl:text-lg 3xl:w-4/5'>
                                            {point ? renderRichText(point) : null}
                                        </li>
                                    </Reveal>
                                ))} 
                            </div>
                        </>
                    ):(
                        <>
                            {/* proficiencies */}
                            <div className='flex flex-col gap-2'>
                                {/* proficiency type */}
                                <Reveal delay={0.1}>
                                    <h2 className='font-semibold text-nowrap sm:text-lg md:text-xl xl:text-2xl'>
                                        {activeExperience?.menuTitle}
                                    </h2>
                                </Reveal>
                            </div>

                            {/* list proficiencies */}
                            <div 
                                key={activeExperience?.id} 
                                className='flex flex-col gap-2'>
                                {activeExperience?.points?.map((point, i) => (
                                    <Reveal key={`${activeExperience.id}-point-${i}`} delay={i * 0.1} >
                                        <li className='ml-6 sm:text-[10px] md:text-sm 2xl:text-base'>
                                            {point ? renderRichText(point) : null}
                                        </li>
                                    </Reveal>
                                ))} 
                            </div>
                        </>
                    )}
                </div>

                {/* big title */}
                <div className='col-start-3 col-span-3 row-start-3 row-span-1
                                flex flex-col justify-end
                                p-8 | ultrawide:pr-20'>
                    <div className='w-full h-full relative'>
                        <Reveal delay={0.25}>
                            <Image 
                                src='/experience.svg'
                                alt='experience'
                                fill
                                className='object-contain object-right bottom-0'
                                draggable={false}
                            />
                        </Reveal>
                    </div>
                </div>

                {/* cat */}
                <div className='col-start-1 row-start-3 self-center place-self-center'>
                    <Reveal delay={1.6}>
                        <Cat className='text-(--nice-grey)'/>
                    </Reveal>
                </div>
            </Grid>
        </SectionReveal>
    )
}