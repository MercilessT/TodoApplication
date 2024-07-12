import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ButtonName } from '~/shared/components/button/button-group.component'

interface ButtonFilterGroupState {
	selectedButton: ButtonName
	setSelectedButton: (button: ButtonName) => void
}

export const useButtonFilterGroupStore = create<ButtonFilterGroupState>()(
	persist(
		set => ({
			selectedButton: ButtonName.ALL,
			setSelectedButton: button => set({ selectedButton: button }),
		}),
		{
			name: 'button-group-store',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
)
