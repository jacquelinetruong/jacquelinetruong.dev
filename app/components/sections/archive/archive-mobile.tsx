'use client';

import Carousel from '@/app/components/carousel';

export default function ArchiveMobile({
	className = '',
}: {
	className?: string;
}) {
	return (
		<>
			<Carousel 
				section='archive'
				mailable={true}
				images={[
					{   image: '/eg.webp', 
						title: 'Real Estate Marketplace', 
						description: 'A property marketplace with a multi-parameter search system for urban listings in Egypt.', 
						href: 'mailto:hello@jacquelinetruong.dev',
						alt: 'Find out more about what I do!'
					},
					{   image: '/sh.webp', 
						title: 'Hackathon Mobile Landing', 
						description: 'A high-performance quantum event landing page designed with a mobile-first approach.', 
						href: 'mailto:hello@jacquelinetruong.dev',
						alt: 'More on my career.'
					},
					{   image: '/port.webp',
						title: 'Creative Writer Portfolio', 
						description: 'A minimalist, typography-focused digital portfolio designed to highlight narrative work and editorial projects.', 
						href: 'mailto:hello@jacquelinetruong.dev',
						alt: "My current project in the works!"
					},
					{   image: '/hh.webp', 
						title: 'Hackathon Auth Flow', 
						description: 'A streamlined, secure login and onboarding experience designed for a hackathon initiative.', 
						href: 'mailto:hello@jacquelinetruong.dev',
						alt: 'My skills & proficiencies'
					},
					{   image: '/acc.webp', 
						title: 'Retail E-commerce Experience', 
						description: 'A digital store featuring dynamic product galleries, type-selection, and a conversion-optimized checkout flow.', 
						href: 'mailto:hello@jacquelinetruong.dev',
						alt: 'What I do outside of work.'
					},
					{   image: '/lcs.webp', 
						title: 'Club Brand & Web Identity', 
						description: 'A foundational digital ecosystem for a Computer Science organization, with established brand identity, custom assets, and a scalable design system.', 
						href: 'mailto:hello@jacquelinetruong.dev',
						alt: 'What I do outside of work.'
					},
					{   image: '/ak.webp', 
						title: 'Digital Art Gallery', 
						description: 'A transformation of visual identity from a Kazakh art history & culture book into a full web experience.', 
						href: 'mailto:hello@jacquelinetruong.dev',
						alt: 'What I do outside of work.'
					},
				]}
			/>
		</>
	)
}
