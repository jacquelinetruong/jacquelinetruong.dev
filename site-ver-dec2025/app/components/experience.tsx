'use client';

import Image from 'next/image';
import Grid from './grid';

import '../../public/detail-arrow-black.svg';
import '../../public/detail-arrow-grey.svg';
import '../../public/experience.svg';

export default function Experience({ className = '' }: { className?: string }) {
    return (
        <Grid className={className}>
            {/* experience menu */}
            <div className='font-inter
                            col-start-1 col-span-1 row-start-2 row-span-2
                            flex flex-col gap-8
                            p-8'>
                {/* employment */}
                <div className='flex flex-col gap-1'>
                    <p className='font-medium text-xl text-[#888888]'>Work</p>
                    <a className='font-semibold text-xl
                                  flex flex-row gap-2 items-center
                                  w-fit h-fit'
                        href=''>
                        <Image 
                            src='/detail-arrow-black.svg'
                            alt='arrow'
                            width={24}
                            height={24}
                        />
                        MobCoder
                    </a>
                    <a className='font-semibold text-xl text-[#888888]
                                  flex flex-row gap-2 items-center
                                  w-fit h-fit'
                        href=''>
                        <Image 
                            src='/detail-arrow-grey.svg'
                            alt='arrow'
                            width={24}
                            height={24}
                        />
                        Konfer
                    </a>
                    <a className='font-semibold text-xl text-[#888888]
                                  flex flex-row gap-2 items-center
                                  w-fit h-fit'
                        href=''>
                        <Image 
                            src='/detail-arrow-grey.svg'
                            alt='arrow'
                            width={24}
                            height={24}
                        />
                        Civiconnect
                    </a>
                </div>

                {/* client work */}
                <div className='flex flex-col gap-1'>
                    <p className='font-medium text-xl text-[#888888]'>Work</p>
                    <a className='font-semibold text-xl text-[#888888]
                                  flex flex-row gap-2 items-center
                                  w-fit h-fit'
                        href=''>
                        <Image 
                            src='/detail-arrow-grey.svg'
                            alt='arrow'
                            width={24}
                            height={24}
                        />
                        Serotte Law
                    </a>
                    <a className='font-semibold text-xl text-[#888888]
                                  flex flex-row gap-2 items-center
                                  w-fit h-fit'
                        href=''>
                        <Image 
                            src='/detail-arrow-grey.svg'
                            alt='arrow'
                            width={24}
                            height={24}
                        />
                        HawkHacks
                    </a>
                    <a className='font-semibold text-xl text-[#888888]
                                  flex flex-row gap-2 items-center
                                  w-fit h-fit'
                        href=''>
                        <Image 
                            src='/detail-arrow-grey.svg'
                            alt='arrow'
                            width={24}
                            height={24}
                        />
                        Laurier Computing Society
                    </a>
                </div>

                {/* proficiencies */}
                <div className='flex flex-col gap-1'>
                    <p className='font-medium text-xl text-[#888888]'>Proficiencies</p>
                    <a className='font-semibold text-xl text-[#888888]
                                  flex flex-row gap-2 items-center
                                  w-fit h-fit'
                        href=''>
                        <Image 
                            src='/detail-arrow-grey.svg'
                            alt='arrow'
                            width={24}
                            height={24}
                        />
                        Technologies/Languages
                    </a>
                    <a className='font-semibold text-xl text-[#888888]
                                  flex flex-row gap-2 items-center
                                  w-fit h-fit'
                        href=''>
                        <Image 
                            src='/detail-arrow-grey.svg'
                            alt='arrow'
                            width={24}
                            height={24}
                        />
                        Frameworks
                    </a>
                    <a className='font-semibold text-xl text-[#888888]
                                  flex flex-row gap-2 items-center
                                  w-fit h-fit'
                        href=''>
                        <Image 
                            src='/detail-arrow-grey.svg'
                            alt='arrow'
                            width={24}
                            height={24}
                        />
                        Software
                    </a>
                </div>
            </div>

            {/* experience details */}
            <div className='font-inter
                            col-start-2 col-span-2 row-start-2 row-span-2
                            flex flex-col gap-6
                            p-8'>
                
                {/* title, duration */}
                <div>
                    <p className='font-semibold text-3xl'>UX/UI Designer @ MobCoder</p>
                    <p className='font-medium text-xl text-[#888888]
                                flex flex-row gap-2'>
                        <Image 
                            src='/detail-arrow-grey.svg'
                            alt='arrow'
                            width={24}
                            height={24}
                        />
                        June 2025 - Present
                    </p>
                </div>

                {/* description */}
                <li className='text-xl'>
                    Sample point of this job. I'm a newgrad designer who loves bringing ideas to life through clean, functional, high-impact products. 
                    Since I also code, I'm drawn to designs that aren't just beautiful, but realistic, buildable, and considerate of engineering workflows.
                </li>
                <li className='text-xl'>
                    Sample point of this job. I'm a newgrad designer who loves bringing ideas to life through clean, functional, high-impact products. 
                    Since I also code, I'm drawn to designs that aren't just beautiful, but realistic, buildable, and considerate of engineering workflows.
                </li>
                <li className='text-xl'>
                    Sample point of this job. I'm a newgrad designer who loves bringing ideas to life through clean, functional, high-impact products. 
                    Since I also code, I'm drawn to designs that aren't just beautiful, but realistic, buildable, and considerate of engineering workflows.
                </li>
            </div>

            {/* relevant projects */}
            <div className='font-inter
                            col-start-5 col-span-1 row-start-2 row-span-1
                            border-2 border-[#FF0000]'>
                {/* add later: project component */}
            </div>
            <div className='font-inter
                            col-start-4 col-span-1 row-start-3 row-span-1
                            border-2 border-[#FF0000]'>
                {/* add later: project component */}
            </div>
            <div className='font-inter
                            col-start-2 col-span-1 row-start-4 row-span-1
                            border-2 border-[#FF0000]'>
                {/* add later: project component */}
            </div>

            {/* big title */}
            <div className='col-start-3 col-span-3 row-start-4 row-span-1
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