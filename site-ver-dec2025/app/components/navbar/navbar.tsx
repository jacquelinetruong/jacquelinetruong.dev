'use client';

import { useMediaQuery } from '../media-query';

import NavbarDesktop from './navbar-desktop';
import NavbarMobile from './navbar-mobile';

export default function Navbar({ 
    isLoading,
    isDesktop,
}: { 
    isLoading: boolean; 
    isDesktop: boolean;
}) {

    return isDesktop ? (
        <NavbarDesktop
            isLoading={isLoading}
        />
    ): (
        <NavbarMobile
            isLoading={isLoading}
        />
    );
}