import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface PagesPaginationStore {
	currentPage: number
	totalPages: number
	setCurrentPage: (page: number) => void
	setTotalPages: (totalPages: number) => void
	getCurrentPage: () => number
}

export const usePagesPaginationStore = create<PagesPaginationStore>()(
	persist(
		(set, get) => ({
			currentPage: 1,
			totalPages: 1,
			setCurrentPage: (page: number) => set({ currentPage: page }),
			setTotalPages: (totalPages: number) => set({ totalPages }),
			getCurrentPage: () => get().currentPage,
		}),
		{
			name: 'pages-pagination-storage',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
)
