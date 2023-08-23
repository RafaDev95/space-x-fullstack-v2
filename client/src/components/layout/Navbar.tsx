'use client'

import NextLink from 'next/link'

import Logo from '../Logo'

const Navbar = () => {
  return (
    <header className="md:20 h-26 flex w-full items-center justify-center bg-black p-4">
      <nav className="flex w-full flex-col items-center space-y-2 px-4 md:flex-row md:justify-between md:space-y-0">
        <Logo />

        <p className="italic text-slate-200">
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
