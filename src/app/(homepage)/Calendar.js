import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CalendarToday } from '@mui/icons-material';
import { Button, Typography, Grid } from '@mui/material';

const customTheme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 8, // Customize the button border radius
      },
    },
    MuiPickersDay: {
      day: {
        borderRadius: 0, // Customize the day cell border radius
      },
      daySelected: {
        backgroundColor: 'yellow', // Customize the background color of selected day
      },
    },
  },
});

const Calendar = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Typography variant="h4" align="center" gutterBottom>
          Customized Calendar
        </Typography>
        <Grid container spacing={1}>
          {/* Your Calendar content goes here */}
          {/* Example: */}
          <Grid item>
            <Button variant="outlined" startIcon={<CalendarToday />}>
              1
            </Button>
          </Grid>
          {/* ... More days */}
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Calendar;
