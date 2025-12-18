'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type RevealProps = {
    children: ReactNode;
    delay?: number;
    className?: string;
    onViewportEnter?: () => void;
    onViewportLeave?: () => void;
};

export function Reveal({
    children,
    delay = 0,
    className = '',
    onViewportEnter,
    onViewportLeave,
}: RevealProps) {
    return (
        <motion.div
            className={`h-full w-full ${className}`}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{
                duration: 0.5,
                delay,
                ease: 'easeOut',
            }}
            onViewportEnter={onViewportEnter}
            onViewportLeave={onViewportLeave}
        >
            {children}
        </motion.div>
    );
}