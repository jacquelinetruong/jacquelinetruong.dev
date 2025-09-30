'use client';

import Grid from "./grid";
import Clock from "./clock";
import Image from "next/image";

import './../../../public/default-arrow.svg';
import './../../../public/default flower.svg';
import './../../../public/default hero jt.svg';

const Hero = () => {
  return (
    <>
      <Grid>
        <div className="col-start-2 col-span-1 row-start-2 row-span-1 px-4 py-8 flex flex-col justify-between w-full h-full z-50 pointer-events-none">
          <div className="flex flex-col">
            <p className="font-jakarta">based in Toronto, CA</p>
            <div className="font-geist font-semibold text-wrap w-full h-full flex gap-2 items-start flex-col sm:flex-row">
              <Image
                src="/default-arrow.svg"
                alt="arrow icon"
                width={16}
                height={16}
              />
              <Clock />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-jakarta">status</p>
            <div className="w-full h-full flex gap-2 items-start flex-col sm:flex-row">
              <Image
                src="/default-arrow.svg"
                alt="arrow icon"
                width={16}
                height={16}
              />
              <p className="font-geist font-semibold text-wrap">open to work</p>
            </div>
          </div>
        </div>

        <div className="col-start-3 col-span-2 row-start-2 row-span-1 px-4 py-8 flex flex-col justify-between w-full h-full z-50 pointer-events-none">
          <div className="flex flex-col">
            <p className="font-jakarta">currently</p>
            <div className="w-full h-full flex gap-2 items-start flex-col sm:flex-row">
              <Image
                src="/default-arrow.svg"
                alt="arrow icon"
                width={16}
                height={16}
              />
              <p className="font-geist font-semibold text-wrap">UX/UI Designer @ MobCoder,</p>
            </div>
            <div className="w-full h-full flex gap-2 items-start flex-col sm:flex-row">
              <Image
                src="/default-arrow.svg"
                alt="arrow icon"
                width={16}
                height={16}
              />
              <p className="font-geist font-semibold text-wrap">chief creative officer @ Konfer</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-jakarta">education</p>
            <div className="w-full h-full flex gap-2 items-start flex-col sm:flex-row">
              <Image
                src="/default-arrow.svg"
                alt="arrow icon"
                width={16}
                height={16}
              />
              <p className="font-geist font-semibold text-wrap">BSc Computer Science @ Wilfrid Laurier University</p>
            </div>
          </div>
        </div>
        <div className="col-start-5 col-span-3 row-start-1 row-span-1 py-20 w-full h-full z-50 pointer-events-none">
          <Image
                  src="/default flower.svg"
                  alt="flower"
                  width={780.19}
                  height={640}
          />
        </div>
      </Grid>

      <div className="absolute w-full bottom-0">
        <Image
          src="/default hero jt.svg"
          alt="jacqueline truong typography"
          width={1920}
          height={237.79}
          className="w-full h-auto object-contain"
        />
      </div>
    </>
  );
};

export default Hero;
