"use client";

import React, { createContext, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Box from "@mui/material/Box";

const emblaSx = {
  overflow: "hidden",
};

const emblaContainerSx = {
  display: "flex",
};

const emblaSlideSx = {
  flex: "0 0 100%",
  minWidth: 0,
};

export const EmblaApiContext = createContext(undefined);

export default function Carousel({ children }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    watchDrag: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <Box sx={{ m: 10 }}>
      <Box sx={emblaSx}>
        <div className="embla__viewport" ref={emblaRef}>
          <Box sx={emblaContainerSx}>
            <EmblaApiContext.Provider value={{ scrollPrev, scrollNext }}>
              {React.Children.map(children, (child, index) => (
                <Box key={index} sx={emblaSlideSx}>
                  {child}
                </Box>
              ))}
            </EmblaApiContext.Provider>
          </Box>
        </div>
      </Box>
    </Box>
  );
}
