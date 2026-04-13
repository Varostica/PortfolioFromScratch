interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

export default function Spinner({ size = 'md', label }: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-[3px]',
    lg: 'h-16 w-16 border-4',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3" role="status">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-orange-200 border-t-orange-500`}
      />
      {label && (
        <span className="text-sm font-medium text-orange-400 animate-pulse">
          {label}
        </span>
      )}
      <span className="sr-only">Loading…</span>
    </div>
  )
}
