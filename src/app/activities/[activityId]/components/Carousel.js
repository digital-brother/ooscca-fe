"use client";

import React, { createContext, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Box from "@mui/material/Box";

export const EmblaApiContext = createContext(undefined);

export default function Carousel({ children, viewportSx }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    watchDrag: false,
    startIndex: 4,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <EmblaApiContext.Provider value={{ scrollPrev, scrollNext }}>
      <Box className="embla" sx={{ overflow: "hidden" }}>
        <Box className="embla__viewport" ref={emblaRef} sx={viewportSx}>
          <Box className="embla__container" sx={{ display: "flex" }}>
            {React.Children.map(children, (child, index) => (
              <Box className="embla__slide" key={index} sx={{ flex: "0 0 100%", minWidth: 0 }}>
                {child}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </EmblaApiContext.Provider>
  );
}
