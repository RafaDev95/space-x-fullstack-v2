'use client'

import { useSearchParams } from 'next/navigation'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import NextLink from 'next/link'

import { Spinner } from '@/components'
import { Button } from '../ui/button'
import useQueryStore from '@/shared/hooks/useQueryStore'
import useLoadingStore from '@/shared/hooks/useLoadingStore'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  hasNextPage: boolean
  hasPrevPage: boolean
  totalDocs: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  hasNextPage,
  hasPrevPage,
  totalDocs,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const { querySearch } = useQueryStore()
  const { setIsLoading, isLoading } = useLoadingStore()

  const searchParams = useSearchParams()
  const page = searchParams.get('page') ?? '1'

  return (
    <div className="rounde-md text-text-primary border bg-secondary p-4">
      <div className="border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col items-center justify-end space-x-2 space-y-4 py-4 md:flex-row md:space-y-0">
        <p className="mr-4 italic underline">Mostrando 1-5 de {totalDocs}</p>
        <Button
          variant="outline"
          className="hover:bg-text-primary w-[80px] hover:text-gray-600"
          size="sm"
          disabled={!hasPrevPage || isLoading}
          onClick={() => setIsLoading(true)}
        >
          <NextLink
            scroll={false}
            href={`?page=${Number(page) - 1}&search=${querySearch}`}
          >
            {isLoading ? <Spinner /> : 'Anterior'}
          </NextLink>
        </Button>
        <Button
          variant="outline"
          className="hover:bg-text-primary w-[80px] hover:text-gray-600"
          size="sm"
          disabled={!hasNextPage || isLoading}
          onClick={() => setIsLoading(true)}
        >
          <NextLink
            scroll={false}
            href={`?page=${Number(page) + 1}&search=${querySearch}`}
          >
            {isLoading ? <Spinner /> : 'Próxima'}
          </NextLink>
        </Button>
      </div>
    </div>
  )
}
