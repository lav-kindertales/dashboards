import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import Sidebar from './Sidebar';
import StaffOverview from '../../pages/StaffOverview';
import StaffDirectory from '../../pages/StaffDirectory';
import StaffSchedules from '../../pages/StaffSchedules';
import Certifications from '../../pages/Certifications';
import Reports from '../../pages/Reports';

const Layout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('overview');

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <StaffOverview />;
      case 'directory':
        return <StaffDirectory />;
      case 'schedules':
        return <StaffSchedules />;
      case 'certifications':
        return <Certifications />;
      case 'reports':
        return <Reports />;
      default:
        return <StaffOverview />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { md: '240px' }, // Account for sidebar width
          mt: 8, // Account for AppBar height
        }}
      >
        <Container maxWidth="xl">
          {renderPage()}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
