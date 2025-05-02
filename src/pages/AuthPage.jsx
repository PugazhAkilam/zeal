import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useNavigate } from 'react-router-dom';

// Add this import
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  // Add this line
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: null,
    mobile: '',
    otp: ['', '', '', '', '', '']
  });
  const [showOTP, setShowOTP] = useState(false);
  
  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOTPChange = (index, value) => {
    const newOTP = [...formData.otp];
    newOTP[index] = value;
    setFormData(prev => ({
      ...prev,
      otp: newOTP
    }));

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleAuthenticate = async () => {
    try {
      if (isLogin) {
        // Log email when Send OTP button is clicked
        console.log("Send OTP button clicked - Email:", formData.email);
        
        // Call API to send OTP
        const response = await fetch('http://localhost:5000/api/auth/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email }),
          credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.success) {
          setShowOTP(true);
          alert('OTP sent to your email');
        } else {
          alert(data.message || 'Failed to send OTP');
        }
      } else {
        // Log name, email, dob, mobile when Register button is clicked
        console.log("Register button clicked - Name:", formData.name);
        console.log("Register button clicked - Email:", formData.email);
        console.log("Register button clicked - DOB:", formData.dob);
        console.log("Register button clicked - Mobile:", formData.mobile);
        
        // Call API to register user
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            dob: formData.dob,
            mobile: formData.mobile
          }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          setShowOTP(true);
          alert('Registration successful! OTP sent to your email');
        } else {
          alert(data.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('An error occurred during authentication');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Log email and OTP as a string when Login button is clicked
      console.log("Login button clicked - Email:", formData.email);
      console.log("Login button clicked - OTP:", formData.otp.join(''));
      
      // Call API to verify OTP
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp.join('')
        }),
        // Add credentials to allow cookies to be sent and received
        credentials: 'include' // Important for cookies
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Use the login function from context
        login(data.user);
        
        // Redirect based on user type
        if (data.user.userType === 1) {
          navigate('/superadmin');
        } else if (data.user.userType === 2) {
          navigate('/admin');

        } 
        else if (data.user.userType === 3) {
          navigate('/admin')
        }else {
          navigate('/401');
        }
        
        alert('Login successful!');
      } else {
        alert(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };
  return (
    <> <Button onClick={()=>navigate('/admin')}>admin</Button>   <Button onClick={()=>navigate('/superadmin')}>super admin</Button>   <Button onClick={()=>navigate('/anchor')}>anchor</Button> 
    <Box sx={{
        minHeight: '100vh',
  
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
    
    }}>
      <Box sx={{
        
       
        width: '100%',
     
    p: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
    // color: '#fff',
    boxShadow: 5,
        gap: 4,
        display: 'flex',
        maxWidth: 1200,
      }}>
        <Box sx={{ flex: 1, maxWidth: 500 }}>
        <Typography variant="h3" sx={{ mb: 3, fontWeight: 'bold' ,textAlign:"center"}}>
         Zeal Travels
          </Typography>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            {isLogin ? 'Login' : 'Sign up'}
          </Typography>
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
               
                />
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={formData.dob}
                    onChange={(newValue) => setFormData(prev => ({ ...prev, dob: newValue }))}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: 'normal',
                  
                      }
                    }}
                  />
                </LocalizationProvider>

                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  margin="normal"
               
                />
              </>
            )}
            
            <TextField
              fullWidth
              label="Your Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
             
              InputProps={{
                readOnly: showOTP
              }}
            />

            {!showOTP ? (
              <Button
                variant="contained"
                fullWidth
                onClick={handleAuthenticate}
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: '#90caf9',
                  '&:hover': { bgcolor: '#42a5f5' },
                  height: '48px',
                  borderRadius: '8px'
                }}
              >
              {isLogin ? 'Send OTP' : 'Register'}
              </Button>
            ) : (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Enter OTP sent to your email
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 3 }}>
                  {formData.otp.map((digit, index) => (
                    <TextField
                      key={index}
                      name={`otp-${index}`}
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      sx={{
                        width: '40px',
                        '& input': { textAlign: 'center', padding: '8px' }
                      }}
                      inputProps={{
                        maxLength: 1,
                        style: { fontSize: '1.2rem' }
                      }}
                    />
                  ))}
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: '#90caf9',
                    '&:hover': { bgcolor: '#42a5f5' },
                    height: '48px',
                    borderRadius: '8px'
                  }}
                >
                  Login
                </Button>
              </Box>
            )}
            
            <Typography sx={{mt:2}} >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Link 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(!isLogin);
                  setShowOTP(false);
                  setFormData(prev => ({
                    ...prev,
                    name: '',
                    email: '',
                    dob: null,
                    mobile: '',
                    otp: ['', '', '', '', '', '']
                  }));
                }} 
                sx={{ color: '#90caf9', ml: 1 }}
              >
                {isLogin ? 'Register here' : 'Login here'}
              </Link>
            </Typography>
            
            
          </form>
        </Box>
     
        <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="https://img.freepik.com/free-vector/flat-safer-internet-day-illustration_23-2151164065.jpg?uid=R113678162&ga=GA1.1.1558421036.1729161363&semt=ais_hybrid&w=740"
            alt="Sign up illustration"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          
        </Box>
      </Box>  
    </Box></>
  );
};

export default AuthPage;