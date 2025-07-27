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
