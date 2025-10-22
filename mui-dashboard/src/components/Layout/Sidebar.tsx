import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  Badge as BadgeIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const sidebarWidth = 240;

const menuItems = [
  { id: 'overview', label: 'Staff Overview', icon: <DashboardIcon /> },
  { id: 'directory', label: 'Staff Directory', icon: <PeopleIcon /> },
  { id: 'schedules', label: 'Schedules', icon: <ScheduleIcon /> },
  { id: 'certifications', label: 'Certifications', icon: <BadgeIcon /> },
  { id: 'reports', label: 'Reports', icon: <AnalyticsIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: sidebarWidth,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1,
        borderRadius: 0,
        display: { xs: 'none', md: 'block' },
        borderRight: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      <Box sx={{ overflow: 'auto', height: '100%' }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" color="primary" fontWeight="bold">
            MUI Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Staff Management
          </Typography>
        </Box>
        <Divider />
        <List sx={{ px: 1, py: 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={currentPage === item.id}
                onClick={() => onPageChange(item.id)}
                sx={{
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default Sidebar;