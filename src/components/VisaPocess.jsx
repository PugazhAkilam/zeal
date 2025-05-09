import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  OutlinedInput,
  Chip,
  Paper,
  Container
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl=import.meta.env.VITE_API_URL;
function VisaPocess() {
  const [countries, setCountries] = useState([]);
  const [visaType, setVisaType] = useState('');
  const [travelDate, setTravelDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [childrenAges, setChildrenAges] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [visaStatus, setVisaStatus] = useState('');
  const [remarks, setRemarks] = useState('');

  const countryOptions = [
    'USA', 'UK', 'Canada', 'Australia', 'UAE', 'Germany', 'France',  'Japan'
  ];

  const visaTypeOptions = [
    'Business Visa', 'Tourist Visa', 'Student Visa', 'Work Visa', 'Transit Visa', 'Medical Visa'
  ];

  const visaStatusOptions = [
    'Pending', 'Approved', 'Rejected', 'In Process', 'On Hold'
  ];

  const handleCountryChange = (event) => {
    const { target: { value } } = event;
    setCountries(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      const countrie = countries.join(", "); 
      
      const formData = {
        countrie,
        visaType,
        travelDate: travelDate?.format('YYYY-MM-DD'),
        adults,
        children,
        infants,
        childrenAges,
        mobileNumber,
        visaStatus,
        remarks
      };
  
      try {
        const response = await axios.post(`${apiUrl}/visa/bookings`, formData, {
          withCredentials: true
        });
  
        if (response.data.success) {
          // Reset form fields
          setCountries([]);
          setVisaType('');
          setTravelDate(null);
          setAdults(1);
          setChildren(0);
          setInfants(0);
          setChildrenAges('');
          setMobileNumber('');
          setVisaStatus('');
          setRemarks('');
  
          // Show success message
          toast.success('Visa booking created successfully!');
        }
      } catch (error) {
        console.error('Error submitting visa booking:', error);
        // Show validation errors if any
        if (error.response?.data?.errors) {
          const errorMessages = error.response.data.errors
            .map(err => err.msg)
            .join('\n');
            toast.error(`Validation errors:\n${errorMessages}`);
        } else {
          toast.error('Failed to book visa. Please try again.');
        }
      }
    };
  

  return (
    <Container sx={{ p: 3,  mx: 'auto'}}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          Visa Processing Form
        </Typography>
        
     
          <Grid container spacing={3}>
            {/* Countries Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="countries-label">Select Countries (Hold Ctrl or Cmd for multiple)</InputLabel>
                <Select
                  labelId="countries-label"
                  multiple
                  value={countries}
                  onChange={handleCountryChange}
                  input={<OutlinedInput label="Select Countries (Hold Ctrl or Cmd for multiple)" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {countryOptions.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Visa Type */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="visa-type-label">Type of Visa</InputLabel>
                <Select
                  labelId="visa-type-label"
                  value={visaType}
                  onChange={(e) => setVisaType(e.target.value)}
                  label="Type of Visa"
                >
                  {visaTypeOptions.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Travel Date */}
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Travel Date"
                  value={travelDate}
                  onChange={(newValue) => setTravelDate(newValue)}
                  format="MM/DD/YYYY"
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>

            {/* Number of Travelers */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Number of Travelers
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label="Adults"
                    type="number"
                    fullWidth
                    value={adults}
                    onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 0))}
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Children"
                    type="number"
                    fullWidth
                    value={children}
                    onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Infants"
                    type="number"
                    fullWidth
                    value={infants}
                    onChange={(e) => setInfants(Math.max(0, parseInt(e.target.value) || 0))}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Age of Children */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Age of Children (comma-separated)"
                fullWidth
                value={childrenAges}
                onChange={(e) => setChildrenAges(e.target.value)}
                placeholder="e.g. 4, 7, 12"
               
              />
            </Grid>

            {/* Mobile Number */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Mobile Number"
                fullWidth
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="+1 234 567 8901"
              />
            </Grid>

            {/* Visa Status */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="visa-status-label">Visa Status</InputLabel>
                <Select
                  labelId="visa-status-label"
                  value={visaStatus}
                  onChange={(e) => setVisaStatus(e.target.value)}
                  label="Visa Status"
                >
                  {visaStatusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Remarks */}
            <Grid item xs={12}>
              <TextField
                label="Remarks"
                multiline
                rows={4}
                fullWidth
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Any additional information or instructions..."
              />
            </Grid>

            {/* Submit Button */}
            <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
  <Grid item>
    <Button variant="contained" color="error">
      Cancel
    </Button>
  </Grid>
  <Grid item>
    <Button variant="contained" color="success"onClick={handleSubmit}>
      Book Hotel
    </Button>
  </Grid>
</Grid>
          </Grid>

      </Paper>
    </Container>
  );
}

export default VisaPocess;