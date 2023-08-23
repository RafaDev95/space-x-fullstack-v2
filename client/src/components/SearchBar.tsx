'use client'

import DOMPurify from 'dompurify'

import { useEffect } from 'react'
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
  title: z
    .string()
    .min(3, 'Precisa no mínimo de 3 caracteres.')
    .refine((value) => {
      const sanitizedValue = DOMPurify.sanitize(value)

      return sanitizedValue === value
    }, 'Entrada inválida.'),
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
  const validationResult = searchQuerySchema.safeParse({ title })

  const handleSearch = debounce(async (data: SearchQueryType) => {
    if (data.title.length >= 3 && validationResult.success) {
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
    <div className="relative mx-auto mt-8 w-full md:w-2/6">
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
        disabled={isLoading || !validationResult.success}
        className="hover:text-text-primary absolute right-0 top-0 rounded-none rounded-br-md rounded-tr-md p-3 hover:bg-card active:scale-95"
      >
        <Search />
      </Button>
    </div>
  )
}
export default SearchBar
