/** @jsxImportSource @emotion/react */
import React from 'react'
import { Button } from '@blueprintjs/core'
import { styles } from './styles/tablet'
import { TodoItemProps } from './prop-types'

const TabletTodoItem: React.FC<TodoItemProps> = ({
	todo,
	user,
	handleGetTodo,
	handleEditTodo,
	handleDeleteTodo,
	checkActions,
}) => (
	<div key={todo.id}>
		<div css={styles.todoCard}>
			<div css={styles.todoTitle}>{todo.title}</div>
			<div>{todo.description}</div>
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
	</div>
)

export default TabletTodoItem
