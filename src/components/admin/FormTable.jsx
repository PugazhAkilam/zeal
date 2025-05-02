import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, ToggleButton, ToggleButtonGroup, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';

const FormTable = () => {
  const [bookingType, setBookingType] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const getColumnsForSourceType = (sourceType) => {
    const commonColumns = [
      { 
        field: 'index',
        headerName: 'S.No', 
        width: 100,
        renderCell: (params) => {
          return rows.indexOf(params.row) + 1;
        }
      },
      { 
        field: 'SourceType', 
        headerName: 'Booking Type', 
        width: 130,
        valueGetter: (params) => params.value || null 
      },
      { 
        field: 'MobileNumber', 
        headerName: 'Mobile', 
        width: 130,
        valueGetter: (params) => params.value || null 
      },
      { 
        field: 'UserCode', 
        headerName: 'User Code', 
        width: 130,
        valueGetter: (params) => params.value || null 
      },
      {
        field: 'CreatedOn', 
        headerName: 'Created Date', 
        width: 150,
        renderCell: (params) => {
          const value = params.row.CreatedOn;
          if (!value) return '';
          try {
            const date = new Date(value);
            return date.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            //   hour: '2-digit',
            //   minute: '2-digit',
            //   hour12: true
            });
          } catch {
            return value;
          }
        }
      },
      { field: 'BookingStatus', headerName: 'BookingStatus', width: 200 }    ,
      { field: 'Budget', headerName: 'Budget', width: 200 }    ,

       { field: 'Adults', headerName: 'Adults', width: 200 }    ,
      { field: 'Children', headerName: 'Children', width: 200 }    ,
      { field: 'Infants', headerName: 'Infants', width: 200 }    ,
       { field: 'ChildrenAges', headerName: 'ChildrenAges', width: 200 }    ,
 { field: 'Remarks', headerName: 'Remarks', width: 200 }
    ];

    switch (sourceType) {
      case 'flight':
        return [
          ...commonColumns,
          { field: 'TripType', headerName: 'Trip Type', width: 130 },
          { field: 'FareType', headerName: 'Fare Type', width: 130 },
        //   { field: 'DepartureDate', headerName: 'Departure', width: 130,
        //     valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : '' 
        //   },
        //   { field: 'ReturnDate', headerName: 'Return', width: 130,
        //     valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : '' 
        //   }
        ];
      case 'hotel':
        return [
          ...commonColumns,
          { field: 'Countries', headerName: 'Country', width: 130 },
          { field: 'City', headerName: 'City', width: 130 },
          { field: 'HotelName', headerName: 'Hotel Name', width: 150 },
          { field: 'HotelRating', headerName: 'Rating', width: 100 },
        //   { field: 'CheckInDate', headerName: 'Check In', width: 130,
        //     valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : '' 
        //   },
        //   { field: 'CheckOutDate', headerName: 'Check Out', width: 130,
        //     valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : '' 
        //   }
        ];
      case 'travelpackage':
        return [
          ...commonColumns,
          { field: 'PackageType', headerName: 'Package Type', width: 130 },
          { field: 'Countries', headerName: 'Countries', width: 200,
            valueFormatter: (params) => {
              try {
                return JSON.parse(params.value).join(', ');
              } catch {
                return params.value;
              }
            }
          }
        ];
      case 'visa':
        return [
          ...commonColumns,
          { field: 'Countries', headerName: 'Countries', width: 200 },
          { field: 'VisaType', headerName: 'Visa Type', width: 130 }
        ];
      default:
        return commonColumns;
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/bookings`, {
        params: {
          sourceType: bookingType === 'all' ? undefined : bookingType,
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
          search: searchQuery
        },
        withCredentials: true
      });

      setRows(response.data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [bookingType]);

  const handleSearch = () => {
    fetchBookings();
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <ToggleButtonGroup
            value={bookingType}
            exclusive
            onChange={(e, newValue) => setBookingType(newValue || 'all')}
            aria-label="booking type"
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="flight">Flight</ToggleButton>
            <ToggleButton value="hotel">Hotel</ToggleButton>
            <ToggleButton value="travelpackage">Travel</ToggleButton>
            <ToggleButton value="visa">Visa</ToggleButton>
          </ToggleButtonGroup>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={setEndDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            label="Search by Mobile/User Code"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        <DataGrid
          rows={rows}
          columns={getColumnsForSourceType(bookingType)}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
          loading={loading}
          getRowId={(row) => row.UniqueId}
        />
      </Stack>
    </Box>
  );
};

export default FormTable;