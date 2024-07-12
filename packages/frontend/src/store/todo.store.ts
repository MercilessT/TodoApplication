import { create } from 'zustand'
import TodoService from '~/shared/services/todo.service'
import { Todo } from '~/shared/types/todo.type'
import { ButtonName } from '~/shared/components/button/button-group.component'

interface TodoStore {
	todos: Todo[]
	todosCount: number
	setTodos: (
		buttonName: ButtonName,
		userId: number,
		search?: string,
		currentPage?: number,
	) => Promise<void>
	getTodo: (id: number) => Todo
	getTodos: () => Todo[]
	createTodo: (todo: Omit<Todo, 'id'>, token: string) => Promise<void>
	updateTodo: (id: number, todo: Omit<Todo, 'id'>) => Promise<void>
	deleteTodo: (id: number) => Promise<void>
	setTodosCount: () => Promise<void>
	getTodosCount: () => number
}

const todoService = TodoService.getInstance()

export const useTodoStore = create<TodoStore>((set, get) => ({
	todos: [],
	todosCount: 1,
	setTodos: async (
		buttonName: ButtonName,
		userId: number,
		search?: string,
		currentPage?: number,
	) => {
		const status = buttonName.toLowerCase()
		const data = await todoService.getFilteredTodos(
			userId,
			status,
			search,
			currentPage,
		)
		set({ todos: data })
	},
	createTodo: async (todo, token) => {
		const newTodo = await todoService.createTodo(todo, token)
		set(state => ({ todos: [newTodo, ...state.todos] }))
	},
	updateTodo: async (id, todo) => {
		const updatedTodo = await todoService.updateTodo(id, todo)
		set(state => ({
			todos: state.todos.map(t =>
				t.id === updatedTodo.id ? updatedTodo : t,
			),
		}))
	},
	deleteTodo: async id => {
		await todoService.deleteTodo(id)
		set(state => ({
			todos: state.todos.filter(todo => todo.id !== id),
		}))
	},
	getTodo: id => {
		const { todos } = get()
		const todo = todos.find(t => t.id === id)
		return todo
	},
	setTodosCount: async () => {
		const res = await todoService.getTodosCount()
		set({ todosCount: res.count })
	},
	getTodosCount: () => {
		return get().todosCount
	},
	getTodos: () => {
		return get().todos
	},
}))
