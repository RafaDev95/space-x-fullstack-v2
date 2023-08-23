'use client'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

// Component responsible to provider the Toaster.
// With if, it's possible to call the toast in any file that i need.
// Example: toast.success('some text')
const ToastProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <Toaster />
}
export default ToastProvider
