'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Experience } from '@/lib/experienceTypes';

import { SectionReveal } from '@/app/components/section-reveal';
import { Reveal } from '@/app/components/reveal';
import Grid from '@/app/components/grid';

import Cat from '@/app/components/icons/cat-icon';
import { renderRichText } from '@/lib/richText';


export default function Skills({
    className = '',
    skills,
 }: { 
    className?: string; 
    skills: Experience[];
 }) {
        
    // active skill
    const [activeSkill, setActiveSkill] = useState<Experience | null>(null);

    // set default active experience
    useEffect(() => {
        setActiveSkill(skills[0] ?? null);
    }, [skills]);

    return (
        <SectionReveal
            fadeDistance={0}
            fadeStart={0.4}
            fadeEnd={0.7}
        >
            <Grid>
                {/* skill categories menu */}
                <div className='sm:text-xl lg:text-2xl 2xl:text-3xl 
                                col-start-1 col-span-2 row-start-2 row-span-2
                                flex flex-col gap-4 2xl:gap-6
                                p-8 | ultrawide:px-20'
                >
                    {skills.map((item, i) => (
                            <button
                                onClick={() => setActiveSkill(item)}
                                className={`
                                    2xl:gap-4 items-start
                                    pr-8 w-fit text-left text-nowrap
                                    transition-all duration-300 cursor-pointer
                                    ${activeSkill?.id === item.id
                                        ? 'font-semibold text-(--light-black)'
                                        : 'text-(--grey) hover:font-semibold hover:text-[#B7B6BD]'}
                                `}
                            >
                                <Reveal key={item.id} delay={i * 0.15} className='flex flex-row gap-2'>
                                    <Image 
                                        src={
                                            activeSkill?.id === item.id
                                                ? '/detail-arrow-black.svg'
                                                : '/detail-arrow-grey.svg'
                                        }
                                        alt=''
                                        width={28}
                                        height={28}
                                    />

                                    {item.menuTitle}
                                </Reveal>
                            </button>
                    ))}
                </div>

                {/* skill items */}
                <div className='col-start-3 col-span-2 row-start-2 row-span-2 p-8'
                    key={activeSkill?.id}>
                    {activeSkill && (
                        <ul className='flex flex-col gap-2'>
                            {activeSkill.points.map((point, i) => (
                                <Reveal key={`${activeSkill.id}-point-${i}`} delay={0.1 + i * 0.1}>
                                    <li key={i} className='flex gap-2 text-(--text-colour) sm:text-[10px] md:text-sm 2xl:text-base'>
                                        <p className='text-2xl text-(--light-mode-grey)'>*</p>
                                        {point ? renderRichText(point) : null}
                                    </li>
                                </Reveal>
                            ))}
                        </ul>
                    )}
                </div>
                
                {/* message */}
                <div className='col-start-3 col-span-2 row-start-1 self-end p-8 ultrawide:px-20'>
                    <Reveal delay={2.25} className='w-fit h-fit'>
                        <h2 className={`font-semibold place-self-end text-(--text-colour)
                                        sm:text-lg md:text-xl 2xl:text-2xl ultrawide:w-4/5
                                        transition-colors duration-500`}>
                            Constantly experimenting with new tech & design tools as the AI world progresses.
                        </h2>
                    </Reveal>
                </div>

                {/* big title */}
                <div className='col-start-1 col-span-2 row-start-1
                                flex flex-col justify-end
                                p-8 | ultrawide:pr-20'>
                    <div className='w-full h-full relative'>
                        <Reveal delay={0.25}>
                            <Image 
                                src='/skills.svg'
                                alt=''
                                fill
                                className='object-contain object-left bottom-0'
                                draggable={false}
                            />
                        </Reveal>
                    </div>
                </div>

                {/* cat */}
                <div className='col-start-5 row-start-1 self-center place-self-center'>
                    <Reveal delay={3}>
                        <Cat className='text-(--nice-grey)'/>
                    </Reveal>
                </div>
            </Grid>
        </SectionReveal>
    )
}