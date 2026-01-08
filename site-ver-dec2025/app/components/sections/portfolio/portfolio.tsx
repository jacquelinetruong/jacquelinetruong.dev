'use client';

import { useState, useMemo } from 'react';
import { Project } from '@/lib/projectTypes';
import { useMediaQuery } from '@/app/components/media-query';

import PortfolioDesktop from './portfolio-desktop';
import PortfolioMobile from './portfolio-mobile';


export default function Portfolio({
    className = '',
    isDesktop,
    isLoading,
    projects,
 }: { 
    className?: string;
    isDesktop: boolean;
    isLoading: boolean;
    projects: Project[];
 }) {

    // ------ FILTER STATE ------ //
    const [filter, setFilter] = useState<'all' | 'design' | 'development'>('all');

    // ------ PROJECT COUNTS ------ //
        const counts = useMemo(() => {
            let design = 0;
            let development = 0;
            projects.forEach(project => {
                if (project.type?.includes('design')) design++;
                if (project.type?.includes('development')) development++;
            });
            return {
                design,
                development,
            };
        }, [projects]);
   
    return isDesktop ? (
        // desktop view 
        <PortfolioDesktop
            isLoading={isLoading}
            projects={projects}
            filter={filter}
            setFilter={setFilter}
            counts={counts}
        />
    ): (
        // mobile view
        <PortfolioMobile
            isLoading={isLoading}
            projects={projects}
            filter={filter}
            setFilter={setFilter}
            counts={counts}
        />
    )
}
        