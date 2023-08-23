import { create } from 'zustand'

type State = {
  search: string
  setSearch: (search: string) => void
}

const useQueryStore = create<State>((set) => ({
  search: '',
  setSearch: (search) => set({ search }),
}))

export default useQueryStore
