import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Alert,
  Chip,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
} from '@mui/material';
import {
  Warning as WarningIcon,
  Upload as UploadIcon,
  Add as AddIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { mockStaff } from '../data/mockStaffData';
import { type Certification } from '../types/staff.types';

const Certifications: React.FC = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Flatten all certifications from all staff
  const allCertifications = mockStaff.flatMap(staff =>
    staff.certifications.map(cert => ({
      ...cert,
      staffName: staff.name,
      staffId: staff.id,
      staffAvatar: staff.avatar,
    }))
  );

  const expiringCertifications = allCertifications.filter(cert => 
    cert.status === 'Expiring Soon' || cert.status === 'Expired'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Expiring Soon': return 'warning';
      case 'Expired': return 'error';
      default: return 'default';
    }
  };

  const getCertificationTypeColor = (type: string) => {
    switch (type) {
      case 'CPR': return 'error';
      case 'First Aid': return 'warning';
      case 'Child Development Associate (CDA)': return 'primary';
      case 'Background Check': return 'info';
      case 'Food Handler\'s Permit': return 'secondary';
      case 'Early Childhood Education': return 'success';
      default: return 'default';
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'staffName',
      headerName: 'Staff Member',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
          <Avatar
            src={params.row.staffAvatar}
            sx={{ width: 32, height: 32, mr: 2 }}
          >
            {params.row.staffName.charAt(0)}
          </Avatar>
          <Typography variant="body2" fontWeight="medium">
            {params.row.staffName}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'type',
      headerName: 'Certification Type',
      width: 250,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={getCertificationTypeColor(params.value) as any}
        />
      ),
    },
    {
      field: 'issueDate',
      headerName: 'Issue Date',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          {new Date(params.value).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      field: 'expirationDate',
      headerName: 'Expiration Date',
      width: 140,
      renderCell: (params) => (
        <Typography variant="body2">
          {new Date(params.value).toLocaleDateString()}
        </Typography>
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
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton 
            size="small" 
            onClick={() => {
              setSelectedCertification(params.row);
              setViewDialogOpen(true);
            }}
          >
            <ViewIcon />
          </IconButton>
          <IconButton size="small">
            <DownloadIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Certifications & Training
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Track staff certifications, monitor expiration dates, and manage training records.
      </Typography>

      {/* Alert for expiring certifications */}
      {expiringCertifications.length > 0 && (
        <Alert 
          severity="warning" 
          icon={<WarningIcon />}
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small">
              View All
            </Button>
          }
        >
          {expiringCertifications.length} certification(s) are expiring soon or have expired. 
          Please review and take action.
        </Alert>
      )}

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {allCertifications.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Certifications
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {allCertifications.filter(cert => cert.status === 'Active').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Certifications
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main" fontWeight="bold">
              {allCertifications.filter(cert => cert.status === 'Expiring Soon').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Expiring Soon
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="error.main" fontWeight="bold">
              {allCertifications.filter(cert => cert.status === 'Expired').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Expired
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          All Certifications
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            onClick={() => setUploadDialogOpen(true)}
          >
            Upload Certificate
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add New Certification
          </Button>
        </Box>
      </Box>

      {/* Data Grid */}
      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={allCertifications}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          disableRowSelectionOnClick
        />
      </Paper>

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Upload Certification Document</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Staff Member</InputLabel>
                <Select
                  value=""
                  label="Staff Member"
                >
                  {mockStaff.map((staff) => (
                    <MenuItem key={staff.id} value={staff.id}>
                      {staff.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Certification Type</InputLabel>
                <Select
                  value=""
                  label="Certification Type"
                >
                  <MenuItem value="CPR">CPR</MenuItem>
                  <MenuItem value="First Aid">First Aid</MenuItem>
                  <MenuItem value="Child Development Associate (CDA)">Child Development Associate (CDA)</MenuItem>
                  <MenuItem value="Background Check">Background Check</MenuItem>
                  <MenuItem value="Food Handler's Permit">Food Handler's Permit</MenuItem>
                  <MenuItem value="Early Childhood Education">Early Childhood Education</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Issue Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expiration Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
                fullWidth
              >
                Upload Document
                <input type="file" hidden />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Upload</Button>
        </DialogActions>
      </Dialog>

      {/* View Certification Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={selectedCertification?.staffAvatar}
              sx={{ width: 40, height: 40, mr: 2 }}
            >
              {selectedCertification?.staffName.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {selectedCertification?.staffName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedCertification?.type}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedCertification && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Issue Date
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {new Date(selectedCertification.issueDate).toLocaleDateString()}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Expiration Date
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {new Date(selectedCertification.expirationDate).toLocaleDateString()}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Status
                </Typography>
                <Chip
                  label={selectedCertification.status}
                  color={getStatusColor(selectedCertification.status) as any}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Document
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  fullWidth
                >
                  Download Certificate
                </Button>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          <Button variant="contained">Edit Certification</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Certifications;
