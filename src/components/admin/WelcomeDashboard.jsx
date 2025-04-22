import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import LuggageIcon from '@mui/icons-material/Luggage';
import VisaIcon from '@mui/icons-material/DocumentScanner';

const WelcomeDashboard = () => {
  const cards = [
    { title: 'Flights', icon: <FlightIcon sx={{ fontSize: 40 }} />, color: '#4CAF50' },
    { title: 'Hotels', icon: <HotelIcon sx={{ fontSize: 40 }} />, color: '#2196F3' },
    { title: 'Travel', icon: <LuggageIcon sx={{ fontSize: 40 }} />, color: '#FF9800' },
    { title: 'Visa', icon: <VisaIcon sx={{ fontSize: 40 }} />, color: '#9C27B0' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <DashboardIcon sx={{ fontSize: 40 }} />
        <Typography variant="h4" component="h1">
          Welcome to Admin Dashboard
        </Typography>
      </Box>
      
      <Typography variant="h6" sx={{ mb: 3 }}>
        Manage your travel services efficiently
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                bgcolor: `${card.color}15`,
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease-in-out',
                  boxShadow: 3,
                },
              }}
            >
              <Box sx={{ color: card.color }}>{card.icon}</Box>
              <Typography variant="h6" component="h2" sx={{ color: card.color }}>
                {card.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WelcomeDashboard;