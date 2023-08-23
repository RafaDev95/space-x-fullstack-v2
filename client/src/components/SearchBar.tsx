'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import debounce from 'lodash/debounce'
import { Search } from 'lucide-react'

import useLoadingStore from '@/shared/hooks/useLoadingStore'
import useQueryStore from '@/shared/hooks/useQueryStore'
import { Input } from './ui/input'
import { Button } from './ui/button'

const SearchBar = () => {
  const [title, setTitle] = useState('')

  const { setQuerySearch } = useQueryStore()
  const { isLoading, setIsLoading } = useLoadingStore()

  const router = useRouter()

  const handleSearch = debounce(async (title: string) => {
    console.log(title)
    if (title.length >= 3) {
      router.push(`?search=${title}`)

      // This setQuerySearch is respoonsable to store the search value in the global state
      // to be used when nagivate to another by, by the table nagivation component.
      // Without it, when i search query for something and click to next page, the search query is lost and i navigate/paginate for the all launches
      setQuerySearch(title)
      setIsLoading(true)
    } else if (title.length === 0) {
      router.replace('/')
    }
  }, 500)

  return (
    <div className="mx-auto mt-8 flex w-fit items-center justify-center rounded-lg bg-white">
      <Input
        type="text"
        className="ring-offset-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Pesquise aqui..."
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
      />

      <Button
        onClick={() => handleSearch(title)}
        disabled={isLoading}
        className="rounded-none rounded-br-md rounded-tr-md p-3 hover:bg-card hover:text-slate-200 active:scale-95"
      >
        <Search />
      </Button>
    </div>
  )
}
export default SearchBar
