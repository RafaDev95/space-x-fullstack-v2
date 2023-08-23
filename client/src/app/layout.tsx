import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Container from '@/components/layout/Container'
import ToastProvider from '@/providers/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Space X Dashboard',
  description: 'Space X Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/rocket.png" />
      </head>
      <body className={inter.className}>
        <ToastProvider />
        <Container>
          <Navbar />
          {children}
        </Container>
      </body>
    </html>
  )
}
