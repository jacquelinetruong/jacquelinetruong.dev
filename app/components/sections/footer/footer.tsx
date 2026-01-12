import { useMediaQuery } from '../../media-query';

import FooterDesktop from './footer-desktop';
import FooterMobile from './footer-mobile';

export default function Footer({ 
    className = '',
    isDesktop,
}:{ 
    className?: string; 
    isDesktop: boolean;
}) {
    return isDesktop ? (
        <FooterDesktop />
    ) : (
        <FooterMobile />
    )
}