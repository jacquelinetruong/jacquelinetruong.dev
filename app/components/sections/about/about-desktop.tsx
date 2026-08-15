'use client';

import Image from 'next/image';

import { Experience } from '@/lib/experienceTypes';

import Grid from '@/app/components/grid';
import Cat from '../../icons/cat-icon';
import { SectionReveal } from '@/app/components/section-reveal';
import { Reveal } from '@/app/components/reveal';
import Card from '../../link-card';


export default function AboutDesktop({
    className = '',
    isLoading,
    currentWork,
 }: { 
    className?: string; 
    isLoading: boolean;
    currentWork: Experience[];
 }) {

    const smiley = ':)';

    return (
        <SectionReveal
            fadeDistance={0}
            fadeStart={0.4}
            fadeEnd={0.7}
        >
            <Grid>
                {/* pic of me! */}
                <div className='col-start-1 col-span-2 row-start-1 row-span-3 w-full h-full relative'>
                    <Reveal delay={0.25}>
                        <Image 
                            src='/me.jpg'
                            alt='pic of me'
                            fill
                            className='object-cover object-center pointer-events-none'
                            draggable={false}
                        />
                    </Reveal>
                </div>

                {/* big text */}
                <div className='col-start-3 col-span-2 row-start-1 row-span-1 p-8 | ultrawide:p-12'>
                    <Reveal delay={0.65} className='flex flex-col justify-end'>
                        <h1 className='font-medium text-4xl max-w-5/6'>
                            Bringing ideas to life through clean, functional, high-impact products.
                        </h1>
                    </Reveal>
                </div>

                {/* body text */}
                <div className='col-start-3 col-span-2 row-start-2 row-span-1 p-8 | ultrawide:p-12'>

                    <div className='flex flex-col gap-6'>
                        <Reveal delay={0.8}>
                            <p className='w-full sm:text-[10px] md:text-sm 2xl:text-base 3xl:text-lg 3xl:w-4/5 h-fit'>
                                With a background in software development, I’m drawn to creating designs that are not only visually compelling, 
                                but realistic to build and maintain. By speaking both “design” and “dev” languages, 
                                I bridge the gap towards intuitive interactions, scalable UI, and shipping impactful products.
                            </p>
                        </Reveal>

                        <Reveal delay={1.05}>
                            <p className='sm:text-[10px] md:text-sm 2xl:text-base 2xl:w-9/10 3xl:text-lg 3xl:w-4/5 
                                            w-full 3xl:w-4/5 h-fit'>
                                When I'm not designing or coding, I'm probably making my third iced coffee of the day, or playing video games!
                            </p>
                        </Reveal>
                    </div>
                </div>

                {/* quick info */}
                <div className='col-start-3 col-span-2 row-start-3 row-span-1 flex flex-col justify-end gap-4 p-8 | ultrawide:p-12'>
                    {/* current work */}
                    <div className='flex flex-col gap-0.5'>
                        <Reveal delay={1.4}>
                            <h4 className='font-medium text-(--alt-text-colour) sm:text-xs md:text-sm 2xl:text-base 3xl:text-lg'>Currently</h4>
                        </Reveal>
                        
                        {/* if jobless :heartbreak: */}
                        {currentWork.length === 0 && ( 
                            <Reveal delay={1.5} className='flex flex-row gap-2 items-center'>
                                <Image
                                    src='/detail-arrow-black.svg'
                                    alt='arrow'
                                    width={20}
                                    height={20}
                                    draggable={false}
                                />
                                <p className='font-semibold sm:text-xs md:text-sm 2xl:text-base 3xl:text-lg'>Open to new opportunities {`${smiley}`}</p>
                            </Reveal>
                        )}

                        {currentWork.map((role, i) => (
                            <Reveal delay={(i + 2) * 0.75} key={role.id}>
                                <p className='font-semibold sm:text-xs md:text-sm 2xl:text-base 3xl:text-lg
                                            flex flex-row gap-2 items-center'>     
                                    <Image
                                        src='/detail-arrow-black.svg'
                                        alt='arrow'
                                        width={20}
                                        height={20}
                                        draggable={false}
                                    />
                                    {role.position} @ {role.menuTitle}
                                    {i < currentWork.length - 1 && ','}
                                </p>
                            </Reveal>
                        ))}
                    </div>

                    {/* education */}
                    <div className='flex flex-col gap-0.5'>
                        <Reveal delay={(currentWork.length + 1)}>
                            <h4 className='font-medium sm:text-xs md:text-sm 2xl:text-base 3xl:text-lg text-(--alt-text-colour)'>Education</h4>
                        </Reveal>

                        <Reveal delay={(currentWork.length + 1.25)}>
                        <p className='font-semibold sm:text-xs md:text-sm 2xl:text-base 3xl:text-lg
                                        flex flex-row gap-2 items-start'>
                            <Image 
                                src='/detail-arrow-black.svg'
                                alt='arrow'
                                width={20}
                                height={20}
                                draggable={false}
                            />
                            BSc Computer Science @ Wilfrid Laurier University
                        </p>
                        </Reveal>
                    </div>
                </div>

                {/* cat */}
                <div className='col-start-5 row-start-1 self-center place-self-center'>
                    <Reveal delay={2.25}>
                        <Cat className='text-(--nice-grey)'/>
                    </Reveal>
                </div>

                {/* card link to extras page */}
                <div className='col-start-5 row-start-3'>
                    <Reveal delay={2.75}>
                        <Card
                            coverImage='/summer-person.webp'
                            altText='More me, offline'
                            hrefId='extras'
                        />
                    </Reveal>
                </div>
                
            </Grid>
        </SectionReveal>
    )
}