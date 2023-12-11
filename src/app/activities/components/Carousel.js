"use client";

import React, { useCallback } from "react";
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

export default function Carousel() {
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
            <Box sx={emblaSlideSx}>Slide 1</Box>
            <Box sx={emblaSlideSx}>Slide 2</Box>
            <Box sx={emblaSlideSx}>Slide 3</Box>
          </Box>
        </div>
        <button className="embla__prev" onClick={scrollPrev}>
          Prev
        </button>
        <button className="embla__next" onClick={scrollNext}>
          Next
        </button>
      </Box>
    </Box>
  );
}
