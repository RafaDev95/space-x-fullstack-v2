'use client'

import NextLink from 'next/link'

import Logo from '../Logo'

const Navbar = () => {
  return (
    <header className="h-26 flex w-full items-center justify-center bg-black p-4">
      <nav className="flex w-full flex-col items-center space-y-2 px-4 md:flex-row md:justify-between md:space-y-0">
        <Logo />

        <p className="text-text-primary italic">
          Data Source:{' '}
          <NextLink
            href="https://github.com/r-spacex/SpaceX-API"
            className="underline"
          >
            Space X
          </NextLink>
        </p>
      </nav>
    </header>
  )
}
export default Navbar
