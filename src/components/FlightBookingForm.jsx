import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, TextField, Container, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
const FlightBookingForm = () => {
  const [tripType, setTripType] = useState('Single');
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [segment1Date, setSegment1Date] = useState(null);
  const [segment2Date, setSegment2Date] = useState(null);
  const [segment3Date, setSegment3Date] = useState(null);
 const [fareType, setFareType] = useState('Normal');
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [childrenAge, setChildrenAge] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bookingStatus, setBookingStatus] = useState('Pending');

  const handleSubmit = async () => {
    try {
      const bookingData = {
        tripType,
        fareType,
        departureDate,
        returnDate,
        segment1Date,
        segment2Date,
        segment3Date,
        passengers: {
          adults,
          children,
          infants,
          childrenAge
        },
        mobileNumber,
        bookingStatus,
        remarks: document.querySelector('[name="remarks"]')?.value || ''
      };

      const response = await axios.post('http://localhost:5000/api/flight/bookings', bookingData, {
        withCredentials: true
      });
      
      if (response.data.success) {
        // Reset form fields to default values after successful submission
        setTripType('Single');
        setFareType('Normal');
        setDepartureDate(null);
        setReturnDate(null);
        setSegment1Date(null);
        setSegment2Date(null);
        setSegment3Date(null);
        setAdults(0);
        setChildren(0);
        setInfants(0);
        setChildrenAge('');
        setMobileNumber('');
        setBookingStatus('Pending');
        // Reset remarks field
        const remarksField = document.querySelector('[name="remarks"]');
        if (remarksField) remarksField.value = '';
        
        // Show success message
        alert('Booking created successfully!');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      // Show validation errors if any
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors
          .map(err => err.msg)
          .join('\n');
        alert(`Validation errors:\n${errorMessages}`);
      } else {
        alert('An error occurred while creating the booking');
      }
    }
  };

  

  const datePickerProps = {
    slotProps: {
      textField: {
        fullWidth: true,
        margin: 'normal',
      },
    },
  };

  return (
    <Container sx={{ p: 3, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Flight Booking Form
        </Typography>

        {/* Trip Type and Fare Type */}
        <Grid container spacing={4}>
          <Grid item xs={6} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Trip Type</InputLabel>
              <Select
                value={tripType}
                label="Trip Type"
                onChange={(e) => setTripType(e.target.value)}
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Roundtrip">Roundtrip</MenuItem>
                <MenuItem value="Multicity">Multicity</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Fare Type</InputLabel>
              <Select 
                value={fareType}
                onChange={(e) => setFareType(e.target.value)}
                label="Fare Type"
              >
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Refundable">Refundable</MenuItem>
                <MenuItem value="Non-Refundable">Non-Refundable</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Date Pickers */}
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
              {[segment1Date, segment2Date, segment3Date].map((date, index) => (
                <Grid item xs={4} key={index}>
                  <DatePicker
                    label={`Segment ${index + 1}`}
                    value={date}
                    onChange={(newValue) => {
                      if (index === 0) setSegment1Date(newValue);
                      if (index === 1) setSegment2Date(newValue);
                      if (index === 2) setSegment3Date(newValue);
                    }}
                    {...datePickerProps}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </LocalizationProvider>

        {/* Passenger Info */}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Number of Passengers
        </Typography>
        <Grid container spacing={2}>
          {['Adults', 'Children', 'Infants'].map((label, index) => (
            <Grid item xs={4} key={index}>
              <TextField
                label={label}
                value={label === 'Adults' ? adults : label === 'Children' ? children : infants}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  if (label === 'Adults') setAdults(Math.max(0, value));
                  else if (label === 'Children') setChildren(Math.max(0, value));
                  else setInfants(Math.max(0, value));
                }}
                type="text"
                fullWidth
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Age of Children"
              placeholder="e.g. 5, 7"
              margin="normal"
              value={childrenAge}
              onChange={(e) => setChildrenAge(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Mobile Number"
              placeholder="90000 80000"
              margin="normal"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Booking Status</InputLabel>
              <Select 
                value={bookingStatus}
                onChange={(e) => setBookingStatus(e.target.value)}
                label="Booking Status"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Cancelled">InProgress</MenuItem>
                <MenuItem value="Confirmed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Remarks */}
        <TextField
          fullWidth
          name="remarks"
          label="Remarks"
          placeholder="Enter any additional notes or remarks here..."
          multiline
          rows={3}
          margin="normal"
        />

        {/* Buttons */}
        <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
          <Grid item>
            <Button variant="contained" color="error">
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Book Flight
            </Button>
          </Grid>
        </Grid>

        {/* Booking History */}
        
      </Paper>
    </Container>
  );
};

export default FlightBookingForm;
