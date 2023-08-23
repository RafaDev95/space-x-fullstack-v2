'use client'

import Image from 'next/image'

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative h-14 w-14">
        <Image
          src="/rocket.png"
          alt="rocket in orbit"
          fill
          className="object-contain"
        />
      </div>
      <h1 className="text-text-primary text-xl font-semibold md:text-2xl">
        Space X
      </h1>
    </div>
  )
}
export default Logo
