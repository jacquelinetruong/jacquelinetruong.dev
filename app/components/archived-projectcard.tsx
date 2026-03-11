// TODO: MOBILE
// template component used for archived project card previews (no link)
'use client';
import { useMediaQuery } from './media-query';


type ArchivedProjectCardProps = {
    className?: string;
    image: string;
    title: string;
    description: string;
};

export default function ArchivedProjectCard({
    className = '',
    image,
    title,
    description,
 }: ArchivedProjectCardProps) { 

    // ------ VIEWPORT DISPLAY ------ //
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    return (
        <div className='relative block w-full h-full group overflow-hidden bg-[#131319]/0 transition-colors duration-300 hover:bg-[#131319]/40 pointer-events-auto'>
            {/* cover image */}
            <img
                src={image}
                alt={`${title} preview`}
                className='absolute inset-0 w-full h-full object-cover object-center
                            transition-transform duration-500 ease-out
                            group-hover:scale-115 group-hover:blur-[1.5px]'
                draggable={false}
            />

            {/* gradient for readability */}
            <div className='absolute inset-0 bg-gradient-to-t from-(--dark-black)/70 from-5% via-(--dark-black)/55 via-16% to-transparent to-40%
                            pointer-events-none transition duration-300'/>

            {/* title */}
            <h3 className='absolute bottom-0 left-0 w-full p-6 font-medium text-(--text-colour) text-md truncate'>{title}</h3>

            {/* hover: project details */}
            <div className='absolute inset-0 bg-[#131319]/0 transition duration-300 group-hover:bg-[#131319]/40'/>
            <p className='absolute inset-0 p-6 place-self-center flex flex-col gap-2
                            text-xs xl:text-sm text-white font-medium text-wrap drop-shadow-lg
                            opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                            transition-all duration-200'>
                {description}
            </p>
        </div>
    )
}