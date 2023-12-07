import React from 'react';
import Slider from 'react-slick';
import { Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const Calendar = () => {
  const months = [
    ["January", "2023-01-01",],
    ["February", "2023-02-01",],
    ["March", "2023-03-01",],
    ["April", "2023-04-01",],
    ["May", "2023-05-01",],
    ["June", "2023-06-01",],
    ["July", "2023-07-01",],
    ["August", "2023-08-01",],
    ["September", "2023-09-01",],
    ["October", "2023-10-01",],
    ["November", "2023-11-01",],
    ["December", "2023-12-01",],
  ]

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <Slider {...settings}>
      {months.map((month, index) => (
        <div key={index}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={dayjs(month[1])}
                minDate={dayjs(month[1]).startOf("month")}
                maxDate={dayjs(month[1]).endOf("month")}
                dayOfWeekFormatter={(_day, weekday) => `${weekday.format("dd")}`}
                views={['day']}
                sx={{
                  width: "350px",
                  // height: "400px",
                  minHeight: "400px",

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
                  ".MuiDayCalendar-weekDayLabel": {
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
                  ".MuiPickersArrowSwitcher-root": { // buttons < > on header
                    display: "none",
                  },
                  ".MuiPickersDay-root": {
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
                  }
                }}
              />

            </LocalizationProvider>
          </Paper>
        </div>
      ))}
    </Slider>
  );
};

export default Calendar;
