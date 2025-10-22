import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Schedule as ScheduleIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { mockStaff } from '../data/mockStaffData';

const StaffSchedules: React.FC = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'weekly'>('weekly');
  const [selectedWeek, setSelectedWeek] = useState(0);

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newViewMode: 'calendar' | 'weekly',
  ) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  const getWeekDates = (weekOffset: number) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (weekOffset * 7));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return {
      start: startOfWeek,
      end: endOfWeek,
      days: Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return date;
      })
    };
  };

  const weekDates = getWeekDates(selectedWeek);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getShiftColor = (shiftType: string) => {
    switch (shiftType) {
      case 'Morning': return 'primary';
      case 'Afternoon': return 'secondary';
      case 'Full Day': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Staff Schedules
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage staff schedules, view availability, and track time-off requests.
      </Typography>

      {/* Controls */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CalendarIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight="bold">
              Week of {weekDates.start.toLocaleDateString()} - {weekDates.end.toLocaleDateString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setSelectedWeek(selectedWeek - 1)}
            >
              Previous Week
            </Button>
            <Button
              variant="outlined"
              onClick={() => setSelectedWeek(selectedWeek + 1)}
            >
              Next Week
            </Button>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              aria-label="view mode"
            >
              <ToggleButton value="weekly" aria-label="weekly view">
                <ScheduleIcon sx={{ mr: 1 }} />
                Weekly
              </ToggleButton>
              <ToggleButton value="calendar" aria-label="calendar view">
                <CalendarIcon sx={{ mr: 1 }} />
                Calendar
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Paper>

      {viewMode === 'weekly' && (
        <Paper sx={{ p: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Staff Member</TableCell>
                  {daysOfWeek.map((day, index) => (
                    <TableCell key={day} align="center">
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {day}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {weekDates.days[index].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </Typography>
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {mockStaff.map((staff) => (
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
                            {staff.role}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    {daysOfWeek.map((day, index) => {
                      const dayKey = day.toLowerCase() as keyof typeof staff.schedule;
                      const shifts = staff.schedule[dayKey];
                      return (
                        <TableCell key={index} align="center">
                          {shifts.length > 0 ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                              {shifts.map((shift) => (
                                <Chip
                                  key={shift.id}
                                  label={`${shift.type} ${shift.startTime}-${shift.endTime}`}
                                  size="small"
                                  color={getShiftColor(shift.type) as any}
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              ))}
                            </Box>
                          ) : (
                            <Typography variant="caption" color="text.secondary">
                              Off
                            </Typography>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {viewMode === 'calendar' && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Monthly Calendar View
              </Typography>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(7, 1fr)', 
                gap: 1,
                textAlign: 'center'
              }}>
                {daysOfWeek.map((day) => (
                  <Typography key={day} variant="body2" fontWeight="bold" sx={{ p: 1 }}>
                    {day}
                  </Typography>
                ))}
                {/* Calendar grid would go here - simplified for demo */}
                {Array.from({ length: 35 }, (_, i) => (
                  <Box key={i} sx={{ 
                    minHeight: 100, 
                    border: 1, 
                    borderColor: 'divider',
                    p: 1,
                    backgroundColor: i < 7 ? '#f5f5f5' : 'transparent'
                  }}>
                    <Typography variant="caption">
                      {i < 7 ? '' : i - 6}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Staff Availability
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {mockStaff.slice(0, 5).map((staff) => (
                  <Card key={staff.id} variant="outlined">
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            src={staff.avatar}
                            sx={{ width: 24, height: 24, mr: 1 }}
                          >
                            {staff.name.charAt(0)}
                          </Avatar>
                          <Typography variant="body2" fontWeight="medium">
                            {staff.name}
                          </Typography>
                        </Box>
                        <Chip
                          label={staff.status}
                          size="small"
                          color={staff.status === 'Active' ? 'success' : 'default'}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Quick Actions */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button variant="contained" startIcon={<PeopleIcon />}>
          Add Staff to Schedule
        </Button>
        <Button variant="outlined" startIcon={<ScheduleIcon />}>
          Bulk Schedule Update
        </Button>
      </Box>
    </Box>
  );
};

export default StaffSchedules;
