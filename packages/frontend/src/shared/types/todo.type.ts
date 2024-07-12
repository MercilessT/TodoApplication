export type Todo = {
	id: number
	title: string
	description?: string | null
	isPrivate: boolean
	isCompleted: boolean
	isVerified?: boolean
	userId?: number
}
