// import React from 'react'
// import { FaBox, FaCog, FaShoppingCart, FaUsers } from 'react-icons/fa'
// import { dataLine, dataBar } from '../../assets/chartData'
// import {Line, Bar} from 'react-chartjs-2'
// import {Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement} from 'chart.js'
// ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement)
// import { Grid, Box, Typography, Paper } from '@mui/material';
// // Card component definition

// import { Card as MuiCard, CardContent,} from '@mui/material';

// const Card = ({ icon, title, value }) => {
//   return (
//     <MuiCard
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         p: 2,
//         bgcolor: 'background.paper',
//         color: 'text.primary',
//         boxShadow: 3,
//         borderRadius: 2,
//       }}
//     >
//       <Box sx={{ fontSize: 36, color: 'grey.500', mr: 2 }}>
//         {icon}
//       </Box>
//       <CardContent sx={{ p: 0 }}>
//         <Typography variant="subtitle1" fontWeight={600}>
//           {title}
//         </Typography>
//         <Typography variant="h6">{value}</Typography>
//       </CardContent>
//     </MuiCard>
//   );
// };




// const Dashboard = () => {
//   return (
//     <Box sx={{ flexGrow: 1, p: 4,border:"5px solid red" }}>
    

//     {/* Top Cards */}
//     <Grid container spacing={2} sx={{ mb: 3 }}>
//       <Grid item xs={12} sm={6} md={3}>
//         <Card icon={<FaShoppingCart />} title="Orders" value="140" />
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Card icon={<FaBox />} title="Products" value="120" />
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Card icon={<FaUsers />} title="Users" value="30" />
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Card icon={<FaCog />} title="Settings" value="11" />
//       </Grid>
//     </Grid>

//     {/* Charts */}
//     <Grid container spacing={2}>
//       <Grid item xs={12} md={6}>
//         <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
//           <Typography variant="subtitle1" fontWeight={600} gutterBottom>
//             Sales Data
//           </Typography>
//           <Line data={dataLine} />
//         </Paper>
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
//           <Typography variant="subtitle1" fontWeight={600} gutterBottom>
//             Products Data
//           </Typography>
//           <Bar data={dataBar} />
//         </Paper>
//       </Grid>
//     </Grid>
//   </Box>
//   )
// }

// export default Dashboard
import React from 'react';
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
const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 4  }}>
      {/* Cards Section */}
      <Grid
      container
      spacing={2}
      sx={{

        mb: 3,
        justifyContent: 'flex-start', // left align
        flexWrap: 'wrap',             // wrap if screen small
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
          <Box
            sx={{
              width: '100%',
              maxWidth: 300, // control width of each card
            }}
          >
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

export default Dashboard;
// import React from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import { Line, Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { FaShoppingCart, FaBox, FaUsers, FaCog } from 'react-icons/fa';
// import 'bootstrap/dist/css/bootstrap.min.css';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // StatCard component
// const StatCard = ({ icon, title, value }) => (
//   <Card className="mb-3 shadow-sm" style={{ minWidth: 250 }}>
//     <Card.Body className="d-flex align-items-center">
//       <div style={{ fontSize: 30, marginRight: '1rem', color: '#0d6efd' }}>
//         {icon}
//       </div>
//       <div>
//         <Card.Title className="mb-1" style={{ fontSize: '1rem' }}>{title}</Card.Title>
//         <Card.Text className="mb-0" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{value}</Card.Text>
//       </div>
//     </Card.Body>
//   </Card>
// );

// // Chart data
// const dataLine = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//   datasets: [
//     {
//       label: 'Sales',
//       data: [120, 150, 170, 140, 180, 160],
//       fill: false,
//       borderColor: '#0d6efd',
//       tension: 0.1,
//     },
//   ],
// };

// const dataBar = {
//   labels: ['Product A', 'Product B', 'Product C', 'Product D'],
//   datasets: [
//     {
//       label: 'Quantity',
//       data: [30, 45, 60, 20],
//       backgroundColor: '#0d6efd',
//     },
//   ],
// };

// // Stat Data
// const stats = [
//   { icon: <FaShoppingCart />, title: 'Orders', value: '140' },
//   { icon: <FaBox />, title: 'Products', value: '120' },
//   { icon: <FaUsers />, title: 'Users', value: '30' },
//   { icon: <FaCog />, title: 'Settings', value: '11' },
// ];

// // Main Dashboard
// const Dashboard = () => {
//   return (
//     <Container fluid className="p-4" >
//       {/* Cards Section */}
//       <Row className="mb-4">
//         {stats.map((item, idx) => (
//           <Col xs={12} sm={6} md={4} lg={3} key={idx} className="d-flex justify-content-start">
//             <StatCard icon={item.icon} title={item.title} value={item.value} />
//           </Col>
//         ))}
//       </Row>

//       {/* Charts Section */}
//       <Row>
//         <Col xs={12} md={6} className="mb-4">
//           <Card className="shadow-sm">
//             <Card.Body>
//               <Card.Title>Sales Data</Card.Title>
//               <Line data={dataLine} />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={12} md={6} className="mb-4">
//           <Card className="shadow-sm">
//             <Card.Body>
//               <Card.Title>Products Data</Card.Title>
//               <Bar data={dataBar} />
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;
