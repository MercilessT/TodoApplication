/** @jsxImportSource @emotion/react */
import React from 'react'
import { Button } from '@blueprintjs/core'
import { styles } from './styles/mobile'
import { TodoItemProps } from './prop-types'

const MobileTodoItem: React.FC<TodoItemProps> = ({
	todo,
	user,
	handleGetTodo,
	handleEditTodo,
	handleDeleteTodo,
	checkActions,
}) => (
	<div key={todo.id} css={styles.todoCard}>
		<div css={styles.todoTitle}>{todo.title}</div>
		<div css={styles.description}>{todo.description}</div>
		<div css={styles.todoActions}>
			<Button intent="success" onClick={() => handleGetTodo(todo.id)}>
				View
			</Button>
			{checkActions.checkActionsAccess(user, todo) && (
				<>
					<Button
						intent="primary"
						onClick={() => handleEditTodo(todo.id)}>
						Edit
					</Button>
					<Button
						intent="danger"
						onClick={() => handleDeleteTodo(todo.id)}>
						Delete
					</Button>
				</>
			)}
		</div>
	</div>
)

export default MobileTodoItem
