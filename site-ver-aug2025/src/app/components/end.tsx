import Grid from "./grid";
import Image from "next/image";

import '../../../public/default-arrow.svg';
import '../../../public/silly-cat-signature.svg';

const End = () => {
    return (
        <Grid>
            <div className="col-start-4 col-span-2 row-start-2 row-span-1 px-4 py-8 flex flex-col justify-between w-full h-full z-50">
                <div className="flex flex-col">
                    <p className="font-jakarta">wanna get to know me better? check out this link:</p>
                    <div className="w-full h-full flex gap-2 items-start flex-col sm:flex-row">
                        <Image
                        src="/default-arrow.svg"
                        alt="arrow icon"
                        width={16}
                        height={16}
                        />
                        {/* need to add link (when finished) */}
                        <a target="_blank" href="" className="font-geist font-semibold text-wrap">personal blog</a>
                    </div>
                </div>

                <div className="flex flex-col">
                    <p className="font-jakarta">thanks for visiting! let's keep in touch:</p>
                    <div className="w-full h-full flex gap-2 items-start flex-col sm:flex-row">
                        <Image
                        src="/default-arrow.svg"
                        alt="arrow icon"
                        width={16}
                        height={16}
                        />
                        <a target="_blank" href="https://www.linkedin.com/in/jacquellinetruong" className="font-geist font-semibold text-wrap">linkedin</a>
                    </div>
                    <div className="w-full h-full flex gap-2 items-start flex-col sm:flex-row">
                        <Image
                        src="/default-arrow.svg"
                        alt="arrow icon"
                        width={16}
                        height={16}
                        />
                        <a target="_blank" href="mailto:hello@jacquelinetruong.dev" className="font-geist font-semibold text-wrap">email</a>
                    </div>
                </div>
            </div>
            {/* silly doodle */}
            <div className="absolute bottom-0 right-0 pointer-events-none">
                <Image
                    src="/silly-cat-signature.svg"
                    alt="experience typography"
                    width={1400}
                    height={600}
                />
            </div>
        </Grid>
    )
}

export default End;