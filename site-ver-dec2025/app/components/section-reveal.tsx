'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type SectionRevealProps = {
	children: ReactNode;
	className?: string;
	fadeDistance?: number;        // how far elements slide in/out
	fadeStart?: number;           // scroll progress to start fade-in
	fadeEnd?: number;             // scroll progress to start fade-out
	onEnter?: () => void;
	onLeave?: () => void;
};

// function for animating how sections fade in and out 
export function SectionReveal({
	children,
	className = '',
	fadeDistance = 40,
	fadeStart = 0,
	fadeEnd = 0.5,
	onEnter,
	onLeave,
}: SectionRevealProps) {
	const ref = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});

	// map scroll progress to opacity and y offset
	const opacity = useTransform(
		scrollYProgress,
		[fadeStart, fadeEnd, 1],
		[0, 1, 0]
	);

	const y = useTransform(
		scrollYProgress,
		[fadeStart, fadeEnd, 1],
		[fadeDistance, 0, -fadeDistance]
	);

	

	return (
		<motion.section
			ref={ref}
			style={{ opacity, y }}
			className={`w-full will-change-transform ${className}`}
		>
			{children}
		</motion.section>
	);
}
