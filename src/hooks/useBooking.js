import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const apiUrl=import.meta.env.VITE_API_URL;

export const useBooking = () => {
  const [chartData, setChartData] = useState({
    line: { labels: [], datasets: [] },
    bar: { labels: [], datasets: [] },
    stats: []
  });
  const [loadings, setLoadings] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading } = useAuth(); 

  const fetchBookingData = async () => {
    try {
      setLoadings(true);
      if (!user) {
        throw new Error('User not authenticated');
      }
      // Assuming you have a backend API to fetch booking data
        
      const response = await axios.get(`${apiUrl}/bookings`, {
        withCredentials: true
      });
      
      const bookings = response.data.data;
      
      // Process data for bar chart
      const bookingTypes = ['Flight', 'Hotel', 'TravelPackage', 'Visa'];
      const typeCount = bookingTypes.map(type => 
        bookings.filter(booking => booking.SourceType === type).length
      );

      // Process data for line chart (last 7 days)
      const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
      }).reverse();

      const dailyBookings = last7Days.map(date => 
        bookings.filter(booking => 
          booking.CreatedOn.split('T')[0] === date
        ).length
      );

      setChartData({
        line: {
          labels: last7Days.map(date => new Date(date).toLocaleDateString()),
          datasets: [{
            label: 'Daily Bookings',
            data: dailyBookings,
            fill: false,
            borderColor: '#3f51b5',
            tension: 0.1,
          }]
        },
        bar: {
          labels: bookingTypes,
          datasets: [{
            label: 'Booking Types',
            data: typeCount,
            backgroundColor: '#3f51b5',
          }]
        },
        stats: [
          { icon: 'dashboard', title: 'Total Bookings', value: bookings.length },
          { icon: 'shopping', title: 'Flight', value: typeCount[0] },
          { icon: 'box', title: 'Hotel', value: typeCount[1] },
          { icon: 'users', title: 'Travel', value: typeCount[2] },
          { icon: 'cog', title: 'Visa', value: typeCount[3] },
        ]
      });
      setLoadings(false);
    } catch (err) {
      setError(err.message);
      setLoadings(false);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  return { chartData, loadings, error, refetch: fetchBookingData };
};