import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { STORAGE_KEYS } from '../keys'

class HttpService {
	constructor(
		private baseUrl: string = process.env.SERVER_URL,
		private fetchingService: AxiosInstance = axios.create({
			withCredentials: true,
		}),
		private apiVersion: string = 'api',
	) {}

	private getFullApiUrl(url: string): string {
		return `${this.baseUrl}/${this.apiVersion}/${url}`
	}

	private populateTokenToHeaderConfig(): { Authorization: string | null } {
		const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
		return {
			Authorization: token ? `Bearer ${token}` : null,
		}
	}

	private extractUrlAndDataFromConfig(
		config: AxiosRequestConfig,
	): AxiosRequestConfig {
		const { data, url, ...configWithoutDataAndUrl } = config
		return configWithoutDataAndUrl
	}

	public get(config: AxiosRequestConfig, withAuth: boolean = true) {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			}
		}
		return this.fetchingService.get(
			this.getFullApiUrl(config.url),
			this.extractUrlAndDataFromConfig(config),
		)
	}

	public put(config: AxiosRequestConfig, withAuth: boolean = true) {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			}
		}
		return this.fetchingService.put(
			this.getFullApiUrl(config.url),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		)
	}

	public post(config: AxiosRequestConfig, withAuth: boolean = true) {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			}
		}
		return this.fetchingService.post(
			this.getFullApiUrl(config.url),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		)
	}

	public delete(config: AxiosRequestConfig, withAuth: boolean = true) {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			}
		}
		return this.fetchingService.delete(
			this.getFullApiUrl(config.url),
			this.extractUrlAndDataFromConfig(config),
		)
	}
}

export default HttpService
