'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';

import { SectionReveal } from '@/app/components/section-reveal';
import { Reveal } from '@/app/components/reveal';
import ProjectOverlay from '@/app/components/projectoverlay';
import { useActiveSection } from '@/app/components/active-section';
import Grid from '@/app/components/grid';

import ProjectCard from '@/app/components/projectcard';
import { Project } from '@/lib/projectTypes';

import GuideButton from '@/app/components/guide-button';
import LinkArrow from '@/app/components/icons/link-arrow';

import '@/public/works.svg';
import '@/public/portfolio.svg';
import '@/public/projects.svg';
import '@/public/palette-icon.svg';
import '@/public/palette-icon-grey.svg';
import '@/public/code-icon.svg';
import '@/public/code-icon-grey.svg';
import '@/public/github-logo.svg';
import '@/public/dribbble-logo.svg';
import '@/public/caret-left-icon.svg'


type PortfolioDesktopProps = {
    isLoading: boolean;
    projects: Project[];
    filter: 'all' | 'design' | 'development';
    setFilter: (f: 'all' | 'design' | 'development') => void;
    counts: {
        design: number;
        development: number;
    }
}

export default function PortfolioDesktop({
    isLoading,
    projects,
    filter,
    setFilter,
    counts,
}: PortfolioDesktopProps) {

    // ------ FILTERED PROJECTS ------ //
        const filteredProjects = useMemo(() => {
            if (filter === 'all') return projects;

            return projects.filter(project => 
                project.type?.includes(filter)
            );
        }, [projects, filter]);

    // ------ PROJECT CAROUSEL ------ //
    // carousel state: order of filtered projects
        const [carouselProjects, setCarouselProjects] = useState<Project[]>(filteredProjects);

        // first element is featured project by default
        const featuredProject = carouselProjects[0];

        // repopulate projects on filter change
        useEffect(() => {
            setCarouselProjects(filteredProjects);
        }, [filter]);

    // ------ UPDATE FEATURED PROJECT ------ //
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
    
    // ------ FEATURED PROJECT PHOTO GALLERY ------ //
        // update featured project image gallery
        const [featuredImageIndex, setFeaturedImageIndex] = useState(0);
        useEffect(() => {
            setFeaturedImageIndex(0);
        }, [featuredProject?.id]);

        // index images
        const getImageAt = (images: string[], index: number) => {
            const len = images.length;
            return images[((index % len) + len) % len];
        };

        // featured project image
        const featuredImage = useMemo(() => {
            if (!featuredProject) return null;
            return getImageAt(featuredProject.images, featuredImageIndex);
        }, [featuredProject, featuredImageIndex]);

        // loop featured project images in gallery
        const galleryImages = useMemo(() => {
            if (!featuredProject) return [];

            const imgs = featuredProject.images;
            const count = Math.min(4, imgs.length);

            return Array.from({ length: count }, (_, i) =>
                getImageAt(imgs, featuredImageIndex + i + 1)
            );
        }, [featuredProject, featuredImageIndex]);

        // reset photo gallery on project change
        useEffect(() => {
            setFeaturedImageIndex(0);
        }, [featuredProject?.id]);

        // photo rotation condition
        const shouldRotate = featuredProject?.images.length >= 6;
    
    // ------ FEATURED PROJECT EXPANDED DETAILS ------ //
        const [isDetailsOpen, setIsDetailsOpen] = useState(false);
        const openDetails = () => setIsDetailsOpen(true);
        const closeDetails = () => setIsDetailsOpen(false);

        const imagesRef = useRef<HTMLDivElement | null>(null);
        const buttonsRef = useRef<HTMLDivElement | null>(null);

        // lock scrolling when modal is open
        useEffect(() => {
            const html = document.documentElement;
            const body = document.body;

            if (isDetailsOpen) {
                html.style.overflow = 'hidden';
                body.style.overflow = 'hidden';
            } else {
                html.style.overflow = '';
                body.style.overflow = '';
            }
        
            return () => {
                body.style.overflow = '';
                html.style.overflow = '';
            };
        }, [isDetailsOpen]);

        const nextProject = carouselProjects.length > 1
            ? carouselProjects[1]
            : null;

        const getNextProject = () => {
            setCarouselProjects(prev => {
                const [first, ...rest] = prev;
                return [...rest, first];
            });
        };

        // prev project in modal
        const prevProject = carouselProjects.length > 1 
            ? carouselProjects[carouselProjects.length - 1] 
            : null;

        const getPrevProject = () => {
            setCarouselProjects(prev => {
                const last = prev[prev.length - 1];
                return [last, ...prev.slice(0, -1)];
            });
        };


    // ------ FEATURED PROJECT TIMER ------ //
        const activeSection = useActiveSection();
        const DURATION = 10000;
        const TRANSITION_DELAY = 8000;
        const paused = isDetailsOpen;
        const [progress, setProgress] = useState(0);
        const [delay, setDelay] = useState(true);
        const [isHovering, setIsHovering] = useState(false);
        const isBlocked = paused || delay || isHovering || activeSection !== 'portfolio';

        const frameRef = useRef<number | null>(null);
        const startTimeRef = useRef<number | null>(null);
        const elapsedRef = useRef(0);

        
        // progress timer
        useEffect(() => {
            if (isBlocked) {
                if (frameRef.current) {
                    cancelAnimationFrame(frameRef.current);
                    frameRef.current = null;
                }
                return;
            }

            let start = performance.now();

            const tick = (now: number) => {
                const elapsed = now - start;

                setProgress(prev => {
                    const next = prev + elapsed / DURATION;
                    return next >= 1 ? 1 : next;
                });

                start = now;
                frameRef.current = requestAnimationFrame(tick);
            };

            frameRef.current = requestAnimationFrame(tick);

            return () => {
                if (frameRef.current) {
                    cancelAnimationFrame(frameRef.current);
                    frameRef.current = null;
                }
            };
        }, [isBlocked, featuredProject?.id]);

        // rotate projects after timer is up
        useEffect(() => {
            if (paused || delay) return;
            if (progress < 1) return;

            setCarouselProjects(prev => {
                const [first, ...rest] = prev;
                return [...rest, first];
            });
        }, [progress, paused, delay]);

            // ------ TIMER DELAY ------ //
                const delayTimeoutRef = useRef<number | null>(null);
                const startDelay = (ms: number) => {
                    setDelay(true);

                    if (delayTimeoutRef.current) {
                        clearTimeout(delayTimeoutRef.current);
                    }
                    
                    delayTimeoutRef.current = window.setTimeout(() => {
                        setDelay(false);
                        delayTimeoutRef.current = null;
                    }, ms);
                };

                // delay on project switch
                useEffect(() => {
                    setProgress(0);
                    startDelay(TRANSITION_DELAY);
                }, [featuredProject?.id]);

                // detect onPause
                const pausedRef = useRef(false);
                useEffect(() => {
                    if (paused || isHovering) {
                        pausedRef.current = true;
                    }
                }, [paused, isHovering]);

                // add delay after pausing
                const UNPAUSE_DELAY = 4000;
                useEffect(() => {
                    if (!paused && !isHovering && pausedRef.current) {
                        startDelay(UNPAUSE_DELAY);
                        pausedRef.current = false;
                    }
                }, [paused, isHovering]);


    return (
        <>
            <SectionReveal
                fadeDistance={0}
                fadeStart={0.4}
                fadeEnd={0.7}
            >
                <section className='relative'>
                    <Grid>
                        {/* featured project */}
                            {/* preview */}
                            <div
                                ref={imagesRef} 
                                className='col-start-1 col-span-2 row-start-1 row-span-2 z-100'>
                                <Reveal delay={0.25}>
                                    {featuredProject && (
                                        <ProjectCard
                                            key={featuredProject.id}
                                            project={{
                                                ...featuredProject,
                                                images: featuredImage ? [featuredImage] : []
                                            }}
                                            featured
                                            onMouseEnter={() => setIsHovering(true)}
                                            onMouseLeave={() => setIsHovering(false)}
                                            onClick={openDetails}
                                            action={
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); 
                                                        openDetails();
                                                    }}
                                                    className={`font-medium text-sm group 
                                                                flex flex-col items-end gap-2 
                                                                transition-opacity duration-300 cursor-pointer
                                                                opacity-0 group-hover:opacity-100
                                                                ${isDetailsOpen && 'hidden'}`}
                                                >
                                                    Expand details
                                                    <LinkArrow className='size-[40px] text-(--white) group-transition-colors group:duration-300'/>
                                                </button>
                                            }
                                        />
                                    )}
                                    {/* timer bar */}
                                    {featuredProject && (
                                        <div className={`bottom-0 left-0 w-full h-[3px] bg-white/20 z-30 pointer-events-none
                                                        transition-opacity duration-500
                                                        ${isBlocked ? 'opacity-0' : 'opacity-100'}`}>
                                            <div
                                                className='h-full bg-white'
                                                style={{width: `${progress * 100}%`}}
                                            />
                                        </div>
                                    )}
                                </Reveal>
                            </div>
                        
                            {/* content */}
                            <div className='col-start-1 col-span-2 row-start-3 row-span-1
                                            flex flex-col justify-between group z-100
                                            p-8 | ultrawide:px-20'
                            >

                                {/* text details */}

                                <div className={`flex flex-col gap-2 h-full
                                                transition-opacity duration-300
                                                ${isDetailsOpen ? 'opacity-0' : 'opacity-100'}`}>
                                    <h2 className='font-semibold text-wrap text-(--text-colour) sm:text-xl md:text-2xl'>{featuredProject?.title}</h2>
                                    <p className='h-full text-wrap truncate text-(--text-colour) sm:text-sm md:text-base 2xl:text-md'>
                                        {featuredProject?.description}
                                    </p>
                                </div>

                                {/* external link buttons */}
                                <div 
                                    ref={buttonsRef}
                                    className='font-medium text-sm
                                                flex flex-row gap-2'>
                                    {featuredProject?.link && (
                                        <a className='text-(--bg-colour)
                                                        flex flex-row gap-2 items-center
                                                        w-fit h-fit px-6 py-3 rounded-full 2xl:px-8 2xl:py-4
                                                        bg-(--text-colour) hover:bg-(--nice-grey)
                                                        transition-colors duration-300'
                                            target='_blank'
                                            href={featuredProject?.link}
                                            rel='noopener noreferrer'
                                        >    
                                            Live Site
                                            <LinkArrow className='size-[20px] text-(--bg-colour) group-transition-colors group:duration-300'/>
                                        </a>
                                    )}

                                    {featuredProject?.github && (
                                        <a className='font-medium text-(--bg-colour)
                                                        flex flex-row gap-2 items-center
                                                        w-fit h-full px-5 py-3 rounded-full 2xl:px-8 2xl:py-4
                                                        bg-(--text-colour) hover:bg-(--nice-grey)
                                                        transition-colors duration-300'
                                            target='_blank'
                                            href={featuredProject?.github}
                                            rel='noopener noreferrer'
                                        >    
                                            <Image
                                                src='/github-logo.svg'
                                                alt='github logo'
                                                width={18}
                                                height={18}
                                            />
                                        </a>
                                    )}

                                    {featuredProject?.dribbble && (
                                        <a className='font-medium text-(--bg-colour)
                                                        flex flex-row gap-2 items-center
                                                        w-fit h-full px-5 py-3 rounded-full 2xl:px-8 2xl:py-4
                                                        bg-(--text-colour) hover:bg-(--nice-grey)
                                                        transition-colors duration-300'
                                            target='_blank'
                                            href={featuredProject?.dribbble}
                                            rel='noopener noreferrer'
                                        >    
                                            <Image
                                                src='/dribbble-logo.svg'
                                                alt='dribbble logo'
                                                width={18}
                                                height={18}
                                            />
                                        </a>
                                    )}
                                </div>
                            </div>
                            
                        {/* featured photo gallery */}
                        <div
                            ref={imagesRef} 
                            className='w-1/2 h-full col-start-3 col-span-1 row-start-1 row-span-2 pl-2 z-100'>
                            {featuredProject?.images.length > 1 && (
                                <div className='flex flex-col gap-2 w-full h-full'>
                                    {shouldRotate ? (
                                        // rotate if project has 6 or more images
                                        galleryImages.map((img, i) => (
                                            <button
                                                key={img}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setFeaturedImageIndex(prev => prev + i + 1);
                                                }}
                                                className='relative w-full h-1/4 overflow-hidden cursor-pointer group isolate'
                                                onMouseEnter={() => setIsHovering(true)}
                                                onMouseLeave={() => setIsHovering(false)}
                                            >
                                                <Reveal delay={(i * 0.05) * 0.15}>
                                                    {/* darken image until hovered */}
                                                    <div className='absolute inset-0 z-10 bg-[#13131B] opacity-15 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none'/>
                                                    <Image
                                                        src={img}
                                                        alt={`${featuredProject.title} preview ${i + 2}`}
                                                        fill
                                                        className='object-cover object-center
                                                                    transition-transform duration-500 ease-out
                                                                    group-hover:scale-110'
                                                        draggable={false}
                                                    />
                                                    {/* hover caret */}
                                                    <span className='absolute inset-0 p-2 flex
                                                                    opacity-0 translate-y-1
                                                                    group-hover:opacity-100 group-hover:translate-y-0
                                                                    transition-all duration-200
                                                                    bg-gradient-to-l from-transparent via-black/10 via-70%  to-black/30 to-90% point-events-none'>  
                                                        <Image
                                                            src='/caret-left-icon.svg'
                                                            alt='caret left icon'
                                                            width={14}
                                                            height={14}
                                                            draggable={false}
                                                        />
                                                    </span>
                                                </Reveal>
                                            </button>
                                        ))
                                    ) : (
                                        // don't rotate if project has 2-4 images
                                        featuredProject.images.map((img, i) => {
                                            const imageIndex = i;
                                            const isActive = featuredImageIndex === imageIndex;

                                            return (
                                                <button
                                                    key={img}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFeaturedImageIndex(imageIndex);
                                                    }}
                                                    className={`relative w-full h-1/4 overflow-hidden cursor-pointer group isolate transition-all duration-300
                                                                ${isActive && 'ring-white xs:ring-1 sm:ring-2 3xl:ring-4'}`}
                                                    onMouseEnter={() => setIsHovering(true)}
                                                    onMouseLeave={() => setIsHovering(false)}
                                                    >
                                                    {/* darken image until hovered */}
                                                    <div className='absolute inset-0 z-10 bg-[#13131B] opacity-15 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none'/>
                                                    
                                                    <Image
                                                        src={img}
                                                        alt={`${featuredProject.title} preview ${imageIndex + 1}`}
                                                        fill
                                                        className='object-cover object-center
                                                                    transition-transform duration-500 ease-out
                                                                    group-hover:scale-110'
                                                        draggable={false}
                                                    />
                                                    {/* hover caret */}
                                                    <span className='absolute inset-0 p-2 flex
                                                                    opacity-0 translate-y-1
                                                                    group-hover:opacity-100 group-hover:translate-y-0
                                                                    transition-all duration-200
                                                                    bg-gradient-to-l from-transparent via-black/10 via-70%  to-black/30 to-90% point-events-none'>  
                                                        <Image
                                                            src='/caret-left-icon.svg'
                                                            alt='caret left icon'
                                                            width={14}
                                                            height={14}
                                                            draggable={false}
                                                        />
                                                    </span>
                                                </button>
                                    )}))}
                                </div>
                            )}
                        </div>

                        {/* non-featured projects */}
                        {!isDetailsOpen &&
                            (carouselProjects.slice(1).map((project, i) => {
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
                                        <Reveal delay={(i + 0.05) * 0.15} animateTrigger={filter}>
                                            <ProjectCard
                                                project={project}
                                                onClick={() => newFeaturedProject(project)}
                                            />
                                        </Reveal>
                                    </div>
                                );
                        }))}

                        {/* filters, title */}
                        {!isDetailsOpen && (
                            <div className='text-nowrap text-sm
                                            col-start-4 col-span-2 row-start-1 row-span-1 w-(--two-cell-width) h-(--cell-height)
                                            flex flex-col items-end justify-between relative'>

                                {/* filter buttons */}
                                <div className='flex flex-row gap-2 px-8 pt-8 | ultrawide:px-20'>
                                    {/* all button */}
                                    <button 
                                        onClick={() => setFilter('all')}
                                        className={`flex flex-row gap-2 items-center cursor-pointer
                                                    w-fit h-fit rounded-full px-6 py-3 | 2xl:px-8 2xl:py-4
                                                    border-1 bg-(--bg-colour)
                                                    transition-colors duration-400
                                                    ${filter === 'all' ? 'text-black bg-white hover:text-black' : 'hover:border-(--light-mode-grey) text-(--text-colour) hover:bg-(--grid-line-colour)'}`}
                                    >
                                        All
                                    </button>

                                    {/* designer button */}
                                    <button 
                                        onClick={() => setFilter('design')}
                                        className={`flex flex-row gap-1 items-center cursor-pointer
                                                    w-fit h-fit rounded-full px-6 py-3 | 2xl:px-8 2xl:py-4
                                                    border-1 bg-(--bg-colour)
                                                    transition-colors duration-400
                                                    ${filter === 'design' ? 'text-black bg-white hover:text-black' : 'hover:border-(--light-mode-grey) text-(--text-colour) hover:bg-(--grid-line-colour)'}`}
                                    >
                                        Design
                                        <sup className={`transition-colors duration-400 ${filter === 'design' ? 'text-(--light-mode-grey)' : 'text-(--grey)'}`}>{counts.design}</sup>
                                    </button>

                                    {/* developer button */}
                                    <button 
                                        onClick={() => setFilter('development')}
                                        className={`flex flex-row gap-1 items-center cursor-pointer
                                                    w-fit h-fit rounded-full px-6 py-3 | 2xl:px-8 2xl:py-4
                                                    border-1 bg-(--bg-colour)
                                                    transition-colors duration-400
                                                    ${filter === 'development' ? 'text-black bg-white hover:text-black' : 'hover:border-(--light-mode-grey) text-(--text-colour) hover:bg-(--grid-line-colour)'}`}
                                    >
                                        Development
                                        <sup className={`transition-colors duration-400 ${filter === 'development' ? 'text-(--light-mode-grey)' : 'text-(--grey)'}`}>{counts.development}</sup>
                                    </button>
                                </div>

                                {/* title */}
                                <div className='w-full h-full relative'>
                                    <Image 
                                        src='/works.svg'
                                        alt='section title: design and development works'
                                        fill
                                        className={`pr-8 | ultrawide:pr-20
                                                    object-contain object-right transition-all 
                                                    ${filter === 'all' ? 'opacity-100 duration-800 ' : 'opacity-0 translate-x-100 duration-300'}`}
                                        draggable={false}
                                    />
                                    <Image 
                                        src='/portfolio.svg'
                                        alt='section title: design portfolio'
                                        fill
                                        className={`pr-8 | ultrawide:pr-20
                                                    object-contain object-right transition-all 
                                                    ${filter === 'design' ? 'opacity-100 duration-800 ' : 'opacity-0 translate-x-100 duration-300'}`}                                        draggable={false}
                                    />
                                    <Image 
                                        src='/projects.svg'
                                        alt='section title: development projects'
                                        fill
                                        className={`pr-8 | ultrawide:pr-20
                                                    object-contain object-right transition-all 
                                                    ${filter === 'development' ? 'opacity-100 duration-800 ' : 'opacity-0 translate-x-100 duration-300'}`}                                        draggable={false}
                                    />
                                </div>
                            </div>
                        )}

                        {!isDetailsOpen && (
                            <>
                                {/* handwritten note */}
                                <div className='col-start-4 col-span-1 row-start-2 row-span-1 w-full h-full relative'>
                                    <Image
                                        src='/my-faves.svg'
                                        alt='my faves'
                                        fill
                                        className='object-contain object-center lg:p-12 ultrawide:p-20'
                                        draggable={false}
                                    />
                                </div>
                        
                                {/* jump to experience button */}
                                <div className={`col-start-3 col-span-1 row-start-3 row-span-1
                                                transition-opacity duration-300
                                                ${isDetailsOpen ? 'opacity-0' : 'opacity-100'}`}>
                                    <GuideButton href='#experience' text='My Experience'/>
                                </div>
                            </>
                        )}
                    </Grid>
                </section>
            </SectionReveal>

            {/* featured project expand details modal */}
            <AnimatePresence>
                {isDetailsOpen && featuredProject && (
                    <ProjectOverlay 
                        key={featuredProject.id}
                        project={featuredProject}
                        prevProject={prevProject}
                        nextProject={nextProject}
                        onPrev={getPrevProject}
                        onNext={getNextProject}
                        onClose={closeDetails}
                        imagesRef={imagesRef}
                        buttonsRef={buttonsRef}
                    />
                )}
            </AnimatePresence>
        </>
    )
}


