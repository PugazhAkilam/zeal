import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

   const navigate=useNavigate();
  const navStyles = {
    appBar: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(10px)',
    },
    logo: {
      flexGrow: 1,
      color: '#fff',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    navButton: {
      color: '#fff',
      '&:hover': {
        color: '#90caf9',
      },
    },
  };
        
  return (
    <AppBar position="fixed" sx={navStyles.appBar}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={navStyles.logo}>
          ZEAL Airways
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button sx={navStyles.navButton} onClick={()=>navigate('/flight')}>Flight</Button>
          <Button sx={navStyles.navButton} onClick={()=>navigate('/hotel')}>Hotel</Button>
          <Button sx={navStyles.navButton} onClick={()=>navigate('/travel')}>Travel</Button>
          <Button sx={navStyles.navButton} onClick={()=>navigate('/visa')}>Visa</Button>
          <Button sx={navStyles.navButton} onClick={()=>navigate('/login')}>login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;