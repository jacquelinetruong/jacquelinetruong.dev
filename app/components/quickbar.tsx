'use client';

import { useEffect, useState } from 'react';
import { Reveal } from './reveal';
import { useActiveSection } from './active-section';

import Coffee from './icons/coffee';
import TopArrow from './icons/top-arrow';


export default function Quickbar({ 
    isLoading,
    isProjectPage = false,
}: { 
    isLoading: boolean;
    isProjectPage?: boolean; 
}) {

    const activeSection = useActiveSection();

    // dock before footer
    function useFooterDock(offset = 0) {
        const [dockY, setDockY] = useState(0);

        useEffect(() => {
            const footer = document.getElementById('contact');
            if (!footer) return;

            const onScroll = () => {
                const footerRect = footer.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                // footer entering viewport
                if (footerRect.top < viewportHeight) {
                    const overlap = viewportHeight - footerRect.top;
                    setDockY(Math.max(overlap + offset, 0));
                } else {
                    setDockY(0);
                }
            };

            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();

            return () => window.removeEventListener('scroll', onScroll);
        }, [offset]);

        return dockY;
    }

    const dockY = useFooterDock(-90);

    const notTop = useGetNotTop(120);

    return (
        <div className='fixed right-0 bottom-0 z-1000
                        w-fit h-fit pointer-events-auto
                        flex flex-row gap-1
                        m-4 | 2xl:m-6 | 3xl:mx-20 3xl:my-8
                        transition-transform duration-300 ease-out'
            style={{ transform: `translateY(-${dockY}px)` }}
        >
            {/* coffee chat button */}
            <Reveal delay={1.25} className={`${activeSection === 'home' || activeSection === 'about' || !isProjectPage || !notTop ? 'hidden' : ''}`}>
                <a href='mailto:hello@jacquelinetruong.dev'
                    target='_blank'
                    className='flex flex-row gap-1 items-center justify-center group cursor-pointer
                                    rounded-full px-2 py-2 | 2xl:px-3 2xl:py-2.5 | ultrawide:px-4 ultrawide:py-3.5
                                    bg-black/80 border border-(--dark-grey) 
                                    shadow-lg backdrop-blur-sm
                                    transition-all duration-200 hover:bg-(--black)/80 hover:border-(--dark-grey)'
                >
                    <Coffee className='size-[20px] text-(--grey) group-hover:text-(--white) transition-colors duration-200
                                        2xl:size-[24px]'/>

                    {/* tooltip */}
                    <span className='absolute -translate-y-10 | 2xl:-translate-y-12 | ultrawide:-translate-y-14
                                w-fit h-fit px-3 py-2 rounded-xl 
                                bg-black/80 border border-(--dark-grey) shadow-lg backdrop-blur-sm
                                opacity-0 group-hover:opacity-100 group-hover:bg-(--black)/80
                                transition-all duration-200'>
                        <p className='font-medium text-xs text-white whitespace-nowrap'>Grab Coffee</p>
                    </span>
                </a>
            </Reveal>

            {/* jump back to top button */}
            <Reveal delay={1.25} className={`${activeSection === 'home' || !notTop ? 'hidden' : ''}`}>
                <button
                    onClick={() => {isProjectPage 
                        ? document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })
                        : document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className='flex flex-row gap-1 items-center justify-center group cursor-pointer
                                    rounded-full px-2 py-2 | 2xl:px-3 2xl:py-2.5 | ultrawide:px-4 ultrawide:py-3.5
                                    bg-black/80 border border-(--dark-grey) 
                                    shadow-lg backdrop-blur-sm
                                    transition-all duration-200 hover:bg-(--black)/80 hover:border-(--dark-grey)'
                >
                    <TopArrow className='size-[20px] text-(--grey) group-hover:text-white transition-colors duration-200
                                            2xl:size-[24px]'/>

                    {/* tooltip */}
                    <span className='absolute -translate-y-10 | 2xl:-translate-y-12 | ultrawide:-translate-y-14
                                w-fit h-fit rounded-xl px-3 py-2
                                bg-black/90 border border-(--dark-grey) shadow-lg backdrop-blur-sm
                                opacity-0 group-hover:opacity-100 group-hover:bg-(--dark-black)/90 group-hover:backdrop-blur-md
                                transition-all duration-200'>
                        <p className='font-medium text-xs text-white whitespace-nowrap'>Back to top</p>
                    </span>
                </button>
            </Reveal>
        </div>
    );
}

// hook to check if user scrolled away from top
function useGetNotTop(threshold = 120) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // check if on home or project page
      const topSection = document.getElementById('project-hero') || document.getElementById('home');
      if (!topSection) return;

      // scroll position relative to top of hero section
      const topY = topSection.getBoundingClientRect().top;
      setScrolled(topY < -threshold);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialize

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
