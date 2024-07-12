/** @jsxImportSource @emotion/react */
import React from 'react'
import { Button } from '@blueprintjs/core'
import { COLORS } from '~/shared/styles'
import { styles } from './styles/desktop'
import { TodoItemProps } from './prop-types'

const DesktopTodoItem: React.FC<TodoItemProps> = ({
	todo,
	index,
	user,
	handleGetTodo,
	handleEditTodo,
	handleDeleteTodo,
	checkActions,
}) => (
	<React.Fragment key={todo.id}>
		<div
			css={styles.tableColumn}
			style={{
				backgroundColor:
					index % 2 === 0 ? COLORS.white : COLORS.antiFlashWhite,
			}}>
			{todo.title}
		</div>
		<div
			css={styles.tableColumn}
			style={{
				backgroundColor:
					index % 2 === 0 ? COLORS.white : COLORS.antiFlashWhite,
			}}>
			{todo.description}
		</div>
		<div
			css={styles.tableColumnActions}
			style={{
				backgroundColor:
					index % 2 === 0 ? COLORS.white : COLORS.antiFlashWhite,
			}}>
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
	</React.Fragment>
)

export default DesktopTodoItem
