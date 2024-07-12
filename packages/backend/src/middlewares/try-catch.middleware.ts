import { Request, Response, NextFunction } from 'express'

export const tryCatch = (
	fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next)
		} catch (error) {
			res.status(400).json({ message: (error as Error).message })
		}
	}
}
