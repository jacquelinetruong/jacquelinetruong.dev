'use client';

import { Experience } from '@/lib/experienceTypes';

import AboutDesktop from './about-desktop';
import AboutMobile from './about-mobile';
import { useMediaQuery } from '../../media-query';


export default function About({
    className = '',
    isLoading = false,
    experience,
 }: { 
    className?: string; 
    isLoading?: boolean;
    experience: Experience[];
 }) {
    // ------ VIEWPORT DISPLAY ------ //
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    // current work (already filtered) sorted by recency
    const safeExperience = experience ?? [];

    const currentWork = [...safeExperience]
        .filter(e => e.startDate)
        .sort(
            (a, b) =>
                new Date(b.startDate!).getTime() -
                new Date(a.startDate!).getTime()
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