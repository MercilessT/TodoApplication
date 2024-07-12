/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { Button, Card, Switch, Elevation, Spinner } from '@blueprintjs/core'
import { useParams, useNavigate } from 'react-router-dom'
import { Todo } from '~/shared/types/todo.type'
import { ROUTER_KEYS } from '~/shared/keys'
import TodoService from '~/shared/services/todo.service'
import { styles } from './styles/details'

const todoService = TodoService.getInstance()

const DetailsTodoPage: React.FunctionComponent = () => {
	const { id } = useParams<{ id: string }>()
	const todoId = id ? parseInt(id, 10) : null

	const [todo, setTodo] = useState<Todo | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchTodo = async () => {
			setIsLoading(true)
			try {
				if (todoId) {
					const fetchedTodo = await todoService.getTodo(todoId)
					setTodo(fetchedTodo)
				}
			} catch (err) {
				console.error('Error fetching todo:', err)
			} finally {
				setIsLoading(false)
			}
		}
		fetchTodo()
	}, [todoId])

	const handleCancel = () => {
		navigate(ROUTER_KEYS.TODOS)
	}

	if (isLoading) {
		return (
			<div css={styles.container}>
				<Spinner />
			</div>
		)
	}

	if (!todo) {
		return <div css={styles.container}>Todo not found...</div>
	}

	return (
		<div css={styles.container}>
			<Card elevation={Elevation.TWO} css={styles.card}>
				<h2 css={styles.details}>Todo Details</h2>
				<hr css={styles.marginTop20} />

				<div css={styles.section}>
					<div css={styles.boldText}>Title</div>
					<div css={styles.title}>{todo.title}</div>
				</div>
				<hr css={styles.marginTop20} />

				<div css={styles.section}>
					<div css={styles.boldText}>Description</div>
					<div css={styles.title}>{todo.description}</div>
				</div>
				<hr css={styles.marginTop20} />

				<div css={styles.switchContainer}>
					<span css={styles.boldText}>Private</span>
					<Switch
						css={styles.switch}
						disabled
						checked={todo.isPrivate}
					/>
				</div>

				<div css={styles.switchContainer}>
					<span css={styles.boldText}>Completed</span>
					<Switch
						css={styles.switch}
						disabled
						checked={todo.isCompleted}
					/>
				</div>

				<Button css={styles.marginTop20} onClick={handleCancel}>
					Back
				</Button>
			</Card>
		</div>
	)
}

export default DetailsTodoPage
