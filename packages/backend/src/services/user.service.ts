import prisma from '@/utils/prisma.util'
import bcrypt from 'bcryptjs'
import { UserType } from '../types/user.type'
import {
	generateResetToken,
	generateToken,
} from '../middlewares/auth.middleware'
import jwt from 'jsonwebtoken'
import { ROUTER_KEYS } from '../utils/keys'
import EmailService from './email.service'

export default class UserService {
	private readonly JWT_SECRET = process.env.JWT_SECRET
	private readonly JWT_RESET_SECRET = process.env.JWT_RESET_SECRET
	private emailService: EmailService

	constructor() {
		this.emailService = new EmailService()
	}

	private decodeToken(token: string): { id: number } {
		return jwt.verify(token, this.JWT_SECRET) as { id: number }
	}

	private decodeResetToken(token: string): { email: string } {
		return jwt.verify(token, this.JWT_RESET_SECRET) as { email: string }
	}

	async findAll(): Promise<UserType[]> {
		return await prisma.user.findMany()
	}

	async findById(id: number): Promise<UserType | null> {
		return await prisma.user.findUnique({ where: { id } })
	}

	async findByEmail(email: string): Promise<UserType | null> {
		return await prisma.user.findUnique({ where: { email } })
	}

	async create(user: Omit<UserType, 'id'>): Promise<UserType> {
		const { email, password } = user
		const existingUser = await this.findByEmail(email)
		if (existingUser) {
			throw new Error('User with this email already exists')
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const createdUser = await prisma.user.create({
			data: {
				...user,
				password: hashedPassword,
			},
		})

		const token = generateToken(createdUser.id)

		const baseUserUrl = 'api/user'
		const verificationLink = `${process.env.SERVER_URL}/${baseUserUrl}/${ROUTER_KEYS.verificationLink(token)}`
		await this.emailService.sendEmail(
			email,
			'Please verify your email address',
			`<p>Click <a href="${verificationLink}">here</a> to verify your email address</p>`,
		)
		return createdUser
	}

	async delete(id: number): Promise<UserType | null> {
		const user = await prisma.user.findUnique({
			where: { id },
			include: { todos: true },
		})

		await Promise.all(
			user!.todos.map(todo =>
				prisma.todo.delete({
					where: { id: todo.id },
				}),
			),
		)

		const deletetUser = await prisma.user.delete({
			where: { id },
		})
		return deletetUser
	}

	async authenticate(user: Omit<UserType, 'id'>): Promise<UserType | null> {
		const { email, password } = user
		const userExists = await this.findByEmail(email)
		if (!userExists) {
			throw new Error('Invalid email or password')
		}

		const isMatch = await bcrypt.compare(password, userExists.password)
		if (!isMatch) {
			throw new Error('Invalid email or password')
		}

		if (!userExists.isVerified) {
			throw new Error(
				'User account has not been verified. Check your email',
			)
		}

		return userExists
	}

	async changePassword(token: string, newPassword: string): Promise<void> {
		const decodedToken = this.decodeResetToken(token)
		const userEmail = decodedToken.email
		const user = await this.findByEmail(userEmail)

		if (!user) {
			throw new Error('User not found')
		}

		const hashedNewPassword = await bcrypt.hash(newPassword, 10)

		await prisma.user.update({
			where: { email: userEmail },
			data: { password: hashedNewPassword },
		})
	}

	async verifyUser(token: string): Promise<boolean> {
		try {
			const decodedToken = this.decodeToken(token)

			const user = await prisma.user.findUnique({
				where: { id: decodedToken.id },
			})

			if (!user) {
				throw new Error('User not found')
			}

			await prisma.user.update({
				where: { id: decodedToken.id },
				data: { isVerified: true },
			})

			return true
		} catch (error) {
			console.error('Error verifying user:', error)
			return false
		}
	}

	async forgotPassword(email: string): Promise<void> {
		const user = await prisma.user.findUnique({ where: { email } })
		if (!user) {
			throw new Error('User with such email not found')
		}

		const token = generateResetToken(user.email)

		const resetLink = `${process.env.FRONTEND_URL}/${ROUTER_KEYS.changePasswordLink(token)}`
		await this.emailService.sendEmail(
			email,
			'Password Reset Request',
			`<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
		)
	}

	async getUserByToken(token: string): Promise<UserType> {
		const decodedToken = this.decodeToken(token)
		const userId = decodedToken.id

		const user = await this.findById(userId)

		if (!user) {
			throw new Error('User not found')
		}
		return user
	}
}
