/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import {
	Button,
	Switch,
	TextArea,
	Spinner,
	InputGroup,
} from '@blueprintjs/core'
import { useParams, useNavigate } from 'react-router-dom'
import { useTodoStore } from '~/store/todo.store'
import { Todo } from '~/shared/types/todo.type'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TodoService from '~/shared/services/todo.service'
import { ROUTER_KEYS } from '~/shared/keys'
import CustomInputOrTextArea from '~/shared/components/input/input-or-textarea.component'
import { FORM_INITIAL_VALUES } from '~/shared/config/form-constants'
import { styles } from './styles/edit'

const todoService = TodoService.getInstance()

const EditTodoPage: React.FunctionComponent = () => {
	const { id } = useParams<{ id: string }>()
	const todoId = id ? parseInt(id, 10) : null
	const { updateTodo } = useTodoStore()
	const [todo, setTodo] = useState<Todo | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchTodo = async () => {
			setIsLoading(true)
			try {
				const fetchedTodo = await todoService.getTodo(todoId)
				setTodo(fetchedTodo)
			} catch (err) {
				console.error('Error fetching todo:', err)
			} finally {
				setIsLoading(false)
			}
		}
		if (todoId) {
			fetchTodo()
		}
	}, [todoId])

	useEffect(() => {
		if (todo) {
			formik.setValues({
				title: todo.title || '',
				description: todo.description || '',
				isPrivate: todo.isPrivate || false,
				isCompleted: todo.isCompleted || false,
			})
		}
	}, [todo])

	async function handleSubmit(values: Omit<Todo, 'id'>) {
		try {
			await updateTodo(todoId!, { ...values })
			navigate(ROUTER_KEYS.TODOS)
		} catch (error) {
			console.error('Error updating todo:', error)
		}
	}

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
		onSubmit: handleSubmit,
	})

	const handleCancel = () => {
		navigate(ROUTER_KEYS.TODOS)
	}

	const handlePrivateToggle = () => {
		formik.setFieldValue('isPrivate', !formik.values.isPrivate)
	}

	const handleCompletedToggle = () => {
		formik.setFieldValue('isCompleted', !formik.values.isCompleted)
	}

	if (isLoading) {
		return (
			<div css={styles.container}>
				<Spinner />
			</div>
		)
	}

	if (!todo) {
		return <div>Todo not found...</div>
	}

	return (
		<div css={styles.container}>
			<form onSubmit={formik.handleSubmit} css={styles.form}>
				<h2 css={styles.title}>Edit Todo</h2>
				<div>
					<CustomInputOrTextArea
						label="Title"
						labelFor="title-input"
						labelInfo="(required)"
						formik={formik}
						fieldName="title"
						inputComponent={InputGroup}
						placeholder="Enter title..."
					/>
				</div>
				<div>
					<CustomInputOrTextArea
						label="Description"
						labelFor="description-input"
						labelInfo="(optional)"
						formik={formik}
						fieldName="description"
						inputComponent={TextArea}
						placeholder="Enter description..."
					/>
				</div>
				<div css={styles.switchContainer}>
					<label>Private</label>
					<Switch
						css={styles.switch}
						checked={formik.values.isPrivate}
						onChange={handlePrivateToggle}
					/>
				</div>
				<div css={styles.switchContainer}>
					<label>Completed</label>
					<Switch
						css={styles.switch}
						checked={formik.values.isCompleted}
						onChange={handleCompletedToggle}
					/>
				</div>
				<div css={styles.buttonContainer}>
					<Button intent="danger" onClick={handleCancel}>
						Cancel
					</Button>
					<Button intent="primary" type="submit">
						Save Changes
					</Button>
				</div>
			</form>
		</div>
	)
}

export default EditTodoPage
