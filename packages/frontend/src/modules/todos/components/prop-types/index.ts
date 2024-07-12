import { Todo } from '~/shared/types/todo.type'
import { User } from '~/shared/types/user.type'

export interface TodoItemProps {
	todo: Todo
	user: User
	handleGetTodo: (id: number) => void
	handleEditTodo: (id: number) => void
	handleDeleteTodo: (id: number) => void
	checkActions: {
		checkActionsAccess: (user: User, todo: Todo) => boolean
	}
	index?: number
}
