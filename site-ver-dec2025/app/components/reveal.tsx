'use client';

import { motion, MotionProps, useAnimation } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

type RevealProps = {
    children: ReactNode;
    delay?: number;
    animateTrigger?: any;
    className?: string;
};

export function Reveal({
    children,
    delay = 0,
    animateTrigger,
    className = '',
}: RevealProps) {

    const controls = useAnimation();

    useEffect(() => {
        if (animateTrigger !== undefined) {
            controls.start({ opacity: [0, 1], scale: [0.96, 1], transition: { duration: 0.5, delay } });
        }
    }, [animateTrigger, controls, delay]);

    const motionProps: MotionProps =
        animateTrigger !== undefined
            ? { animate: controls }
                : { whileInView: { opacity: 1, scale: 1 }, viewport: { once: false, amount: 0.2 } };
    return (
        <motion.div
            className={`w-full h-full ${className}`}
            initial={{ opacity: 0, scale: 0.96 }}
            {...motionProps}
            transition={{
                duration: 0.5,
                delay,
                ease: 'easeOut',
            }}
        >
            {children}
        </motion.div>
    );
}