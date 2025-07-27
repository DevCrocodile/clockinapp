import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  variant?: 'primary' | 'outline' | 'ghost'
  className?: string
}

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-500',
  outline: 'border border-border text-black hover:bg-slate-50',
  ghost: 'bg-transparent hover:bg-slate-100 border-none'
}

export function Button ({ children, onClick, disabled, variant = 'primary', className }: ButtonProps): React.ReactElement {
  const baseStyles = 'flex items-center cursor-pointer justify-center gap-2 transition-colors rounded-md border border-border text-sm font-medium px-4 py-2 disabled:pointer-events-none disabled:opacity-50'

  const colors = variants[variant]
  return (
    <button onClick={onClick} disabled={disabled} className={cn(baseStyles, colors, className)}>
      {children}
    </button>
  )
}
