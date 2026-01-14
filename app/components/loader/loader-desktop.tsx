'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import Grid from '../grid';


type LoaderProps = {
	isLoading: boolean;
	isDesktop: boolean;
};

// function for desktop loading screen!
export default function LoaderDesktop({ isLoading, isDesktop }: LoaderProps) {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className='fixed inset-0 z-[9999] bg-white'
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                    <div className='translate-y-(--nav-height)'>
                        <Grid>
                            {/* columns */}
                            {[0, 1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className={`col-start-${i + 1} row-start-2 relative w-full h-full`}
                                >
                                    {/* black logo */}
                                    <motion.div
                                        className='absolute size-full'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{
                                            duration: 1.4,
                                            delay: i * 0.4,
                                            repeat: 0,
                                        }}
                                    >
                                        <Image src='/jt-logo-black.svg' alt='my site logo in black' fill draggable={false} className='object-contain object-center px-8 | ultrawide:px-20'/>
                                    </motion.div>

                                    {/* grey logo */}
                                    <motion.div
                                        className='absolute size-full '
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 0.5, 0] }}
                                        transition={{
                                            duration: 1.4,
                                            delay: i * 0.4 + 0.5,
                                            repeat: 0,
                                        }}
                                    >
                                        <Image src='/jt-logo-grey.svg' alt='my site logo in grey' fill draggable={false} className='object-contain object-center px-8 | ultrawide:px-20'/>
                                    </motion.div>
                                </div>
                            ))}
                        </Grid>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}