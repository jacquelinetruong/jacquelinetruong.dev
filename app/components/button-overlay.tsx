// button overlay for mobile
'use client';

import React, { useEffect, useState } from 'react';

import { useActiveSection } from './active-section';
import { Reveal } from './reveal';
import Coffee from './icons/coffee';
import RightArrow from './icons/right-arrow';

export default function ButtonOverlay({ className = '' }: { className?: string }) {
    const activeSection = useActiveSection();
    const isFooter = activeSection === 'contact';
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (isFooter) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [isFooter]);
    
    return (
        <div className={`fixed bottom-0 right-0 w-screen z-10 px-5 pb-16 flex gap-2
                        transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            
                <Reveal delay={1.4}>
                    <a 
                        target='_blank'
                        href='mailto:hello@jacquelinetruong.dev'
                        className='flex flex-row gap-2 justify-center items-center place-self-center
                                    w-full h-fit bg-(--nice-grey) rounded-full
                                    px-6 py-4 | sm:px-7 sm:py-6 | 
                                    text-(--dark-black) font-medium text-xs | xs:text-sm | sm:text-base'
                    >
                        <Coffee className='size-[16px] sm:size-[24px]'/>
                        Get in touch
                    </a>
                </Reveal>

                {/* don't show on work page */}
                {activeSection !== 'work' && activeSection !== 'archive' ? (
                    <Reveal delay={1.6}>
                        <a 
                            href='/work'
                            className='flex flex-row gap-2 justify-center items-center place-self-center
                                        w-full h-fit bg-(--dark-black) rounded-full
                                        px-6 py-4 | sm:px-7 sm:py-6 | 
                                        text-white text-xs | xs:text-sm | sm:text-base'
                        >
                            View works
                            <RightArrow className='size-[16px] sm:size-[24px]'/>
                        </a>
                    </Reveal>
                ) : (
                    <></>
                )}
            
        </div>
	);
}