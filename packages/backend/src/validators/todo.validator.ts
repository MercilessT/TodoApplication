import Joi from 'joi'

export const todoPostSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().allow('', null).optional(),
	isPrivate: Joi.boolean().default(true),
	isCompleted: Joi.boolean().default(true),
})

export const todoPutSchema = Joi.object({
	title: Joi.string().optional(),
	description: Joi.string().allow('', null).optional(),
	isPrivate: Joi.boolean(),
	isCompleted: Joi.boolean(),
}).or('title', 'description', 'isPrivate', 'isCompleted')
