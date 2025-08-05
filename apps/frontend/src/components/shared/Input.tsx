import type { FieldProps } from '@/types'
import { cn } from '@/lib/utils'

interface InputProps {
  placeholder?: string
  field: FieldProps
  label?: string
  className?: string
  errorMessage?: string
}

export function Input ({ placeholder, field, label, className, errorMessage }: InputProps): React.ReactElement {
  const handleChange = field.onChange
  return (
    <div className={cn(label !== null || 'flex flex-col gap-2')}>
      {label !== undefined && (<label className='text-sm font-medium'>{label}</label>)}
      <input type={field.type} value={field.value} onChange={handleChange} required={field.required} placeholder={placeholder} className={cn('m-0 flex h-10 w-full rounded-md border border-border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-description focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className)} />
      <div className={cn(errorMessage !== undefined ? 'h-3.5' : 'h-0', 'transition-all duration-200')}>
        {errorMessage !== undefined && <p className='text-sm text-red-300'>{errorMessage}</p>}
      </div>
    </div>
  )
}
