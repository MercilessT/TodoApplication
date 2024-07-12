import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import UserService from '../services/user.service'
import jwt from 'jsonwebtoken'

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
}

passport.use(
	new Strategy(opts, async (payload, done) => {
		try {
			const userService = new UserService()
			const user = await userService.findById(payload.id)
			if (user) {
				return done(null, user)
			} else {
				return done(null, false)
			}
		} catch (err) {
			return done(err, false)
		}
	}),
)

export const initializePassport = () => {
	return passport.initialize()
}

export const generateToken = (id: number) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export const generateResetToken = (email: string) => {
	return jwt.sign({ email }, process.env.JWT_RESET_SECRET, {
		expiresIn: '30m',
	})
}

export const authenticateJwt = passport.authenticate('jwt', { session: false })
