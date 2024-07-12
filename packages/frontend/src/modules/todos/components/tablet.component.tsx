/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo } from 'react'
import { Button } from '@blueprintjs/core'
import Slider from 'react-slick'
import { useTodoStore } from '~/store/todo.store'
import AddModal from '~/shared/components/modals/add-modal.component'
import ConfirmationModal from '~/shared/components/modals/confirmation-modal.component'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
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
import { styles } from './styles/tablet'
import TabletTodoItem from './tablet-todo-item.component'

const TabletComponent: React.FunctionComponent = () => {
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

	const sliderSettings = useMemo(
		() => ({
			dots: true,
			infinite: false,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
			swipeToSlide: true,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
					},
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
					},
				},
			],
		}),
		[],
	)

	return (
		<>
			<div css={styles.container}>
				<ButtonGroup
					selectedButton={selectedButton}
					handleButtonClick={handleButtonClick}
				/>
				<div css={styles.inputGroupContainer}>
					<SearchInput handleButtonClick={handleButtonClick} />
				</div>
			</div>
			<div css={styles.sliderContainer}>
				<div css={styles.buttonsCreateLogoutContainer}>
					<Button intent="primary" onClick={openCreateDialog}>
						Create
					</Button>
					{user && <UserProfile user={user} />}
					<Button intent="primary" onClick={handleLogout}>
						Logout
					</Button>
				</div>
				<div css={styles.button}>
					{isLoading ? (
						<LoadingSpinner />
					) : (
						<Slider {...sliderSettings} key={todos.length}>
							{todos.map(todo => (
								<TabletTodoItem
									key={todo.id}
									todo={todo}
									user={user}
									handleGetTodo={handleGetTodo}
									handleEditTodo={handleEditTodo}
									handleDeleteTodo={handleDeleteTodo}
									checkActions={checkActions}
								/>
							))}
						</Slider>
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

export default TabletComponent
