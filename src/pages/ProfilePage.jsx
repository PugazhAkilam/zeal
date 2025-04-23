import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  IconButton,
  Button,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ProfilePage = () => {
  return (
    <Box p={3} sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Profile Header */}
      <Card sx={{ mb: 3, display: 'flex', alignItems: 'center', p: 2 }}>
        <Avatar
          alt="Ajinkya Rahane"
          src="https://www.livemint.com/lm-img/img/2025/03/15/original/Ajinkya_Rahane__1742033134449.jpg"
          sx={{ width: 72, height: 72, mr: 2 }}
        />
        <Box>
          <Typography variant="h6">Ajinkya Rahane</Typography>
          <Typography color="text.secondary">Admin</Typography>
          <Typography color="text.secondary">Leeds, United Kingdom</Typography>
        </Box>
      </Card>

      {/* Personal Information */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Personal Information</Typography>
            <IconButton color="warning">
              <EditIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">First Name</Typography>
              <Typography>Ajinkya</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Last Name</Typography>
              <Typography>Rahane</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
              <Typography>12-10-1990</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Email Address</Typography>
              <Typography>info@binary-fusion.com</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Phone Number</Typography>
              <Typography>(+62) 821 2554-5846</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">User Role</Typography>
              <Typography>Admin</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Address</Typography>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Country</Typography>
              <Typography>United Kingdom</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">City</Typography>
              <Typography>Leeds, East London</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Postal Code</Typography>
              <Typography>ERT 1254</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
