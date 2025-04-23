import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';


const TripTypeSection = ({ tripType, setTripType }) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={6} sm={6}>
        <FormControl fullWidth margin="normal" sx={{width:"390px"}}>
          <InputLabel >Trip Type</InputLabel>
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
        <FormControl fullWidth margin="normal" sx={{width:"390px"}}>
          <InputLabel>Fare Type</InputLabel>
          <Select
            defaultValue="Normal"
            label="Fare Type"
            
          >
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="Economy">Economy</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default TripTypeSection;