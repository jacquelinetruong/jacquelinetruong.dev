'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Reveal } from './reveal';

import Coffee from './icons/coffee';
import TopArrow from './icons/top-arrow';

export default function Quickbar({ isProjectPage = false }: {
  isProjectPage?: boolean;
}) {

  const pathname = usePathname();
  const isWork = pathname === '/';

  const notTop = useScrolledPastHero();
  const dockY = useFooterDock(-90);

  // never show coffee button on work page
  const showCoffee = !isWork && notTop;

  const showTop = notTop;

  return (
    <div
      className='fixed right-0 bottom-0 z-1000
                 flex flex-row gap-1
                 m-4 2xl:m-6 3xl:mx-20 3xl:my-8
                 transition-transform duration-300 ease-out'
      style={{ transform: `translateY(-${dockY}px)` }}
    >
        {/* contact button */}
        <span className={`
            transition-opacity duration-400
            ${!showCoffee ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
        >
        <a
            href='mailto:hello@jacquelinetruong.dev'
            className='flex flex-row gap-1 items-center justify-center group cursor-pointer
                        rounded-full px-2 py-2 | 2xl:px-3 2xl:py-2.5 | ultrawide:px-4 ultrawide:py-3.5
                        bg-black/80 border border-(--dark-grey) 
                        shadow-lg backdrop-blur-sm
                        transition-all duration-200 hover:bg-(--black)/80 hover:border-(--dark-grey)'
            target='_blank'
        >
            <Coffee className='size-[20px] text-(--grey) group-hover:text-(--white)
                                transition-colors duration-200 2xl:size-[24px]' />
        </a>
        </span>

        {/* back to top */}
        <span className={`
            transition-all duration-300
            ${!showTop ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
        >
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className='flex flex-row gap-1 items-center justify-center group cursor-pointer
                            rounded-full px-2 py-2 | 2xl:px-3 2xl:py-2.5 | ultrawide:px-4 ultrawide:py-3.5
                            bg-black/80 border border-(--dark-grey) 
                            shadow-lg backdrop-blur-sm
                            transition-all duration-200 hover:bg-(--black)/80 hover:border-(--dark-grey)'
            >
                <TopArrow className='size-[20px] text-(--grey) group-hover:text-(--white)
                                    transition-colors duration-200 2xl:size-[24px]' />
            </button>
        </span>
    </div>
  );
}


// helper function: check if user scrolled past hero
function useScrolledPastHero(threshold = 120) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const hero = document.querySelector('[data-hero]') as HTMLElement | null;

        const onScroll = () => {
            if (!hero) {
            setScrolled(window.scrollY > threshold);
            return;
            }

            const heroHeight = hero.offsetHeight;
            setScrolled(window.scrollY > heroHeight - threshold);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);

    return scrolled;
}

// helper function: dock quickbar above footer when reached
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