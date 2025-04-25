
import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaShoppingCart, FaBox, FaUsers, FaCog } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Card component inside the same file
const StatCard = ({ icon, title, value }) => (
  <Paper elevation={3} sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center' }}>
    <Box sx={{ mr: 2, fontSize: 30, color: 'primary.main' }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle2" fontWeight={600}>
        {title}
      </Typography>
      <Typography variant="h6" fontWeight={700}>
        {value}
      </Typography>
    </Box>
  </Paper>
);

// Dummy chart data
const dataLine = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [120, 150, 170, 140, 180, 160],
      fill: false,
      borderColor: '#3f51b5',
      tension: 0.1,
    },
  ],
};

const dataBar = {
  labels: ['Product A', 'Product B', 'Product C', 'Product D'],
  datasets: [
    {
      label: 'Quantity',
      data: [30, 45, 60, 20],
      backgroundColor: '#3f51b5',
    },
  ],
};
const stats = [
    { icon: <FaShoppingCart />, title: 'Orders', value: '140' },
    { icon: <FaBox />, title: 'Products', value: '120' },
    { icon: <FaUsers />, title: 'Users', value: '30' },
    { icon: <FaCog />, title: 'Settings', value: '11' },
  ];
  const WelcomeDashboard = () => {
    const { user, loading, error, isAuthenticated } = useAuth();
    
    if (loading) {
      return <Box sx={{ p: 4 }}>Loading...</Box>;
    }

    if (error) {
      return <Box sx={{ p: 4, color: 'error.main' }}>Error: {error}</Box>;
    }

    if (!user) {
      return <Navigate to="/" />;
    }

    return (
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Welcome, {user.name}!
        </Typography>

        {/* Cards Section */}
        <Grid
          container
          spacing={2}
          sx={{
            mb: 3,
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          {stats.map((item, idx) => (
            <Grid
              item
              key={idx}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ width: '100%', maxWidth: 300 }}>
                <StatCard icon={item.icon} title={item.title} value={item.value} />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Sales Data
              </Typography>
              <Line data={dataLine} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Products Data
              </Typography>
              <Bar data={dataBar} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };

  export default WelcomeDashboard;



