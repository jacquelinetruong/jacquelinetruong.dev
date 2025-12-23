'use client';

import { useState, useEffect, useRef } from 'react';

import { SectionReveal } from './section-reveal';
import { Reveal } from './reveal';
import { Project } from '@/lib/projectTypes';
import ProjectCard from './projectcard';
import Grid from './grid';
import Image from 'next/image';

import GuideButton from './guide-button';
import LinkArrow from './icons/link-arrow';

import '../../public/portfolio.svg';
import '../../public/projects.svg';
import '../../public/palette-icon.svg';
import '../../public/palette-icon-grey.svg';
import '../../public/code-icon.svg';
import '../../public/code-icon-grey.svg';


export default function Portfolio({
    className = '',
    isLoading,
    projects,
 }: { 
    className?: string; 
    isLoading: boolean;
    projects: Project[];
 }) {
    // filter state
    const [filter, setFilter] = useState<'designer' | 'developer'>('designer');

    // projects filtered by type
    const filteredProjects = projects.filter(p => p.type === filter);

    // carousel state: order of filtered projects
    const [carouselProjects, setCarouselProjects] = useState<Project[]>(filteredProjects);
    
    // repopulate projects on filter change
    useEffect(() => {
        setCarouselProjects(filteredProjects);
    }, [filter]);

    // first element is featured project by default
    const featuredProject = carouselProjects[0];

    // for rotation timer
    const DURATION = 10000;
    const TRANSITION_DELAY = 3000;
    const [paused, setPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const [delay, setDelay] = useState(true);

    const startTimeRef = useRef<number | null>(null);
    const elapsedRef = useRef(0);

    // pause timer when hovering featured card
    useEffect(() => {
        if (paused || delay) return;

        let start = performance.now();
        let frame: number;

        const tick = (now: number) => {
            const elapsed = now - start;

            setProgress(prev => {
                const next = prev + elapsed / DURATION;
                return next >= 1 ? 1 : next;
            });

            if (elapsed < DURATION) {
                start = now;
                frame = requestAnimationFrame(tick);
            }
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [paused, delay, featuredProject?.id]);

    // visual transition delay
    useEffect(() => {
        setDelay(true);
        setProgress(0);

        const timeout = setTimeout(() => {
            setDelay(false);
        }, TRANSITION_DELAY);

        return () => clearTimeout(timeout);
    }, [featuredProject?.id]);

    useEffect(() => {
        if (progress < 1) return;

        setCarouselProjects(prev => {
            const [first, ...rest] = prev;
            return [...rest, first];
        });
    }, [progress]);

    // update featured project if clicked
    const newFeaturedProject = (clickedProject: Project) => {
        setCarouselProjects(prev => {
            const i = prev.findIndex(p => p.id === clickedProject.id);
            if (i === -1) return prev;

            // rotate array to make clicked project = first element
            return [...prev.slice(i), ...prev.slice(0, i)];
        });
        // reset timer + progress
        setProgress(0);
        startTimeRef.current = null;
        elapsedRef.current = 0;
    };

    return (
        <SectionReveal
            fadeDistance={0}
            fadeStart={0.4}
            fadeEnd={0.7}
        >
            <section className='relative'>
                <Grid>
                    {/* featured project */}
                        {/* preview */}
                        <div className='col-start-1 col-span-2 row-start-1 row-span-2'>
                            <Reveal delay={0.25}>
                                {featuredProject && (
                                    <ProjectCard
                                        key={featuredProject.id}
                                        project={featuredProject}
                                        featured
                                        onMouseEnter={() => setPaused(true)}
                                        onMouseLeave={() => setPaused(false)}
                                    />
                                )}
                                {/* timer bar */}
                                <div className={`bottom-0 left-0 w-full h-[3px] bg-white/20 z-30 pointer-events-none
                                                transition-opacity duration-500
                                                ${delay || paused ? 'opacity-0' : 'opacity-100'}`}>
                                    <div
                                        className='h-full bg-white'
                                        style={{width: `${progress * 100}%`}}
                                    />
                                </div>
                            </Reveal>
                        </div>
                    
                        {/* content */}
                        <div className='font-inter
                                        col-start-1 col-span-2 row-start-3 row-span-1
                                        flex flex-col gap-6 p-8 group'>

                            {/* text details */}
                            <h1 className='font-semibold text-3xl text-(--text-colour)'>{featuredProject?.title}</h1>
                            <p className='text-xl text-(--text-colour)'>
                                {featuredProject?.description}
                            </p>
                            {featuredProject?.link && (
                                <a className='font-medium text-xl text-(--bg-colour)
                                            flex flex-row gap-2 items-center
                                            w-fit h-fit px-5 py-3 rounded-full
                                            bg-(--text-colour) hover:bg-(--grey)
                                            transition-colors duration-300'
                                    target='_blank'
                                    href={featuredProject?.link}
                                    rel='noopener noreferrer'
                                >    
                                    Learn More
                                    <LinkArrow className='size-[28px] text-(--bg-colour) group-transition-colors group:duration-300'/>
                                </a>
                            )}
                                
                        </div>

                    {/* non-featured projects */}
                    {carouselProjects.slice(1).map((project, i) => {
                        // slot into grid layout
                        const positions: { colStart: number; colSpan: number; rowStart: number; rowSpan: number }[] = [
                            { colStart: 1, colSpan: 2, rowStart: 1, rowSpan: 2 },
                            { colStart: 4, colSpan: 1, rowStart: 3, rowSpan: 1 },
                            { colStart: 5, colSpan: 1, rowStart: 3, rowSpan: 1 },
                            { colStart: 5, colSpan: 1, rowStart: 2, rowSpan: 1 },
                        ];

                        const pos = positions[i + 1];
                        if (!pos) return null;

                        return (
                            <div
                                key={`${project.id}-${i}`}
                                className={`col-start-${pos.colStart} col-span-${pos.colSpan} row-start-${pos.rowStart} row-span-${pos.rowSpan}`}
                            >
                                <Reveal delay={(i + 0.05) * 0.15}>
                                    <ProjectCard
                                        project={project}
                                        onClick={() => newFeaturedProject(project)}
                                    />
                                </Reveal>
                            </div>
                        );
                    })}
                    
                    {/* filters, title */}
                    <div className='font-inter
                                    col-start-4 col-span-2 row-start-1 row-span-1
                                    flex flex-col items-end justify-between px-8'>

                        {/* filter buttons */}
                        <div className='flex flex-row gap-4'>
                            {/* designer button */}
                            <button 
                                onClick={() => setFilter('designer')}
                                className={`font-medium text-xl
                                            flex flex-row gap-2 items-center
                                            w-fit h-fit px-5 py-3 rounded-full
                                            border-1 bg-(--bg-colour)
                                            transition-colors duration-300
                                            hover:bg-(--grid-line-colour) hover:text-(--grey)
                                            ${filter === 'designer' ? 'text-(--text-colour) hover:text-(--text-colour)' : 'text-(--dark-mode-grey)'}`}
                            >
                                {/* palette icon */}
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className='transition-colors duration-300'>
                                        <path d="M21.9592 5.89422C19.8414 3.79705 16.9805 2.62195 14 2.62501H13.883C10.8865 2.65584 8.02316 3.86787 5.91518 5.99776C3.8072 8.12766 2.62484 11.0033 2.625 14C2.625 18.7031 5.53219 22.6472 10.2113 24.2999C10.739 24.4859 11.3037 24.5427 11.8579 24.4655C12.4121 24.3883 12.9398 24.1793 13.3966 23.8561C13.8534 23.5329 14.226 23.1049 14.4833 22.6079C14.7405 22.111 14.8748 21.5596 14.875 21C14.875 20.5359 15.0594 20.0908 15.3876 19.7626C15.7158 19.4344 16.1609 19.25 16.625 19.25H21.6792C22.4732 19.2538 23.2445 18.986 23.8653 18.491C24.486 17.996 24.9188 17.3036 25.0917 16.5288C25.2873 15.6676 25.3824 14.7868 25.375 13.9038C25.3639 12.4091 25.0562 10.9315 24.4699 9.55664C23.8835 8.18176 23.0302 6.93691 21.9592 5.89422ZM23.3811 16.1438C23.2942 16.5298 23.0782 16.8746 22.7687 17.1212C22.4593 17.3678 22.0749 17.5015 21.6792 17.5H16.625C15.6967 17.5 14.8065 17.8688 14.1501 18.5251C13.4937 19.1815 13.125 20.0717 13.125 21C13.1246 21.2795 13.0572 21.5549 12.9286 21.803C12.7999 22.0512 12.6137 22.2649 12.3854 22.4263C12.1572 22.5877 11.8937 22.6921 11.6168 22.7307C11.34 22.7693 11.0579 22.7411 10.7942 22.6483C6.83484 21.2516 4.375 17.9375 4.375 14C4.37486 11.4644 5.37525 9.03126 7.15882 7.22905C8.94238 5.42685 11.365 4.40123 13.9005 4.37501H13.9989C16.5344 4.38485 18.9645 5.39086 20.765 7.17606C22.5656 8.96127 23.5924 11.3826 23.6239 13.918C23.6304 14.6666 23.5504 15.4135 23.3855 16.1438H23.3811ZM15.3125 8.31251C15.3125 8.57209 15.2355 8.82585 15.0913 9.04169C14.9471 9.25753 14.7421 9.42576 14.5023 9.5251C14.2624 9.62444 13.9985 9.65043 13.7439 9.59979C13.4893 9.54914 13.2555 9.42414 13.0719 9.24058C12.8884 9.05703 12.7634 8.82316 12.7127 8.56856C12.6621 8.31396 12.6881 8.05006 12.7874 7.81023C12.8867 7.57041 13.055 7.36542 13.2708 7.2212C13.4867 7.07698 13.7404 7.00001 14 7.00001C14.3481 7.00001 14.6819 7.13829 14.9281 7.38443C15.1742 7.63057 15.3125 7.96441 15.3125 8.31251ZM10.5 10.9375C10.5 11.1971 10.423 11.4509 10.2788 11.6667C10.1346 11.8825 9.9296 12.0508 9.68977 12.1501C9.44994 12.2494 9.18604 12.2754 8.93144 12.2248C8.67684 12.1741 8.44298 12.0491 8.25942 11.8656C8.07587 11.682 7.95086 11.4482 7.90022 11.1936C7.84958 10.939 7.87557 10.6751 7.97491 10.4352C8.07425 10.1954 8.24248 9.99042 8.45831 9.8462C8.67415 9.70198 8.92791 9.62501 9.1875 9.62501C9.5356 9.62501 9.86944 9.76329 10.1156 10.0094C10.3617 10.2556 10.5 10.5894 10.5 10.9375ZM10.5 17.0625C10.5 17.3221 10.423 17.5759 10.2788 17.7917C10.1346 18.0075 9.9296 18.1758 9.68977 18.2751C9.44994 18.3744 9.18604 18.4004 8.93144 18.3498C8.67684 18.2991 8.44298 18.1741 8.25942 17.9906C8.07587 17.807 7.95086 17.5732 7.90022 17.3186C7.84958 17.064 7.87557 16.8001 7.97491 16.5602C8.07425 16.3204 8.24248 16.1154 8.45831 15.9712C8.67415 15.827 8.92791 15.75 9.1875 15.75C9.5356 15.75 9.86944 15.8883 10.1156 16.1344C10.3617 16.3806 10.5 16.7144 10.5 17.0625ZM20.125 10.9375C20.125 11.1971 20.048 11.4509 19.9038 11.6667C19.7596 11.8825 19.5546 12.0508 19.3148 12.1501C19.0749 12.2494 18.811 12.2754 18.5564 12.2248C18.3018 12.1741 18.068 12.0491 17.8844 11.8656C17.7009 11.682 17.5759 11.4482 17.5252 11.1936C17.4746 10.939 17.5006 10.6751 17.5999 10.4352C17.6992 10.1954 17.8675 9.99042 18.0833 9.8462C18.2992 9.70198 18.5529 9.62501 18.8125 9.62501C19.1606 9.62501 19.4944 9.76329 19.7406 10.0094C19.9867 10.2556 20.125 10.5894 20.125 10.9375Z"
                                        fill={`${filter === 'developer' ? 'text-(--text-colour)' : 'text-(--dark-mode-grey)'}`}/>
                                </svg>
                                UX/UI Designer Focus
                            </button>

                            {/* developer button */}
                            <button 
                                onClick={() => setFilter('developer')}
                                className={`font-medium text-xl
                                            flex flex-row gap-2 items-center
                                            w-fit h-fit px-5 py-3 rounded-full
                                            border-1 bg-(--bg-colour)
                                            transition-colors duration-300
                                            hover:bg-(--grid-line-colour) hover:text-(--grey)
                                            ${filter === 'developer' ? 'text-(--text-colour) hover:text-(--text-colour)' : 'text-(--dark-mode-grey)'}`}
                            >
                                {/* code icon */}
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className='transition-colors duration-300'>
                                    <path d="M14 14C14.0001 14.1313 13.9706 14.2609 13.9138 14.3792C13.857 14.4975 13.7743 14.6016 13.6719 14.6836L9.29688 18.1836C9.2071 18.2554 9.10407 18.3088 8.99365 18.3408C8.88323 18.3728 8.76759 18.3828 8.65333 18.3701C8.53907 18.3574 8.42843 18.3223 8.32772 18.2668C8.22702 18.2114 8.13822 18.1366 8.06641 18.0469C7.99459 17.9571 7.94116 17.8541 7.90916 17.7436C7.87717 17.6332 7.86723 17.5176 7.87993 17.4033C7.89262 17.2891 7.9277 17.1784 7.98315 17.0777C8.03861 16.977 8.11335 16.8882 8.20312 16.8164L11.7239 14L8.20312 11.1836C8.11335 11.1118 8.03861 11.023 7.98315 10.9223C7.9277 10.8216 7.89262 10.7109 7.87993 10.5967C7.86723 10.4824 7.87717 10.3668 7.90916 10.2564C7.94116 10.1459 7.99459 10.0429 8.06641 9.95312C8.13822 9.86335 8.22702 9.78861 8.32772 9.73315C8.42843 9.6777 8.53907 9.64262 8.65333 9.62993C8.76759 9.61723 8.88323 9.62717 8.99365 9.65916C9.10407 9.69116 9.2071 9.74459 9.29688 9.81641L13.6719 13.3164C13.7743 13.3984 13.857 13.5025 13.9138 13.6208C13.9706 13.7391 14.0001 13.8687 14 14ZM19.25 16.625H14.875C14.6429 16.625 14.4204 16.7172 14.2563 16.8813C14.0922 17.0454 14 17.2679 14 17.5C14 17.7321 14.0922 17.9546 14.2563 18.1187C14.4204 18.2828 14.6429 18.375 14.875 18.375H19.25C19.4821 18.375 19.7046 18.2828 19.8687 18.1187C20.0328 17.9546 20.125 17.7321 20.125 17.5C20.125 17.2679 20.0328 17.0454 19.8687 16.8813C19.7046 16.7172 19.4821 16.625 19.25 16.625ZM25.375 6.125V21.875C25.375 22.3391 25.1906 22.7842 24.8624 23.1124C24.5342 23.4406 24.0891 23.625 23.625 23.625H4.375C3.91087 23.625 3.46575 23.4406 3.13756 23.1124C2.80937 22.7842 2.625 22.3391 2.625 21.875V6.125C2.625 5.66087 2.80937 5.21575 3.13756 4.88756C3.46575 4.55937 3.91087 4.375 4.375 4.375H23.625C24.0891 4.375 24.5342 4.55937 24.8624 4.88756C25.1906 5.21575 25.375 5.66087 25.375 6.125ZM23.625 21.875V6.125H4.375V21.875H23.625Z" 
                                        fill={`${filter === 'developer' ? 'text-(--text-colour)' : 'text-(--dark-mode-grey)'}`}/>
                                </svg>
                                Developer Focus
                            </button>
                        </div>

                        {/* title */}
                        <div className='relative size-full place-self-end'>
                            <Image 
                                src='/portfolio.svg'
                                alt='section title: designer portfolio'
                                fill
                                className={`object-contain transition-all ${filter === 'designer' ? 'opacity-100 duration-800' : 'opacity-0 translate-x-100 duration-300'}`}
                                draggable={false}
                            />
                            <Image 
                                src='/projects.svg'
                                alt='section title: developer projects'
                                fill
                                className={`object-contain transition-all ${filter === 'developer' ? 'opacity-100 duration-800' : 'opacity-0 translate-x-100 duration-300'}`}
                                draggable={false}
                            />
                        </div>
                    </div>

                    {/* handwritten note */}
                    <div className='col-start-4 col-span-1 row-start-2 row-span-1'>
                        <Image
                            src='/my-faves.svg'
                            alt='my faves'
                            width={304}
                            height={165}
                            className='size-full p-12'
                            draggable={false}
                        />
                    </div>
                    
                    {/* jump to experience button */}
                    <div className='col-start-3 col-span-1 row-start-3 row-span-1
                                    flex flex-col justify-end items-center'>
                        <GuideButton href='#experience' text='My Experience'/>
                    </div>
                </Grid>
            </section>
        </SectionReveal>
    )
}