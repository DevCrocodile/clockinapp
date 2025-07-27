import { useState } from 'react'

interface useFieldReturnType {
  type: string
  value: string | ''
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  required?: boolean
  setValue: (value: string) => void
}

export function useField ({ type, required = false }: { type: string, required?: boolean }): useFieldReturnType {
  const [value, setValue] = useState<string>('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setValue(event.target.value)
  }

  return { type, value, onChange, required, setValue }
}
