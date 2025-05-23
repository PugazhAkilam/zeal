import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Paper, Container } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl=import.meta.env.VITE_API_URL;

const countryData = {
  USA: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Las Vegas'],
  UK: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow'],
  // UAE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'],
  // Singapore: ['Singapore City'],
  Thailand: ['Bangkok', 'Phuket', 'Pattaya', 'Chiang Mai', 'Krabi'],
  // Malaysia: ['Kuala Lumpur', 'Penang', 'Langkawi', 'Johor Bahru', 'Malacca'],
  // Indonesia: ['Bali', 'Jakarta', 'Lombok', 'Yogyakarta', 'Bandung'],
  France: ['Paris', 'Nice', 'Lyon', 'Marseille', 'Bordeaux'],
  Italy: ['Rome', 'Venice', 'Florence', 'Milan', 'Naples'],

  // Newly Added:
  Japan: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima', 'Sapporo'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],

  // Spain: ['Barcelona', 'Madrid', 'Seville', 'Valencia', 'Malaga']
};


const indianCities = ['Delhi', 'Mumbai', 'Goa', 'Kerala'];

function TravelPackage() {
  const [packageType, setPackageType] = useState('Domestic');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [hotelName, setHotelName] = useState('');
  const [hotelRating, setHotelRating] = useState(5); // default value
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [childrenAges, setChildrenAges] = useState("");
  const [budget, setBudget] = useState('');
  const [mobile, setMobile] = useState('');
  const [mealPlan, setMealPlan] = useState('EP'); // default value
  const [bookingStatus, setBookingStatus] = useState('Pending'); // default value
  const [remarks, setRemarks] = useState('');
  
  useEffect(() => {
    if (packageType === 'Domestic') {
      setSelectedCountries([]);
      setSelectedCity('Delhi');
    }
  }, [packageType]);
  const handleSubmit = async () => {
    try {
      const payload = {
        packageType,
        selectedCountries: packageType === 'International' ? selectedCountries : ['India'],
        selectedCity,
        checkInDate: checkInDate?.format('YYYY-MM-DD'),
        checkOutDate: checkOutDate?.format('YYYY-MM-DD'),
        hotelName,
        hotelRating,
        adults,
        children,
        infants,
        childrenAges: childrenAges,
        budget,
        mobile,
        mealPlan,
        bookingStatus,
        remarks
      };
  
      const response = await axios.post(`${apiUrl}/travel-package/bookings`, payload, {
        withCredentials: true
      });

      if (response.data.success) {
        // Reset all form fields to default values
        setPackageType('Domestic');
        setCheckInDate(null);
        setCheckOutDate(null);
        setSelectedCountries([]);
        setSelectedCity('Delhi');
        setHotelName('');
        setHotelRating(5);
        setAdults(1);
        setChildren(0);
        setInfants(0);
        setChildrenAges('');
        setBudget('');
        setMobile(0);
        setMealPlan('EP');
        setBookingStatus('Pending');
        setRemarks('');
        
        // Show success message
        toast.success('Travel package booked successfully!');
      }
    } catch (error) {
      console.error('Booking error:', error);
      // Show validation errors if any
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors
          .map(err => err.msg)
          .join('\n');
          toast.error(errorMessages);
      } else {
        toast.error('Failed to book travel package. Please try again.');
      }
    }
  };
  return (
    <Container sx={{ p: 3,  mx: 'auto' }}>
    <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Travel Package Booking Form
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel >Package Type</InputLabel>
              <Select
                value={packageType}
                label="Package Type"
                onChange={(e) => setPackageType(e.target.value)}
                
              >
                <MenuItem value="Domestic">Domestic</MenuItem>
                <MenuItem value="International">International</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {packageType === 'International' ? (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel >Countries</InputLabel>
                <Select
                  multiple
                  value={selectedCountries}
                  onChange={(e) => setSelectedCountries(typeof value === 'string' ? e.target.value.split(',') : e.target.value)}
                  label="Countries"
                 
                >
                  {Object.keys(countryData).map((country) => (
                    <MenuItem key={country} value={country}>{country}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ) : (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel >City</InputLabel>
                <Select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  label="City"
                 
                >
                  {indianCities.map((city) => (
                    <MenuItem key={city} value={city}>{city}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}


          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Check-In Date"
                value={checkInDate}
                onChange={(newValue) => setCheckInDate(newValue)}
              
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                  
                  }
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
                    margin: "normal",
                   
                  }
                }}
              />
            </Grid>
          </LocalizationProvider>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Hotel Name"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel >Hotel Star Rating</InputLabel>
              <Select
                defaultValue="5"
                value={hotelRating}
                onChange={(e) => setHotelRating(e.target.value)}
                label="Hotel Star Rating"
              >
                <MenuItem value="3">3 Star</MenuItem>
                <MenuItem value="4">4 Star</MenuItem>
                <MenuItem value="5">5 Star</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Typography variant="subtitle1" sx={{ mt: 2,ml:2 ,mb:2}}>
          Number of Passengers
        </Typography>
         
          <Grid container spacing={2}>
          {['Adults', 'Children', 'Infants'].map((label, index) => (
            <Grid item xs={3} sx={{ml:2}} key={index}>
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




        
  <Grid item xs={12} sm={4}>
    <TextField
      fullWidth
      label="Age of Children (comma-separated)"
      placeholder="e.g. 4, 7"
      margin="normal"
    value={childrenAges}
    onChange={(e) => setChildrenAges(e.target.value)}
    />
  </Grid>

  <Grid item xs={12} sm={4}>
    <TextField
      fullWidth
      label="Budget (in USD)"
      placeholder="e.g. 1000 - 2000"
      margin="normal"
    value={budget}
    onChange={(e) => setBudget(e.target.value)}
    />
  </Grid>

  <Grid item xs={12} sm={4}>
    <TextField
      fullWidth
      label="Mobile Number"
      placeholder="+1 234 567 8901"
      margin="normal"
    type="tel"
    value={mobile}
    onChange={(e) => setMobile(e.target.value)}
    />
  </Grid>



          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel >Meal Plan</InputLabel>
              <Select
                defaultValue="EP"
                value={mealPlan}
                onChange={(e) => setMealPlan(e.target.value)}
                label="Meal Plan"
                
              >
                <MenuItem value="EP">EP (Room Only)</MenuItem>
                <MenuItem value="CP">CP (Breakfast)</MenuItem>
                <MenuItem value="MAP">MAP (Breakfast + Dinner)</MenuItem>
                <MenuItem value="AP">AP (All Meals)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

         

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel >Booking Status</InputLabel>
              <Select
                defaultValue="Pending"
                value={bookingStatus}
                onChange={(e) => setBookingStatus(e.target.value)}
                label="Booking Status"
               
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="InProgress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
          <TextField
  fullWidth
  label="Remarks"
  value={remarks}
  onChange={(e) => setRemarks(e.target.value)}
  margin="normal"
  multiline
  rows={3}
/>


          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
  <Grid item>
    <Button variant="contained" color="error">
      Cancel
    </Button>
  </Grid>
  <Grid item>
    <Button variant="contained" color="success" onClick={handleSubmit}>
      Book Travel
    </Button>
  </Grid>
</Grid>
      </Paper>
    </Container>
  );
}

export default TravelPackage;


