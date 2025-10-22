# MUI Dashboard

A comprehensive staff management dashboard built with **Material-UI (MUI)**, **Tailwind CSS**, and **React**. This project demonstrates enterprise-grade UI development with MUI's powerful theming and component system, featuring a permanent sidebar navigation.

## 🚀 Features

### **Core Functionality**
- **Staff Directory** - Advanced DataGrid with sorting, filtering, and pagination
- **Staff Overview** - Dashboard with key metrics and statistics
- **Certifications** - Track and manage staff certifications
- **Reports & Analytics** - Generate reports and analyze performance
- **Staff Schedules** - Manage work schedules and shifts

### **Technical Features**
- **Material Design** - Google's design language implementation
- **Advanced Theming** - Custom theme with light/dark mode support
- **Permanent Sidebar** - Always-visible navigation for better UX
- **DataGrid** - Enterprise-grade data table with virtualization
- **Hybrid Styling** - MUI components enhanced with Tailwind CSS utilities
- **Responsive Design** - Mobile-first with breakpoint system
- **TypeScript** - Full type safety and IntelliSense support
- **Performance Optimized** - Memoization and efficient rendering
- **Accessibility** - WCAG compliant with ARIA support

## 🛠️ Tech Stack

- **React 18** - Modern React with concurrent features
- **Material-UI v6** - Latest stable MUI components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **MUI X DataGrid** - Advanced data table component
- **React Router** - Client-side routing
- **Recharts** - Data visualization library
- **Vite** - Fast build tool and development server

## 📦 Installation

1. **Navigate to project**
   ```bash
   cd mui-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🎨 Design System

### **Material Design Principles**
- **Elevation** - Layered surfaces with proper shadows
- **Typography** - Roboto font family with clear hierarchy
- **Color System** - Primary, secondary, and semantic colors
- **Spacing** - 8px grid system for consistent layouts
- **Motion** - Smooth transitions and animations

### **Custom Theme**
```typescript
const theme = createTheme({
  palette: {
    primary: { main: '#0ea5e9' }, // blue
    secondary: { main: '#f59e0b' }, // amber
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
})
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Layout/              # Layout components
│   │   ├── AppBar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── Staff/               # Staff-specific components
│   │   └── StatCard.tsx
│   ├── ErrorBoundary.tsx    # Error handling
│   └── LoadingSpinner.tsx   # Loading states
├── pages/
│   ├── StaffDirectory.tsx   # DataGrid implementation
│   ├── StaffOverview.tsx   # Dashboard metrics
│   ├── Certifications.tsx  # Certification management
│   ├── Reports.tsx         # Analytics and reports
│   └── StaffSchedules.tsx  # Schedule management
├── theme/
│   └── theme.ts            # MUI theme configuration
├── data/
│   └── mockStaffData.ts    # Sample data
├── types/
│   ├── staff.types.ts      # TypeScript interfaces
│   └── common.types.ts     # Common types
├── hooks/
│   └── useFocusManagement.ts # Focus management
└── context/
    └── ThemeContext.tsx    # Theme context
```

## 🎯 Key Features

### **Advanced DataGrid**
- **Virtualization** - Handles large datasets efficiently
- **Column Management** - Resizable, sortable, filterable columns
- **Row Selection** - Single and multiple row selection
- **Pagination** - Server-side and client-side pagination
- **Export** - CSV and Excel export functionality

### **Theming System**
- **Component Overrides** - Customize any MUI component
- **Dark Mode** - Automatic theme switching
- **Color Palette** - Consistent color system
- **Typography** - Custom font configurations

### **Performance Optimizations**
- **Memoization** - React.memo and useMemo for optimization
- **Lazy Loading** - Code splitting and lazy imports
- **Bundle Optimization** - Tree-shakable imports
- **Virtual Scrolling** - Efficient list rendering

## 🔧 Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### **MUI Best Practices**
- **Component Composition** - Proper component structure
- **Theme Customization** - Consistent styling approach
- **Accessibility** - ARIA labels and keyboard navigation
- **Performance** - Optimized rendering patterns

## 🎨 Customization

### **Theme Customization**
```typescript
const customTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
        },
      },
    },
  },
})
```

### **Component Styling**
```tsx
<Button
  sx={{
    backgroundColor: 'primary.main',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  }}
>
  Custom Button
</Button>
```

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Breakpoint System** - xs, sm, md, lg, xl breakpoints
- **Adaptive Layout** - Components adjust to screen size
- **Touch Friendly** - Proper touch targets

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Environment Variables**
```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Staff Dashboard
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow MUI best practices
4. Add tests for new components
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Material-UI Team** - For the comprehensive component library
- **Google Material Design** - For the design system
- **React Team** - For the amazing framework
- **Vite Team** - For the fast build tool

---

**Built with ❤️ using Material-UI and React**