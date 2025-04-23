import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


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

const indianCities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Jaipur', 'Goa', 'Kochi'];

function TravelPackage() {
  const [packageType, setPackageType] = useState('Domestic');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Delhi');

  useEffect(() => {
    if (packageType === 'Domestic') {
      setSelectedCountries([]);
      setSelectedCity('Delhi');
    }
  }, [packageType]);

  return (
    <Box >
      <Box >
        <Typography variant="h6" gutterBottom>
          Travel Package Booking Form
        </Typography>

        <Grid container spacing={4}>
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
                  onChange={(e) => setSelectedCountries(e.target.value)}
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
              margin="normal"
             
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel >Hotel Star Rating</InputLabel>
              <Select
                defaultValue="5"
                label="Hotel Star Rating"
              
              >
                <MenuItem value="3">3 Star</MenuItem>
                <MenuItem value="4">4 Star</MenuItem>
                <MenuItem value="5">5 Star</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Adults"
              type="number"
              defaultValue="1"
              margin="normal"
            
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Children"
              type="number"
              defaultValue="0"
              margin="normal"
           
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Infants"
              type="number"
              defaultValue="0"
              margin="normal"
             
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Age of Children (comma-separated)"
              placeholder="e.g. 4, 7"
              margin="normal"
             
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Budget (in USD)"
              placeholder="e.g. 1000 - 2000"
              margin="normal"
             
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel >Meal Plan</InputLabel>
              <Select
                defaultValue="EP"
                label="Meal Plan"
                
              >
                <MenuItem value="EP">EP (Room Only)</MenuItem>
                <MenuItem value="CP">CP (Breakfast)</MenuItem>
                <MenuItem value="MAP">MAP (Breakfast + Dinner)</MenuItem>
                <MenuItem value="AP">AP (All Meals)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile Number"
              placeholder="+1 234 567 8901"
              margin="normal"
             
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel >Booking Status</InputLabel>
              <Select
                defaultValue="Pending"
                label="Booking Status"
               
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Confirmed">Confirmed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Remarks"
              placeholder="Additional details or requests..."
              multiline
              rows={4}
              margin="normal"
            
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={6} sx={{ maxWidth: '300px' }}>
            <Button variant="contained" color="error" fullWidth>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6} sx={{ maxWidth: '300px' }}>
            <Button variant="contained" color="success" fullWidth>
              Submit Booking
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default TravelPackage;