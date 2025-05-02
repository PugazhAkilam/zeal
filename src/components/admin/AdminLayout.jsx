import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, ListItemButton,Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme as useMuiTheme, useMediaQuery, Menu, MenuItem, Avatar, Switch } from '@mui/material';
import Footer from '../../pages/Footer';
import MenuIcon from '@mui/icons-material/Menu';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import LuggageIcon from '@mui/icons-material/Luggage';
import VisaIcon from '@mui/icons-material/DocumentScanner';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import  logo from '../../assets/logot.png';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider } from '@mui/material';
import axios from 'axios';
const drawerWidth = 240;

import { useTheme } from '../../theme/ThemeContext';

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();



  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Flight', icon: <FlightIcon />, path: '/admin/flight' },
    { text: 'Hotel', icon: <HotelIcon />, path: '/admin/hotel' },
    { text: 'Travel', icon: <LuggageIcon />, path: '/admin/travel' },
    { text: 'Visa', icon: <VisaIcon />, path: '/admin/visa' },
    { text: 'Table', icon: <VisaIcon />, path: '/admin/table' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      // Logout API (make sure it clears the HttpOnly cookie)
      //  await axios.get('http://localhost:5000/logout', { withCredentials: true });

      // In your client code when calling logout
fetch('http://localhost:5000/api/auth/logout', {
  method: 'POST',
  credentials: 'include'
});
  
      // Redirect to login page
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };
  
  const drawer = (
    <Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1,bgcolor:"GrayText" }}>
        <img src={logo} alt="ZEAL Logo" style={{ width: 34, height: 33 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' ,color:"white"}}>
          ZEAL Travels
        </Typography>
      </Box>
      {/* <List sx={{ p: 0, m: 0 }}>
  {menuItems.map((item) => (
    <ListItem key={item.text} disablePadding sx={{ mt: 0,}}>
      <ListItemButton
        onClick={() => {
          navigate(item.path);
          if (isMobile) setMobileOpen(false);
        }}
        selected={location.pathname === item.path}
        sx={{
            mt: 0,
          '&.Mui-selected': {
            backgroundColor: '#1976d2',
            color: '#fff',
           
            '& .MuiListItemIcon-root': {
              color: '#fff',
            },
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#1565c0',
          },
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    </ListItem>
  ))}
</List> */}
<List
  sx={{ p: 0, m: 0, display: 'flex', flexDirection: 'column', height: '100%' }}
>
  <Box sx={{ flexGrow: 1 }}>
    {menuItems.map((item) => (
      <ListItem key={item.text} disablePadding sx={{ mt: 0 }}>
        <ListItemButton
          onClick={() => {
            navigate(item.path);
            if (isMobile) setMobileOpen(false);
          }}
          selected={location.pathname === item.path}
          sx={{
            mt: 0,
            '&.Mui-selected': {
              backgroundColor: '#1976d2',
              color: '#fff',
              '& .MuiListItemIcon-root': {
                color: '#fff',
              },
            },
            '&.Mui-selected:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </ListItem>
    ))}
  </Box>

  <Divider />

  {/* 🔻 Logout at the bottom */}
  <Box>
    <ListItem disablePadding>
      <ListItemButton
        onClick={handleLogout}
        sx={{
          '&:hover': {
            backgroundColor: '#ff5252',
            color: '#fff',
            '& .MuiListItemIcon-root': {
              color: '#fff',
            },
          },
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </ListItem>
  </Box>
</List>

    </Box>
  );

  return (
    <>
    
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
          
          </Box>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard - {location.pathname.split('/').pop().charAt(0).toUpperCase() + location.pathname.split('/').pop().slice(1)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <DarkModeSwitch
        checked={isDarkMode}
        onChange={toggleTheme}
        size={30}
        sunColor="orange"
        moonColor="black"
      />
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit">
              <Avatar sx={{ width: 32, height: 32 }} onClick={()=>navigate('/admin/profile')}>A</Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '80vh',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
       
      </Box>
    </Box> <Footer /></>
  );
};

export default AdminLayout;