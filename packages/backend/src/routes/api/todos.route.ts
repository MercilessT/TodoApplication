import { Router } from 'express'
import todoController from '@/controllers/todo.controller'
import prisma from '@/utils/prisma.util'
import { validate } from '../../middlewares/validator.middleware'
import { isExist } from '../../middlewares/is-exist.middleware'
import { tryCatch } from '../../middlewares/try-catch.middleware'
import { todoPostSchema, todoPutSchema } from '@/validators/todo.validator'
import { authenticateJwt } from '../../middlewares/auth.middleware'

const todosRouter: Router = Router()

const todoModel = prisma.todo
const userModel = prisma.user

todosRouter.get(
	'/all',
	tryCatch(todoController.getAllTodos.bind(todoController)),
)

todosRouter.get(
	'/count',
	tryCatch(todoController.getTodosCount.bind(todoController)),
)

todosRouter.get(
	'/filter/:id',
	isExist(userModel),
	tryCatch(todoController.getFilteredTodos.bind(todoController)),
)

todosRouter.post(
	'/',
	validate(todoPostSchema),
	authenticateJwt,
	tryCatch(todoController.createTodo.bind(todoController)),
)

todosRouter.get(
	'/:id',
	authenticateJwt,
	isExist(todoModel),
	tryCatch(todoController.getTodo.bind(todoController)),
)

todosRouter.put(
	'/:id',
	validate(todoPutSchema),
	authenticateJwt,
	isExist(todoModel),
	tryCatch(todoController.updateTodo.bind(todoController)),
)

todosRouter.delete(
	'/:id',
	authenticateJwt,
	isExist(todoModel),
	tryCatch(todoController.deleteTodo.bind(todoController)),
)

export default todosRouter
