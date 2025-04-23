import React from 'react';
import { Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const DateSection = ({
  tripType,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  segment1Date,
  setSegment1Date,
  segment2Date,
  setSegment2Date,
  segment3Date,
  setSegment3Date,
}) => {
  const datePickerProps = {
    slotProps: {
      textField: {
        fullWidth: true,
        margin: 'normal',
        
      },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {tripType === 'Single' && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DatePicker
              label="Departure Date"
              value={departureDate}
              onChange={(newValue) => setDepartureDate(newValue)}
              {...datePickerProps}
            />
          </Grid>
        </Grid>
      )}

      {tripType === 'Roundtrip' && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DatePicker
              label="Departure Date"
              value={departureDate}
              onChange={(newValue) => setDepartureDate(newValue)}
              {...datePickerProps}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Return Date"
              value={returnDate}
              onChange={(newValue) => setReturnDate(newValue)}
              {...datePickerProps}
            />
          </Grid>
        </Grid>
      )}

      {tripType === 'Multicity' && (
        <Grid container spacing={2}>
          {[
            { value: segment1Date, setter: setSegment1Date },
            { value: segment2Date, setter: setSegment2Date },
            { value: segment3Date, setter: setSegment3Date },
          ].map((segment, index) => (
            <Grid item xs={4} key={index}>
              <DatePicker
                label={`Segment ${index + 1}`}
                value={segment.value}
                onChange={(newValue) => segment.setter(newValue)}
                {...datePickerProps}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </LocalizationProvider>
  );
};

export default DateSection;