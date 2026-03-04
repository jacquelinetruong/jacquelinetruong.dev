'use client';

import type { Experience } from '@/lib/experienceTypes';

import ExperienceDesktop from './experience-desktop';
import ExperienceMobile from './experience-mobile';
import { useMediaQuery } from '../../media-query';


export default function ExperienceSection({
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

    return isDesktop ? ( 
        <ExperienceDesktop
            isLoading={isLoading}
            experience={experience}
        />
    ) : (
        <ExperienceMobile
            isLoading={isLoading}
            experience={experience}
        />
    )
}

// helper function for sorting experiences by date
export function formatDateRange(xp: Experience) {
    if (!xp.startDate) return '';

    const start = new Date(xp.startDate).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    });

    // client projects: show only month + year
    if (xp.category === 'clients') {
        return start;
    }

    // current roles
    if (xp.current || !xp.endDate) {
        return `${start} — Present`;
    }

    const end = new Date(xp.endDate).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    });

    return `${start} — ${end}`;
}