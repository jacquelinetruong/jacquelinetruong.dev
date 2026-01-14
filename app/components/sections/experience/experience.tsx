'use client';

import type { Project } from '@/lib/projectTypes';
import type { Experience } from '@/lib/experienceTypes';

import ExperienceDesktop from './experience-desktop';
import ExperienceMobile from './experience-mobile';


export default function ExperienceSection({
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

    if (xp.current || !xp.endDate) {
        return `${start} — Present`;
    }

    const end = new Date(xp.endDate).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    });

    return `${start} — ${end}`;
}