import Joi from 'joi'

export const userRegisterSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	name: Joi.string().required(),
})

export const userLoginSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().min(6).required(),
})

export const userChangePasswordSchema = Joi.object({
	newPassword: Joi.string().min(6).required(),
	token: Joi.string().required(),
})

export const userForgotPasswordSchema = Joi.object({
	email: Joi.string().email().required(),
})
