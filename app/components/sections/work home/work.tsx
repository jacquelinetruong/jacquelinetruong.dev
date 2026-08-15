'use client';

import { Project } from '@/lib/projectTypes';

import WorkDesktop from './work-desktop';
import WorkMobile from './work-mobile';
import { useMediaQuery } from '../../media-query';


export default function Work({
    className = '',
    isLoading = false,
    projects,
 }: { 
    className?: string; 
    isLoading?: boolean;
    projects: Project[];
 }) {
    // ------ VIEWPORT DISPLAY ------ //
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    return isDesktop ? (
        <WorkDesktop
            isLoading={isLoading}
            projects={projects}
        />
    ): (
        <WorkMobile
            isLoading={isLoading}
            projects={projects}
        />
    )
}