import React, { useState } from 'react';
import Slider from 'react-slick';
import { Paper, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';

import MultiCalendar from "@/app/(homepage)/MultiCalendar";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const Calendar = () => {
  // from backend
  const months = [
    "2023-01-01",
    "2023-02-12",
    "2023-03-01",
    "2023-04-12",
    "2023-05-23",
    "2023-06-01",
    "2023-07-25",
    "2023-08-25",
    "2023-09-01",
    "2023-10-01",
    "2023-11-01",
    "2023-12-01",
    "2024-01-01",
    "2024-02-01",
    "2024-03-01",
    "2024-04-01",
    "2024-05-01",
    "2024-06-01",
    "2024-07-01",
  ];
  const [sliceValues, setSliceValues] = useState([0, 4]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: 1,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          arrows: true,
          slidesToShow: 1
        }
      },
    ]
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    console.log(this);
    console.log(props);

    return (
      <Box
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <Box
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }

  function CustomDataCalendar({date}) {
    return (
      <DateCalendar
      onChange={(newValue) => setValue(newValue)}
      value={dayjs(date)}
      minDate={dayjs(date).startOf("month")}
      maxDate={dayjs(date).endOf("month")}
      dayOfWeekFormatter={(_day, weekday) => `${weekday.format("dd")}`}
      views={['day']}
      disableHighlightToday
      disabled
      sx={{
        width: "330px",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "59px",

        '.MuiPickersCalendarHeader-root': {
          justifyContent: "center",
          m: 0,
          mb: "15px",

          color: "var(--light-primary, var(--bg-black-80, #333))",
          fontFamily: "Inter",
          fontSize: "14.752px",
          fontStyle: "normal",
          fontWeight: "700",
          lineHeight: "normal",

        },
        ".MuiPickersCalendarHeader-labelContainer": {
          justifyContent: "center",
          m: 0,
          color: "var(--light-primary, var(--bg-black-80, #333))",
          fontFamily: "Inter, inherit",
          fontSize: "14.752px",
          fontStyle: "normal",
          fontWeight: "700",
          lineHeight: "normal",
        },
        ".MuiDayCalendar-weekDayLabel ": {
          color: "var(--light-primary, var(--bg-black-80, #333))",
          textAlign: "center",
          fontFamily: "Inter, inherit",
          fontSize: "14.752px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "normal",
          height: "45px",
          width: "45px",
        },
        ".MuiPickersArrowSwitcher-root ": { // buttons < > on header
          display: "none",
        },
        ".MuiPickersDay-root ": {
          opacity: "100%",
          color: '#1565c0',
          borderRadius: 2,
          borderWidth: 1,
          color: "#666",
          textAlign: "center",
          fontFamily: "Inter, inherit",
          fontSize: "14.752px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "normal",
          height: "45px",
          width: "45px",
        },
        ".MuiPickersDay-root.Mui-selected": {
          opacity: "100%",
          borderRadius: "6px",
          backgroundColor: "#FFC50A",
          flexShrink: 0,

          color: "var(--primary-black, #0C0E0F)",
          textAlign: "center",
          fontFamily: "Inter, inherit",
          fontSize: "14.752px",
          fontStyle: "normal",
          fontWeight: "700",
          lineHeight: "normal",
          height: "45px",
          width: "45px",
        },
        ".MuiPickersDay-root.Mui-selected:hover": {
          backgroundColor: "00A8DE",
          opacity: "100%",
        },
        ".MuiPickersSlideTransition-root": {
          height: "300px",
          opacity: "100%",
        }
      }}
    />
    );
  };

  const renderedMonths = months.map((month, index) => (
    <CustomDataCalendar date={month} />
  ));

  return (
    <Slider {...settings}>
      {renderedMonths.map((month, index) => (
        <Box key={index}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {month}
            </LocalizationProvider>
          </Paper>
        </Box>
      ))}
    </Slider>
  );
};

export default Calendar;
