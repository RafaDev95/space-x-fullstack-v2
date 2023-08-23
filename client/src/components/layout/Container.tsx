'use client'

import { mergeClassNames } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={mergeClassNames('mx-auto max-w-[1500px]', className)}>
      {children}
    </div>
  )
}
export default Container
