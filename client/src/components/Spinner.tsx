'use client'

import { cn } from '@/lib/utils'
import { PuffLoader } from 'react-spinners'

type Props = {
  size?: number
  className?: string
  color?: string
}

const Spinner = ({ size = 40, className, color = 'white' }: Props) => {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        className
      )}
    >
      <PuffLoader color={color} className="mx-auto" size={size} />
    </div>
  )
}
export default Spinner
