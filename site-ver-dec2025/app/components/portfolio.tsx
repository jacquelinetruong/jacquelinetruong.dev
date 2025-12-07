'use client';

import Grid from './grid';
import Image from 'next/image';

import '../../public/portfolio.svg';
import '../../public/palette-icon.svg';
import '../../public/palette-icon-grey.svg';
import '../../public/code-icon.svg';
import '../../public/code-icon-grey.svg';
import '../../public/link-arrow-white.svg';
import '../../public/link-arrow-black.svg';
import '../../public/guide-arrow-white.svg';


export default function Portfolio({ className = '' }: { className?: string }) {
    return (
        <Grid className={className}>
            {/* big featured project */}
                {/* preview */}
                <div className='font-inter
                                col-start-1 col-span-2 row-start-1 row-span-2
                                border-2 border-[#FF0000] bg-[#1B1C1D]'>
                    {/* add later: project component */}
                </div>
                {/* description */}
                <div className='font-inter
                                col-start-1 col-span-2 row-start-3 row-span-1
                                flex flex-col gap-6 p-8
                                bg-[#1B1C1D]'>
                    <p className='font-semibold text-3xl text-white'>Concise title blurb of what this portfolio item is.</p>
                    <p className='text-xl text-white'>
                        Longer blurb or quick description of the project purpose or intent behind project. Maybe 2-3 
                        sentences is good, or actually at least more so in terms of line count.
                    </p>
                    <a className='font-medium text-xl text-[#1B1C1D]
                                  flex flex-row gap-2 items-center
                                  w-fit h-fit px-5 py-3 rounded-full
                                  bg-white'
                        target='_blank'
                        href='mailto:hello@jacquelinetruong.dev'
                    >    
                        Learn More
                        <Image
                            src='/link-arrow-black.svg'
                            alt='arrow'
                            width={28}
                            height={28}
                        />
                    </a>
                </div>
            
            {/* filters, title */}
            <div className='font-inter
                            col-start-4 col-span-2 row-start-1 row-span-1
                            flex flex-col items-end justify-between p-8
                            bg-[#1B1C1D]'>

                {/* filter buttons */}
                <div className='flex flex-row gap-4'>
                    <a className='font-medium text-xl text-white
                                flex flex-row gap-2 items-center
                                w-fit h-fit px-5 py-3 rounded-full
                                border-1'
                        href=''
                    >
                        <Image 
                            src='/palette-icon.svg'
                            alt='palette icon'
                            width={32}
                            height={32}
                        />
                        UX/UI Designer Focus
                    </a>
                    <a className='font-medium text-xl text-[#666666]
                                flex flex-row gap-2 items-center
                                w-fit h-fit px-5 py-3 rounded-full
                                border-1'
                        href=''
                    >
                        <Image 
                            src='/code-icon-grey.svg'
                            alt='code icon'
                            width={32}
                            height={32}
                        />
                        Programmer Focus
                    </a>
                </div>

                {/* title */}
                <Image 
                    src='/portfolio.svg'
                    alt='portfolio title'
                    width={632}
                    height={216}
                    className='size-full bottom-0'
                />
            </div>

            {/* other project displays */}
            <div className='col-start-5 col-span-1 row-start-2 row-span-1
                            border-2 border-[#FF0000] bg-[#1B1C1D]'>
                {/* add later: project component */}
            </div>
            <div className='col-start-4 col-span-1 row-start-3 row-span-1
                            border-2 border-[#FF0000] bg-[#1B1C1D]'>
                {/* add later: project component */}
            </div>
            <div className='col-start-5 col-span-1 row-start-3 row-span-1
                            border-2 border-[#FF0000] bg-[#1B1C1D]'>
                {/* add later: project component */}
            </div>
            
            {/* jump to experience button */}
            <div className='col-start-3 col-span-1 row-start-3 row-span-1
                            flex flex-col justify-end items-center
                            bg-[#1B1C1D]'>
                <a className='font-inter font-medium text-white
                              flex flex-col items-center gap-2
                              p-8'
                    href='#about'			  
                >
                    My Experience
                    <Image
                        src='/guide-arrow-white.svg'
                        alt='arrow pointing down'
                        width={28}
                        height={28}
                    />
                </a>
            </div>

            {/* colour in bg lol */}
            <div className='col-start-3 col-span-1 row-start-1 row-span-1 bg-[#1B1C1D]'></div>
            <div className='col-start-3 col-span-1 row-start-2 row-span-1 bg-[#1B1C1D]'></div>
            <div className='col-start-4 col-span-1 row-start-2 row-span-1 bg-[#1B1C1D]'></div>
        </Grid>
    )
}