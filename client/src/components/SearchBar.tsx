'use client'

import useLoadingStore from '@/shared/hooks/useLoadingStore'
import useQueryStore from '@/shared/hooks/useQueryStore'
import debounce from 'lodash/debounce'

import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

import { Input } from './ui/input'

const SearchBar = () => {
  const [title, setTitle] = useState('')

  const { setSearch } = useQueryStore()
  const { isLoading, setIsLoading } = useLoadingStore()

  const router = useRouter()

  const handleSearch = debounce(async (title: string) => {
    if (title.length === 3) {
      router.push(`?search=${title}`)
      setIsLoading(true)
    } else if (title.length === 0) {
      router.replace('/')
    }
  }, 500)

  useEffect(() => {
    handleSearch(title)
    setSearch(title)
  }, [title])
  return (
    <Input
      type="text"
      className="mx-auto mt-8 w-2/5"
      placeholder="Pesquise aqui..."
      onChange={(e) => setTitle(e.target.value)}
      disabled={isLoading}
    />
  )
}
export default SearchBar
