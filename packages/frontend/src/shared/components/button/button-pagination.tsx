/** @jsxImportSource @emotion/react */
import React from 'react'
import { Pagination } from '@mui/material'
import { usePagesPaginationStore } from '~/store/pages-pagination.store'
import { css } from '@emotion/react'
import { useButtonFilterGroupStore } from '~/store/button-group.store'
import { useSearchInputStore } from '~/store/input-search.store'
import { useTodoStore } from '~/store/todo.store'
import { getUserByToken } from '../../requests/user'
import { useAuthStore } from '~/store/auth.store'

const PaginationButtons: React.FC = () => {
	const { selectedButton } = useButtonFilterGroupStore()
	const { setTodos } = useTodoStore()
	const { inputValue } = useSearchInputStore()
	const { accessToken } = useAuthStore()

	const { totalPages, setCurrentPage, getCurrentPage } =
		usePagesPaginationStore()

	const handlePageChange = async (
		_event: React.ChangeEvent<unknown>,
		page: number,
	) => {
		setCurrentPage(page)
		const fetchedUser = await getUserByToken(accessToken)

		await setTodos(
			selectedButton,
			fetchedUser.id,
			inputValue,
			getCurrentPage(),
		)
	}

	return (
		<div css={paginationContainerStyles}>
			<Pagination
				count={totalPages}
				page={getCurrentPage()}
				color="primary"
				onChange={handlePageChange}
			/>
		</div>
	)
}

const paginationContainerStyles = css`
	display: flex;
	justify-content: center;
	margin-top: 20px;
	margin-bottom: 20px;
`

export default PaginationButtons
