import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<WelcomeDashboard />} />
          <Route path="flight" element={<FlightBookingForm />} />
          <Route path="hotel" element={<HotelBooking />} />
          <Route path="travel" element={<TravelPackage />} />
          <Route path="visa" element={<VisaPocess />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Super Admin Routes */}
        <Route path="/superadmin" element={<SuperAdminLayout />}>
          <Route path="flight" element={<FlightBookingForm />} />
          <Route path="hotel" element={<HotelBooking />} />
          <Route path="travel" element={<TravelPackage />} />
          <Route path="visa" element={<VisaPocess />} />
        </Route>

        {/* Anchor Routes */}
        <Route path="/anchor" element={<AnchorLayout />}>
          <Route path="flight" element={<FlightBookingForm />} />
          <Route path="hotel" element={<HotelBooking />} />
          <Route path="travel" element={<TravelPackage />} />
          <Route path="visa" element={<VisaPocess />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;