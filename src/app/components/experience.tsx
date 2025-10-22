'use client';

import { experience, Experience as ExperienceType } from "@/app/data/experience";
import Grid from "./grid";
import Image from "next/image";
import { useState } from "react";

const ExperienceSection = () => {
  const [selected, setSelected] = useState<ExperienceType>(experience[0]);

  return (
    <Grid>
      {/* experience list/menu */}
      <div className="col-start-2 col-span-1 row-start-2 row-span-1 px-4 py-8 flex flex-col justify-between w-full h-full z-50">
        {/* work experience */}
        <div className="flex flex-col gap-2">
          <p className="font-jakarta mb-1">work</p>
          {experience.map((exp, index) => (
            <button
              key={index}
              onClick={() => setSelected(exp)}
              className={`font-geist font-semibold w-full flex gap-2 items-center text-left transition-all ${
                selected.company === exp.company
                  ? "text-black"
                  : "text-[#949494] hover:text-black"
              }`}
            >
              <Image
                src="/default-arrow.svg"
                alt="arrow icon"
                width={16}
                height={16}
              />
              <span>{exp.company}</span>
            </button>
          ))}
        </div>

        {/* extracurricular experience (static for now; might remove) */}
        <div className="flex flex-col gap-2">
          <p className="font-jakarta">extracurricular</p>
          <div className="font-geist font-semibold flex gap-2 items-center text-[#949494]">
            <Image
              src="/default-arrow.svg"
              alt="arrow icon"
              width={16}
              height={16}
            />
            <span>HawkHacks</span>
          </div>
        </div>
      </div>

      {/* selected experience details */}
      <div className="col-start-3 col-span-3 row-start-2 row-span-2 px-4 py-8 flex flex-col gap-4 w-full h-full z-50">
        {/* role title; time span */}
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2 flex-wrap">
            <p className="font-jakarta">{selected.role}</p>
            <p className="font-geist font-semibold">@ {selected.company}</p>
          </div>
          <div className="font-geist font-semibold flex flex-row gap-2 items-center text-[#949494]">
            <Image
              src="/default-arrow.svg"
              alt="arrow icon"
              width={16}
              height={16}
            />
            <p>{selected.duration}</p>
          </div>
        </div>

        {/* role description */}
        <ul className="font-jakarta flex flex-col gap-3 px-4 list-disc list-outside">
          {selected.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>

      {/* title typography */}
      <div className="absolute bottom-0 right-0 pointer-events-none">
        <Image
          src="/default-experience.svg"
          alt="experience typography"
          width={945.36}
          height={232.3}
        />
      </div>
    </Grid>
  );
};

export default ExperienceSection;