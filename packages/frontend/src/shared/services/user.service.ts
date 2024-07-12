import HttpService from './http.service'
import { User } from '../types/user.type'
import { USER_URLS } from '../config/backend-urls'
import { STORAGE_KEYS } from '../keys'

class UserService extends HttpService {
	private static instance: UserService | null = null

	constructor() {
		super()
	}

	public static getInstance(): UserService {
		if (!UserService.instance) {
			UserService.instance = new UserService()
		}
		return UserService.instance
	}

	async registerUser(userData: Omit<User, 'id'>): Promise<User> {
		const response = await this.post({
			url: USER_URLS.register,
			data: userData,
		})
		return response.data
	}

	async loginUser(
		todo: Pick<User, 'email' | 'password'>,
	): Promise<{ [STORAGE_KEYS.ACCESS_TOKEN]: string }> {
		const response = await this.post({
			url: USER_URLS.login,
			data: todo,
		})
		return response.data
	}

	async getUserByToken(token: string): Promise<User> {
		const response = await this.get({
			url: USER_URLS.getUserByToken(token),
		})
		return response.data
	}

	async sendEmail(email: string): Promise<void> {
		const response = await this.post({
			url: USER_URLS.forgotPassword,
			data: { email },
		})
		return response.data
	}

	async changePassword(newPassword: string, token: string) {
		const response = await this.post({
			url: USER_URLS.changePassword,
			data: {
				newPassword,
				token,
			},
		})
		return response.data
	}
}

export default UserService
