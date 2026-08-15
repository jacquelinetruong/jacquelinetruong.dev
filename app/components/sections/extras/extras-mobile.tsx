'use client';

import Carousel from '../../carousel';

export default function ExtrasMobile({
	className = '',
	isLoading = false,
}: {
	className?: string;
	isLoading?: boolean;
}) {
	return (
		<>
			<Carousel 
				section='extras'
				title='moments out of office'
				description="A collection of hobbies and favourites from my camera roll. Each photo represents a little bit of me, offline."
				images={[
					{   image: '/summer-person.webp', 
						description: 'A collection of hobbies and favourites from my camera roll. Each photo represents a little bit of me, offline.',
					},
					{   image: '/tranquil-outdoors.webp', 
						description: 'On a constant quest to find tranquil escapes.',
					},
					{   image: '/current-keyboard-built-by-me.webp',
						description: 'A new hobby: tinkering with my latest keyboard build.',
					},
					{   image: '/fav-nails-by-me.webp',
						description: 'One of my creative outlets—a monthly nailset.',
					},
					{   image: '/perfect-table-spread.webp',
						description: "Camera eats first (pics or it didn't happen).",
					},
					{   image: '/always-matcha.webp',
						description: 'Never skipping my daily matcha/coffee fix.',
					},
					{   image: '/sweet-treats.webp',
						description: "There's always room for dessert.",
					},
				]}
			/>

			<Carousel 
				section='artworks'
				title='painting my dreams'
				description="When I'm not designing digital experiences, I'm busy recreating the fantasy world of my dreams—literally. These are a few of my proudest pieces; I hope they spark the same wistful longing in you, too."
				images={[
					{   image: '/falls.webp', 
						description: "Sent to collect ground data from the abandoned Earth, my original character, Cobalt, experiences what no one from her planet ever will—water. Part of my 'Discovery' work series.",
					},
					{   image: '/pond.webp', 
						description: "My original character, Tenebris, stumbles upon a hidden gem in the forest, finding himself a new emotion: serenity. Feels like he could stay here forever. Part of my 'Discovery' work series.",
					},
					{   image: '/statue.webp',
						description: "DX-52, my original character, starts to understand the key to saving his planet—leaving it untouched. Part of my 'Discovery' work series.",
					},
					{   image: '/acrylic.webp',
						description: "Love on opposing sides of the riverbed. However, one fails to take the leap past its fears.",
					},
					{   image: '/torii.webp',
						description: "The path to enlightenment. Part of my 'Discovery' work series.",
					},
				]}
			/>
		</>	
	);
}
