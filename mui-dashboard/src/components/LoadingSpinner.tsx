import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
} from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
  fullHeight?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  size = 40,
  fullHeight = false,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        ...(fullHeight && { minHeight: '400px' }),
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          border: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <CircularProgress size={size} />
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoadingSpinner;
