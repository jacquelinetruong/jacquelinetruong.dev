'use client';

import MoreDesktop from './more-desktop';
import MoreMobile from './more-mobile';


export default function More({
    className = '',
    isDesktop,
    isLoading,
}: { 
    className?: string; 
    isDesktop: boolean;
    isLoading: boolean;
}) {

    return isDesktop ? (       
        <MoreDesktop
            isLoading={isLoading}
        />
    ) : (
        <MoreMobile
        />
    )
};