'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import CatDefault from '@/public/cat.svg';
import CatAnnoyed from '@/public/cat-annoyed.svg';
import CatConfused from '@/public/cat-confused.svg';
import CatCry from '@/public/cat-cry.svg';
import CatSleep from '@/public/cat-sleep.svg';
import CatSus from '@/public/cat-sus.svg';
import CatYawn from '@/public/cat-yawn.svg';

const cats = [
    CatDefault,
    CatAnnoyed,
    CatConfused,
    CatCry,
    CatSleep,
    CatSus,
    CatYawn,
];

export default function CatSecret() {
    const [index, setIndex] = useState(0);
    const lastClickRef = useRef(0);

    const handleClick = () => {
        const now = Date.now();

        if (now - lastClickRef.current < 300) return;
        lastClickRef.current = now;

        setIndex(i => (i + 1) % cats.length);
    };

    return (
        <button
            type='button'
            onClick={handleClick}
            className='w-full h-full cursor-pointer'
        >
            <AnimatePresence mode='wait'>
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className='relative w-full h-full flex items-center justify-center text(--alt-text-colour)'
                >
                    <Image
                        src={cats[index]}
                        alt='secret cat'
                        fill
                        className='object-contain object-center'
                        draggable={false}
                        priority
                    />
                </motion.div>
            </AnimatePresence>
        </button>
    )
}