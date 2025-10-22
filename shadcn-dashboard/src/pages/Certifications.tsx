import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { mockStaff } from '../data/mockStaffData'
import { AlertTriangle, CheckCircle, XCircle, Calendar, Upload, Plus, Eye, Download } from 'lucide-react'
import { useState } from 'react'

export function Certifications() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedCertification, setSelectedCertification] = useState<any>(null)

  const allCertifications = mockStaff.flatMap(staff => 
    staff.certifications.map(cert => ({
      ...cert,
      staffName: staff.name,
      staffRole: staff.role,
      staffAvatar: staff.avatar,
    }))
  )

  const expiringCertifications = allCertifications.filter(cert => 
    cert.status === 'Expiring Soon' || cert.status === 'Expired'
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-4 w-4 text-success" />
      case 'Expiring Soon':
        return <AlertTriangle className="h-4 w-4 text-warning" />
      case 'Expired':
        return <XCircle className="h-4 w-4 text-destructive" />
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default'
      case 'Expiring Soon':
        return 'secondary'
      case 'Expired':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getCertificationTypeColor = (type: string) => {
    switch (type) {
      case 'CPR': return 'destructive'
      case 'First Aid': return 'secondary'
      case 'Child Development Associate (CDA)': return 'default'
      case 'Background Check': return 'outline'
      case 'Food Handler\'s Permit': return 'secondary'
      case 'Early Childhood Education': return 'default'
      default: return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Certifications & Training</h1>
        <p className="text-muted-foreground">
          Track staff certifications, monitor expiration dates, and manage training records.
        </p>
      </div>

      {/* Alert for expiring certifications */}
      {expiringCertifications.length > 0 && (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Certifications Need Attention</AlertTitle>
          <AlertDescription>
            {expiringCertifications.length} certification(s) are expiring soon or have expired. 
            Please review and take action.
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">{allCertifications.length}</div>
            <p className="text-sm text-muted-foreground">Total Certifications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600">
              {allCertifications.filter(cert => cert.status === 'Active').length}
            </div>
            <p className="text-sm text-muted-foreground">Active Certifications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {allCertifications.filter(cert => cert.status === 'Expiring Soon').length}
            </div>
            <p className="text-sm text-muted-foreground">Expiring Soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-red-600">
              {allCertifications.filter(cert => cert.status === 'Expired').length}
            </div>
            <p className="text-sm text-muted-foreground">Expired</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">All Certifications</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setUploadDialogOpen(true)}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Certificate
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Certification
          </Button>
        </div>
      </div>

      {/* Certifications Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Staff Member</th>
                  <th className="text-left p-4 font-medium">Certification Type</th>
                  <th className="text-left p-4 font-medium">Issue Date</th>
                  <th className="text-left p-4 font-medium">Expiration Date</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allCertifications.map((cert) => (
                  <tr key={cert.id} className="border-b">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={cert.staffAvatar} alt={cert.staffName} />
                          <AvatarFallback>{cert.staffName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{cert.staffName}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={getCertificationTypeColor(cert.type)}>
                        {cert.type}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {new Date(cert.issueDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      {new Date(cert.expirationDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Badge variant={getStatusColor(cert.status)}>
                        {cert.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedCertification(cert)
                            setViewDialogOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Certification Document</DialogTitle>
            <DialogDescription>
              Add a new certification for a staff member
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="staff">Staff Member</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  {mockStaff.map((staff) => (
                    <SelectItem key={staff.id} value={staff.id}>
                      {staff.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type">Certification Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select certification type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CPR">CPR</SelectItem>
                  <SelectItem value="First Aid">First Aid</SelectItem>
                  <SelectItem value="Child Development Associate (CDA)">Child Development Associate (CDA)</SelectItem>
                  <SelectItem value="Background Check">Background Check</SelectItem>
                  <SelectItem value="Food Handler's Permit">Food Handler's Permit</SelectItem>
                  <SelectItem value="Early Childhood Education">Early Childhood Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input type="date" id="issueDate" />
              </div>
              <div>
                <Label htmlFor="expirationDate">Expiration Date</Label>
                <Input type="date" id="expirationDate" />
              </div>
            </div>
            <div>
              <Label htmlFor="file">Upload Document</Label>
              <Button variant="outline" className="w-full" asChild>
                <label>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                  <input type="file" className="hidden" />
                </label>
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setUploadDialogOpen(false)}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Certification Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Certification Details</DialogTitle>
            <DialogDescription>
              View certification information and documents
            </DialogDescription>
          </DialogHeader>
          {selectedCertification && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedCertification.staffAvatar} alt={selectedCertification.staffName} />
                  <AvatarFallback>{selectedCertification.staffName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedCertification.staffName}</div>
                  <div className="text-sm text-muted-foreground">{selectedCertification.staffRole}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Certification Type:</span>
                  <Badge variant={getCertificationTypeColor(selectedCertification.type)}>
                    {selectedCertification.type}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Issue Date:</span>
                  <span className="text-sm">{new Date(selectedCertification.issueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expiration Date:</span>
                  <span className="text-sm">{new Date(selectedCertification.expirationDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge variant={getStatusColor(selectedCertification.status)}>
                    {selectedCertification.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
