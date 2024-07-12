/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { Button, Intent, InputGroup } from '@blueprintjs/core'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTER_KEYS } from '~/shared/keys'
import { useFormik } from 'formik'
import CustomInputOrTextArea from '~/shared/components/input/input-or-textarea.component'
import registerSchema from '~/shared/validation-schemas/register.validator'
import CheckEmailModal from '~/shared/components/modals/check-email.component'
import { registerUser } from '~/shared/requests/user'
import { styles } from './styles'
import { FORM_INITIAL_VALUES } from '~/shared/config/form-constants'

interface RegisterValues {
	name: string
	email: string
	password: string
	confirmPassword: string
}

const Register: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const navigate = useNavigate()

	const handleCloseModal = () => {
		setIsModalOpen(false)
		navigate(ROUTER_KEYS.LOGIN)
	}

	async function handleSubmit(values: RegisterValues) {
		try {
			const { confirmPassword, ...userData } = values
			await registerUser(userData)
			setIsModalOpen(true)
		} catch (error) {
			formik.setFieldError('email', error.response.data.message)
		}
	}

	const formik = useFormik<RegisterValues>({
		initialValues: {
			name: FORM_INITIAL_VALUES.name,
			email: FORM_INITIAL_VALUES.email,
			password: FORM_INITIAL_VALUES.password,
			confirmPassword: FORM_INITIAL_VALUES.password,
		},
		validationSchema: registerSchema,
		onSubmit: handleSubmit,
	})

	return (
		<div css={styles.container}>
			<form css={styles.formContainer} onSubmit={formik.handleSubmit}>
				<CustomInputOrTextArea
					label="Name"
					labelFor="name-input"
					formik={formik}
					fieldName="name"
					inputComponent={InputGroup}
					placeholder="Enter your name..."
				/>
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
				<CustomInputOrTextArea
					label="Confirm Password"
					labelFor="confirm-password-input"
					formik={formik}
					fieldName="confirmPassword"
					inputComponent={InputGroup}
					placeholder="Confirm your password..."
					type={'password'}
				/>
				<Button
					css={styles.buttonStyles}
					intent={Intent.SUCCESS}
					text="Register"
					type="submit"
				/>
			</form>
			<div css={styles.linkStyles}>
				Already have an account?
				<Link to={ROUTER_KEYS.LOGIN}>Login here</Link>
			</div>
			<Link to={ROUTER_KEYS.HOME}>Home</Link>
			<CheckEmailModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				title={'Verification'}
				description={'Check your email for confirmation your account'}
			/>
		</div>
	)
}

export default Register
