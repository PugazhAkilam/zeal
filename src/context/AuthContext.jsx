import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include' // Important for cookies
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          
          // Auto-redirect if on login page and already authenticated
          if (location.pathname === '/' || location.pathname === '/login') {
            redirectBasedOnUserType(data.user);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [location.pathname]);

  // Helper function to redirect based on user type
  const redirectBasedOnUserType = (user) => {
    if (!user) return;
    
    if (user.userType === 3) {
      navigate('/admin');
    } else if (user.userType === 2) {
      navigate('/superadmin');
    } else if (user.userType === 1) {
      navigate('/anchor');
    }
  };

  // Login function
  const login = (userData) => {
    setUser(userData);
    redirectBasedOnUserType(userData);
  };

  // Logout function
  const logout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);