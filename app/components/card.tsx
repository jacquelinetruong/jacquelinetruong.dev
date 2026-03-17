// TODO: MOBILE
// template component used for card previews (used by archive section & extras page)
'use client';
import { useMediaQuery } from './media-query';


type CardProps = {
    className?: string;
    image: string;
    title?: string;
    description: string;
    gradient?: boolean;
};

export default function Card({
    className = '',
    image,
    title,
    description,
    gradient = false,
 }: CardProps) { 

    // ------ VIEWPORT DISPLAY ------ //
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    return (
        <div className='relative block w-full h-full group overflow-hidden bg-[#131319]/0 transition-colors duration-300 hover:bg-[#131319]/40 pointer-events-auto'>
            {/* cover image */}
            <img
                src={image}
                alt={`${title} preview`}
                className='absolute inset-0 w-full h-full object-cover object-center
                            transition-transform duration-500 ease-out'
                draggable={false}
            />

            {/* gradient for readability */}
            {gradient && (
                <div className='absolute inset-0 bg-gradient-to-t from-(--dark-black)/70 from-5% via-(--dark-black)/55 via-16% to-transparent to-40%
                                pointer-events-none transition duration-300'/>
            )}
            
            {/* title */}
            <h3 className='absolute bottom-0 left-0 w-full p-6 font-medium text-(--white) text-md truncate'>{title}</h3>

            {/* hover: card details */}
            <div className='absolute inset-0 bg-(--text-colour)/0 transition duration-500 group-hover:bg-(--white)'/>
            <p className='absolute inset-0 p-6 place-self-center flex flex-col gap-2 w-4/5
                            text-xs xl:text-sm text-(--dark-black) font-medium text-wrap drop-shadow-xs
                            opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                            transition-all duration-200'>
                {description}
            </p>
        </div>
    )
}