import type { FieldSelectProps } from '@/types'
import { cn } from '@/lib/utils'

interface Option {
  value: string
  label: React.ReactNode
}
interface SelectProps {
  label?: string
  options: Option[]
  field: FieldSelectProps
  errorMessage?: string
}

export function Select ({ field, label, options, errorMessage }: SelectProps): React.ReactElement {
  return (
    <div className={cn(label !== null && 'flex flex-col gap-2')}>
      {label !== undefined && <label className='text-sm font-medium'>{label}</label>}
      <select {...field} className='m-0 flex h-10 w-full rounded-md border border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className={cn(errorMessage !== undefined ? 'h-3.5' : 'h-0', 'transition-all duration-200')}>
        {errorMessage !== undefined && <p className='text-sm text-red-300'>{errorMessage}</p>}
      </div>
    </div>
  )
}
