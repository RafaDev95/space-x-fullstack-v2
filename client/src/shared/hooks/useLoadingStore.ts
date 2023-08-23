import { create } from 'zustand'

type State = {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

const useLoadingStore = create<State>((set) => ({
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
}))

export default useLoadingStore
