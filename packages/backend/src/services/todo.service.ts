import { TodoType } from '@/types/todos.type'
import prisma from '@/utils/prisma.util'
import { Prisma } from '@prisma/client'
import { TodoStatus } from '@/types/todos.type'
import { buildTodoFilterClause } from '../utils/todo-filter.util'

export default class TodoService {
	private async checkAccess(todoId: number, userId: number): Promise<void> {
		const existingTodo = await prisma.todo.findUnique({
			where: { id: todoId },
		})

		if (!existingTodo) {
			throw new Error('Todo not found')
		}

		if (existingTodo.userId !== userId) {
			throw new Error('Forbidden: You do not have access to this todo')
		}
	}

	async findAll(): Promise<TodoType[]> {
		return await prisma.todo.findMany()
	}

	async create(
		todo: Omit<TodoType, 'id'>,
		userId: number,
	): Promise<TodoType> {
		const createdTodo = await prisma.todo.create({
			data: {
				...todo,
				userId,
			},
		})

		return createdTodo
	}

	async findOne(id: number, userId: number): Promise<TodoType | null> {
		const foundTodo = await prisma.todo.findUnique({
			where: { id },
		})

		if (foundTodo!.isPrivate && foundTodo!.userId !== userId) {
			throw new Error('Forbidden: You do not have access to this todo')
		}

		return foundTodo
	}

	async update(
		id: number,
		todo: Partial<Omit<TodoType, 'id'>>,
		userId: number,
	): Promise<TodoType | null> {
		await this.checkAccess(id, userId)

		const updatedTodo = await prisma.todo.update({
			where: { id },
			data: todo,
		})
		return updatedTodo
	}

	async delete(id: number, userId: number): Promise<TodoType | null> {
		await this.checkAccess(id, userId)

		const deletedTodo = await prisma.todo.delete({
			where: { id },
		})
		return deletedTodo
	}

	async getFilteredTodos(
		userId: number,
		search?: string,
		status?: TodoStatus,
		currentPage?: number,
		limit?: number,
	): Promise<TodoType[]> {
		const whereClause = buildTodoFilterClause(userId, search, status)

		const queryOptions: Prisma.TodoFindManyArgs = {
			where: whereClause,
			orderBy: {
				updatedAt: 'desc',
			},
		}

		if (currentPage && limit) {
			queryOptions.skip = (currentPage - 1) * limit
			queryOptions.take = limit
		}

		const todos = await prisma.todo.findMany(queryOptions)

		return todos
	}

	async getTodosCount(): Promise<number> {
		return await prisma.todo.count()
	}
}
