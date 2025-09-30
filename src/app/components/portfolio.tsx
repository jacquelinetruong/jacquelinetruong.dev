import Grid from "./grid";
import Image from "next/image";

import './../../../public/alt-arrow.svg';
import './../../../public/default flower.svg';
import './../../../public/default portfolio.svg';

const Portfolio = () => {
  return (
    <>
      <Grid className="bg-[#0F0F0E] text-[#DDDDDD]">
        <div className=" col-start-2 col-span-1 row-start-2 row-span-1 px-4 py-8 flex flex-col justify-between w-full h-full z-50 pointer-events-none">
          <div className="flex flex-col">
            <p className="font-jakarta">(UI/UX design focus)</p>
            <div className="font-geist font-semibold text-wrap w-full h-full flex gap-2 items-start flex-col sm:flex-row">
              <Image
                src="/alt-arrow.svg"
                alt="arrow icon"
                width={16}
                height={16}
              />
              <p className="font-geist font-semibold text-wrap">portfolio</p>
            </div>
          </div>
        </div>

        <div className=" col-start-3 col-span-1 row-start-2 row-span-1 px-4 py-8 flex flex-col justify-between w-full h-full z-50 pointer-events-none">
          <div className="flex flex-col">
            <p className="font-jakarta">(programmer focus)</p>
            <div className="font-geist font-semibold text-wrap w-full h-full flex gap-2 items-start flex-col sm:flex-row">
              <Image
                src="/alt-arrow.svg"
                alt="arrow icon"
                width={16}
                height={16}
              />
              <p className="font-geist font-semibold text-wrap">projects</p>
            </div>
          </div>
        </div>
      </Grid>

      <div className="absolute bottom-0">
        <Image
          src="/default portfolio.svg"
          alt="portfolio typography"
          width={945.36}
          height={232.3}
        />
      </div>
    </>
  );
};

export default Portfolio;
