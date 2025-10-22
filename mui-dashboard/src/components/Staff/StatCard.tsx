import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
  action?: () => void;
  chip?: {
    label: string;
    color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  color = 'primary',
  icon,
  action,
  chip,
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2" fontWeight="medium">
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold" color={`${color}.main`}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {icon && (
            <Box
              sx={{
                backgroundColor: `${color}.light`,
                borderRadius: 2,
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        {trend && trendValue && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
            {trend === 'up' ? (
              <TrendingUpIcon color="success" fontSize="small" />
            ) : (
              <TrendingDownIcon color="error" fontSize="small" />
            )}
            <Typography
              variant="body2"
              color={trend === 'up' ? 'success.main' : 'error.main'}
              fontWeight="medium"
            >
              {trendValue}
            </Typography>
          </Box>
        )}

        {chip && (
          <Chip
            label={chip.label}
            color={chip.color}
            size="small"
            sx={{ mb: 1 }}
          />
        )}

        {action && (
          <IconButton
            onClick={action}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'text.secondary',
              '&:hover': {
                color: `${color}.main`,
              },
            }}
          >
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
