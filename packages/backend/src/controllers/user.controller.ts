import { Response, Request } from 'express'
import UserService from '../services/user.service'
import { generateToken } from '../middlewares/auth.middleware'

export class UserController {
	constructor(private userService: UserService) {}

	async getAllUsers(_: Request, res: Response): Promise<void> {
		const users = await this.userService.findAll()
		res.send(users)
	}

	async registerUser(req: Request, res: Response): Promise<void> {
		const user = await this.userService.create(req.body)

		const userWithoutPassword = {
			...user,
			password: undefined,
		}

		res.status(201).send(userWithoutPassword)
	}

	async loginUser(req: Request, res: Response): Promise<void> {
		const user = await this.userService.authenticate(req.body)

		if (!user) {
			res.status(401).json({ message: 'Authentication failed' })
		} else {
			const token = generateToken(user.id)
			res.status(200).json({
				message: 'User logged in',
				accessToken: token,
			})
		}
	}

	async getUser(req: Request, res: Response): Promise<void> {
		const userId = parseInt(req.params.id)
		const todo = await this.userService.findById(userId)
		res.send(todo)
	}

	async deleteUser(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id)
		const deletedUser = await this.userService.delete(id)
		res.status(204).send()
	}

	async changePassword(req: Request, res: Response): Promise<void> {
		const { token, newPassword } = req.body

		await this.userService.changePassword(token, newPassword)
		res.status(200).send({ message: 'Password changed successfully' })
	}

	async verifyUser(req: Request, res: Response): Promise<void> {
		const token = req.params.token
		const verified = await this.userService.verifyUser(token)

		if (verified) {
			res.status(200).send({ message: 'Account verified successfully' })
		} else {
			res.status(404).send({ error: 'Invalid or expired token' })
		}
	}

	async forgotPassword(req: Request, res: Response): Promise<void> {
		const { email } = req.body

		await this.userService.forgotPassword(email)
		res.status(200).send({
			message: 'Password reset link sent successfully',
		})
	}

	async getUserByToken(req: Request, res: Response): Promise<void> {
		const token = req.params.token
		const user = await this.userService.getUserByToken(token)
		res.status(200).send(user)
	}
}

const userController = new UserController(new UserService())
export default userController
