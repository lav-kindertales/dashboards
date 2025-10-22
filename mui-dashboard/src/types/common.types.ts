// Common utility types for the application

export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SearchParams {
  query: string;
  filters?: Record<string, any>;
}

export interface TableColumn<T = any> {
  field: keyof T;
  headerName: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  renderCell?: (params: any) => React.ReactNode;
}

export interface DialogState {
  open: boolean;
  data?: any;
}

export interface TabState {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export type ThemeMode = 'light' | 'dark';

export interface UserPreferences {
  theme: ThemeMode;
  language: string;
  notifications: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
}

export type Status = 'active' | 'inactive' | 'pending' | 'suspended';

export interface StatusConfig {
  label: string;
  color: 'success' | 'error' | 'warning' | 'info' | 'default';
  variant: 'filled' | 'outlined';
}

export const STATUS_CONFIGS: Record<Status, StatusConfig> = {
  active: {
    label: 'Active',
    color: 'success',
    variant: 'filled',
  },
  inactive: {
    label: 'Inactive',
    color: 'error',
    variant: 'filled',
  },
  pending: {
    label: 'Pending',
    color: 'warning',
    variant: 'outlined',
  },
  suspended: {
    label: 'Suspended',
    color: 'error',
    variant: 'outlined',
  },
};
