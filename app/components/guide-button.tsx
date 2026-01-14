import GuideArrow from './icons/guide-arrow';
import { Reveal } from './reveal';

type GuideProps = {
    text?: string;
    id?: string;
};

export default function GuideButton({ 
    text = '',
    id = '',
}: GuideProps) {
    return (
        <Reveal delay={8} className='flex flex-col justify-end items-center'>
            <button 
                onClick={() => {
                        document.getElementById(`${id}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                className='font-medium text-(--text-colour) cursor-pointer
                            flex flex-col items-center gap-2
                            p-8 size-fit
                            animate-jump group'			  
            >
                <p className='text-sm 2xl:text-base group-hover:text-(--light-mode-grey) transform-colors duration-300'>{text}</p>
                <GuideArrow className='size-[24px] text-(--text-colour) group-hover:text-(--light-mode-grey) transition-colors duration-300'/>
            </button>
        </Reveal>
    );
}
        