'use client';

import { Island_Moments } from 'next/font/google';
import LoaderDesktop from './loader-desktop';
import LoaderMobile from './loader-mobile';


// function for loading screen!
export default function Loader({ 
	isLoading, 
	isDesktop,
}: {
	isLoading: boolean;
	isDesktop: boolean;
}) {

	return isDesktop ? (
		<LoaderDesktop 
			isLoading={isLoading}
			isDesktop={isDesktop}
		/>
	) : (
		<LoaderMobile
			isLoading={isLoading}
			isDesktop={isDesktop}
		/>
	)
}
