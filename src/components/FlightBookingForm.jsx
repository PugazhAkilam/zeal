import React, { useState } from 'react';
import { Box, Button, Typography, Grid, TextField } from '@mui/material';
import TripTypeSection from './FormSections/TripTypeSection';
import DateSection from './FormSections/DateSection';
import PassengerSection from './FormSections/PassengerSection';


const FlightBookingForm = () => {
  const [tripType, setTripType] = useState('Single');
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [segment1Date, setSegment1Date] = useState(null);
  const [segment2Date, setSegment2Date] = useState(null);
  const [segment3Date, setSegment3Date] = useState(null);

  return (
    <Box >
      <Box >
        <Typography variant="h6" gutterBottom>
          Flight Booking Form
        </Typography>

        <TripTypeSection tripType={tripType} setTripType={setTripType} />

        <DateSection
          tripType={tripType}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          segment1Date={segment1Date}
          setSegment1Date={setSegment1Date}
          segment2Date={segment2Date}
          setSegment2Date={setSegment2Date}
          segment3Date={segment3Date}
          setSegment3Date={setSegment3Date}
        />

        <PassengerSection />

        <TextField
          fullWidth
          label="Remarks"
          placeholder="Enter any additional notes or remarks here..."
          multiline
          rows={3}
          margin="normal"
          sx={{
            width: { xs: '100%', md: '815px' },
       
          }}
        />

        <Grid container spacing={2} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={6} sx={{ maxWidth: '300px' }}>
            <Button variant="contained" color="error" fullWidth>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6} sx={{ maxWidth: '300px' }}>
            <Button variant="contained" color="success" fullWidth>
              Book Flight
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FlightBookingForm;
