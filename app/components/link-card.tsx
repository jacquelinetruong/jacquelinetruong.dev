// TODO: MOBILE
// template component used for card previews
'use client';

import { useMediaQuery } from './media-query';
import Link from 'next/link';
import LinkArrow from '@/app/components/icons/link-arrow';


type LinkCardProps = {
    className?: string;
    coverImage: string;
    altText: string;
    hrefId: string;
    big?: boolean;
};

export default function LinkCard({
    className = '',
    coverImage,
    altText,
    hrefId,
    big,
 }: LinkCardProps) { 

    // ------ VIEWPORT DISPLAY ------ //
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    return (
        <Link
            href={hrefId}
            className='relative block w-full h-full group overflow-hidden cursor-pointer'
        >
            {/* cover image */}
            <img
                src={coverImage}
                alt={altText}
                className='absolute inset-0 w-full h-full object-cover object-center
                        transition-transform duration-500 ease-out
                        group-hover:scale-115'
                draggable={false}
            />

            {/* gradient for readability */}
            <div className='absolute inset-0 bg-gradient-to-t from-(--dark-black)/70 from-5% via-(--dark-black)/55 via-16% to-transparent to-40%
                            pointer-events-none transition duration-300'/>

            {/* title */}
            <div className='absolute bottom-0 left-0 w-full p-6
                            flex justify-between items-end text-white'>
                {/* <h3 className='font-medium text-md truncate'>{altText}</h3> */}
                <span className='inline-block px-3 py-1 pointer-events-none
                                    bg-(--black)/20 backdrop-blur-[1px] border border-white rounded-full 
                                    text-nowrap text-[10px] 2xl:text-xs'
                >
                    {altText}
                </span>
                <LinkArrow className={`text-(--white) ${big ? 'size-[54px]' : 'size-[40px]'}`}/>
            </div>
        </Link>
    )
}