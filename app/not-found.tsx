'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useTheme } from './components/theme-context';
import { useRouter } from 'next/navigation';
import Cat from '@/app/components/icons/cat-icon';

export default function NotFound() {
    // ensure always light mode
    const { setTheme } = useTheme();
    useEffect(() => {
        setTheme('light');
    }, [setTheme]);

    const router = useRouter();

    return (
        <main className='h-screen flex flex-col gap-24 items-center justify-between pt-(--nav-height)'>
            <div className='w-full h-full flex flex-col items-center justify-center px-8 lg:px-40'>
                <div className='z-40'>
                    {/* 404 */}
                    <div className='flex flex-row gap-4 w-full h-fit items-center translate-y-4'>
                        <Cat className='size-32 text-(--nice-grey) pointer-events-none'/>
                        <h1 className='text-6xl font-semibold text-(--nice-grey)'>404</h1>
                    </div>

                    <div className='flex flex-col pl-8 gap-8'>
                        {/* text */}
                        <div className='flex flex-col gap-4'>
                            <h2 className='text-3xl font-[650] text-(--black)'>Oops! Page not found.</h2>
                            <p className='text-base text-(--dark-mode-grey) w-2/3'>The page you were looking for was moved or doesn't exist anymore.</p>
                        </div>

                        {/* back to home */}
                        <div className='relative z-50 pointer-events-auto'>
                            <button
                                onClick={() => router.push('/')}
                                className='font-medium text-base 3xl:text-lg text-white
                                        flex flex-row gap-2 items-center
                                        w-fit h-fit px-6 py-3.5 rounded-full 2xl:px-8 2xl:py-4 
                                        bg-(--black) hover:bg-(--dark-grey)
                                        transition-colors duration-300'
                            >	
                                Back to home
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* name */}
            <div className='hidden lg:block lg:w-full lg:h-full lg:relative pointer-events-none z-0'>
                <Image 
                    src='/404-jacqueline.svg'
                    alt='jacqueline'
                    fill
                    draggable={false}
                    className='object-contain object-bottom'
                />
            </div>
        </main>
    );
}