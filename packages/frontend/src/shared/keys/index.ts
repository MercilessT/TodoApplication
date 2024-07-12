export const ROUTER_KEYS = {
	ALL_MATCH: '/*',
	HOME: '/',
	TODOS: '/todos',
	LOGIN: '/login',
	REGISTER: '/register',
	FORGOT_PASSWORD: '/forgot-password',
	CHANGE_PASSWORD: `/change-password`,
	EDIT: 'todos/:id/edit',
	EDIT_NAVIGATE: (id: number) => `/todos/${id}/edit`,
	VIEW: '/todos/:id',
	VIEW_NAVIGATE: (id: number) => `/todos/${id}`,
	DASHBOARD: '/dashboard',
}

export const STORAGE_KEYS = Object.freeze({
	ACCESS_TOKEN: 'accessToken',
})
