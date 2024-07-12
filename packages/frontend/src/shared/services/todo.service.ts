import HttpService from './http.service'
import { Todo } from '../types/todo.type'
import { TODO_URLS } from '../config/backend-urls'
import { TODOS_COUNT_ON_PAGE } from '../config/pages'

class TodoService extends HttpService {
	private static instance: TodoService | null = null

	constructor() {
		super()
	}

	public static getInstance(): TodoService {
		if (!TodoService.instance) {
			TodoService.instance = new TodoService()
		}
		return TodoService.instance
	}

	async getTodos(): Promise<Todo[]> {
		const response = await this.get({ url: TODO_URLS.findAll })
		return response.data
	}

	async getTodo(id: number): Promise<Todo | null> {
		const response = await this.get({ url: TODO_URLS.findOne(id) })
		return response.data
	}

	async createTodo(todo: Omit<Todo, 'id'>, token: string): Promise<Todo> {
		if (!token) {
			throw new Error('Access token is missing')
		}

		const response = await this.post({
			url: TODO_URLS.create,
			data: todo,
		})
		return response.data
	}

	async updateTodo(id: number, todo: Omit<Todo, 'id'>): Promise<Todo | null> {
		const response = await this.put({
			url: TODO_URLS.update(id),
			data: todo,
		})
		return response.data
	}

	async deleteTodo(id: number): Promise<Todo | null> {
		const response = await this.delete({
			url: TODO_URLS.delete(id),
		})
		return response.data
	}

	async getTodosCount() {
		const response = await this.get({ url: TODO_URLS.getTodosCount })
		return response.data
	}

	async getFilteredTodos(
		userId: number,
		status?: string,
		search?: string,
		page?: number,
		limit: number = TODOS_COUNT_ON_PAGE,
	): Promise<Todo[]> {
		const queryParams = new URLSearchParams()
		if (status) {
			queryParams.append('status', status)
		}
		if (search) {
			queryParams.append('search', search)
		}
		if (page) {
			queryParams.append('currentPage', page.toString())
		}
		queryParams.append('limit', limit.toString())

		const response = await this.get({
			url: `${TODO_URLS.filter(userId)}?${queryParams}`,
		})

		return response.data
	}
}
export default TodoService
