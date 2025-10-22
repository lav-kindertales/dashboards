import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { 
  Users, 
  BarChart3, 
  FileText, 
  Award,
  Home,
  Calendar
} from 'lucide-react'

const navigation = [
  { name: 'Overview', href: '/', icon: Home },
  { name: 'Staff Directory', href: '/staff', icon: Users },
  { name: 'Schedules', href: '/schedules', icon: Calendar },
  { name: 'Certifications', href: '/certifications', icon: Award },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="w-64 bg-card border-r border-border">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">Shadcn Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Staff Management</p>
      </div>
      
      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
