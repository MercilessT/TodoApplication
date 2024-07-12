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
import { checkActions } from '~/shared/utils/check-actions-access.util'
import { handleLogoutAction } from '~/shared/utils/logout.util'
import UserProfile from '../../user/components/profile.component'
import { useTodoLoader } from '~/shared/utils/useTodoLoader.util'
import SearchInput from '~/shared/components/input/input-search.component'
import { useButtonFilterGroupStore } from '~/store/button-group.store'
import { styles } from './styles/mobile'
import MobileTodoItem from './mobile-todo-item.component'

const MobileComponent: React.FunctionComponent = () => {
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
				<SearchInput handleButtonClick={handleButtonClick} />

				<div css={styles.buttonGroupContainer}>
					<ButtonGroup
						selectedButton={selectedButton}
						handleButtonClick={handleButtonClick}
					/>
				</div>
			</div>
			<div css={styles.contentPadding}>
				<div css={styles.buttonsCreateLogoutContainer}>
					<Button intent="primary" onClick={openCreateDialog}>
						Create
					</Button>
					{user && <UserProfile user={user} />}
					<Button intent="primary" onClick={handleLogout}>
						Logout
					</Button>
				</div>
				<div css={styles.marginTop20}>
					{isLoading ? (
						<LoadingSpinner />
					) : (
						todos.map(todo => (
							<MobileTodoItem
								key={todo.id}
								todo={todo}
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

export default MobileComponent
