import UserService from '../services/user.service'
import { User } from '../types/user.type'

const userService = UserService.getInstance()

export const getUserByToken = async (token: string): Promise<User | null> => {
	try {
		if (token) {
			const user = await userService.getUserByToken(token)
			return user
		} else {
			console.log('No access token found')
			return null
		}
	} catch (error) {
		console.error('Failed to fetch user:', error)
		return null
	}
}

export const registerUser = async (
	userData: Omit<User, 'id'>,
): Promise<void> => {
	try {
		await userService.registerUser(userData)
	} catch (error) {
		console.error('Failed to register user:', error)
		throw error
	}
}
