'use client';

import { useMediaQuery } from '../media-query';
import { useLoading } from '../loading-context';

import NavbarDesktop from './navbar-desktop';
import NavbarMobile from './navbar-mobile';

export default function Navbar() {
    // ------ VIEWPORT DISPLAY ------ //
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    const { isLoading } = useLoading();

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