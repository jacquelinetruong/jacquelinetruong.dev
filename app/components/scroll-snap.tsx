'use client'

import { usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import { useMediaQuery } from './media-query'

// makes lenis smooth scroll and snap to sections on desktop
export function LenisSnap() {
	const pathname = usePathname()
	const shouldSnap =
		pathname === '/' ||
		pathname === '/work' ||
		pathname === '/about' ||
		pathname === '/extras';

	const isDesktop = useMediaQuery('(min-width: 1024px)')
	const lenis = useLenis()

	const timeoutId = useRef<number | null>(null)

	// reset scroll when navigating pages
	useEffect(() => {
		if (!lenis) return

		lenis.scrollTo(0, { immediate: true })

	}, [pathname, lenis])

	// get nav height for offset
	const getNavHeight = () =>
		parseFloat(
			getComputedStyle(document.documentElement)
				.getPropertyValue('--nav-height')
		) || 0

	// snap logic
	useEffect(() => {
		if (!lenis || !isDesktop || !shouldSnap) return

		const getSnapPoints = () => {
			const navHeight = getNavHeight()

			return Array.from(
				document.querySelectorAll<HTMLElement>('.section')
			).map(
				section =>
					section.getBoundingClientRect().top + lenis.scroll - navHeight
			)
		}

		let snapPoints = getSnapPoints()

		const onScroll = () => {
			if (timeoutId.current) window.clearTimeout(timeoutId.current)

			timeoutId.current = window.setTimeout(() => {
				// don’t snap while lenis is still scrolling (prevents nav hijack)
				if (lenis.velocity !== 0) return

				snapPoints = getSnapPoints()

				const current = lenis.scroll
				const nearest = snapPoints.reduce((prev, curr) =>
					Math.abs(curr - current) < Math.abs(prev - current)
						? curr
						: prev
				)

				const distance = Math.abs(nearest - current)

				// snap only when in range
				if (distance < 20) return;

				lenis.scrollTo(nearest, {
					duration: 0.6,
					easing: t => 1 - Math.pow(1 - t, 3),
				});
			}, 120);
		
		};

		lenis.on('scroll', onScroll)
		window.addEventListener('resize', () => {
			snapPoints = getSnapPoints()
		})

		return () => {
			lenis.off('scroll', onScroll)
			if (timeoutId.current) window.clearTimeout(timeoutId.current)
		}
	}, [lenis, isDesktop, shouldSnap])

	return null
}