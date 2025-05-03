import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Paper, Container } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';


// Country and city data
const countryData = {
  USA: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Las Vegas'],
  UK: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow'],
  UAE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'],
 
  France: ['Paris', 'Nice', 'Lyon', 'Marseille', 'Bordeaux']
 
};

// Indian cities for domestic bookings
const indianCities = ['Delhi', 'Mumbai', 'Bangalore',  'Hyderabad'];

function HotelBooking() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bookingType, setBookingType] = useState('Domestic');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cityOptions, setCityOptions] = useState(indianCities);
  const [selectedCity, setSelectedCity] = useState(indianCities[0]);
  const [hotelName, setHotelName] = useState('');
  const [hotelStarRating, setHotelStarRating] = useState(5);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [ageOfChildren, setAgeOfChildren] = useState('');
  const [budgetRange, setBudgetRange] = useState();
  const [mealPlan, setMealPlan] = useState('EP');
  const [bookingStatus, setBookingStatus] = useState('Pending');
  const [remarks, setRemarks] = useState('');
  
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

  const handleSubmit = async () => {
    const payload = {
      booking_type: bookingType,
      country: bookingType === 'International' ? selectedCountry : 'India',
      city: selectedCity,
      check_in_date: checkInDate ? checkInDate.format('YYYY-MM-DD') : null,
      check_out_date: checkOutDate ? checkOutDate.format('YYYY-MM-DD') : null,
      hotel_name: hotelName,
      hotel_star_rating: parseInt(hotelStarRating),
      adults: parseInt(adults),
      children:children,
      infants: parseInt(infants),
      age_of_children: ageOfChildren,
      budget_range: budgetRange,
      meal_plan: mealPlan,
      booking_status: bookingStatus,
      remarks: remarks
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/hotel/bookings', payload, {
        withCredentials: true
      });

      if (response.data.success) {
        // Reset all form fields to default values
        setBookingType('Domestic');
        setSelectedCountry('');
        setSelectedCity(indianCities[0]);
        setCheckInDate(null);
        setCheckOutDate(null);
        setHotelName('');
        setHotelStarRating(5);
        setAdults(1);
        setChildren(0);
        setInfants(0);
        setAgeOfChildren('');
        setBudgetRange('');
        setMealPlan('EP');
        setBookingStatus('Pending');
        setRemarks('');
        
        // Show success message
        alert('Hotel booking created successfully!');
      }
    } catch (error) {
      console.error('Error booking hotel:', error);
      // Show validation errors if any
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors
          .map(err => err.msg)
          .join('\n');
        alert(`Validation errors:\n${errorMessages}`);
      } else {
        alert('Failed to book hotel. Please try again.');
      }
    }
  };
  
  return (
    <Container sx={{ p: 3,  mx: 'auto',  }}>
       <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Hotel Booking Form
        </Typography>

        {/* Booking Type */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel >Booking Type</InputLabel>
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
                <InputLabel >Country</InputLabel>
                <Select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  label="Country"
                
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
              <InputLabel >City</InputLabel>
              <Select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                label="City"
                
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
  value={hotelName}
  onChange={(e) => setHotelName(e.target.value)}
/>

          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
  <InputLabel>Hotel Star Rating</InputLabel>
  <Select
    value={hotelStarRating}
    onChange={(e) => setHotelStarRating(e.target.value)}
    label="Hotel Star Rating"
  >
    <MenuItem value={3}>3 Star</MenuItem>
    <MenuItem value={4}>4 Star</MenuItem>
    <MenuItem value={5}>5 Star</MenuItem>
  </Select>
</FormControl>

          </Grid>
        </Grid>

        {/* Number of Guests */}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Number of Guests
        </Typography>
        <Grid container spacing={2}>
  <Grid item xs={12} sm={4}>
    <TextField
      label="Adults"
      value={adults}
      type="number"
      onChange={(e) => setAdults(e.target.value)}
      margin="normal"
      fullWidth
    />
  </Grid>
  <Grid item xs={12} sm={4}>
    <TextField
      label="Children"
      value={children}
      type="number"
      onChange={(e) => setChildren(e.target.value)}
      margin="normal"
      fullWidth
    />
  </Grid>
  <Grid item xs={12} sm={4}>
    <TextField
      label="Infants"
      value={infants}
      type="number"
      onChange={(e) => setInfants(e.target.value)}
      margin="normal"
      fullWidth
    />
  </Grid>
</Grid>


        {/* Additional Details */}
        <Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Age of Children (comma-separated)"
      placeholder="e.g. 5, 9"
      value={ageOfChildren}
      onChange={(e) => setAgeOfChildren(e.target.value)}
      margin="normal"
    />
  </Grid>
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Budget Range (in USD)"
      placeholder="e.g. 500-1000"
      value={budgetRange}
      onChange={(e) => setBudgetRange(e.target.value)}
      margin="normal"
    />
  </Grid>
</Grid>



        {/* Meal Plan */}
        <Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
    <FormControl fullWidth margin="normal">
      <InputLabel>Meal Plan</InputLabel>
      <Select
        value={mealPlan}
        onChange={(e) => setMealPlan(e.target.value)}
        label="Meal Plan"
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
      <InputLabel>Booking Status</InputLabel>
      <Select
        value={bookingStatus}
        onChange={(e) => setBookingStatus(e.target.value)}
        label="Booking Status"
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
  value={remarks}
  onChange={(e) => setRemarks(e.target.value)}
  margin="normal"
  multiline
  rows={3}
/>


        {/* Submit Button */}
        <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
  <Grid item>
    <Button variant="contained" color="error">
      Cancel
    </Button>
  </Grid>
  <Grid item>
  <Button variant="contained" color="success" onClick={handleSubmit}>
  Book Hotel
</Button>

  </Grid>
</Grid>
        </Paper >
    </Container>
  );
}

export default HotelBooking;