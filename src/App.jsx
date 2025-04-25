import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import FlightBookingForm from './components/FlightBookingForm';
import HotelBooking from './components/HotelBooking';
import TravelPackage from './components/TravelPackage';
import VisaPocess from './components/VisaPocess';
import Navbar from './pages/Navbar';
import AuthPage from './pages/AuthPage';
import AdminLayout from './components/admin/AdminLayout';
import SuperAdminLayout from './components/superadmin/SuperAdminLayout';
import AnchorLayout from './components/anchor/AnchorLayout';
import WelcomeDashboard from './components/admin/WelcomeDashboard';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './context/AuthContext';
import NotFound from './pages/NotFoundPage';
import Unauthorized from './pages/UnAuth';
// Create ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  
  if (!isAuthenticated) {
    return <Navigate to="/401" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/401" element={<Unauthorized />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<WelcomeDashboard />} />
            <Route path="flight" element={<FlightBookingForm />} />
            <Route path="hotel" element={<HotelBooking />} />
            <Route path="travel" element={<TravelPackage />} />
            <Route path="visa" element={<VisaPocess />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Super Admin Routes */}
          <Route path="/superadmin" element={
            // <ProtectedRoute>
              <SuperAdminLayout />
            // </ProtectedRoute>
          }>
            <Route path="flight" element={<FlightBookingForm />} />
            <Route path="hotel" element={<HotelBooking />} />
            <Route path="travel" element={<TravelPackage />} />
            <Route path="visa" element={<VisaPocess />} />
          </Route>

          {/* Anchor Routes */}
          <Route path="/anchor" element={
            <ProtectedRoute>
              <AnchorLayout />
            </ProtectedRoute>
          }>
            <Route path="flight" element={<FlightBookingForm />} />
            <Route path="hotel" element={<HotelBooking />} />
            <Route path="travel" element={<TravelPackage />} />
            <Route path="visa" element={<VisaPocess />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;