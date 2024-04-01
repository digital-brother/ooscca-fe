import { useCallback, useEffect, useState } from 'react';

export const useDotButton = (emblaApi) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onDotButtonClick = useCallback(
    (index) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    const onInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect(); // Update selected index on init
    };

    onInit();
    emblaApi.on('select', onSelect);
    emblaApi.on('init', onInit);

    return () => {
      if (emblaApi) {
        emblaApi.off('select', onSelect);
        emblaApi.off('init', onInit);
      }
    };
  }, [emblaApi]);

  return { selectedIndex, scrollSnaps, onDotButtonClick };
};