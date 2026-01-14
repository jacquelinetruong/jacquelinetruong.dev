'use client';

import { Project } from '@/lib/projectTypes';
import { Experience } from '@/lib/experienceTypes';

import AboutDesktop from './about-desktop';
import AboutMobile from './about-mobile';


export default function About({
    className = '',
    isDesktop,
    isLoading,
    experience,
 }: { 
    className?: string; 
    isDesktop: boolean;
    isLoading: boolean;
    experience: Experience[];
 }) {

    // current work (already filtered) sorted by recency
    const currentWork = [...experience]
        .filter(e => e.startDate)
        .sort(
            (a, b) => new Date(b.startDate!).getTime() - new Date(a.startDate!).getTime()
        );  
    
    return isDesktop ? (
        <AboutDesktop
            isLoading={isLoading}
            currentWork={currentWork}
        />
    ): (
        <AboutMobile
            isLoading={isLoading}
            currentWork={currentWork}
        />
    )
}