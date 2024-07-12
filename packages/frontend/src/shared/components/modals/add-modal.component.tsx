/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react'
import { css } from '@emotion/react'
import { Dialog, InputGroup, Switch, Button, TextArea } from '@blueprintjs/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Todo } from '../../types/todo.type'
import CustomInputOrTextArea from '../input/input-or-textarea.component'
import { FORM_INITIAL_VALUES } from '../../config/form-constants'
import { useAuthStore } from '~/store/auth.store'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	onSubmit: (values: Omit<Todo, 'id'>, token: string) => Promise<void>
}

const styles = {
	dialogContent: css`
		padding: 20px;
	`,
	buttonGroup: css`
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		gap: 10px;
	`,
}

const AddModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
	const { accessToken } = useAuthStore()

	const formik = useFormik({
		initialValues: {
			title: FORM_INITIAL_VALUES.title,
			description: FORM_INITIAL_VALUES.description,
			isPrivate: FORM_INITIAL_VALUES.Private,
			isCompleted: FORM_INITIAL_VALUES.Completed,
		},
		validationSchema: Yup.object({
			title: Yup.string().trim().required('Title is required'),
			description: Yup.string().nullable(),
		}),
		onSubmit: async values => {
			await onSubmit(values, accessToken)
			formik.resetForm()
			onClose()
		},
	})

	const handleClose = () => {
		formik.resetForm()
		onClose()
	}

	const handlePrivateToggle = () => {
		formik.setFieldValue('isPrivate', !formik.values.isPrivate)
	}

	const handleCompletedToggle = () => {
		formik.setFieldValue('isCompleted', !formik.values.isCompleted)
	}

	return (
		<Dialog
			isOpen={isOpen}
			onClose={handleClose}
			title="Create Todo"
			canOutsideClickClose={true}
			canEscapeKeyClose={true}>
			<form onSubmit={formik.handleSubmit}>
				<div css={styles.dialogContent}>
					<CustomInputOrTextArea
						label="Title"
						labelFor="title-input"
						labelInfo="(required)"
						formik={formik}
						fieldName="title"
						inputComponent={InputGroup}
						placeholder="Enter title..."
					/>

					<CustomInputOrTextArea
						label="Description"
						labelFor="description-input"
						labelInfo="(optional)"
						formik={formik}
						fieldName="description"
						inputComponent={TextArea}
						placeholder="Enter description..."
					/>

					<Switch
						checked={formik.values.isPrivate}
						label="Private"
						onChange={handlePrivateToggle}
					/>
					<Switch
						checked={formik.values.isCompleted}
						label="Completed"
						onChange={handleCompletedToggle}
					/>

					<div css={styles.buttonGroup}>
						<Button intent="danger" onClick={handleClose}>
							Cancel
						</Button>
						<Button intent="primary" type="submit">
							Create
						</Button>
					</div>
				</div>
			</form>
		</Dialog>
	)
}

export default AddModal
