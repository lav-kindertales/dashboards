import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { mockAttendanceRecords, mockDashboardStats } from '../data/mockStaffData'
import { mockStaff } from '../data/mockStaffData'
import { Clock, TrendingUp, AlertTriangle, Users } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

export function Reports() {
  // Sample data for charts
  const attendanceData = [
    { name: 'Week 1', attendance: 95 },
    { name: 'Week 2', attendance: 92 },
    { name: 'Week 3', attendance: 98 },
    { name: 'Week 4', attendance: 94 },
  ]

  const hoursData = [
    { name: 'Sarah Johnson', hours: 40 },
    { name: 'Emily Chen', hours: 38 },
    { name: 'Michael Rodriguez', hours: 20 },
    { name: 'Jessica Williams', hours: 40 },
    { name: 'David Kim', hours: 40 },
  ]

  const roleDistribution = [
    { name: 'Lead Teachers', value: 4, color: '#10b981' },
    { name: 'Assistant Teachers', value: 6, color: '#3b82f6' },
    { name: 'Directors', value: 1, color: '#f59e0b' },
    { name: 'Admin', value: 2, color: '#8b5cf6' },
    { name: 'Support Staff', value: 5, color: '#6b7280' },
  ]

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#6b7280']

  const getStaffName = (staffId: string) => {
    const staff = mockStaff.find(s => s.id === staffId)
    return staff ? staff.name : 'Unknown'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present':
        return 'default'
      case 'Late':
        return 'secondary'
      case 'Absent':
        return 'destructive'
      case 'Sick Leave':
        return 'outline'
      default:
        return 'outline'
    }
  }


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Generate reports and analyze staff performance data.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardStats.totalStaff}</div>
            <p className="text-xs text-muted-foreground">
              Active staff members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{mockDashboardStats.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">
              This month average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff-to-Child Ratio</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockDashboardStats.staffToChildRatio}:1</div>
            <p className="text-xs text-muted-foreground">
              Current ratio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Certifications</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{mockDashboardStats.certificationsExpiring}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Attendance Trends</CardTitle>
            <CardDescription>
              Staff attendance rates over the past 4 weeks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff Role Distribution</CardTitle>
            <CardDescription>
              Breakdown of staff by role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {roleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hours Worked This Month</CardTitle>
          <CardDescription>
            Staff hours breakdown for current month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={hoursData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
            <CardDescription>
              Latest staff attendance records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAttendanceRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{getStaffName(record.staffId)}</div>
                    <div className="text-sm text-muted-foreground">
                      {record.date} • {record.checkIn} - {record.checkOut}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {record.hoursWorked} hours worked
                    </div>
                  </div>
                  <Badge variant={getStatusColor(record.status)}>
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
