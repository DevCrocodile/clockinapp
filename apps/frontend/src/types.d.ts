export interface FieldProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  type: string
  required?: boolean
}

export interface FieldSelectProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
}

export interface FieldTextAreaProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
}

export interface Employee {
  id: string
  name: string
  phone: string
  pin?: string
  role: string
  branch: string
  expectedHours: number
  schedule: {
    start: string
    end: string
  }
  isActive: boolean
  hasFingerprint: boolean
}

export interface ClockRecord {
  id: string
  employeeId: string
  employeeName: string
  date: string
  clockIn?: string
  clockOut?: string
  breakStart?: string
  breakEnd?: string
  totalHours?: number
  status: 'complete' | 'in-progress' | 'break' | 'absent'
}

export interface ConfirmationData {
  type: 'success' | 'error'
  message: string
  employeeName?: string
  time?: string
}

export interface Branch {
  id: string
  name: string
  address: string
  phone: string
  manager: string
  isActive: boolean
  createdAt: string
}
