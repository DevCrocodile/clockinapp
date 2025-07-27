import { cn } from '../../lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function Card ({ children, className, onClick }: CardProps): React.ReactElement {
  return (
    <div onClick={onClick} className={cn('rounded-lg border border-border bg-card text-card-text shadow-sm transition-shadow', className)}>
      {children}
    </div>
  )
}
export function CardHeader ({ children, className }: CardProps): React.ReactElement {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  )
}

export function CardTitle ({ children, className }: { children: React.ReactNode, className?: string }): React.ReactElement {
  return (
    <h3 className={cn('tracking-tight font-medium', className)}>
      {children}
    </h3>
  )
}

export function CardDescription ({ children, className }: { children: React.ReactNode, className?: string }): React.ReactElement {
  return (
    <p className={cn('text-sm text-description', className)}>
      {children}
    </p>
  )
}

export function CardContent ({ children, className }: CardProps): React.ReactElement {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  )
}

export function CardFooter ({ children, className }: CardProps): React.ReactElement {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  )
}
