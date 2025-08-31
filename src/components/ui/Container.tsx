import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  verticalSpacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export default function Container({
  children,
  className,
  size = 'lg',
  padding = 'md',
  verticalSpacing = 'none'
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  }

  const paddingClasses = {
    none: 'px-0',
    sm: 'px-4',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-4 sm:px-6 md:px-8 lg:px-12',
    xl: 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16'
  }

  const verticalClasses = {
    none: '',
    sm: 'py-6 sm:py-8',
    md: 'py-8 sm:py-12 lg:py-16',
    lg: 'py-12 sm:py-16 lg:py-20',
    xl: 'py-16 sm:py-20 lg:py-24'
  }

  return (
    <div className={cn(
      'mx-auto',
      sizeClasses[size],
      paddingClasses[padding],
      verticalClasses[verticalSpacing],
      className
    )}>
      {children}
    </div>
  )
}