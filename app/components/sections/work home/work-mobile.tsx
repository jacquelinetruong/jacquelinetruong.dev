'use client';

import Carousel from '@/app/components/carousel';

import type { Project } from '@/lib/projectTypes';

export default function WorkMobile({
    className = '',
    isLoading,
    projects,
}: {
    className?: string;
    isLoading: boolean;
    projects: Project[];
}) {
    return (
        <>
            <Carousel 
                projects={projects} 
                section='portfolio'
            />
        </>
    )
}