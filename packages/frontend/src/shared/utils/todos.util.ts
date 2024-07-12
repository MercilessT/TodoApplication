import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTER_KEYS } from '../keys'
import { Todo } from '../types/todo.type'
import { usePagesPaginationStore } from '~/store/pages-pagination.store'
import { useTodoStore } from '~/store/todo.store'
import { TODOS_COUNT_ON_PAGE } from '../config/pages'

type UseTodoActions = {
	handleGetTodo: (id: number) => Promise<void>
	handleEditTodo: (id: number) => Promise<void>
}

export const useTodoActions = (): UseTodoActions => {
	const navigate = useNavigate()

	const handleGetTodo = async (id: number): Promise<void> => {
		navigate(ROUTER_KEYS.VIEW_NAVIGATE(id))
	}

	const handleEditTodo = async (id: number): Promise<void> => {
		navigate(ROUTER_KEYS.EDIT_NAVIGATE(id))
	}

	return { handleGetTodo, handleEditTodo }
}

type UseCreateDialogActions = {
	isCreateDialogOpen: boolean
	openCreateDialog: () => void
	closeCreateDialog: () => void
	handleCreateTodo: (todo: Omit<Todo, 'id'>, token: string) => Promise<void>
}

export const useCreateDialogActions = (
	createTodo: (todo: Omit<Todo, 'id'>, token: string) => Promise<void>,
): UseCreateDialogActions => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false)
	const { setTotalPages } = usePagesPaginationStore()
	const { setTodosCount, getTodosCount } = useTodoStore()

	const openCreateDialog = () => {
		setIsCreateDialogOpen(true)
	}

	const closeCreateDialog = () => {
		setIsCreateDialogOpen(false)
	}

	const handleCreateTodo = async (
		newTodo: Omit<Todo, 'id'>,
		token: string,
	) => {
		await createTodo(newTodo, token)
		await setTodosCount()
		setTotalPages(Math.ceil(getTodosCount() / TODOS_COUNT_ON_PAGE))
		closeCreateDialog()
	}

	return {
		isCreateDialogOpen,
		openCreateDialog,
		closeCreateDialog,
		handleCreateTodo,
	}
}

type UseDeleteDialogActions = {
	isDeleteDialogOpen: boolean
	handleDeleteTodo: (id: number) => void
	closeDeleteDialog: () => void
	confirmDeleteTodo: () => Promise<void>
}

export const useDeleteDialogActions = (
	deleteTodo: (id: number) => Promise<void>,
): UseDeleteDialogActions => {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
	const [todoToDelete, setTodoToDelete] = useState<number | null>(null)
	const { setTotalPages } = usePagesPaginationStore()
	const { setTodosCount, getTodosCount } = useTodoStore()

	const handleDeleteTodo = (id: number) => {
		setTodoToDelete(id)
		setIsDeleteDialogOpen(true)
	}

	const closeDeleteDialog = async () => {
		await setTodosCount()
		setTotalPages(Math.ceil(getTodosCount() / TODOS_COUNT_ON_PAGE))
		setIsDeleteDialogOpen(false)
		setTodoToDelete(null)
	}

	const confirmDeleteTodo = async () => {
		if (todoToDelete) {
			await deleteTodo(todoToDelete)
			closeDeleteDialog()
		}
	}

	return {
		isDeleteDialogOpen,
		handleDeleteTodo,
		closeDeleteDialog,
		confirmDeleteTodo,
	}
}
