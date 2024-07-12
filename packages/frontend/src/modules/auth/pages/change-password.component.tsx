/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { Button, Intent, InputGroup } from '@blueprintjs/core'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useFormik } from 'formik'
import CustomInputOrTextArea from '~/shared/components/input/input-or-textarea.component'
import { ROUTER_KEYS } from '~/shared/keys'
import changePasswordSchema from '~/shared/validation-schemas/change-password.validator'
import UserService from '~/shared/services/user.service'
import CheckEmailModal from '~/shared/components/modals/check-email.component'
import { styles } from './styles'
import { FORM_INITIAL_VALUES } from '~/shared/config/form-constants'

interface ChangePasswordValues {
	password: string
	confirmPassword: string
}

const userService = UserService.getInstance()

const ChangePassword: React.FC = () => {
	const [searchParams] = useSearchParams()
	const token = searchParams.get('token') || ''
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const navigate = useNavigate()

	const handleCloseModal = () => {
		setIsModalOpen(false)
		navigate(ROUTER_KEYS.LOGIN)
	}

	async function handleSubmit(values: ChangePasswordValues) {
		try {
			const { password: newPassword } = values
			await userService.changePassword(newPassword, token)
			setIsModalOpen(true)
		} catch (error) {
			formik.setFieldError('password', error.response.data.message)
		}
	}

	const formik = useFormik<ChangePasswordValues>({
		initialValues: {
			password: FORM_INITIAL_VALUES.password,
			confirmPassword: FORM_INITIAL_VALUES.password,
		},
		validationSchema: changePasswordSchema,
		onSubmit: handleSubmit,
	})

	return (
		<div css={styles.container}>
			<form css={styles.formContainer} onSubmit={formik.handleSubmit}>
				<CustomInputOrTextArea
					label="New Password"
					labelFor="password-input"
					formik={formik}
					fieldName="password"
					inputComponent={InputGroup}
					placeholder="Enter your new password..."
					type="password"
				/>
				<CustomInputOrTextArea
					label="Confirm Password"
					labelFor="confirm-password-input"
					formik={formik}
					fieldName="confirmPassword"
					inputComponent={InputGroup}
					placeholder="Confirm your new password..."
					type="password"
				/>
				<Button
					css={styles.buttonStyles}
					intent={Intent.PRIMARY}
					text="Change Password"
					type="submit"
				/>
			</form>
			<div css={styles.linkStyles}>
				<Link to={ROUTER_KEYS.LOGIN}>Back to Login</Link>
			</div>
			<CheckEmailModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				title={'Changing password'}
				description={'Password changed successfully'}
			/>
		</div>
	)
}

export default ChangePassword
