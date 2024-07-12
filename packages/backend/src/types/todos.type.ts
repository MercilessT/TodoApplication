import { Todo } from '@prisma/client'

export type TodoType = Todo

export enum TodoStatus {
	ALL = 'all',
	COMPLETED = 'completed',
	PRIVATE = 'private',
	PUBLIC = 'public',
}
