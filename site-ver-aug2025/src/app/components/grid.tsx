import React, { ReactNode } from "react";

type GridProps = {
  children: ReactNode;
  className?: string;
};

const Grid = ({ children, className = "" }: GridProps) => {
  return (
    <section
      className={`w-screen h-screen 
                  grid grid-cols-[64px_repeat(5,_1fr)_64px] 
                  grid-rows-[180px_repeat(2,_1fr)_180px] z-10 
                  cursor-default select-none
                  ${className}`}
    >
      {children}
    </section>
  );
};

export default Grid;
