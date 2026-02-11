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
                {/* me */}
                <div className='col-start-1 col-span-3 row-start-1 row-span-2 -translate-y-(--cell-height)
                                w-full h-full
                                flex flex-col justify-between items-end'>
                    <div className='w-full h-full relative overflow-hidden'>
                        <Image
                            src='/me.jpg'
                            alt='me'
                            fill
                            className='object-cover object-top sm:object-[25%_30%] sm:object-fit scale-120 sm:scale-100'
                        />
                    </div>
                </div>

                {/* text content */}
                <div className='col-start-1 col-span-3 row-start-2 row-span-3
                                flex flex-col gap- px-4 pt-12 gap-12'>
                    <div className='flex flex-col gap-6'>
                        {/* header */}
                        <Reveal delay={0.2}>
                            <h2 className='w-full text-lg font-medium leading-[1.3] 
                                            xs:text-xl 
                                            sm:text-2xl sm:w-5/6'
                            >
                                I'm a designer who loves bringing ideas to life through clean, functional, and high-impact products.
                            </h2>
                        </Reveal>

                        {/* description */}
                        <Reveal delay={0.3}>
                            <h3 className='text-sm w-4/5 | xs:text-base | sm:text-base sm:w-4/6'>
                                My passion for design, code, and interaction bridge the gap towards intuitive experiences, scalable UI, and shipping things that make a real difference.
                            </h3>
                        </Reveal>
                    </div>

                    <div className='flex flex-col gap-6 w-full h-fit'>
                        <Reveal delay={0.4}>
                            {/* current work */}
                            <div className='flex flex-col'>
                                <h4 className='text-sm xs:text-base text-(--light-mode-grey) font-medium'>Currently</h4>

                                {/* if jobless :heartbreak: */}
                                {currentWork.length === 0 && (
                                    <p className='text-sm xs:text-base font-medium
                                                flex flex-row gap-1 items-center'>
                                        <Image
                                            src='/detail-arrow-black.svg'
                                            alt='arrow'
                                            width={16}
                                            height={16}
                                            draggable={false}
                                            className={`sm:size-5`}
                                        />
                                        Open to new opportunities
                                    </p>
                                )}

                                {currentWork.map((role, i) => (
                                    <p className='text-sm xs:text-base font-medium
                                                flex flex-row gap-1 items-center'>     
                                        <Image
                                            src='/detail-arrow-black.svg'
                                            alt='arrow'
                                            width={16}
                                            height={16}
                                            draggable={false}
                                            className={`sm:size-5`}
                                        />
                                        {role.position} @ {role.menuTitle}
                                        {i < currentWork.length - 1 && ','}
                                    </p>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal delay={0.5}>
                            {/* education */}
                            <div className='flex flex-col'>
                                <h4 className='text-sm xs:text-base text-(--light-mode-grey) font-medium'>Education</h4>

                                <p className='text-sm xs:text-base font-medium
                                                flex flex-row gap-1 items-start'>     
                                    <Image
                                        src='/detail-arrow-black.svg'
                                        alt='arrow'
                                        width={16}
                                        height={16}
                                        draggable={false}
                                        className={`sm:size-5`}
                                    />
                                    BSc Computer Science @ Wilfrid Laurier University, '25
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={0.6}>
                        <a 
                            target='_blank'
                            href='mailto:hello@jacquelinetruong.dev'
                            className='flex flex-row gap-2 items-center place-self-end
                                        w-fit h-fit bg-(--black) rounded-full
                                        px-5 py-4 | sm:px-6 sm:py-5 | 
                                        text-white text-xs | xs:text-sm | sm:text-base'
                        >
                            <Coffee className='size-[20px] sm:size-[24px]'/>
                            Get in touch
                        </a>
                    </Reveal>
                </div>
            </Grid>
        </section>
    )
}