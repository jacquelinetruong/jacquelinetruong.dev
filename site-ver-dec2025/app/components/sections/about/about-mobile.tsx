'use client';

import Image from 'next/image';

import type { Experience } from '@/lib/experienceTypes';

import Grid from '@/app/components/grid';
import Coffee from '../../icons/coffee';
import LinkArrow from '../../icons/link-arrow';
import '@/public/me.jpg';


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
        <section className='relative font-inter'>
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
                            className='object-cover object-top scale-120'
                        />
                    </div>
                </div>

                {/* text content */}
                <div className='col-start-1 col-span-3 row-start-2 row-span-3
                                flex flex-col gap- px-4 pt-12 gap-12'>
                    <div className='flex flex-col gap-6'>
                        {/* header */}
                        <h2 className='text-lg leading-[1.3] font-medium'>
                            I'm a newgrad designer who loves bringing ideas to life through clean, functional, and high-impact products.
                        </h2>

                        {/* description */}
                        <h3 className='text-sm w-4/5'>
                            My passion for design, code, and interaction bridge the gap towards intuitive experiences, scalable UI, and shipping things that make a real difference.
                        </h3>
                    </div>

                    <div className='flex flex-col gap-6'>
                        {/* current work */}
                        <div className='flex flex-col'>
                            <h4 className='text-sm text-(--light-mode-grey) font-medium'>Currently</h4>

                            {/* if jobless :heartbreak: */}
                            {currentWork.length === 0 && (
                                <p className='text-sm'>Open to new opportunities</p>
                            )}

                            {currentWork.map((role, i) => (
                                <p className='text-sm font-medium
                                            flex flex-row gap-1 items-center'>     
                                    <Image
                                        src='/detail-arrow-black.svg'
                                        alt='arrow'
                                        width={16}
                                        height={16}
                                        draggable={false}
                                    />
                                    {role.position} @ {role.menuTitle}
                                    {i < currentWork.length - 1 && ','}
                                </p>
                            ))}
                        </div>

                        {/* education */}
                        <div className='flex flex-col'>
                            <h4 className='text-sm text-(--light-mode-grey) font-medium'>Education</h4>

                            <p className='text-sm font-medium
                                            flex flex-row gap-1 items-start'>     
                                <Image
                                    src='/detail-arrow-black.svg'
                                    alt='arrow'
                                    width={16}
                                    height={16}
                                    draggable={false}
                                />
                                BSc Computer Science @ Wilfrid Laurier University, '25
                            </p>
                        </div>
                    </div>

                    <a 
                        target='_blank'
                        href='mailto:hello@jacquelinetruong.dev'
                        className='flex flex-row gap-2 items-center place-self-end
                                    w-fit h-fit px-5 py-4 rounded-full
                                    bg-(--black) text-white text-xs'
                    >
                        <Coffee className='size-[20px]'/>
                        Get in touch
                    </a>
                </div>
            </Grid>
        </section>
    )
}