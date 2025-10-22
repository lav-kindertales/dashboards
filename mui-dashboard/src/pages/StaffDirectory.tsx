import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Grid,
  Divider,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Edit as EditIcon,
  Schedule as ScheduleIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { mockStaff } from '../data/mockStaffData';
import { type Staff } from '../types/staff.types';

const StaffDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  // Memoize filtered staff to prevent unnecessary re-renders
  const filteredStaff = useMemo(() => 
    mockStaff.filter(staff =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  );

  // Memoize row click handler
  const handleRowClick = useCallback((params: GridRowParams) => {
    const staff = mockStaff.find(s => s.id === params.id);
    if (staff) {
      setSelectedStaff(staff);
      setDialogOpen(true);
    }
  }, []);

  // Memoize dialog handlers
  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
    setSelectedStaff(null);
  }, []);

  const handleTabChange = useCallback((_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }, []);

  // Memoize color functions for performance
  const getRoleColor = useCallback((role: string) => {
    switch (role) {
      case 'Director': return 'primary';
      case 'Lead Teacher': return 'secondary';
      case 'Assistant Teacher': return 'success';
      case 'Admin': return 'info';
      case 'Support Staff': return 'default';
      default: return 'default';
    }
  }, []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'On Leave': return 'warning';
      case 'Inactive': return 'error';
      default: return 'default';
    }
  }, []);

  // Memoize columns definition for performance
  const columns: GridColDef[] = useMemo(() => [
    {
      field: 'name',
      headerName: 'Staff Member',
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', py: 1 }}>
          <Avatar
            src={params.row.avatar}
            sx={{ 
              width: 50, 
              height: 50, 
              mr: 2,
              objectFit: 'cover',
              flexShrink: 0
            }}
            alt={`${params.row.name} avatar`}
          >
            {params.row.name.charAt(0)}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="body2" fontWeight="medium">
              {params.row.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={getRoleColor(params.value) as any}
        />
      ),
    },
    {
      field: 'certifications',
      headerName: 'Certifications',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={`${params.value.length} certs`}
          size="small"
          variant="outlined"
          color="info"
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={getStatusColor(params.value) as any}
        />
      ),
    },
    {
      field: 'phone',
      headerName: 'Contact',
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View Details">
            <IconButton 
              size="small" 
              onClick={() => handleRowClick(params)}
              aria-label={`View details for ${params.row.name}`}
            >
              <ViewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Staff">
            <IconButton 
              size="small"
              aria-label={`Edit ${params.row.name}`}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Schedule">
            <IconButton 
              size="small"
              aria-label={`View schedule for ${params.row.name}`}
            >
              <ScheduleIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ], [getRoleColor, getStatusColor, handleRowClick]);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
          Staff Directory
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your staff members, view their information, and track their status.
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center' }}>
          <TextField
            label="Search staff"
            placeholder="Search by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1, minWidth: { xs: '100%', sm: 'auto' } }}
            aria-label="Search staff members"
          />
          <Tooltip title="Filter Options">
            <IconButton 
              aria-label="Open filter options" 
              sx={{ 
                bgcolor: 'grey.100', 
                '&:hover': { bgcolor: 'grey.200' },
                ml: { xs: 0, sm: 1 }
              }}
            >
              <FilterIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      {/* Data Grid */}
      <Paper sx={{ height: { xs: 400, sm: 500, md: 600 }, width: '100%', overflow: 'hidden' }}>
        <DataGrid
          rows={filteredStaff}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          rowHeight={100}
          getRowSpacing={() => ({ top: 0, bottom: 0 })}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          onRowClick={handleRowClick}
          disableRowSelectionOnClick
          aria-label="Staff directory table"
          sx={{
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e0e0e0',
              borderRight: 'none',
              borderLeft: 'none',
              borderTop: 'none',
              display: 'flex',
              alignItems: 'center',
              py: 1,
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'action.hover',
            },
            '& .MuiDataGrid-row:focus-within': {
              backgroundColor: 'action.selected',
            },
            // Hide certain columns on mobile
            '& .MuiDataGrid-columnHeader[data-field="certifications"]': {
              display: { xs: 'none', sm: 'flex' },
            },
            '& .MuiDataGrid-cell[data-field="certifications"]': {
              display: { xs: 'none', sm: 'flex' },
            },
            '& .MuiDataGrid-columnHeader[data-field="phone"]': {
              display: { xs: 'none', md: 'flex' },
            },
            '& .MuiDataGrid-cell[data-field="phone"]': {
              display: { xs: 'none', md: 'flex' },
            },
          }}
        />
      </Paper>

      {/* Staff Profile Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
        fullScreen={{ xs: true, sm: false }}
        aria-labelledby="staff-profile-dialog-title"
        aria-describedby="staff-profile-dialog-description"
      >
        <DialogTitle id="staff-profile-dialog-title">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={selectedStaff?.avatar}
              sx={{ width: 48, height: 48, objectFit: 'cover', flexShrink: 0 }}
              alt={`${selectedStaff?.name} avatar`}
            >
              {selectedStaff?.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                {selectedStaff?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedStaff?.role}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent id="staff-profile-dialog-description">
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="Personal Info" />
            <Tab label="Qualifications" />
            <Tab label="Schedule" />
            <Tab label="Performance" />
          </Tabs>

          {tabValue === 0 && selectedStaff && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight="semibold" sx={{ mb: 2 }} color="text.primary">
                  Contact Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Email</Typography>
                    <Typography variant="body1" color="text.primary">{selectedStaff.email}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Phone</Typography>
                    <Typography variant="body1" color="text.primary">{selectedStaff.phone}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Hire Date</Typography>
                    <Typography variant="body1" color="text.primary">
                      {new Date(selectedStaff.hireDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Status</Typography>
                    <Chip
                      label={selectedStaff.status}
                      color={getStatusColor(selectedStaff.status) as any}
                      size="small"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight="semibold" sx={{ mb: 2 }} color="text.primary">
                  Emergency Contact
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Name</Typography>
                    <Typography variant="body1" color="text.primary">{selectedStaff.emergencyContact.name}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Phone</Typography>
                    <Typography variant="body1" color="text.primary">{selectedStaff.emergencyContact.phone}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Relationship</Typography>
                    <Typography variant="body1" color="text.primary">{selectedStaff.emergencyContact.relationship}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}

          {tabValue === 1 && selectedStaff && (
            <Box>
              <Typography variant="h6" fontWeight="semibold" sx={{ mb: 2 }} color="text.primary">
                Certifications & Qualifications
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {selectedStaff.certifications.map((cert) => (
                  <Paper key={cert.id} sx={{ p: 2, border: 1, borderColor: 'grey.200' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 0.5 }} color="text.primary">
                          {cert.type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Issued: {new Date(cert.issueDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Expires: {new Date(cert.expirationDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Chip
                        label={cert.status}
                        color={
                          cert.status === 'Active' ? 'success' :
                          cert.status === 'Expiring Soon' ? 'warning' : 'error'
                        }
                      />
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}

          {tabValue === 2 && selectedStaff && (
            <Box>
              <Typography variant="h6" fontWeight="semibold" sx={{ mb: 2 }} color="text.primary">
                Weekly Schedule
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {Object.entries(selectedStaff.schedule).map(([day, shifts]) => (
                  <Box key={day}>
                    <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }} color="text.primary">
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </Typography>
                    {shifts.length > 0 ? (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {shifts.map((shift) => (
                          <Chip
                            key={shift.id}
                            label={`${shift.type} (${shift.startTime}-${shift.endTime}) - ${shift.room}`}
                            size="small"
                            sx={{ mb: 1 }}
                          />
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No shifts scheduled
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {tabValue === 3 && (
            <Box>
              <Typography variant="h6" fontWeight="semibold" sx={{ mb: 2 }} color="text.primary">
                Performance Notes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No performance notes available at this time.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setDialogOpen(false)} sx={{ mr: 1 }}>Close</Button>
          <Button variant="contained" color="primary">Edit Profile</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StaffDirectory;
