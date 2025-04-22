import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { formStyles } from '../theme/flightFormTheme';

// Country and city data
const countryData = {
  USA: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Las Vegas'],
  UK: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow'],
  UAE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'],
  Singapore: ['Singapore City'],
  Thailand: ['Bangkok', 'Phuket', 'Pattaya', 'Chiang Mai', 'Krabi'],
  Malaysia: ['Kuala Lumpur', 'Penang', 'Langkawi', 'Johor Bahru', 'Malacca'],
  Indonesia: ['Bali', 'Jakarta', 'Lombok', 'Yogyakarta', 'Bandung'],
  France: ['Paris', 'Nice', 'Lyon', 'Marseille', 'Bordeaux'],
  Italy: ['Rome', 'Venice', 'Florence', 'Milan', 'Naples'],
  Spain: ['Barcelona', 'Madrid', 'Seville', 'Valencia', 'Malaga']
};

// Indian cities for domestic bookings
const indianCities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Jaipur', 'Goa', 'Kochi'];

function HotelBooking() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bookingType, setBookingType] = useState('Domestic');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cityOptions, setCityOptions] = useState(indianCities);
  const [selectedCity, setSelectedCity] = useState(indianCities[0]);

  // Update city options when country changes
  useEffect(() => {
    if (bookingType === 'International' && selectedCountry) {
      const cities = countryData[selectedCountry] || [];
      setCityOptions(cities);
      setSelectedCity(cities.length > 0 ? cities[0] : '');
    } else {
      setCityOptions(indianCities);
      setSelectedCity(indianCities[0]);
    }
  }, [selectedCountry, bookingType]);

  return (
    <Box sx={formStyles.mainContainer}>
      <Box sx={formStyles.formContainer}>
        <Typography variant="h6" gutterBottom>
          Hotel Booking Form
        </Typography>

        {/* Booking Type */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel sx={formStyles.whiteLabel}>Booking Type</InputLabel>
              <Select
                value={bookingType}
                onChange={(e) => {
                  setBookingType(e.target.value);
                  if (e.target.value === 'Domestic') {
                    setSelectedCountry('');
                    setCityOptions(indianCities);
                  }
                }}
                label="Booking Type"
                sx={formStyles.inputField}
              >
                <MenuItem value="Domestic">Domestic</MenuItem>
                <MenuItem value="International">International</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Country Selection - Only shown for International bookings */}
          {bookingType === 'International' && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel sx={formStyles.whiteLabel}>Country</InputLabel>
                <Select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  label="Country"
                  sx={formStyles.inputField}
                >
                  {Object.keys(countryData).map((country) => (
                    <MenuItem key={country} value={country}>{country}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          {/* City */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel sx={formStyles.whiteLabel}>City</InputLabel>
              <Select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                label="City"
                sx={formStyles.inputField}
                disabled={bookingType === 'International' && !selectedCountry}
              >
                {cityOptions.map((city) => (
                  <MenuItem key={city} value={city}>{city}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Check-in and Check-out Dates */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Check-In Date"
                value={checkInDate}
                onChange={(newValue) => setCheckInDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                    sx: formStyles.datePickerStyle,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Check-Out Date"
                value={checkOutDate}
                onChange={(newValue) => setCheckOutDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                    sx: formStyles.datePickerStyle,
                  },
                }}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>

        {/* Hotel Details */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Hotel Name"
              margin="normal"
              sx={formStyles.inputField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel sx={formStyles.whiteLabel}>Hotel Star Rating</InputLabel>
              <Select
                defaultValue="5"
                label="Hotel Star Rating"
                sx={formStyles.inputField}
              >
                <MenuItem value="3">3 Star</MenuItem>
                <MenuItem value="4">4 Star</MenuItem>
                <MenuItem value="5">5 Star</MenuItem>
                <MenuItem value="7">7 Star</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Number of Guests */}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Number of Guests
        </Typography>
        <Grid container spacing={2}>
          {['Adults', 'Children', 'Infants'].map((label, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <TextField
                label={label}
                defaultValue={label === 'Adults' ? '1' : '0'}
                margin="normal"
                sx={formStyles.inputField}
              />
            </Grid>
          ))}
        </Grid>

        {/* Additional Details */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Age of Children (comma-separated)"
              placeholder="e.g. 5, 9"
              margin="normal"
              sx={formStyles.inputField}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Budget Range (in USD)"
              placeholder="e.g. 500-1000"
              margin="normal"
              sx={formStyles.inputField}
            />
          </Grid>
        </Grid>

        {/* Meal Plan */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel sx={formStyles.whiteLabel}>Meal Plan</InputLabel>
              <Select
                defaultValue="EP"
                label="Meal Plan"
                sx={formStyles.inputField}
              >
                <MenuItem value="EP">EP (Room Only)</MenuItem>
                <MenuItem value="CP">CP (Breakfast)</MenuItem>
                <MenuItem value="MAP">MAP (Breakfast & Dinner)</MenuItem>
                <MenuItem value="AP">AP (All Meals)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel sx={formStyles.whiteLabel}>Booking Status</InputLabel>
              <Select
                defaultValue="Pending"
                label="Booking Status"
                sx={formStyles.inputField}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Confirmed">Confirmed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Remarks */}
        <TextField
          fullWidth
          label="Remarks"
          placeholder="Additional requests or notes..."
          multiline
          rows={3}
          margin="normal"
          sx={formStyles.inputField}
        />

        {/* Submit Button */}
        <Grid container spacing={2} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} sm={6} sx={{ maxWidth: '300px' }}>
            <Button variant="contained" color="primary" fullWidth>
              Submit Booking
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HotelBooking;