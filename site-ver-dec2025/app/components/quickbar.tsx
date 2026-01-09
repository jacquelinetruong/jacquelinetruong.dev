'use client';

import { Reveal } from './reveal';
import { useActiveSection } from './active-section';

import Coffee from './icons/coffee';
import TopArrow from './icons/top-arrow';

import '../../public/jt-logo-black.svg';
import '../../public/jt-logo-white.svg';


export default function Quickbar({ isLoading }: { isLoading: boolean }) {

    const activeSection = useActiveSection();

    return (
        <div className='fixed bottom-0 right-0 z-1000 pointer-events-auto
                        w-fit h-fit m-4 2xl:m-6 z-1000
                        flex flex-row gap-1'>
            {/* coffee chat button */}
            <Reveal delay={1.25} className={`${activeSection === 'home' || activeSection === 'about' ? 'hidden' : ''}`}>
                <a href='mailto:hello@jacquelinetruong.dev'
                    target='_blank'
                    className='flex flex-row gap-1 items-center justify-center group 
                                    px-2 py-2 rounded-full
                                    bg-black/80 border border-(--dark-grey) 
                                    shadow-lg backdrop-blur-sm
                                    transition-all duration-200 hover:bg-(--black)/80 hover:border-(--dark-grey)'
                >
                    <Coffee className='size-[20px] text-(--grey) group-hover:text-(--white) transition-colors duration-200
                                        2xl:size-[24px]'/>

                    {/* tooltip */}
                    <span className='absolute -translate-y-10 -translate-x-1
                                w-fit h-fit px-3 py-2 rounded-xl 
                                bg-black/80 border border-(--dark-grey) shadow-lg backdrop-blur-sm
                                opacity-0 group-hover:opacity-100 group-hover:bg-(--black)/80
                                transition-all duration-200'>
                        <p className='font-inter font-medium text-xs text-white whitespace-nowrap'>Grab Coffee</p>
                    </span>
                </a>
            </Reveal>

            {/* jump back to top button */}
            <Reveal delay={1.25} className={`${activeSection === 'home' && 'hidden'}`}>
                <a href='#home'
                    className='flex flex-row gap-1 items-center justify-center group 
                                    px-2 py-2 rounded-full
                                    bg-black/80 border border-(--dark-grey) 
                                    shadow-lg backdrop-blur-sm
                                    transition-all duration-200 hover:bg-(--black)/80 hover:border-(--dark-grey)'
                >
                    <TopArrow className='size-[20px] text-(--grey) group-hover:text-white transition-colors duration-200
                                            2xl:size-[24px]'/>

                    {/* tooltip */}
                    <span className='absolute -translate-y-10 -translate-x-1
                                w-fit h-fit px-3 py-2 rounded-xl 
                                bg-black/90 border border-(--dark-grey) shadow-lg backdrop-blur-sm
                                opacity-0 group-hover:opacity-100 group-hover:bg-(--dark-black)/90 group-hover:backdrop-blur-md
                                transition-all duration-200'>
                        <p className='font-inter font-medium text-xs text-white whitespace-nowrap'>Back to top</p>
                    </span>
                </a>
            </Reveal>
        </div>
    );
}