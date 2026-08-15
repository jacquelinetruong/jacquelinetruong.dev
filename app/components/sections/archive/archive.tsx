'use client';

import { useMediaQuery } from '../../media-query';
import ArchiveDesktop from './archive-desktop';
import ArchiveMobile from './archive-mobile';

export default function Archive({
	className = '',
}: {
	className?: string;
}) {
	const isDesktop = useMediaQuery('(min-width: 1024px)');

	return isDesktop ? (
		<ArchiveDesktop className={className} />
	) : (
		<ArchiveMobile className={className} />
	);
}
