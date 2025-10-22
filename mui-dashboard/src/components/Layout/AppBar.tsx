import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
  InputBase,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  AccountCircle,
} from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

const AppBar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, ml: { md: '240px' } }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 0, mr: 4 }}>
          Staff Management (MUI)
        </Typography>

        <Box
          sx={{
            position: 'relative',
            borderRadius: 1,
            backgroundColor: alpha('#fff', 0.1),
            '&:hover': {
              backgroundColor: alpha('#fff', 0.2),
            },
            marginLeft: 0,
            width: '100%',
            maxWidth: 400,
            mr: 2,
          }}
        >
          <Box
            sx={{
              padding: '0 16px',
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SearchIcon />
          </Box>
          <InputBase
            placeholder="Search staff, schedules..."
            sx={{
              color: 'inherit',
              '& .MuiInputBase-input': {
                padding: '8px 8px 8px 40px',
                transition: 'width 0.2s',
                width: '100%',
              },
            }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton color="inherit" onClick={toggleTheme}>
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            <AccountCircle />
          </Avatar>
        </IconButton>

        <Menu
          id="primary-search-account-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
