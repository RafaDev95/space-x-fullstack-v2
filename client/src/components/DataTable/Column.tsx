'use client'

import NextLink from 'next/link'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'

import { Result } from '@/types'
import { convertDate } from '@/lib/convertDateToBrazilianFormat'
import { cn } from '@/lib/utils'

// About the snake_case in the acessorKey field:
// It's necessary to be this way due to the structure of data being recieved.
// This field must be the same as the data field name.
// Example: result[0].flight_number. Due to the acessorKey had the same field name, it'll show the value that field.
const columns: ColumnDef<Result>[] = [
  {
    accessorKey: 'flight_number',
    header: 'Nª Vôo',
  },
  {
    accessorKey: 'links.patch.large',
    header: 'Logo',
    cell: ({ row }) => {
      const launchLogo = row.original.links.patch.large

      return <Image src={launchLogo} alt="Misson logo" width={40} height={40} />
    },
  },
  {
    accessorKey: 'name',
    header: 'Missão',
  },
  {
    accessorKey: 'date_local',
    header: 'Data de lançamento',
    cell: ({ row }) => {
      const date = row.original.date_local

      const parsedData = convertDate(date)

      return <p>{parsedData}</p>
    },
  },

  {
    accessorKey: 'rocket_data.name',
    header: 'Foguete',
  },
  {
    accessorKey: 'success',
    header: 'Resultado',
    cell: ({ row }) => {
      const wasSuccess = row.original.success

      return (
        <p
          className={cn(
            'w-fit rounded-md p-1 font-semibold text-slate-200',
            wasSuccess ? 'bg-green-700' : 'bg-red-700'
          )}
        >
          {wasSuccess ? 'Sucesso' : 'Falha'}
        </p>
      )
    },
  },
  {
    accessorKey: 'links.webcast',
    header: 'Vídeo',
    cell: ({ row }) => {
      const youtubeLink = row.original.links.webcast

      return (
        <NextLink href={youtubeLink} target="_blank">
          <Image
            src="/icons/youtube.png"
            alt="Youtube logo icon"
            width={25}
            height={25}
          />
        </NextLink>
      )
    },
  },
]

export default columns
