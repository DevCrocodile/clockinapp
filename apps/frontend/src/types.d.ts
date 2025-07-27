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

export interface ConfirmationData {
  type: 'success' | 'error'
  message: string
  employeeName?: string
  time?: string
}

export interface Employee {
  id: string
  name: string
  email: string
  pin: string
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
}
