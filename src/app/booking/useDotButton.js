import React, { useCallback, useEffect, useState } from 'react'
import {IconButton} from "@mui/material";
import {Box} from "@mui/system";
import {useTheme} from "@mui/material/styles";

export const useDotButton = (emblaApi) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const onDotButtonClick = useCallback(
    (index) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick
  }
}

export const DotButton = ({ isSelected, onClick }) => {
  const theme = useTheme();

  const dotIconButtonSx = {
    padding: '15px',
    margin: '0 2px'
  }

  const dotBoxSx = {
    width: 8,
    height: 8,
    borderRadius: '50%',
  }

  return (
    <IconButton onClick={onClick} size="small" sx={dotIconButtonSx}>
      <Box
        sx={{ bgcolor: isSelected ? theme.palette.primary.main : theme.palette.grey[400], ...dotBoxSx}}
      />
    </IconButton>
  );
};