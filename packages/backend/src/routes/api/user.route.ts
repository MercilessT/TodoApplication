import { Router, Request, Response, NextFunction } from 'express'
import { tryCatch } from '../../middlewares/try-catch.middleware'
import userController from '../../controllers/user.controller'
import { validate } from '../../middlewares/validator.middleware'
import {
	userChangePasswordSchema,
	userLoginSchema,
	userRegisterSchema,
	userForgotPasswordSchema,
} from '../../validators/user.validator'
import { isExist } from '../../middlewares/is-exist.middleware'
import prisma from '../../utils/prisma.util'

const router: Router = Router()

const userModel = prisma.user

router.get('/all', tryCatch(userController.getAllUsers.bind(userController)))
router.get(
	'/verify/:token',
	tryCatch(userController.verifyUser.bind(userController)),
)

router.get(
	'/:token',
	tryCatch(userController.getUserByToken.bind(userController)),
)

router.post(
	'/forgot-password',
	validate(userForgotPasswordSchema),
	tryCatch(userController.forgotPassword.bind(userController)),
)

router.post(
	'/register',
	validate(userRegisterSchema),
	tryCatch(userController.registerUser.bind(userController)),
)

router.post(
	'/login',
	validate(userLoginSchema),
	tryCatch(userController.loginUser.bind(userController)),
)

router.get(
	'/:id',
	isExist(userModel),
	tryCatch(userController.getUser.bind(userController)),
)

router.delete(
	'/:id',
	isExist(userModel),
	tryCatch(userController.deleteUser.bind(userController)),
)

router.post(
	'/change-password',
	validate(userChangePasswordSchema),
	tryCatch(userController.changePassword.bind(userController)),
)

export default router
