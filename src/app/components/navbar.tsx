import '../../../public/transparent logo.svg'
import '../../../public/coffee.svg'
import Image from 'next/image'

function Navbar() {
    return (
        <>
            <div className='font-geist text-xl tracking-tight fixed w-full flex flex-row justify-between px-12 py-6 top-0 z-50'>
                <div className='flex flex-row gap-12 items-center'>
                    <Image
                        src="/transparent logo.svg"
                        alt="hand-drawn site logo"
                        width={70}
                        height={48}
                    />
                    <a href="#portfolio">portfolio</a>
                    <a href="#experience">experience</a>
                    {/* <a href="">resume</a> */}
                    <a href="#moreme">more of me</a>
                </div>
                <div className='flex flex-row gap-12 items-center'>
                    <a target="_blank" href="https://www.linkedin.com/in/jacquellinetruong">linkedin</a>
                    <a target="_blank" href="https://github.com/jacquelinetruong">github</a>
                    <div className='flex flex-row gap-2 items-center'>
                        <Image 
                            src="/coffee.svg"
                            alt="coffee icon"
                            width={28}
                            height={28}
                        />
                        <a target="_blank" href="mailto:hello@jacquelinetruong.dev">let's get a coffee!</a>
                    </div>    
                </div>
            </div>
        </>
    )
}

export default Navbar;