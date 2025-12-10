'use client';

import Image from 'next/image';

import '../../public/jt-logo-black.svg';
import '../../public/jt-logo-white.svg';


export default function Navbar() {
    return (
        <>
            <div className='font-inter font-medium text-xl
                            p-4 z-100 
                            flex flex-row justify-between items-center'>
                {/* left side */}
                <div className='flex flex-row gap-16 items-center'>
                    <Image
                        src='/jt-logo-black.svg'
                        alt='site logo'
                        width={72.64}
                        height={50}
                    />
                    {/* nav items */}
                    <div className='flex flex-row gap-8'>
                        <a href='#home'>Home</a>
                        <a href='#about'>About</a>
                        <a href='#portfolio'>Portfolio</a>
                        <a href='#experience'>Experience</a>
                        <a href='#daily'>Daily</a>
                    </div>
                </div>

                {/* right side */}
                <div className='flex flex-row gap-8'>
                    <a target='_blank' href=''>Resume</a>
                    <a target='_blank' href='https://www.linkedin.com/in/jacquellinetruong'>LinkedIn</a>
                    <a target='_blank' href='https://github.com/jacquelinetruong'>GitHub</a>
                </div>
            </div>
        </>
    );
}