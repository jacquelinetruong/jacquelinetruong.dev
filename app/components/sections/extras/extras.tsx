'use client';

import { useMediaQuery } from '../../media-query';
import ExtrasDesktop from './extras-desktop';
import ExtrasMobile from './extras-mobile';

export default function Extras({
	className = '',
	isLoading = false,
}: {
	className?: string;
	isLoading?: boolean;
}) {
	const isDesktop = useMediaQuery('(min-width: 1024px)');

	return isDesktop ? (
		<ExtrasDesktop
			className={className}
			isLoading={isLoading}
		/>
	) : (
		<ExtrasMobile
			className={className}
			isLoading={isLoading}
		/>
	);
}
