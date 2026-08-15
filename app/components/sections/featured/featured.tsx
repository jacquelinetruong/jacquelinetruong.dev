'use client';

import { Project } from '@/lib/projectTypes';

import FeaturedDesktop from './featured-desktop';
import FeaturedMobile from './featured-mobile';


export default function Featured({
    className = '',
    isDesktop,
    isLoading,
    featuredProjects,
}: { 
    className?: string; 
    isDesktop: boolean;
    isLoading: boolean;
    featuredProjects: Project[];
}) {

    return isDesktop ? (       
        <FeaturedDesktop
            featuredProjects={featuredProjects}
        />
    ) : (
        <FeaturedMobile
            featuredProjects={featuredProjects}
        />
    )
};