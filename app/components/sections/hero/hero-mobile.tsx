'use client';
import Image from 'next/image';

import Grid from '@/app/components/grid';
import { Reveal } from '@/app/components/reveal';


export default function HeroMobile({
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
                                w-full h-full relative'>
                    <Reveal delay={0}>
                        <Image
                            src='/hey.svg'
                            alt='Hey, welcome to my portfolio site!'
                            fill
                            className='p-5 object-contain object-left'
                        />
                    </Reveal>
                </div>

                {/* better on desktop message */}
                <div className='col-start-3 col-span-1 row-start-1 row-span-1 relative'>
                    <Reveal delay={0.25}>
                        <Image 
                            src='/better.svg'
                            alt='better on desktop!'
                            fill
                            className='object-contain object-bottom-right p-4 | xs:p-5 | sm:p-8 | md:px-12'
                        />
                    </Reveal>
                </div>

                {/* name and title */}
                <div className='col-start-1 col-span-3 row-start-2 row-span-1 
                                w-full h-full p-5
                                flex flex-col justify-between items-end'>
                    <div className='w-full aspect-5/2 relative'>
                        <Reveal delay={0.25}>
                            <Image
                                src='/jt-black.svg'
                                alt='my namestamp'
                                fill
                                className='object-contain object-right xs:p-2| sm:px-4'
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
                                justify-between'
                >
                        <div className='w-full h-fit'>
                            <Reveal delay={1}>
                                <h2 className='text-sm font-medium text-right place-self-end
                                                xs:text-base
                                                sm:text-xl sm:w-7/8 sm:leading-[1.3]'
                                >
                                    Focused on crafting digital experiences and turning everyday ideas into art.
                                </h2>
                            </Reveal>
                        </div>

                        <div className='w-full h-fit'>
                            <Reveal delay={1.2}>
                                <h2 className='text-sm font-medium text-right text-(--light-mode-grey)  place-self-end
                                                xs:text-base | sm:text-xl'>
                                    Based in Toronto, CA.
                                </h2>
                            </Reveal>
                        </div>
                </div>
            </Grid>
        </section>
    )
 }