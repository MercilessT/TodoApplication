import { Request, Response, NextFunction } from 'express'
import { ModelWithFindUnique } from '@/types/generics.type'

export const isExist = <T>(model: ModelWithFindUnique<T>) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const numericId = +req.params.id
		if (isNaN(numericId)) {
			return res.status(400).send({ message: 'Invalid ID format' })
		}

		const foundItem = await model.findUnique({
			where: { id: numericId },
		})

		if (!foundItem) {
			return res.status(404).send({ message: 'Item not found' })
		}

		next()
	}
}
