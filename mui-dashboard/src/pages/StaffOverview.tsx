import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Fab,
  Tooltip,
} from '@mui/material';
import {
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  Work as WorkIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material';
import StatCard from '../components/Staff/StatCard';
import { mockStaff, mockDashboardStats } from '../data/mockStaffData';

const StaffOverview: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const todaySchedule = mockStaff.filter(staff => 
    staff.status === 'Active' && 
    Object.values(staff.schedule).some(day => 
      day.some(shift => shift.status === 'Scheduled')
    )
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Staff Overview
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back! Here's what's happening with your staff today.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Staff"
            value={mockDashboardStats.totalStaff}
            subtitle="Active employees"
            trend="up"
            trendValue="+2 this month"
            color="primary"
            icon={<PeopleIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="On Duty Today"
            value={mockDashboardStats.staffOnDuty}
            subtitle="Currently working"
            color="success"
            icon={<ScheduleIcon />}
            chip={{
              label: `${Math.round((mockDashboardStats.staffOnDuty / mockDashboardStats.totalStaff) * 100)}% coverage`,
              color: 'success'
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Certifications Expiring"
            value={mockDashboardStats.certificationsExpiring}
            subtitle="Within 30 days"
            color="warning"
            icon={<WarningIcon />}
            chip={{
              label: "Action needed",
              color: 'warning'
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Open Positions"
            value={mockDashboardStats.openPositions}
            subtitle="Hiring needed"
            color="info"
            icon={<WorkIcon />}
            chip={{
              label: "2 Assistant Teachers",
              color: 'info'
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Today's Schedule */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CalendarIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight="bold">
                Today's Schedule - {today}
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Staff Member</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Shift</TableCell>
                    <TableCell>Room</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todaySchedule.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            src={staff.avatar}
                            sx={{ width: 32, height: 32, mr: 2 }}
                          >
                            {staff.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {staff.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {staff.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={staff.role}
                          size="small"
                          color={
                            staff.role === 'Director' ? 'primary' :
                            staff.role === 'Lead Teacher' ? 'secondary' :
                            staff.role === 'Assistant Teacher' ? 'success' :
                            'default'
                          }
                        />
                      </TableCell>
                      <TableCell sx={{ maxWidth: 120 }}>
                        <Typography variant="body2" noWrap>
                          {Object.values(staff.schedule)
                            .flat()
                            .filter(shift => shift.status === 'Scheduled')
                            .map(shift => shift.type)
                            .join(', ') || 'Not scheduled'}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 100 }}>
                        <Typography variant="body2" noWrap>
                          {Object.values(staff.schedule)
                            .flat()
                            .filter(shift => shift.status === 'Scheduled')
                            .map(shift => shift.room)
                            .join(', ') || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={staff.status}
                          size="small"
                          color={staff.status === 'Active' ? 'success' : 'default'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                <PeopleIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Add New Staff
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Register a new employee
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                <CalendarIcon sx={{ mr: 2, color: 'secondary.main' }} />
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    View Full Schedule
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    See weekly schedule
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                <BadgeIcon sx={{ mr: 2, color: 'warning.main' }} />
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Check Certifications
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Review expiring certs
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Floating Action Buttons */}
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Tooltip title="Add Staff">
          <Fab color="primary" aria-label="add staff">
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default StaffOverview;
