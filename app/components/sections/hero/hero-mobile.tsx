'use client';
import Image from 'next/image';

import Grid from '@/app/components/grid';
import { Reveal } from '@/app/components/reveal';

import Coffee from '@/app/components/icons/coffee';


export default function HeroDesktop({
    className = '',
    isLoading,
 }: { 
    className?: string; 
    isLoading: boolean;
 }) {
    return (
        <section className='relative'>
            <Grid>
                {/* hey! */}
                <div className='col-start-1 col-span-2 row-start-1 row-span-1 
                                w-full h-full relative flex justify-end'>
                    <Reveal delay={2}>
                        <Image
                            src='/hey.svg'
                            alt='Hey, welcome to my portfolio site!'
                            fill
                            className='p-5'
                        />
                    </Reveal>
                </div>

                {/* better on desktop message */}
                <div className='col-start-3 col-span-1 row-start-1 row-span-1 relative'>
                    <Image 
                        src='/better.svg'
                        alt='better on desktop!'
                        fill
                        className='object-contain object-bottom-right p-4 | xs:p-5 | sm:p-8 | md:px-12'
                    />
                </div>

                {/* name and title */}
                <div className='col-start-1 col-span-3 row-start-2 row-span-1 
                                w-full h-full p-5
                                flex flex-col justify-between items-end'>
                    <div className='w-full h-full relative'>
                        <Reveal delay={0.1}>
                            <Image
                                src='/jt-black.svg'
                                alt='my namestamp'
                                fill
                                className='object-contain object-right xs:py-2 | sm:py-4'
                            />
                        </Reveal>
                    </div>
                    <div className='w-full h-fit'>
                        <Reveal delay={0.1}>
                            <h2 className='text-right text-lg | sm:text-2xl'>Designer & Developer</h2>
                        </Reveal>
                    </div>
                </div>

                {/* text, cta */}
                <div className='col-start-1 col-span-3 row-start-3 row-span-1
                                flex flex-col items-end p-5
                                gap-2 | sm:gap-6'
                >
                        <div className='w-full h-fit'>
                            <Reveal delay={0.6}>
                                <h2 className='text-sm font-medium text-right place-self-end
                                                xs:text-base
                                                sm:text-xl sm:w-7/8 sm:leading-[1.3]'
                                >
                                    Focused on crafting digital experiences and turning everyday ideas into art.
                                </h2>
                            </Reveal>
                        </div>

                        <div className='w-full h-fit'>
                            <Reveal delay={0.7}>
                                <h2 className='text-sm font-medium text-right text-(--light-mode-grey)  place-self-end
                                                xs:text-base | sm:text-xl'>
                                    Based in Toronto, CA.
                                </h2>
                            </Reveal>
                        </div>

                        <div className='w-full h-fit'>
                            <Reveal delay={1}>
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
                </div>
            </Grid>
        </section>
    )
 }