'use client';

import { useMediaQuery } from '../../media-query';
import FooterDesktop from './footer-desktop';
import FooterMobile from './footer-mobile';

export default function Footer({ 
    className = '',
}:{ 
    className?: string; 
}) {
    // ------ VIEWPORT DISPLAY ------ //
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    return isDesktop ? (
        <FooterDesktop />
    ) : (
        <FooterMobile />
    )
}