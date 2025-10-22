import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { mockDashboardStats, mockStaff } from '../data/mockStaffData'
import { Users, UserCheck, AlertTriangle, Briefcase, TrendingUp, Users2, Calendar, Plus, Award } from 'lucide-react'

export function StaffOverview() {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  const todaySchedule = mockStaff.filter(staff => 
    staff.status === 'Active' && 
    Object.values(staff.schedule).some(day => 
      day.some(shift => shift.status === 'Scheduled')
    )
  )

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Director': return 'default'
      case 'Lead Teacher': return 'secondary'
      case 'Assistant Teacher': return 'outline'
      default: return 'outline'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default'
      case 'On Leave': return 'secondary'
      case 'Inactive': return 'destructive'
      default: return 'outline'
    }
  }

  const stats = [
    {
      title: 'Total Staff',
      value: mockDashboardStats.totalStaff,
      description: 'Active employees',
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'On Duty Today',
      value: mockDashboardStats.staffOnDuty,
      description: 'Currently working',
      icon: UserCheck,
      color: 'text-success',
    },
    {
      title: 'Certifications Expiring',
      value: mockDashboardStats.certificationsExpiring,
      description: 'Within 30 days',
      icon: AlertTriangle,
      color: 'text-warning',
    },
    {
      title: 'Open Positions',
      value: mockDashboardStats.openPositions,
      description: 'Hiring needed',
      icon: Briefcase,
      color: 'text-secondary',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Staff Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your staff today.
        </p>
      </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle>Today's Schedule - {today}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto max-h-[400px] border rounded-lg">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-sm">Staff Member</th>
                      <th className="text-left p-3 font-medium text-sm">Role</th>
                      <th className="text-left p-3 font-medium text-sm">Shift</th>
                      <th className="text-left p-3 font-medium text-sm">Room</th>
                      <th className="text-left p-3 font-medium text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todaySchedule.map((staff) => (
                      <tr key={staff.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={staff.avatar} alt={staff.name} />
                              <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{staff.name}</div>
                              <div className="text-sm text-muted-foreground">{staff.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant={getRoleColor(staff.role)}>
                            {staff.role}
                          </Badge>
                        </td>
                        <td className="p-3 max-w-[120px]">
                          <div className="truncate text-sm">
                            {Object.values(staff.schedule)
                              .flat()
                              .filter(shift => shift.status === 'Scheduled')
                              .map(shift => shift.type)
                              .join(', ') || 'Not scheduled'}
                          </div>
                        </td>
                        <td className="p-3 max-w-[100px]">
                          <div className="truncate text-sm">
                            {Object.values(staff.schedule)
                              .flat()
                              .filter(shift => shift.status === 'Scheduled')
                              .map(shift => shift.room)
                              .join(', ') || '-'}
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant={getStatusColor(staff.status)}>
                            {staff.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Add New Staff</div>
                  <div className="text-sm text-muted-foreground">Register a new employee</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <Calendar className="h-5 w-5 text-secondary" />
                <div>
                  <div className="font-medium">View Full Schedule</div>
                  <div className="text-sm text-muted-foreground">See weekly schedule</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <Award className="h-5 w-5 text-warning" />
                <div>
                  <div className="font-medium">Check Certifications</div>
                  <div className="text-sm text-muted-foreground">Review expiring certs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button size="lg" className="rounded-full h-14 w-14 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
