'use client';

import Image from 'next/image';

import type { Experience } from '@/lib/experienceTypes';

import { Reveal } from '@/app/components/reveal';
import Grid from '@/app/components/grid';
import Coffee from '@/app/components/icons/coffee';


export default function AboutMobile({
    className = '',
    isLoading,
    currentWork,
}: {
    className?: string;
    isLoading: boolean;
    currentWork: Experience[];
}) {

    return (
        <section className='relative'>
            <Grid>
                {/* header */}
                <div className='col-start-1 col-span-3 row-start-1 row-span-1 px-5 py-6 place-self-end'>
                    <Reveal delay={0.2}>
                        <h1 className='w-full text-2xl font-medium leading-[1.3]'
                        >
                            Bringing ideas to life through clean, functional, high-impact products.
                        </h1>
                    </Reveal>
                </div>

                <div className='flex flex-col gap-6 w-full h-fit col-start-1 col-span-3 row-start-2 row-span-1 px-5 py-6'>
                    {/* description */}
                    <Reveal delay={0.3}>
                        <p className='text-sm'>
                            My passion for design, code, and interaction bridge the gap towards intuitive experiences, scalable UI, and shipping things that make a real difference.
                        </p>
                    </Reveal>

                    <Reveal delay={0.4}>
                        {/* current work */}
                        <div className='flex flex-col'>
                            <p className='text-xs text-(--light-mode-grey) font-medium mb-1'>CURRENTLY</p>

                            {/* if jobless :heartbreak: */}
                            {currentWork.length === 0 && (
                                <p className='text-sm xs:text-base font-medium
                                            flex flex-row gap-1 items-center'>
                                    Open to new opportunities
                                </p>
                            )}

                            {currentWork.map((role, i) => (
                                <p className='text-sm xs:text-base font-medium
                                            flex flex-row items-center'>     
                                    Designing @ {role.menuTitle}
                                </p>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal delay={0.5}>
                        {/* education */}
                        <div className='flex flex-col'>
                            <p className='text-xs text-(--light-mode-grey) font-medium mb-1'>EDUCATION</p>

                            <p className='text-sm xs:text-base font-medium
                                            flex flex-row gap-1 items-start'>     
                                BSc Computer Science @ Wilfrid Laurier University, '25
                            </p>
                        </div>
                    </Reveal>
                </div>

                {/* me */}
                <div className='relative col-start-1 col-span-3 row-start-3 row-span-2 h-(--two-cell-height) translate-y-(--half-cell-height)'>
                    <Image 
                        src='/me.jpg'
                        alt='Picture of me.'
                        fill
                        className='object-cover object-center pointer-events-none'
                        draggable={false}
                    />
                </div>
            </Grid>
        </section>
    )
}