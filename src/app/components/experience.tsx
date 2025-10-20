import Grid from "./grid";
import Image from "next/image";

import '@/public/default-arrow.svg';
import '@/public/default-flower.svg';
import '@/public/default-experience.svg';

// will need to integrate this with Notion CMS later
function Experience() {
    return (
        <>
        <Grid>
            {/* experience list/menu */}
            <div className=" col-start-2 col-span-1 row-start-2 row-span-1 px-4 py-8 flex flex-col justify-between w-full h-full z-50 pointer-events-none">
                <div className="flex flex-col">
                    {/* work experience */}
                    <p className="font-jakarta">work</p>
                    <div className="font-geist font-semibold text-wrap w-full h-full flex gap-2 items-start flex-col sm:flex-row">
                        <Image
                            src="/default-arrow.svg"
                            alt="arrow icon"
                            width={16}
                            height={16}
                        />
                        <p className="font-geist font-semibold text-wrap">MobCoder</p>
                    </div>
                    <div className="font-geist font-semibold text-wrap w-full h-full flex gap-2 items-start flex-col sm:flex-row">
                        <Image
                            src="/default-arrow.svg"
                            alt="arrow icon"
                            width={16}
                            height={16}
                        />
                        <p className="font-geist font-semibold text-wrap">Konfer</p>
                    </div>
                    <div className="font-geist font-semibold text-wrap w-full h-full flex gap-2 items-start flex-col sm:flex-row">
                        <Image
                            src="/default-arrow.svg"
                            alt="arrow icon"
                            width={16}
                            height={16}
                        />
                        <p className="font-geist font-semibold text-wrap">Civiconnect</p>
                    </div>
                </div>
                {/* extracurricular experience */}
                <div className="flex flex-col">
                    <p className="font-jakarta">extracurricular</p>
                    <div className="font-geist font-semibold text-wrap w-full h-full flex gap-2 items-start flex-col sm:flex-row">
                        <Image
                            src="/default-arrow.svg"
                            alt="arrow icon"
                            width={16}
                            height={16}
                        />
                        <p className="font-geist font-semibold text-wrap">HawkHacks</p>
                    </div>
                </div>
            </div>

            {/* selected experience details */}
            <div className="col-start-3 col-span-3 row-start-2 row-span-2 px-4 py-8 flex flex-col gap-4 w-full h-full z-50 pointer-events-none">
                {/* position title; time span */}
                <div className="flex flex-col">
                    <div className="flex flex-row gap-1">
                        <p className="font-jakarta">UI/UX Designer</p>
                        <p className="font-geist font-semibold">@ MobCoder</p>
                    </div>
                    <div className="font-geist font-semibold text-wrap w-full h-full flex gap-2 items-start flex-col sm:flex-row">
                        <Image
                            src="/default-arrow.svg"
                            alt="arrow icon"
                            width={16}
                            height={16}
                        />
                        <p className="font-geist font-semibold text-[#949494] text-wrap">june 2025 - present</p>
                    </div>
                </div>

                {/* position description */}
                <div className="font-jakarta flex flex-col gap-4 px-4">
                    <li>blurb about what I do/did in this role. give numbers, use star method, or just copy what is currently in resume point. make sound good lol</li>
                    <li>blurb about what I do/did in this role. give numbers, use star method, or just copy what is currently in resume point. make sound good lol. blurb about what I do/did in this role. give numbers, use star method, or just copy what is currently in resume point. make sound.</li>
                    <li>blurb about what I do/did in this role. give numbers, use star method, or just copy what is currently in resume point. make sound good lol. blurb about what I do/did in this role. give numbers, use star method, or just copy what is currently in resume point. make sound good lol. </li>
                </div>
            </div>

        <div className="absolute bottom-0 right-0">
            <Image
                src="/default-experience.svg"
                alt="experience typography"
                width={945.36}
                height={232.3}
            />
        </div>
        </Grid>
        </>
    );
};

export default Experience;