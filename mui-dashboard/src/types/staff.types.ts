export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Director' | 'Lead Teacher' | 'Assistant Teacher' | 'Admin' | 'Support Staff';
  hireDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  avatar?: string;
  certifications: Certification[];
  schedule: Schedule;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Certification {
  id: string;
  type: 'CPR' | 'First Aid' | 'Child Development Associate (CDA)' | 'Background Check' | 'Food Handler\'s Permit' | 'Early Childhood Education';
  issueDate: string;
  expirationDate: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
  documentUrl?: string;
}

export interface Schedule {
  monday: Shift[];
  tuesday: Shift[];
  wednesday: Shift[];
  thursday: Shift[];
  friday: Shift[];
  saturday: Shift[];
  sunday: Shift[];
}

export interface Shift {
  id: string;
  type: 'Morning' | 'Afternoon' | 'Full Day';
  startTime: string;
  endTime: string;
  room: string;
  status: 'Scheduled' | 'Completed' | 'Absent';
}

export interface AttendanceRecord {
  id: string;
  staffId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  hoursWorked: number;
  status: 'Present' | 'Late' | 'Absent' | 'Sick Leave';
}

export interface TimeOffRequest {
  id: string;
  staffId: string;
  startDate: string;
  endDate: string;
  type: 'Vacation' | 'Sick Leave' | 'Personal' | 'Emergency';
  status: 'Pending' | 'Approved' | 'Denied';
  reason: string;
  submittedDate: string;
}

export interface DashboardStats {
  totalStaff: number;
  staffOnDuty: number;
  certificationsExpiring: number;
  openPositions: number;
  attendanceRate: number;
  staffToChildRatio: number;
}
