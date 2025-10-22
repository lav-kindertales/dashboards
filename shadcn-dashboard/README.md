# Shadcn Dashboard

A modern staff management dashboard built with **Shadcn/UI**, **Tailwind CSS**, and **React**. This project demonstrates the power and flexibility of Shadcn/UI components with a complete staff management system, featuring a clean, modern interface.

## 🚀 Features

### **Core Functionality**
- **Staff Directory** - Complete staff listing with search, filtering, and detailed profiles
- **Staff Overview** - Dashboard with key metrics and quick actions
- **Certifications** - Track and manage staff certifications and training
- **Reports & Analytics** - Generate reports and analyze staff performance with interactive charts

### **Technical Features**
- **Modern UI Components** - Built with Shadcn/UI for consistent, accessible design
- **Permanent Sidebar** - Always-visible navigation for consistent UX
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark Mode Support** - Toggle between light and dark themes
- **TypeScript** - Full type safety and excellent developer experience
- **Performance Optimized** - Efficient rendering with React best practices
- **Accessibility** - WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Shadcn/UI** - High-quality, accessible component library
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Table** - Powerful data table with sorting, filtering, and pagination
- **Recharts** - Data visualization library for interactive charts
- **React Router** - Client-side routing
- **Lucide React** - Beautiful, customizable icons
- **Vite** - Fast build tool and development server

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shadcn-dashboard
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

### **Color Palette**
- **Primary**: Blue (#3b82f6) - Main brand color
- **Secondary**: Gray (#6b7280) - Supporting elements
- **Success**: Green (#10b981) - Positive actions
- **Warning**: Yellow (#f59e0b) - Caution states
- **Destructive**: Red (#ef4444) - Error states

### **Typography**
- **Font Family**: Inter (system font fallback)
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, accessible contrast

### **Components**
- **Cards**: Elevated surfaces with subtle shadows
- **Buttons**: Multiple variants (default, outline, ghost, destructive)
- **Badges**: Status indicators with semantic colors
- **Tables**: Clean, sortable data presentation
- **Dialogs**: Modal overlays with proper focus management

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                 # Shadcn/UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── Layout.tsx          # Main layout component
│   ├── Sidebar.tsx         # Navigation sidebar
│   └── Header.tsx          # Top header bar
├── pages/
│   ├── StaffDirectory.tsx  # Staff listing with table
│   ├── StaffOverview.tsx   # Dashboard overview
│   ├── Certifications.tsx  # Certification management
│   └── Reports.tsx         # Reports and analytics
├── data/
│   └── mockStaffData.ts    # Sample data
├── types/
│   └── staff.types.ts      # TypeScript interfaces
├── lib/
│   └── utils.ts            # Utility functions
└── App.tsx                 # Main application
```

## 🎯 Key Features

### **Staff Directory**
- **Advanced Data Table** - Sortable, filterable, paginated
- **Search Functionality** - Real-time search across all fields
- **Staff Profiles** - Detailed modal with tabs for different information
- **Action Buttons** - View, edit, and schedule actions

### **Responsive Design**
- **Mobile-First** - Optimized for all screen sizes
- **Adaptive Layout** - Components adjust to available space
- **Touch-Friendly** - Proper touch targets for mobile devices

### **Accessibility**
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Support** - Proper ARIA labels and descriptions
- **Focus Management** - Clear focus indicators and logical tab order
- **Color Contrast** - WCAG AA compliant color combinations

### **Performance**
- **Optimized Rendering** - Efficient React patterns
- **Lazy Loading** - Components loaded as needed
- **Memoization** - Prevented unnecessary re-renders
- **Bundle Optimization** - Tree-shakable imports

## 🔧 Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### **Code Quality**
- **TypeScript** - Strict type checking
- **ESLint** - Code linting and formatting
- **Prettier** - Consistent code formatting
- **Husky** - Git hooks for quality assurance

## 🎨 Customization

### **Theming**
The project uses CSS custom properties for theming. You can customize colors in `src/index.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... other colors */
}
```

### **Adding Components**
Shadcn/UI components can be easily added:

```bash
npx shadcn-ui@latest add [component-name]
```

### **Styling**
Use Tailwind CSS classes for styling:

```tsx
<div className="flex items-center space-x-2 p-4 bg-card rounded-lg">
  <Badge variant="outline">Status</Badge>
</div>
```

## 📱 Responsive Breakpoints

- **xs**: 0px - 640px (Mobile)
- **sm**: 640px - 768px (Large Mobile)
- **md**: 768px - 1024px (Tablet)
- **lg**: 1024px - 1280px (Desktop)
- **xl**: 1280px+ (Large Desktop)

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Deploy to Vercel**
```bash
npx vercel --prod
```

### **Deploy to Netlify**
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Shadcn/UI** - For the amazing component library
- **Tailwind CSS** - For the utility-first CSS framework
- **TanStack** - For the powerful table component
- **Lucide** - For the beautiful icon set

---

**Built with ❤️ using Shadcn/UI and Tailwind CSS**
