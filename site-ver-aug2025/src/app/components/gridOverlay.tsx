const GridOverlay = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-auto grid grid-cols-[64px_repeat(5,_1fr)_64px] grid-rows-[180px_repeat(2,_1fr)_180px]">
      {Array.from({ length: 7 * 4 }).map((_, index) => {
        const col = (index % 7) + 1;
        const row = Math.floor(index / 7) + 1;

        return (
          <div
            key={index}
            className="border border-solid border-[#94949425] hover:bg-[#FFFFFF50] transition duration-150 z-0"
            style={{
              gridColumnStart: col,
              gridRowStart: row,
            }}
          />
        );
      })}
    </div>
  );
};

export default GridOverlay;
