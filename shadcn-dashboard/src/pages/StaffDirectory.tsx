import { useState, useMemo } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table'
import { Search, Filter, Eye, Edit, Calendar } from 'lucide-react'
import { mockStaff } from '../data/mockStaffData'
import { Staff } from '../types/staff.types'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

export function StaffDirectory() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Director': return 'default'
      case 'Lead Teacher': return 'secondary'
      case 'Assistant Teacher': return 'outline'
      case 'Admin': return 'destructive'
      default: return 'default'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default'
      case 'On Leave': return 'secondary'
      case 'Inactive': return 'destructive'
      default: return 'default'
    }
  }

  const columns: ColumnDef<Staff>[] = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Staff Member',
      cell: ({ row }) => {
        const staff = row.original
        return (
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={staff.avatar} alt={staff.name} />
              <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{staff.name}</div>
              <div className="text-sm text-muted-foreground">{staff.email}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ getValue }) => (
        <Badge variant={getRoleColor(getValue() as string)}>
          {getValue() as string}
        </Badge>
      ),
    },
    {
      accessorKey: 'certifications',
      header: 'Certifications',
      cell: ({ getValue }) => (
        <Badge variant="outline">
          {(getValue() as any[]).length} certs
        </Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => (
        <Badge variant={getStatusColor(getValue() as string)}>
          {getValue() as string}
        </Badge>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Contact',
      cell: ({ getValue }) => <span className="text-sm">{getValue() as string}</span>,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const staff = row.original
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSelectedStaff(staff)
                setIsDialogOpen(true)
              }}
              aria-label={`View details for ${staff.name}`}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Edit ${staff.name}`}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`View schedule for ${staff.name}`}
            >
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ], [])

  const table = useReactTable({
    data: mockStaff,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Staff Directory</h1>
        <p className="text-muted-foreground">
          Manage your staff members, view their information, and track their status.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Staff Members</CardTitle>
              <CardDescription>
                A list of all staff members in your organization.
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search staff..."
                  value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                  onChange={(event) =>
                    table.getColumn('name')?.setFilterValue(event.target.value)
                  }
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredRowModel().rows.length} of{' '}
              {table.getCoreRowModel().rows.length} row(s) total.
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={selectedStaff?.avatar} alt={selectedStaff?.name} />
                <AvatarFallback>{selectedStaff?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xl font-semibold">{selectedStaff?.name}</div>
                <div className="text-sm text-muted-foreground">{selectedStaff?.role}</div>
              </div>
            </DialogTitle>
            <DialogDescription>
              View detailed information about this staff member.
            </DialogDescription>
          </DialogHeader>
          
          {selectedStaff && (
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">{selectedStaff.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p className="text-sm text-muted-foreground">{selectedStaff.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hire Date</label>
                    <p className="text-sm text-muted-foreground">{selectedStaff.hireDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Badge variant={getStatusColor(selectedStaff.status)}>
                      {selectedStaff.status}
                    </Badge>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="qualifications" className="space-y-4">
                <div className="space-y-2">
                  {selectedStaff.certifications.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{cert.type}</div>
                        <div className="text-sm text-muted-foreground">
                          Issued: {cert.issueDate} | Expires: {cert.expirationDate}
                        </div>
                      </div>
                      <Badge variant={cert.status === 'Active' ? 'default' : 'destructive'}>
                        {cert.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Schedule information would be displayed here.
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Performance metrics would be displayed here.
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
