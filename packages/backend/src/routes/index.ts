import { Application } from 'express'
import todosRouter from './api/todos.route'
import userRouter from './api/user.route'
import cors from 'cors'
import { initializePassport } from '../middlewares/auth.middleware'

class AppRouter {
	constructor(private app: Application) {}

	init(): void {
		this.app.use(
			cors({ origin: process.env.FRONTEND_URL, credentials: true }),
		)
		this.app.use(initializePassport())
		this.app.get('/', (_req, res) => {
			res.send('API Running')
		})
		this.app.use('/api/todos', todosRouter)
		this.app.use('/api/user', userRouter)
	}
}

export default AppRouter
