import React from 'react';

import NameStamp from './name-stamp';

export default function Grid({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<section className={`relative w-full ${className}`}>
			<div className='grid-lines' />
			<div className={`grid-layout ${className}`}>
				
				{/* shared hero+about content */}
				

				{/* normal grid content */}
				{children}

			</div>
		</section>
	);
}
