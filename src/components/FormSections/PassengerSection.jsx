import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';


const PassengerSection = () => {
  return (
    <>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Number of Passengers
      </Typography>
      <Grid container spacing={2}>
        {['Adults', 'Children', 'Infants'].map((label, index) => (
          <Grid item xs={4} key={index}>
            <TextField
              label={label}
              defaultValue={label === 'Adults' ? '1' : '0'}
              sx={{
                width: "260px",
                input: { color: 'white' },
                label: { color: 'white' },
                '& .MuiOutlinedInput-root fieldset': { borderColor: 'white' },
                '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#90caf9' },
              }}
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
            sx={{
              width: "260px",

            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Mobile Number"
            placeholder="+1 123 456 7890"
            margin="normal"
            sx={{
              width: "260px",
            
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth margin="normal" sx={{ width: "260px" }}>
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
      </Grid>
    </>
  );
};

export default PassengerSection;