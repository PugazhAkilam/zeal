import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, ToggleButton, ToggleButtonGroup, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
const apiUrl=import.meta.env.VITE_API_URL;
const FormTable = () => {
  const [bookingType, setBookingType] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

const getColumnsForSourceType = (sourceType) => {
  // Common Columns
const indexColumn = {
  field: 'index',
  headerName: 'S.No',
  width: 100,
  renderCell: (params) => rows.indexOf(params.row) + 1
};

const sourceTypeColumn = {
  field: 'SourceType',
  headerName: 'Booking Type',
  width: 130
};

const mobileColumn = {
  field: 'MobileNumber',
  headerName: 'Mobile',
  width: 130,
  renderCell: (params) =>
    params.value && params.value.trim() !== '' ? params.value : 'NUll'
};

const userCodeColumn = {
  field: 'UserName',
  headerName: 'Submited By',
  width: 130,
  renderCell: (params) =>
    params.value && params.value.trim() !== '' ? params.value : 'NUll'
};

const createdOnColumn = {
  field: 'CreatedOn',
  headerName: 'Created Date',
  width: 150,
  renderCell: (params) => {
    const value = params.row.CreatedOn;
    if (!value) return '';
    try {
      const date = new Date(value);
      return date.toLocaleDateString();
    } catch {
      return value;
    }
  }
};

const bookingStatusColumn = {
  field: 'BookingStatus',
  headerName: 'Booking Status',
  width: 150,
  renderCell: (params) => params.value || 'NUll'
};

const budgetColumn = {
  field: 'Budget',
  headerName: 'Budget',
  width: 200,
  renderCell: (params) => params.value || 'NUll'
};

const adultsColumn = {
  field: 'Adults',
  headerName: 'Adults',
  width: 100,
  renderCell: (params) => params.value || 'NUll'
};

const childrenColumn = {
  field: 'Children',
  headerName: 'Children',
  width: 100,
  renderCell: (params) => params.value || 'NUll'
};

const infantsColumn = {
  field: 'Infants',
  headerName: 'Infants',
  width: 100,
  renderCell: (params) => params.value || 'NUll'
};

const childrenAgesColumn = {
  field: 'ChildrenAges',
  headerName: 'Children Ages',
  width: 150,
  renderCell: (params) => params.value || 'NUll'
};

const remarksColumn = {
  field: 'Remarks',
  headerName: 'Remarks',
  width: 200,
  renderCell: (params) => params.value || 'NUll'
};


// Flight Specific
const tripTypeColumn = {
  field: 'TripType',
  headerName: 'Trip Type',
  width: 130
};

const fareTypeColumn = {
  field: 'FareType',
  headerName: 'Fare Type',
  width: 130
};
const DepartureDate = {
  field: 'DepartureDate',
  headerName: 'DepartureDate',
  width: 130, 
  renderCell: (params) => {
    const value = params.row.DepartureDate;
    if (!value) return 'Null';
    try {
      const date = new Date(value);
      return date.toLocaleDateString();
    } catch {
      return value;
    }
  }
}
const ReturnDate = {
  field: 'ReturnDate',
  headerName: 'ReturnDate',
  width: 130, 
  renderCell: (params) => {
    const value = params.row.ReturnDate;
    if (!value) return 'Null';
    try {
      const date = new Date(value);
      return date.toLocaleDateString();
    } catch {
      return value;
    }
  }
}
const Segment1Date = {
  field: 'Segment1Date',
  headerName: 'Segment1Date',
  width: 130, 
  renderCell: (params) => {
    const value = params.row.Segment1Date;
    if (!value) return 'Null';
    try {
      const date = new Date(value);
      return date.toLocaleDateString();
    } catch {
      return value;
    }
  }
}
const Segment2DateColumn = {
  field: 'Segment2Date',
  headerName: 'Segment2Date',
  width: 130, 
  renderCell: (params) => {
    const value = params.row.Segment2Date;
    if (!value) return 'Null';
    try {
      const date = new Date(value);
      return date.toLocaleDateString();
    } catch {
      return value;
    }
  }
}
const Segment3DateColumn = {
  field: 'Segment3Date',
  headerName: 'Segment3Date',
  width: 130, 
  renderCell: (params) => {
    const value = params.row.Segment3Date;
    if (!value) return 'Null';
    try {
      const date = new Date(value);
      return date.toLocaleDateString();
    } catch {
      return value;
    }
  }
}
// Hotel Specific
const countriesColumn = {
  field: 'Countries',
  headerName: 'Country',
  width: 130
};
const mealplanColumn = {
  field: 'MealPlan',
  headerName: 'Meal Plan',
  width: 200,
  renderCell: (params) => params.value || 'NUll'
};

const checkInDateColumn = {
  field: 'CheckInDate',
  headerName: 'Check In',
  width: 130, 
  renderCell: (params) => {
    const value = params.row.CheckInDate;
    if (!value) return '';
    try {
      const date = new Date(value);
      return date.toLocaleDateString();
    } catch {
      return value;
    }
  }
}
const checkOutDateColumn = {
  field: 'CheckOutDate',
  headerName: 'Check Out',
  width: 130, 
  renderCell: (params) => {
    const value = params.row.CheckOutDate;
    if (!value) return '';
    try {
      const date = new Date(value);
      return date.toLocaleDateString();
    } catch {
      return value;
    }
  }
}
const cityColumn = {
  field: 'City',
  headerName: 'City',
  width: 130
};

const hotelNameColumn = {
  field: 'HotelName',
  headerName: 'Hotel Name',
  width: 150
};

const hotelRatingColumn = {
  field: 'HotelRating',
  headerName: 'Rating',
  width: 100,
  renderCell: (params) => `${params.value} star` || 'NUll'
};

// Travel Package Specific
const packageTypeColumn = {
  field: 'PackageType',
  headerName: 'BookingType',
  width: 130
};

const travelCountriesColumn = {
  field: 'Countries',
  headerName: 'Countries',
  width: 200,
   renderCell: (params) => params.value || 'NUll'
};

// Visa Specific
const visaCountriesColumn = {
  field: 'Countries',
  headerName: 'Countries',
  width: 200,
  renderCell: (params) => params.value || 'NUll'
};

const visaTypeColumn = {
  field: 'VisaType',
  headerName: 'Visa Type',
  width: 130,
  renderCell: (params) => params.value || 'NUll'
};
const TravelDate = {
  field: 'DepartureDate',
  headerName: 'TravelDate',
  width: 130, 
  renderCell: (params) => {
    const value = params.row.DepartureDate;
    if (!value) return 'Null';
    try {
      const date = new Date(value);
      return date.toLocaleDateString();
    } catch {
      return value;
    }
  }
}
  const commonColumns = [
    indexColumn,
    userCodeColumn,
    sourceTypeColumn,
    mobileColumn,
    bookingStatusColumn,
    budgetColumn,
    adultsColumn,
    childrenColumn,
    infantsColumn,
    childrenAgesColumn,
    createdOnColumn,
    remarksColumn,
    // visaCountriesColumn,
    // visaTypeColumn,
    // TravelDate,
   
    // packageTypeColumn,
    // mealplanColumn,
    // checkInDateColumn,
    // checkOutDateColumn,
    // hotelNameColumn,
    // hotelRatingColumn,
    // countriesColumn,
    // cityColumn,
    // tripTypeColumn,
    // fareTypeColumn,
    // DepartureDate,
    // ReturnDate,
    // Segment1Date,
    // Segment2DateColumn,
    // Segment3DateColumn,
   
  ];

  switch (sourceType) {
    case 'flight':
      return [ indexColumn,userCodeColumn, sourceTypeColumn , mobileColumn,tripTypeColumn, fareTypeColumn,   bookingStatusColumn,adultsColumn,
        childrenColumn,
        infantsColumn,
        childrenAgesColumn,DepartureDate,ReturnDate,Segment1Date,Segment2DateColumn,Segment3DateColumn,createdOnColumn,remarksColumn];

    case 'hotel':
      return [ indexColumn,userCodeColumn, sourceTypeColumn , mobileColumn,packageTypeColumn,countriesColumn, cityColumn, bookingStatusColumn,hotelNameColumn, hotelRatingColumn,adultsColumn,
        childrenColumn,
        infantsColumn,
        childrenAgesColumn,budgetColumn,checkInDateColumn,checkOutDateColumn,mealplanColumn,createdOnColumn,remarksColumn];

    case 'travelpackage':
      return [ indexColumn,userCodeColumn, sourceTypeColumn , mobileColumn,packageTypeColumn, travelCountriesColumn, cityColumn,adultsColumn,
        childrenColumn,
        infantsColumn,hotelRatingColumn,
        childrenAgesColumn,budgetColumn,checkInDateColumn,checkOutDateColumn,mealplanColumn, bookingStatusColumn,createdOnColumn,remarksColumn];

    case 'visa':
      return [indexColumn,userCodeColumn, sourceTypeColumn , mobileColumn, visaCountriesColumn, visaTypeColumn,bookingStatusColumn,TravelDate,,adultsColumn,
        childrenColumn,
        infantsColumn,
        childrenAgesColumn,createdOnColumn,remarksColumn];

    default:
      return commonColumns;
  }
};

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/bookings`, {
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

  const handleClear = () => {
    setBookingType('all');
    setStartDate(null);
    setEndDate(null);
    setSearchQuery('');
    fetchBookings(); // This will fetch with current bookingType since we're not changing it
    
   
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

          {/* <TextField
            label="Search by Mobile/User Code"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          /> */}
           

          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
          <Button variant='outlined' onClick={handleClear} title="Double click to clear dates and refresh data">
            Clear Date
          </Button>
        </Box>

        <DataGrid
          rows={rows}
          columns={getColumnsForSourceType(bookingType)}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          autoHeight
          loading={loading}
          getRowId={(row) => row.UniqueId}
          sx={{
            '& .MuiDataGrid-cell': {
              borderRight: '1px solid #e0e0e0',
              borderBottom: '1px solid #e0e0e0'
            },
            '& .MuiDataGrid-columnHeader': {
              borderRight: '1px solid #e0e0e0',
              borderBottom: '2px solid #e0e0e0',
              backgroundColor: '#1976d2',
              color: 'white'
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#1976d2',
              color: 'white'
            }
          }}
        />
      </Stack>
    </Box>
  );
};

export default FormTable;