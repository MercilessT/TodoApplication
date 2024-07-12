/** @jsxImportSource @emotion/react */
import React, { useCallback, useState } from 'react'
import { Button, Intent, InputGroup } from '@blueprintjs/core'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import CustomInputOrTextArea from '~/shared/components/input/input-or-textarea.component'
import { ROUTER_KEYS } from '~/shared/keys'
import sendEmailSchema from '~/shared/validation-schemas/send-email.validator'
import UserService from '~/shared/services/user.service'
import CheckEmailModal from '~/shared/components/modals/check-email.component'
import { debounce } from 'lodash'
import { styles } from './styles'
import { FORM_INITIAL_VALUES } from '~/shared/config/form-constants'

interface EmailValues {
	email: string
}

const userService = UserService.getInstance()

const SendEmail: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	const debouncedSendEmail = useCallback(
		debounce(async (email: string) => {
			await userService.sendEmail(email)
			setIsModalOpen(true)
		}, 3000),
		[],
	)

	async function handleSubmit(values: EmailValues) {
		try {
			const { email } = values
			await debouncedSendEmail(email)
		} catch (error) {
			formik.setFieldError('email', error.response.data.message)
		}
	}

	const formik = useFormik<EmailValues>({
		initialValues: {
			email: FORM_INITIAL_VALUES.email,
		},
		validationSchema: sendEmailSchema,
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
				<Button
					css={styles.buttonStyles}
					intent={Intent.PRIMARY}
					text="Send Email"
					type="submit"
				/>
			</form>
			<div css={styles.linkStyles}>
				<Link to={ROUTER_KEYS.LOGIN}>Back to Login</Link>
			</div>
			<CheckEmailModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				title={'Reseting password'}
				description={'Check your email to change your password'}
			/>
		</div>
	)
}

export default SendEmail
