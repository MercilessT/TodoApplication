import { useState } from 'react'
import { getUserByToken } from '../requests/user'
import { useTodoStore } from '~/store/todo.store'
import { ButtonName } from '~/shared/components/button/button-group.component'
import { User } from '../types/user.type'
import { useButtonFilterGroupStore } from '~/store/button-group.store'
import { useSearchInputStore } from '~/store/input-search.store'
import { useAuthStore } from '~/store/auth.store'
import { usePagesPaginationStore } from '~/store/pages-pagination.store'
import { TODOS_COUNT_ON_PAGE } from '../config/pages'

export function useTodoLoader() {
	const { setTodos, setTodosCount, getTodosCount } = useTodoStore()
	const [user, setUser] = useState<User | null>(null)
	const { selectedButton, setSelectedButton } = useButtonFilterGroupStore()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { inputValue } = useSearchInputStore()
	const { accessToken } = useAuthStore()
	const { getCurrentPage, setCurrentPage, setTotalPages } =
		usePagesPaginationStore()

	const loadData = async () => {
		setIsLoading(true)
		try {
			const fetchedUser = await getUserByToken(accessToken)
			if (fetchedUser) {
				setUser(fetchedUser)

				await setTodos(
					selectedButton,
					fetchedUser.id,
					inputValue,
					getCurrentPage(),
				)

				await setTodosCount()
				setTotalPages(Math.ceil(getTodosCount() / TODOS_COUNT_ON_PAGE))
			}
		} catch (error) {
			console.error('Failed to load user or todos', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleButtonClick = async (buttonName: ButtonName): Promise<void> => {
		setIsLoading(true)
		try {
			await setTodos(buttonName, user!.id, inputValue, getCurrentPage())
			setSelectedButton(buttonName)
			setCurrentPage(1)
		} catch (error) {
			console.error('Failed to load todos', error)
		} finally {
			setIsLoading(false)
		}
	}

	return { user, isLoading, loadData, handleButtonClick }
}
