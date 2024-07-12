import { Todo } from '../types/todo.type'
import { User } from '../types/user.type'

export const checkActions = {
	checkViewAccess: (user: User, todo: Todo): boolean => {
		return user && (user.id === todo.userId || !todo.isPrivate)
	},

	checkActionsAccess: (user: User, todo: Todo): boolean => {
		return user && user.id === todo.userId
	},
}
