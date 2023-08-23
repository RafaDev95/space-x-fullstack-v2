'use client'

import Image from 'next/image'
import NextLink from 'next/link'

const NotFound = () => {
  return (
    <div className="mx-auto mt-10 h-[800px] max-w-4xl">
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-card p-6">
        <h1 className="text-text-primary text-2xl">Não encontrado.</h1>
        <div className="relative h-[300px] w-[250px] max-w-[500px] md:h-full md:w-full">
          <Image
            src="/not-found.svg"
            fill
            className="object-contain"
            alt="404"
          />
        </div>
        <div className="text-text-primary text-center">
          <h2 className="text-2xl">
            Desculpe mas, creio que tenha ocorrido algum erro. <br />
            Por favor, volte à{' '}
            <NextLink href="/" className="text-slate-100 underline">
              página inicial
            </NextLink>
          </h2>
        </div>
      </div>
    </div>
  )
}
export default NotFound
