import { useNavigate } from 'react-router-dom'
import { ROUTER_KEYS } from '../keys'
import { useAuthStore } from '~/store/auth.store'

export const handleLogoutAction = () => {
	const navigate = useNavigate()
	const { removeAccessToken } = useAuthStore()

	const handleLogout = () => {
		removeAccessToken()
		navigate(ROUTER_KEYS.HOME)
	}

	return { handleLogout }
}
