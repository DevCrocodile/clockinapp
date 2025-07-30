import { useState } from 'react'

interface useSelectReturnType {
  value: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
}

export function useSelect ({ required = false, defaultValue = '' }: { required?: boolean, defaultValue?: string }): useSelectReturnType {
  const [value, setValue] = useState<string>(defaultValue)
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setValue(event.target.value)
  }
  return { value, onChange, required }
}
