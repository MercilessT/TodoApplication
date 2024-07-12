import { Todo } from './todo.type'

export type User = {
	id: number
	email: string
	password: string
	name: string
	isVerified?: boolean
	todos?: Todo[]
}
