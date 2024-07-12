import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface InputStore {
	inputValue: string
	setInputValue: (value: string) => void
}

export const useSearchInputStore = create<InputStore>()(
	persist(
		set => ({
			inputValue: '',
			setInputValue: (value: string) => set({ inputValue: value }),
		}),
		{
			name: 'input-search-storage',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
)
