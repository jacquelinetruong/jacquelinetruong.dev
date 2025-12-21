'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type RevealProps = {
    children: ReactNode;
    delay?: number;
    className?: string;
};

export function Reveal({
    children,
    delay = 0,
    className = '',
}: RevealProps) {
    return (
        <motion.div
            className={`w-full h-full ${className}`}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
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