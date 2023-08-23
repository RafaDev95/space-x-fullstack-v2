import { create } from 'zustand'

type State = {
  querySearch: string
  setQuerySearch: (querySearch: string) => void
}

const useQueryStore = create<State>((set) => ({
  querySearch: '',
  setQuerySearch: (querySearch) => set({ querySearch }),
}))

export default useQueryStore
