/** @jsxImportSource @emotion/react */
import * as React from 'react'
import { Button, Intent, InputGroup } from '@blueprintjs/core'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import CustomInputOrTextArea from '~/shared/components/input/input-or-textarea.component'
import { ROUTER_KEYS } from '~/shared/keys'
import loginSchema from '~/shared/validation-schemas/login.validator'
import UserService from '~/shared/services/user.service'
import { styles } from './styles'
import { FORM_INITIAL_VALUES } from '~/shared/config/form-constants'
import { useAuthStore } from '~/store/auth.store'

interface LoginValues {
	email: string
	password: string
}

const userService = UserService.getInstance()

const Login: React.FC = () => {
	const navigate = useNavigate()
	const { setAccessToken } = useAuthStore()

	async function handleSubmit(values: LoginValues) {
		try {
			const res = await userService.loginUser(values)
			setAccessToken(res.accessToken)
			navigate(ROUTER_KEYS.TODOS)
		} catch (error) {
			formik.setFieldError('email', error.response.data.message)
		}
	}

	const formik = useFormik<LoginValues>({
		initialValues: {
			email: FORM_INITIAL_VALUES.email,
			password: FORM_INITIAL_VALUES.password,
		},
		validationSchema: loginSchema,
		onSubmit: handleSubmit,
	})

	return (
		<div css={styles.container}>
			<form css={styles.formContainer} onSubmit={formik.handleSubmit}>
				<CustomInputOrTextArea
					label="Email"
					labelFor="email-input"
					formik={formik}
					fieldName="email"
					inputComponent={InputGroup}
					placeholder="Enter your email..."
				/>
				<CustomInputOrTextArea
					label="Password"
					labelFor="password-input"
					formik={formik}
					fieldName="password"
					inputComponent={InputGroup}
					placeholder="Enter your password..."
					type={'password'}
				/>
				<Button
					css={styles.buttonStyles}
					intent={Intent.PRIMARY}
					text="Login"
					type="submit"
				/>
			</form>
			<div css={styles.linkStyles}>
				Don't have an account?
				<Link to={ROUTER_KEYS.REGISTER}>Register here</Link>
			</div>
			<Link to={ROUTER_KEYS.FORGOT_PASSWORD}>Forgot password?</Link>
			<Link to={ROUTER_KEYS.HOME}>Home</Link>
		</div>
	)
}

export default Login
