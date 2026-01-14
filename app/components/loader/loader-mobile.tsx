'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import Grid from '../grid';


type LoaderProps = {
	isLoading: boolean;
	isDesktop: boolean;
};

// function for mobile loading screen!
export default function LoaderMobile({ isLoading, isDesktop }: LoaderProps) {
    const STEP = 0.4;

    return (
        <AnimatePresence>
            {(isLoading && !isDesktop) && (
                <motion.div
                    className='fixed inset-0 z-[9999] bg-white pt-(--nav-height)'
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, ease: 'easeInOut' }}
                    >
                    <Grid>
                        {[

                            // TOP → DOWN (col 3)
                            { row: 1, col: 3, delay: STEP * 1 },
                            { row: 2, col: 3, delay: STEP * 2 },

                            // BOTTOM → UP (col 3)
                            { row: 4, col: 3, delay: STEP * 0 },
                            { row: 3, col: 3, delay: STEP * 1 },
                            { row: 2, col: 3, delay: STEP * 2 },
                        ].map((cell, i) => (
                            <div
                                key={i}
                                className={`col-start-${cell.col} row-start-${cell.row} relative w-full h-full`}
                            >
                                {/* black logo */}
                                <motion.div
                                    className='absolute size-full'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{
                                    duration: 1,
                                    delay: cell.delay,
                                    repeat: 0,
                                    }}
                                >
                                    <Image
                                        src='/jt-logo-black.svg'
                                        alt='my site logo in black'
                                        fill
                                        draggable={false}
                                    />
                                </motion.div>

                                {/* grey logo */}
                                <motion.div
                                    className='absolute size-full'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 0.6, 0] }}
                                    transition={{
                                    duration: 1.8,
                                    delay: cell.delay + 0.2,
                                    repeat: 0,
                                    }}
                                >
                                    <Image
                                        src='/jt-logo-grey.svg'
                                        alt='my site logo in grey'
                                        fill
                                        draggable={false}
                                    />
                                </motion.div>
                            </div>
                        ))}
                    </Grid>
                </motion.div>
            )}
        </AnimatePresence>
    )
}