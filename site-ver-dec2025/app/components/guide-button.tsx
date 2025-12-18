import GuideArrow from './icons/guide-arrow';

type GuideProps = {
    text?: string;
    href?: string;
};

export default function GuideButton({ 
    text = '',
    href = '',
}: GuideProps) {
    return (
        <a className='font-inter font-medium text-(--text-colour)
                        flex flex-col items-center gap-2
                        p-8 size-fit
                        animate-jump group'
            href={href}			  
        >
            <p className='group-hover:text-(--light-mode-grey) transform-colors duration-300'>{text}</p>
            <GuideArrow className='size-[28px] text-(--text-colour) group-hover:text-(--light-mode-grey) transition-colors duration-300'/>
        </a>
    );
}
        