'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import debounce from 'lodash/debounce'
import { Search } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import useLoadingStore from '@/shared/hooks/useLoadingStore'
import useQueryStore from '@/shared/hooks/useQueryStore'
import { Input } from './ui/input'
import { Button } from './ui/button'

const searchQuerySchema = z.object({
  title: z.string().min(3, 'Precisa no mínimo de 3 caracteres.'),
})

type SearchQueryType = z.infer<typeof searchQuerySchema>

const SearchBar = () => {
  const router = useRouter()
  const { setQuerySearch } = useQueryStore()
  const { isLoading, setIsLoading } = useLoadingStore()

  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<SearchQueryType>({ resolver: zodResolver(searchQuerySchema) })

  const title = getValues('title')

  const handleSearch = debounce(async (data: SearchQueryType) => {
    if (data.title.length >= 3) {
      router.push(`?search=${data.title}`)

      // This setQuerySearch is respoonsable to store the search value in the global state
      // to be used when nagivate to another by, by the table nagivation component.
      // Without it, when i search query for something and click to next page, the search query is lost and i navigate/paginate for the all launches
      setQuerySearch(data.title)
      setIsLoading(true)
    }
  }, 500)

  useEffect(() => {
    if (title?.length === 0) {
      router.replace('/')
      clearErrors('title')
    }
  }, [title])

  return (
    <div className="relative mx-auto mt-8 w-2/6">
      <Input
        id="title"
        errors={errors}
        register={register}
        type="text"
        className="rounded-lg"
        placeholder="Pesquise aqui..."
        disabled={isLoading}
      />

      <Button
        onClick={handleSubmit(handleSearch)}
        disabled={isLoading}
        className="absolute right-0 top-0 rounded-none rounded-br-md rounded-tr-md p-3 hover:bg-card hover:text-slate-200 active:scale-95"
      >
        <Search />
      </Button>
    </div>
  )
}
export default SearchBar
