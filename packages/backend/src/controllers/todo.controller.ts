import { Response, Request } from 'express'
import TodoService from '@/services/todo.service'
import { UserType } from '../types/user.type'
import { TodoStatus } from '@/types/todos.type'

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodos(_: Request, res: Response): Promise<void> {
		const todos = await this.todoService.findAll()
		res.send(todos)
	}

	async createTodo(req: Request, res: Response): Promise<void> {
		const userId = (req.user as UserType).id
		const createdTodo = await this.todoService.create(req.body, userId)
		res.status(201).send(createdTodo)
	}

	async getTodo(req: Request, res: Response): Promise<void> {
		const todoId = parseInt(req.params.id)
		const userId = (req.user as UserType).id
		const todo = await this.todoService.findOne(todoId, userId)
		res.send(todo)
	}

	async updateTodo(req: Request, res: Response): Promise<void> {
		const todoId = parseInt(req.params.id)
		const userId = (req.user as UserType).id
		const updatedTodo = await this.todoService.update(
			todoId,
			req.body,
			userId,
		)
		res.send(updatedTodo)
	}

	async deleteTodo(req: Request, res: Response): Promise<void> {
		const todoId = parseInt(req.params.id)
		const userId = (req.user as UserType).id
		const deletedTodo = await this.todoService.delete(todoId, userId)
		res.status(204).send()
	}

	async getFilteredTodos(req: Request, res: Response): Promise<void> {
		const { search, status, currentPage, limit } = req.query
		const userId = parseInt(req.params.id)

		const todos = await this.todoService.getFilteredTodos(
			userId,
			search as string | undefined,
			status as TodoStatus | undefined,
			currentPage ? parseInt(currentPage as string, 10) : undefined,
			limit ? parseInt(limit as string, 10) : undefined,
		)

		res.send(todos)
	}

	async getTodosCount(_: Request, res: Response): Promise<void> {
		const count = await this.todoService.getTodosCount()
		res.send({ count })
	}
}

const todoController = new TodoController(new TodoService())
export default todoController
