import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '~/shared/keys'

const accessToken = STORAGE_KEYS.ACCESS_TOKEN

interface AuthStore {
	accessToken: string | null
	setAccessToken: (token: string | null) => void
	removeAccessToken: () => void
}

export const useAuthStore = create<AuthStore>()(
	persist(
		set => ({
			accessToken: localStorage.getItem(accessToken) || null,
			setAccessToken: (token: string | null) => {
				set({ accessToken: token })
				if (token) {
					localStorage.setItem(accessToken, token)
				} else {
					localStorage.removeItem(accessToken)
				}
			},
			removeAccessToken: () => {
				set({ accessToken: null })
				localStorage.removeItem(accessToken)
			},
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
)
