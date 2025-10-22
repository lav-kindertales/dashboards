import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { mockStaff } from '../data/mockStaffData'
import { Calendar, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export function StaffSchedules() {
  const [viewMode, setViewMode] = useState<'calendar' | 'weekly'>('weekly')
  const [selectedWeek, setSelectedWeek] = useState(0)

  const getWeekDates = (weekOffset: number) => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + (weekOffset * 7))
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    
    return {
      start: startOfWeek,
      end: endOfWeek,
      days: Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek)
        date.setDate(startOfWeek.getDate() + i)
        return date
      })
    }
  }

  const weekDates = getWeekDates(selectedWeek)
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const getShiftColor = (shiftType: string) => {
    switch (shiftType) {
      case 'Morning': return 'bg-blue-100 text-blue-800'
      case 'Afternoon': return 'bg-purple-100 text-purple-800'
      case 'Full Day': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Staff Schedules</h1>
        <p className="text-muted-foreground">
          Manage staff schedules, view availability, and track time-off requests.
        </p>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold">
                Week of {weekDates.start.toLocaleDateString()} - {weekDates.end.toLocaleDateString()}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedWeek(selectedWeek - 1)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous Week
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedWeek(selectedWeek + 1)}
              >
                Next Week
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'weekly' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('weekly')}
                  className="rounded-r-none"
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Weekly
                </Button>
                <Button
                  variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('calendar')}
                  className="rounded-l-none border-l"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Calendar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === 'weekly' && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Staff Member</th>
                    {daysOfWeek.map((day, index) => (
                      <th key={day} className="text-center p-4 font-medium">
                        <div>
                          <div className="font-semibold">{day}</div>
                          <div className="text-sm text-muted-foreground">
                            {weekDates.days[index].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockStaff.map((staff) => (
                    <tr key={staff.id} className="border-b">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={staff.avatar} alt={staff.name} />
                            <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{staff.name}</div>
                            <div className="text-sm text-muted-foreground">{staff.role}</div>
                          </div>
                        </div>
                      </td>
                      {daysOfWeek.map((day, index) => {
                        const dayKey = day.toLowerCase() as keyof typeof staff.schedule
                        const shifts = staff.schedule[dayKey]
                        return (
                          <td key={index} className="text-center p-4">
                            {shifts.length > 0 ? (
                              <div className="flex flex-col gap-1">
                                {shifts.map((shift) => (
                                  <Badge
                                    key={shift.id}
                                    className={`text-xs ${getShiftColor(shift.type)}`}
                                  >
                                    {shift.type} {shift.startTime}-{shift.endTime}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">Off</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {viewMode === 'calendar' && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Calendar View</CardTitle>
                <CardDescription>
                  Staff schedule overview for the current month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="p-2 font-semibold text-sm">
                      {day}
                    </div>
                  ))}
                  {/* Calendar grid would go here - simplified for demo */}
                  {Array.from({ length: 35 }, (_, i) => (
                    <div
                      key={i}
                      className={`min-h-[100px] border p-1 ${
                        i < 7 ? 'bg-muted' : 'bg-background'
                      }`}
                    >
                      <span className="text-xs">
                        {i < 7 ? '' : i - 6}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Staff Availability</CardTitle>
                <CardDescription>
                  Current staff status and availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockStaff.slice(0, 5).map((staff) => (
                    <div key={staff.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={staff.avatar} alt={staff.name} />
                          <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium text-sm">{staff.name}</div>
                      </div>
                      <Badge variant={getStatusColor(staff.status)}>
                        {staff.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Add Staff to Schedule
        </Button>
        <Button variant="outline">
          <Clock className="mr-2 h-4 w-4" />
          Bulk Schedule Update
        </Button>
      </div>
    </div>
  )
}
