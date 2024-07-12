/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react'
import { Button } from '@blueprintjs/core'
import { useTodoStore } from '~/store/todo.store'
import AddModal from '~/shared/components/modals/add-modal.component'
import ConfirmationModal from '~/shared/components/modals/confirmation-modal.component'
import ButtonGroup from '~/shared/components/button/button-group.component'
import LoadingSpinner from '~/shared/components/loader/loading-spinner.component'
import {
	useTodoActions,
	useCreateDialogActions,
	useDeleteDialogActions,
} from '~/shared/utils/todos.util'
import { handleLogoutAction } from '~/shared/utils/logout.util'
import { checkActions } from '~/shared/utils/check-actions-access.util'
import { useTodoLoader } from '~/shared/utils/useTodoLoader.util'
import SearchInput from '~/shared/components/input/input-search.component'
import UserProfile from '../../user/components/profile.component'
import { useButtonFilterGroupStore } from '~/store/button-group.store'
import { styles } from './styles/desktop'
import DesktopTodoItem from './desktop-todo-item.component'
import PaginationButtons from '~/shared/components/button/button-pagination'


const DesktopComponent: React.FunctionComponent = () => {
	const { handleLogout } = handleLogoutAction()

	const { todos, createTodo, deleteTodo } = useTodoStore()
	const { handleGetTodo, handleEditTodo } = useTodoActions()
	const {
		isCreateDialogOpen,
		openCreateDialog,
		closeCreateDialog,
		handleCreateTodo,
	} = useCreateDialogActions(createTodo)
	const {
		isDeleteDialogOpen,
		handleDeleteTodo,
		closeDeleteDialog,
		confirmDeleteTodo,
	} = useDeleteDialogActions(deleteTodo)

	const { user, isLoading, loadData, handleButtonClick } = useTodoLoader()
	const { selectedButton } = useButtonFilterGroupStore()

	useEffect(() => {
		loadData()
	}, [])

	return (
		<>
			<div css={styles.container}>
				<div>
					<ButtonGroup
						selectedButton={selectedButton}
						handleButtonClick={handleButtonClick}
					/>
				</div>
				<SearchInput handleButtonClick={handleButtonClick} />
			</div>
			<div css={styles.tableContainer}>
				<div css={styles.buttonsCreateLogoutContainer}>
					<Button intent="primary" onClick={openCreateDialog}>
						Create
					</Button>
					{user && <UserProfile user={user} />}
					<Button intent="primary" onClick={handleLogout}>
						Logout
					</Button>
				</div>

				<div css={styles.tableSettings}>
					<div css={styles.tableColumnName}>Title</div>
					<div css={styles.tableColumnName}>Description</div>
					<div css={styles.tableColumnName}>Actions</div>
					{isLoading ? (
						<LoadingSpinner />
					) : (
						todos.map((todo, index) => (
							<DesktopTodoItem
								key={todo.id}
								todo={todo}
								index={index}
								user={user}
								handleGetTodo={handleGetTodo}
								handleEditTodo={handleEditTodo}
								handleDeleteTodo={handleDeleteTodo}
								checkActions={checkActions}
							/>
						))
					)}
				</div>
			</div>

			<PaginationButtons />

			<AddModal
				isOpen={isCreateDialogOpen}
				onClose={closeCreateDialog}
				onSubmit={handleCreateTodo}
			/>

			<ConfirmationModal
				isOpen={isDeleteDialogOpen}
				onClose={closeDeleteDialog}
				onConfirm={confirmDeleteTodo}
			/>
		</>
	)
}

export default DesktopComponent
