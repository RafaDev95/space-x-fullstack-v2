'use client'

import { mergeClassNames } from '@/lib/utils'
import { Toaster } from 'react-hot-toast'

type Props = {
  children: React.ReactNode
  className?: string
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={mergeClassNames('mx-auto max-w-[1500px]', className)}>
      <Toaster />
      {children}
    </div>
  )
}
export default Container
