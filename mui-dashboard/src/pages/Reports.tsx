import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Analytics as AnalyticsIcon,
  Download as DownloadIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { mockStaff, mockDashboardStats, mockAttendanceRecords } from '../data/mockStaffData';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('attendance');
  const [dateRange, setDateRange] = useState('30');

  // Sample data for charts
  const attendanceData = [
    { name: 'Week 1', attendance: 95 },
    { name: 'Week 2', attendance: 92 },
    { name: 'Week 3', attendance: 98 },
    { name: 'Week 4', attendance: 94 },
  ];

  const hoursData = [
    { name: 'Sarah Johnson', hours: 40 },
    { name: 'Emily Chen', hours: 38 },
    { name: 'Michael Rodriguez', hours: 20 },
    { name: 'Jessica Williams', hours: 40 },
    { name: 'David Kim', hours: 40 },
  ];

  const roleDistribution = [
    { name: 'Lead Teachers', value: 4, color: '#4caf50' },
    { name: 'Assistant Teachers', value: 6, color: '#2196f3' },
    { name: 'Directors', value: 1, color: '#ff9800' },
    { name: 'Admin', value: 2, color: '#9c27b0' },
    { name: 'Support Staff', value: 5, color: '#607d8b' },
  ];

  const COLORS = ['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#607d8b'];

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Staff Reports & Analytics
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Generate reports, analyze staff performance, and track key metrics.
      </Typography>

      {/* Report Controls */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={reportType}
                label="Report Type"
                onChange={(e) => setReportType(e.target.value)}
              >
                <MenuItem value="attendance">Attendance Report</MenuItem>
                <MenuItem value="hours">Hours Worked</MenuItem>
                <MenuItem value="performance">Performance Metrics</MenuItem>
                <MenuItem value="certifications">Certification Status</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateRange}
                label="Date Range"
                onChange={(e) => setDateRange(e.target.value)}
              >
                <MenuItem value="7">Last 7 days</MenuItem>
                <MenuItem value="30">Last 30 days</MenuItem>
                <MenuItem value="90">Last 90 days</MenuItem>
                <MenuItem value="365">Last year</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            Export PDF
          </Button>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Export Excel
          </Button>
        </Box>
      </Paper>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="primary">
                {mockDashboardStats.totalStaff}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Staff
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {mockDashboardStats.attendanceRate}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Attendance Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <ScheduleIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="info.main">
                {mockDashboardStats.staffToChildRatio}:1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Staff-to-Child Ratio
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <AssessmentIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {mockDashboardStats.certificationsExpiring}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Expiring Certifications
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Weekly Attendance Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#4caf50" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Staff Role Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {roleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Hours Worked This Month
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={hoursData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#2196f3" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Recent Attendance Records
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Staff</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Hours</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockAttendanceRecords.map((record) => {
                    const staff = mockStaff.find(s => s.id === record.staffId);
                    return (
                      <TableRow key={record.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              src={staff?.avatar}
                              sx={{ 
                                width: 24, 
                                height: 24, 
                                mr: 1,
                                objectFit: 'cover',
                                flexShrink: 0
                              }}
                            >
                              {staff?.name.charAt(0)}
                            </Avatar>
                            <Typography variant="body2">
                              {staff?.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {new Date(record.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{record.hoursWorked}</TableCell>
                        <TableCell>
                          <Chip
                            label={record.status}
                            size="small"
                            color={record.status === 'Present' ? 'success' : 'default'}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;
