export const TODO_URLS = {
	findAll: 'todos/all',
	findOne: (id: number) => `todos/${id}`,
	create: 'todos',
	update: (id: number) => `todos/${id}`,
	delete: (id: number) => `todos/${id}`,
	filter: (userId: number) => `todos/filter/${userId}`,
	getTodosCount: 'todos/count',
}

export const USER_URLS = {
	register: 'user/register',
	login: 'user/login',
	forgotPassword: 'user/forgot-password',
	changePassword: 'user/change-password',
	getUserByToken: (token: string) => `user/${token}`,
}
